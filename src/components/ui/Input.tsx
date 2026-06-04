import React from 'react';
import { TextInput, StyleSheet, ViewStyle } from 'react-native';
import { useTheme } from '../../theme';

interface InputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric' | 'decimal-pad';
  multiline?: boolean;
  numberOfLines?: number;
  style?: ViewStyle;
  editable?: boolean;
}

export function Input({
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  multiline,
  numberOfLines,
  style,
  editable = true,
}: InputProps) {
  const { colors, radii, typography } = useTheme();

  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={colors.neutral.textDisabled}
      keyboardType={keyboardType}
      multiline={multiline}
      numberOfLines={numberOfLines}
      editable={editable}
      style={[
        {
          width: '100%',
          padding: 12,
          paddingHorizontal: 16,
          borderRadius: radii.xl,
          backgroundColor: colors.neutral.bgElevated,
          borderWidth: 1.5,
          borderColor: colors.neutral.borderSubtle,
          color: colors.neutral.textPrimary,
          fontSize: typography.fontSize.lg,
          fontWeight: typography.fontWeight.medium,
          fontFamily: typography.fontFamily.sans,
          minHeight: multiline ? 100 : undefined,
          textAlignVertical: multiline ? 'top' : 'center',
        },
        style,
      ]}
    />
  );
}
