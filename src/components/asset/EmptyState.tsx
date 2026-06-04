import React from 'react';
import { View, Text as RNText } from 'react-native';
import { useTheme } from '../../theme';

interface EmptyStateProps {
  message?: string;
}

export function EmptyState({ message = '暂无资产\n点击 + 添加第一个资产' }: EmptyStateProps) {
  const { colors, typography, spacing } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
        paddingHorizontal: 32,
      }}
    >
      <RNText style={{ fontSize: 64, marginBottom: spacing[4] }}>📦</RNText>
      <RNText
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.xl,
          fontWeight: typography.fontWeight.semibold,
          color: colors.neutral.textTertiary,
          textAlign: 'center',
          lineHeight: 24,
        }}
      >
        {message}
      </RNText>
    </View>
  );
}
