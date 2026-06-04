export interface CategoryBreakdown {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  assetCount: number;
  totalPurchaseCost: number;
  totalCurrentValue: number;
  percentage: number;           // 0–100
  averageRetentionRate: number;  // 0–100
}

export interface AssetStatistics {
  totalCurrentValue: number;
  totalPurchaseCost: number;
  unrealizedPnL: number;
  realizedPnL: number;
  totalDailyCost: number;
  averageRetentionRate: number;
  totalCount: number;
  activeCount: number;
  retiredCount: number;
  soldCount: number;
  categoryBreakdown: CategoryBreakdown[];
}
