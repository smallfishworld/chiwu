import React from 'react';
import { View, Text as RNText } from 'react-native';
import { useTheme } from '../../theme';
import { formatCurrency, formatDate, formatPnL, formatPercent } from '../../services/formatters';

interface PriceComparisonProps {
  purchasePrice: number;
  purchaseDate: string;
  currentValuation: number;
}

export function PriceComparison({ purchasePrice, purchaseDate, currentValuation }: PriceComparisonProps) {
  const { colors, radii, typography } = useTheme();
  const pnl = currentValuation - purchasePrice;
  const retention = purchasePrice > 0 ? (currentValuation / purchasePrice) * 100 : 100;
  const isPositive = pnl >= 0;

  return (
    <View
      style={{
        backgroundColor: colors.neutral.bgSurface,
        borderRadius: radii.xl,
        padding: 20,
        borderWidth: 1,
        borderColor: colors.neutral.borderSubtle,
        shadowColor: '#2c2a28',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.04,
        shadowRadius: 3,
        elevation: 1,
      }}
    >
      {/* Price row: purchase → current */}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <View style={{ flex: 1 }}>
          <RNText
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral.textTertiary,
              marginBottom: 4,
            }}
          >
            购入价格
          </RNText>
          <RNText
            style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.extrabold,
              color: colors.neutral.textPrimary,
              letterSpacing: -0.5,
            }}
          >
            {formatCurrency(purchasePrice)}
          </RNText>
          <RNText
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.medium,
              color: colors.neutral.textTertiary,
              marginTop: 2,
            }}
          >
            {formatDate(purchaseDate)}
          </RNText>
        </View>
        <RNText style={{ fontSize: 22, color: colors.brand[500], fontWeight: '700', paddingHorizontal: 12 }}>
          →
        </RNText>
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <RNText
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.semibold,
              color: colors.neutral.textTertiary,
              marginBottom: 4,
            }}
          >
            当前估值
          </RNText>
          <RNText
            style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize['4xl'],
              fontWeight: typography.fontWeight.extrabold,
              color: colors.neutral.textPrimary,
              letterSpacing: -0.5,
            }}
          >
            {formatCurrency(currentValuation)}
          </RNText>
        </View>
      </View>

      {/* Divider */}
      <View style={{ height: 1, backgroundColor: colors.neutral.borderSubtle, marginVertical: 12 }} />

      {/* Summary */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View
          style={{
            paddingVertical: 6,
            paddingHorizontal: 12,
            borderRadius: 8,
            backgroundColor: isPositive ? colors.semantic.successBg : colors.semantic.dangerBg,
          }}
        >
          <RNText
            style={{
              fontFamily: typography.fontFamily.mono,
              fontSize: typography.fontSize.xl,
              fontWeight: typography.fontWeight.bold,
              color: isPositive ? colors.semantic.success : colors.semantic.danger,
            }}
          >
            {formatPnL(pnl)}
          </RNText>
        </View>
        <RNText
          style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.bold,
            color: colors.semantic.success,
          }}
        >
          保值率 {formatPercent(retention)}
        </RNText>
      </View>
    </View>
  );
}
