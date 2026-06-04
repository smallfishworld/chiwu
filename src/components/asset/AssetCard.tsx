import React from 'react';
import { TouchableOpacity, View, Text as RNText } from 'react-native';
import { useTheme } from '../../theme';
import { Badge } from '../ui/Badge';
import { computeAssetDerived } from '../../services/calculations';
import { formatCurrency } from '../../services/formatters';
import { formatDuration } from '../../services/formatters';
import type { AssetWithCategory } from '../../types';

interface AssetCardProps {
  asset: AssetWithCategory;
  onPress: () => void;
}

export function AssetCard({ asset, onPress }: AssetCardProps) {
  const { colors, radii, typography } = useTheme();
  const derived = computeAssetDerived(asset);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={{
        flex: 1,
        backgroundColor: colors.neutral.bgSurface,
        borderRadius: radii.xl,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.neutral.borderSubtle,
        minWidth: '45%',
      }}
    >
      {/* Header: Icon + Badge */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <View
          style={{
            width: 52,
            height: 52,
            borderRadius: radii.md,
            backgroundColor: colors.neutral.bgElevated,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <RNText style={{ fontSize: 26 }}>{asset.categoryIcon}</RNText>
        </View>
        <Badge status={asset.status as 'active' | 'retired' | 'sold'} />
      </View>

      {/* Name */}
      <RNText
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.md,
          fontWeight: typography.fontWeight.bold,
          color: colors.neutral.textPrimary,
          marginBottom: 2,
          lineHeight: 18,
        }}
        numberOfLines={1}
      >
        {asset.name}
      </RNText>

      {/* Meta: price + duration */}
      <RNText
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.medium,
          color: colors.neutral.textTertiary,
          marginBottom: 12,
        }}
      >
        {formatCurrency(asset.purchasePrice)} | 已使用{formatDuration(derived.daysUsed)}
      </RNText>

      {/* Daily Cost */}
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 2 }}>
        <RNText
          style={{
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize['2xl'],
            fontWeight: typography.fontWeight.extrabold,
            color: colors.neutral.textPrimary,
            letterSpacing: -0.5,
          }}
        >
          {formatCurrency(derived.dailyCost)}
        </RNText>
        <RNText
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
            color: colors.neutral.textSecondary,
          }}
        >
          /天
        </RNText>
      </View>
    </TouchableOpacity>
  );
}
