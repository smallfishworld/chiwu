import React from 'react';
import { Text as RNText, TextStyle, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

type TextPreset = 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'mono' | 'monoBold' | 'monoSmall';

interface TextProps {
  children: React.ReactNode;
  preset?: TextPreset;
  color?: string;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  style?: TextStyle;
}

export function Text({ children, preset = 'body', color, align, numberOfLines, style }: TextProps) {
  const theme = useTheme();
  const { colors, typography } = theme;

  const presetStyles = StyleSheet.create({
    h1: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize['5xl'],
      fontWeight: typography.fontWeight.extrabold,
      letterSpacing: -0.5,
      lineHeight: typography.fontSize['5xl'] * typography.lineHeight.tight,
      color: colors.neutral.textPrimary,
    },
    h2: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize['3xl'],
      fontWeight: typography.fontWeight.bold,
      letterSpacing: -0.3,
      lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
      color: colors.neutral.textPrimary,
    },
    h3: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.fontSize.xl * typography.lineHeight.tight,
      color: colors.neutral.textPrimary,
    },
    body: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
      color: colors.neutral.textSecondary,
    },
    caption: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
      color: colors.neutral.textTertiary,
    },
    mono: {
      fontFamily: typography.fontFamily.mono,
      fontSize: typography.fontSize['4xl'],
      fontWeight: typography.fontWeight.extrabold,
      letterSpacing: -1,
      color: colors.neutral.textPrimary,
    },
    monoBold: {
      fontFamily: typography.fontFamily.mono,
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.bold,
      letterSpacing: -0.5,
      color: colors.neutral.textPrimary,
    },
    monoSmall: {
      fontFamily: typography.fontFamily.mono,
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.semibold,
      color: colors.neutral.textSecondary,
    },
  });

  return (
    <RNText
      style={[
        presetStyles[preset],
        color ? { color } : undefined,
        align ? { textAlign: align } : undefined,
        style,
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </RNText>
  );
}
