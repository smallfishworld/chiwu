import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

interface SelectProps {
  label: string;
  icon?: string;    // emoji
  onPress: () => void;
}

export function Select({ label, icon, onPress }: SelectProps) {
  const { colors, radii, typography } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        padding: 12,
        paddingHorizontal: 16,
        borderRadius: radii.xl,
        backgroundColor: colors.neutral.bgElevated,
        borderWidth: 1.5,
        borderColor: colors.neutral.borderSubtle,
      }}
    >
      {icon && (
        <View style={{ width: 24, height: 24, alignItems: 'center', justifyContent: 'center' }}>
          <SelectText style={{ fontSize: 16 }}>{icon}</SelectText>
        </View>
      )}
      <SelectText
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.medium,
          color: colors.neutral.textPrimary,
          flex: 1,
        }}
      >
        {label}
      </SelectText>
      <SelectText
        style={{
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.sm,
          color: colors.neutral.textTertiary,
        }}
      >
        ▼
      </SelectText>
    </TouchableOpacity>
  );
}

// Small workaround to avoid importing Text component with circular deps
function SelectText({ children, style }: { children: React.ReactNode; style: any }) {
  const { Text: RNText } = require('react-native');
  return <RNText style={style}>{children}</RNText>;
}
