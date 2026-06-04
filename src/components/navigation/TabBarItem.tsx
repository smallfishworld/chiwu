import React from 'react';
import { TouchableOpacity, Text as RNText, View } from 'react-native';
import { useTheme } from '../../theme';

interface TabBarItemProps {
  icon: string;
  label: string;
  active: boolean;
  onPress: () => void;
}

export function TabBarItem({ icon, label, active, onPress }: TabBarItemProps) {
  const { colors, radii, typography } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: radii.full,
        backgroundColor: active ? colors.neutral.bgSurface : 'transparent',
        shadowColor: active ? '#2c2a28' : undefined,
        shadowOffset: active ? { width: 0, height: 1 } : undefined,
        shadowOpacity: active ? 0.08 : undefined,
        shadowRadius: active ? 4 : undefined,
        elevation: active ? 2 : 0,
      }}
    >
      <RNText style={{ fontSize: 20, lineHeight: 24 }}>{icon}</RNText>
      <RNText
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: 10,
          fontWeight: typography.fontWeight.semibold,
          color: active ? colors.neutral.textPrimary : colors.neutral.textTertiary,
        }}
      >
        {label}
      </RNText>
    </TouchableOpacity>
  );
}
