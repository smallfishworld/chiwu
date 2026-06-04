import React from 'react';
import { View, Text as RNText } from 'react-native';
import { useTheme } from '../../theme';
import { formatCurrency } from '../../services/formatters';
import type { AssetStatistics } from '../../types';
import { Card } from '../ui/Card';

interface ValueCardProps {
  stats: AssetStatistics;
}

export function ValueCard({ stats }: ValueCardProps) {
  const { colors, typography, radii } = useTheme();

  const statItems = [
    { label: '资产数量', value: `${stats.activeCount + stats.retiredCount + stats.soldCount}/${stats.totalCount}`, pct: 100 },
    { label: '服役中', value: String(stats.activeCount), pct: stats.totalCount > 0 ? (stats.activeCount / stats.totalCount * 100) : 0 },
    { label: '已退役', value: String(stats.retiredCount), pct: stats.totalCount > 0 ? (stats.retiredCount / stats.totalCount * 100) : 0 },
    { label: '已卖出', value: String(stats.soldCount), pct: stats.totalCount > 0 ? (stats.soldCount / stats.totalCount * 100) : 0 },
  ];

  return (
    <Card style={{
      shadowColor: '#b8956a',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
      elevation: 8,
    }}>
      {/* Label */}
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 8 }}>
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: radii.full,
            backgroundColor: colors.brand[100],
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RNText style={{ fontSize: 12, color: colors.brand[600], fontWeight: '700' }}>¥</RNText>
        </View>
        <RNText
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.base,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral.textSecondary,
          }}
        >
          资产总值
        </RNText>
      </View>

      {/* Amount */}
      <RNText
        style={{
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize['6xl'],
          fontWeight: typography.fontWeight.extrabold,
          color: colors.neutral.textPrimary,
          letterSpacing: -1,
          marginBottom: 16,
        }}
      >
        {formatCurrency(stats.totalCurrentValue)}
      </RNText>

      {/* Stats grid */}
      <View style={{ flexDirection: 'row', gap: 12, marginBottom: 16 }}>
        {statItems.map((item) => (
          <View key={item.label} style={{ flex: 1 }}>
            <RNText
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize.xs,
                fontWeight: typography.fontWeight.semibold,
                color: colors.neutral.textTertiary,
                marginBottom: 3,
              }}
            >
              {item.label}
            </RNText>
            <RNText
              style={{
                fontFamily: typography.fontFamily.mono,
                fontSize: 17,
                fontWeight: typography.fontWeight.bold,
                color: colors.neutral.textPrimary,
              }}
            >
              {item.value}
            </RNText>
            <View
              style={{
                height: 3,
                backgroundColor: colors.neutral.borderSubtle,
                borderRadius: 2,
                marginTop: 4,
                overflow: 'hidden',
              }}
            >
              <View
                style={{
                  height: '100%',
                  borderRadius: 2,
                  backgroundColor: colors.brand[500],
                  width: `${Math.min(item.pct, 100)}%` as any,
                }}
              />
            </View>
          </View>
        ))}
      </View>

      {/* Footer */}
      <View style={{ borderTopWidth: 1, borderTopColor: colors.neutral.borderSubtle, paddingTop: 12 }}>
        <RNText
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.md,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral.textSecondary,
            textAlign: 'center',
          }}
        >
          总日均成本：
          <RNText style={{ color: colors.neutral.textPrimary, fontFamily: typography.fontFamily.mono }}>
            {formatCurrency(stats.totalDailyCost)}
          </RNText>
        </RNText>
      </View>
    </Card>
  );
}
