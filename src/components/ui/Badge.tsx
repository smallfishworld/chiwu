import React from 'react';
import { View, Text as RNText } from 'react-native';
import { useTheme } from '../../theme';
import { STATUS_LABELS } from '../../constants';

type BadgeStatus = 'active' | 'retired' | 'sold';

interface BadgeProps {
  status: BadgeStatus;
}

export function Badge({ status }: BadgeProps) {
  const { colors, radii, typography } = useTheme();

  const config: Record<string, { bg: string; color: string; dotColor: string }> = {
    active: {
      bg: colors.semantic.successBg,
      color: colors.semantic.success,
      dotColor: colors.semantic.success,
    },
    retired: {
      bg: colors.semantic.warningBg,
      color: colors.semantic.warning,
      dotColor: colors.semantic.warning,
    },
    sold: {
      bg: 'rgba(0,0,0,0.03)',
      color: colors.neutral.textTertiary,
      dotColor: colors.neutral.textTertiary,
    },
  };

  const c = config[status] || config.active;

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        paddingVertical: 3,
        paddingHorizontal: 8,
        borderRadius: radii.full,
        backgroundColor: c.bg,
      }}
    >
      <View
        style={{
          width: 6,
          height: 6,
          borderRadius: 3,
          backgroundColor: c.dotColor,
        }}
      />
      <RNText
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.xs,
          fontWeight: typography.fontWeight.semibold,
          color: c.color,
        }}
      >
        {STATUS_LABELS[status] || status}
      </RNText>
    </View>
  );
}
