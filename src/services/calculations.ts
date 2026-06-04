import { differenceInDays, differenceInMonths } from 'date-fns';
import type { Asset, AssetWithCategory, ValuationRecord, AssetStatistics, CategoryBreakdown } from '../types';

/** Number of days between two ISO date strings. Returns at least 1. */
export function daysBetween(startDate: string, endDate?: string): number {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  return Math.max(differenceInDays(end, start), 1);
}

/** Number of months between two ISO date strings. Returns at least 1. */
export function monthsBetween(startDate: string, endDate?: string): number {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  return Math.max(differenceInMonths(end, start), 1);
}

/** Daily cost: purchasePrice / daysUsed */
export function dailyCost(purchasePrice: number, daysUsed: number): number {
  if (daysUsed <= 0) return purchasePrice;
  return purchasePrice / daysUsed;
}

/** Retention rate as percentage: (currentValuation / purchasePrice) * 100 */
export function retentionRate(currentValuation: number, purchasePrice: number): number {
  if (purchasePrice <= 0) return 100;
  return (currentValuation / purchasePrice) * 100;
}

/** Monthly depreciation: (purchasePrice - currentValuation) / monthsHeld */
export function monthlyDepreciation(purchasePrice: number, currentValuation: number, monthsHeld: number): number {
  if (monthsHeld <= 0) return 0;
  return (purchasePrice - currentValuation) / monthsHeld;
}

/** Unrealized P&L: currentValuation - purchasePrice */
export function unrealizedPnL(currentValuation: number, purchasePrice: number): number {
  return currentValuation - purchasePrice;
}

/** Realized P&L: soldPrice - purchasePrice */
export function realizedPnL(soldPrice: number, purchasePrice: number): number {
  return soldPrice - purchasePrice;
}

/** Compute all derived values for a single asset */
export function computeAssetDerived(asset: Asset) {
  const daysUsed = daysBetween(asset.purchaseDate, asset.soldDate || undefined);
  const monthsHeld = monthsBetween(asset.purchaseDate, asset.soldDate || undefined);
  const currentVal = asset.currentValuation ?? asset.purchasePrice;

  return {
    daysUsed,
    monthsHeld,
    dailyCost: dailyCost(asset.purchasePrice, daysUsed),
    retentionRate: retentionRate(currentVal, asset.purchasePrice),
    monthlyDepreciation: monthlyDepreciation(asset.purchasePrice, currentVal, monthsHeld),
    unrealizedPnL: unrealizedPnL(currentVal, asset.purchasePrice),
    realizedPnL: asset.soldPrice != null ? realizedPnL(asset.soldPrice, asset.purchasePrice) : 0,
    currentValue: currentVal,
  };
}

/** Aggregate statistics across all assets */
export function computeStatistics(
  assets: AssetWithCategory[],
  categoryBreakdowns: CategoryBreakdown[]
): AssetStatistics {
  const active = assets.filter((a) => a.status === 'active');
  const retired = assets.filter((a) => a.status === 'retired');
  const sold = assets.filter((a) => a.status === 'sold');

  const totalCurrentValue = assets.reduce((sum, a) => {
    if (a.status === 'sold') return sum + (a.soldPrice ?? 0);
    return sum + (a.currentValuation ?? a.purchasePrice);
  }, 0);

  const totalPurchaseCost = assets.reduce((sum, a) => sum + a.purchasePrice, 0);

  const unrealized = assets
    .filter((a) => a.status !== 'sold')
    .reduce((sum, a) => sum + unrealizedPnL(a.currentValuation ?? a.purchasePrice, a.purchasePrice), 0);

  const realized = sold.reduce(
    (sum, a) => sum + realizedPnL(a.soldPrice ?? 0, a.purchasePrice),
    0
  );

  const totalDaily = assets.reduce((sum, a) => {
    const d = daysBetween(a.purchaseDate, a.status === 'sold' ? a.soldDate! : undefined);
    return sum + dailyCost(a.purchasePrice, d);
  }, 0);

  const avgRetention = assets.length > 0
    ? assets.reduce((sum, a) => {
        const val = a.status === 'sold' ? (a.soldPrice ?? a.purchasePrice) : (a.currentValuation ?? a.purchasePrice);
        return sum + retentionRate(val, a.purchasePrice);
      }, 0) / assets.length
    : 100;

  return {
    totalCurrentValue,
    totalPurchaseCost,
    unrealizedPnL: unrealized,
    realizedPnL: realized,
    totalDailyCost: totalDaily,
    averageRetentionRate: avgRetention,
    totalCount: assets.length,
    activeCount: active.length,
    retiredCount: retired.length,
    soldCount: sold.length,
    categoryBreakdown: categoryBreakdowns,
  };
}

/** Compute category breakdown from assets */
export function computeCategoryBreakdown(assets: AssetWithCategory[]): CategoryBreakdown[] {
  const map = new Map<string, {
    categoryId: string;
    categoryName: string;
    categoryIcon: string;
    assets: AssetWithCategory[];
  }>();

  for (const asset of assets) {
    const existing = map.get(asset.categoryId);
    if (existing) {
      existing.assets.push(asset);
    } else {
      map.set(asset.categoryId, {
        categoryId: asset.categoryId,
        categoryName: asset.categoryName,
        categoryIcon: asset.categoryIcon,
        assets: [asset],
      });
    }
  }

  const totalCost = assets.reduce((sum, a) => sum + a.purchasePrice, 0);

  return Array.from(map.values())
    .map((g) => {
      const totalPurchaseCost = g.assets.reduce((sum, a) => sum + a.purchasePrice, 0);
      const totalCurrentValue = g.assets.reduce((sum, a) => {
        if (a.status === 'sold') return sum + (a.soldPrice ?? 0);
        return sum + (a.currentValuation ?? a.purchasePrice);
      }, 0);
      const avgRetention = g.assets.length > 0
        ? g.assets.reduce((sum, a) => {
            const val = a.status === 'sold' ? (a.soldPrice ?? a.purchasePrice) : (a.currentValuation ?? a.purchasePrice);
            return sum + retentionRate(val, a.purchasePrice);
          }, 0) / g.assets.length
        : 100;

      return {
        categoryId: g.categoryId,
        categoryName: g.categoryName,
        categoryIcon: g.categoryIcon,
        assetCount: g.assets.length,
        totalPurchaseCost,
        totalCurrentValue,
        percentage: totalCost > 0 ? (totalPurchaseCost / totalCost) * 100 : 0,
        averageRetentionRate: avgRetention,
      };
    })
    .sort((a, b) => b.totalPurchaseCost - a.totalPurchaseCost);
}

/** Chart data point for value change */
export interface ChartDataPoint {
  date: string;
  value: number;
  label: string;
}

/** Generate chart data from valuations and asset info */
export function computeChartData(asset: Asset, valuations: ValuationRecord[]): ChartDataPoint[] {
  const points: ChartDataPoint[] = [
    {
      date: asset.purchaseDate,
      value: asset.purchasePrice,
      label: formatShortDate(asset.purchaseDate),
    },
  ];

  for (const v of valuations) {
    points.push({
      date: v.recordedDate,
      value: v.value,
      label: formatShortDate(v.recordedDate),
    });
  }

  return points;
}

function formatShortDate(iso: string): string {
  const d = new Date(iso);
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
