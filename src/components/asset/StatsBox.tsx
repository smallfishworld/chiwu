import React from 'react';
import { View, Text as RNText } from 'react-native';
import { useTheme } from '../../theme';

interface StatsBoxProps {
  label: string;
  value: string;
  color?: 'default' | 'success' | 'danger' | 'warning' | 'brand';
}

export function StatsBox({ label, value, color = 'default' }: StatsBoxProps) {
  const { colors, radii, typography } = useTheme();

  const colorMap = {
    default: colors.neutral.textPrimary,
    success: colors.semantic.success,
    danger: colors.semantic.danger,
    warning: colors.semantic.warning,
    brand: colors.brand[600],
  };

  return (
    <View
      style={{
        backgroundColor: colors.neutral.bgSurface,
        borderRadius: radii.xl,
        padding: 16,
        borderWidth: 1,
        borderColor: colors.neutral.borderSubtle,
      }}
    >
      <RNText
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.sm,
          fontWeight: typography.fontWeight.semibold,
          color: colors.neutral.textTertiary,
          marginBottom: 8,
        }}
      >
        {label}
      </RNText>
      <RNText
        style={{
          fontFamily: typography.fontFamily.mono,
          fontSize: typography.fontSize['3xl'],
          fontWeight: typography.fontWeight.extrabold,
          color: colorMap[color],
          letterSpacing: -0.5,
        }}
        numberOfLines={1}
      >
        {value}
      </RNText>
    </View>
  );
}
