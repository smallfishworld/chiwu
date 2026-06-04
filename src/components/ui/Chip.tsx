import React from 'react';
import { TouchableOpacity, Text as RNText } from 'react-native';
import { useTheme } from '../../theme';

interface ChipProps {
  label: string;
  active?: boolean;
  onPress?: () => void;
}

export function Chip({ label, active = false, onPress }: ChipProps) {
  const { colors, radii, typography } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: radii.full,
        backgroundColor: active ? colors.neutral.textPrimary : colors.neutral.bgElevated,
        borderWidth: 1,
        borderColor: active ? colors.neutral.textPrimary : 'transparent',
      }}
    >
      <RNText
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.semibold,
          color: active ? colors.neutral.textInverse : colors.neutral.textSecondary,
        }}
      >
        {label}
      </RNText>
    </TouchableOpacity>
  );
}
