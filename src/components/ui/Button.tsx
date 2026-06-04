import React from 'react';
import { TouchableOpacity, Text as RNText, StyleSheet, ViewStyle, ActivityIndicator } from 'react-native';
import { useTheme } from '../../theme';

type ButtonVariant = 'primary' | 'danger' | 'outline' | 'ghost';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  style?: ViewStyle;
}

export function Button({
  children,
  variant = 'primary',
  onPress,
  disabled,
  loading,
  fullWidth = true,
  style,
}: ButtonProps) {
  const theme = useTheme();
  const { colors, radii, typography } = theme;

  const variants = {
    primary: {
      bg: colors.neutral.textPrimary,
      color: colors.neutral.textInverse,
      shadow: {
        shadowColor: '#2c2a28',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 4,
      },
    },
    danger: {
      bg: colors.semantic.dangerBg,
      color: colors.semantic.danger,
      border: 'rgba(194,125,125,0.2)' as string,
    },
    outline: {
      bg: 'transparent',
      color: colors.semantic.danger,
      border: 'rgba(194,125,125,0.3)' as string,
    },
    ghost: {
      bg: 'transparent',
      color: colors.brand[600],
      border: colors.neutral.borderSubtle,
      dashed: true,
    },
  };

  const v = variants[variant];

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
      style={[
        {
          backgroundColor: v.bg,
          paddingVertical: 14,
          paddingHorizontal: 16,
          borderRadius: radii.xl,
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: fullWidth ? 'stretch' : 'auto',
          opacity: disabled ? 0.5 : 1,
          borderWidth: 'border' in v ? 1.5 : 0,
          borderColor: 'border' in v ? (v as any).border : 'transparent',
          borderStyle: 'dashed' in v ? 'dashed' : 'solid',
        },
        'shadow' in v ? (v as any).shadow : undefined,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={v.color} size="small" />
      ) : (
        <RNText
          style={{
            fontFamily: typography.fontFamily.sans,
            fontSize: typography.fontSize.lg,
            fontWeight: typography.fontWeight.bold,
            color: v.color,
          }}
        >
          {children}
        </RNText>
      )}
    </TouchableOpacity>
  );
}
