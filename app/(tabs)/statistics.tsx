import React from 'react';
import { View, Text as RNText } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { Card } from '../../src/components/ui/Card';
import { StatsBox } from '../../src/components/asset/StatsBox';
import { DonutChart } from '../../src/components/charts/DonutChart';
import { useTheme } from '../../src/theme';
import { useStatistics } from '../../src/hooks/useStatistics';
import { formatCurrency, formatCurrencyCompact, formatPercent } from '../../src/services/formatters';

export default function StatisticsScreen() {
  const insets = useSafeAreaInsets();
  const { colors, typography, radii } = useTheme();
  const { statistics } = useStatistics();
  const { totalCount, activeCount, retiredCount, soldCount } = statistics;

  return (
    <ScreenContainer noScroll paddingTop={insets.top}>
      {/* Header */}
      <View style={{
        paddingHorizontal: 16, paddingVertical: 12,
        borderBottomWidth: 1, borderBottomColor: colors.neutral.borderSubtle,
        backgroundColor: colors.neutral.bgBase,
      }}>
        <RNText style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize['5xl'],
          fontWeight: typography.fontWeight.extrabold,
          color: colors.neutral.textPrimary,
        }}>
          统计
        </RNText>
      </View>

      <View style={{ padding: 16, gap: 12 }}>
        {/* Section title */}
        <RNText style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize['2xl'],
          fontWeight: typography.fontWeight.bold,
          color: colors.neutral.textPrimary,
        }}>
          资产总览
        </RNText>

        {/* Overview stats */}
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
          <View style={{ flex: 1, minWidth: '45%' }}>
            <StatsBox label="总资产现值" value={formatCurrencyCompact(statistics.totalCurrentValue)} color="brand" />
          </View>
          <View style={{ flex: 1, minWidth: '45%' }}>
            <StatsBox label="总购入成本" value={formatCurrencyCompact(statistics.totalPurchaseCost)} />
          </View>
          <View style={{ flex: 1, minWidth: '45%' }}>
            <StatsBox
              label="未实现盈亏"
              value={statistics.unrealizedPnL >= 0 ? `+${formatCurrencyCompact(statistics.unrealizedPnL)}` : `-${formatCurrencyCompact(Math.abs(statistics.unrealizedPnL))}`}
              color={statistics.unrealizedPnL >= 0 ? 'success' : 'danger'}
            />
          </View>
          <View style={{ flex: 1, minWidth: '45%' }}>
            <StatsBox
              label="已实现盈亏"
              value={statistics.realizedPnL >= 0 ? `+${formatCurrencyCompact(statistics.realizedPnL)}` : `-${formatCurrencyCompact(Math.abs(statistics.realizedPnL))}`}
              color={statistics.realizedPnL >= 0 ? 'success' : 'danger'}
            />
          </View>
        </View>

        {/* Additional stats */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <StatsBox label="日均持有成本" value={`${formatCurrency(statistics.totalDailyCost)}/天`} />
          </View>
          <View style={{ flex: 1 }}>
            <StatsBox
              label="平均保值率"
              value={formatPercent(statistics.averageRetentionRate)}
              color="success"
            />
          </View>
        </View>

        {/* Summary counts */}
        <View style={{ flexDirection: 'row', gap: 12 }}>
          {([
            { num: totalCount, label: '总资产', color: colors.neutral.textPrimary },
            { num: activeCount, label: '服役中', color: colors.brand[600] },
            { num: retiredCount, label: '已退役', color: colors.neutral.textTertiary },
          ] as const).map((item) => (
            <View
              key={item.label}
              style={{
                flex: 1,
                backgroundColor: colors.neutral.bgSurface,
                borderRadius: radii.xl,
                padding: 20,
                paddingHorizontal: 12,
                alignItems: 'center',
                borderWidth: 1,
                borderColor: colors.neutral.borderSubtle,
              }}
            >
              <RNText style={{
                fontFamily: typography.fontFamily.mono,
                fontSize: 26,
                fontWeight: typography.fontWeight.extrabold,
                letterSpacing: -1,
                color: item.color,
              }}>
                {item.num}
              </RNText>
              <RNText style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
                color: colors.neutral.textTertiary,
                marginTop: 6,
              }}>
                {item.label}
              </RNText>
            </View>
          ))}
        </View>

        {/* Category donut chart placeholder */}
        <Card>
          <RNText style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral.textPrimary,
            marginBottom: 16,
          }}>
            分类占比（按购入成本） ›
          </RNText>

          {/* Donut chart */}
          <View style={{ alignItems: 'center', marginVertical: 8 }}>
            <DonutChart data={statistics.categoryBreakdown} size={160} strokeWidth={20} />
          </View>

          {/* Category legend */}
          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', marginTop: 8 }}>
            {statistics.categoryBreakdown.slice(0, 5).map((cat, i) => {
              const catColors = [colors.brand[500], colors.semantic.warning, colors.chart.cat3, colors.chart.cat4, colors.chart.cat5];
              return (
                <View key={cat.categoryId} style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
                  <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: catColors[i % catColors.length] }} />
                  <RNText style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.fontSize.xs,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.neutral.textSecondary,
                  }}>
                    {cat.categoryName} {formatPercent(cat.percentage, 0)}
                  </RNText>
                </View>
              );
            })}
          </View>
        </Card>

        {/* Category detail bars */}
        <Card>
          <RNText style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.xl,
            fontWeight: typography.fontWeight.bold,
            color: colors.neutral.textPrimary,
            marginBottom: 16,
          }}>
            分类明细
          </RNText>

          {statistics.categoryBreakdown.map((cat, i) => {
            const catColors = [colors.brand[500], colors.semantic.warning, colors.chart.cat3, colors.chart.cat4, colors.chart.cat5];
            const barColor = catColors[i % catColors.length];

            return (
              <View key={cat.categoryId} style={{ marginBottom: 16 }}>
                {/* Header */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                  <RNText style={{ fontSize: 16 }}>{cat.categoryIcon}</RNText>
                  <RNText style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.fontSize.md,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.neutral.textPrimary,
                    flex: 1,
                  }}>
                    {cat.categoryName}
                  </RNText>
                  <RNText style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.semibold,
                    color: colors.neutral.textTertiary,
                    backgroundColor: colors.neutral.bgElevated,
                    paddingVertical: 2,
                    paddingHorizontal: 8,
                    borderRadius: 4,
                  }}>
                    {cat.assetCount}件
                  </RNText>
                </View>

                {/* Bar */}
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
                  <View style={{ flex: 1, height: 8, backgroundColor: colors.neutral.bgElevated, borderRadius: 4, overflow: 'hidden' }}>
                    <View style={{ height: '100%', width: `${Math.min(cat.percentage, 100)}%`, backgroundColor: barColor, borderRadius: 4 }} />
                  </View>
                  <RNText style={{
                    fontFamily: typography.fontFamily.mono,
                    fontSize: typography.fontSize.base,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.neutral.textSecondary,
                    width: 80,
                    textAlign: 'right',
                  }}>
                    {formatCurrencyCompact(cat.totalPurchaseCost)}
                  </RNText>
                </View>

                {/* Footer */}
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 4, paddingLeft: 24 }}>
                  <RNText style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.fontSize.xs,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.neutral.textTertiary,
                  }}>
                    占比 {formatPercent(cat.percentage)}
                  </RNText>
                  <RNText style={{
                    fontFamily: typography.fontFamily.sans,
                    fontSize: typography.fontSize.xs,
                    fontWeight: typography.fontWeight.medium,
                    color: colors.neutral.textTertiary,
                  }}>
                    保值率 {formatPercent(cat.averageRetentionRate)}
                  </RNText>
                </View>
              </View>
            );
          })}
        </Card>

        <View style={{ height: 100 }} />
      </View>
    </ScreenContainer>
  );
}
