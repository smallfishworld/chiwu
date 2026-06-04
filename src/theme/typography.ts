import { Platform } from 'react-native';

const fontSans = Platform.select({
  ios: 'Inter',
  android: 'Inter',
  default: 'Inter',
});

const fontMono = Platform.select({
  ios: 'SF Mono',
  android: 'JetBrains Mono',
  default: 'monospace',
});

export const typography = {
  fontFamily: {
    sans: fontSans,
    mono: fontMono,
  },
  fontSize: {
    xs: 11,
    sm: 12,
    base: 13,
    md: 14,
    lg: 15,
    xl: 16,
    '2xl': 18,
    '3xl': 20,
    '4xl': 24,
    '5xl': 28,
    '6xl': 32,
  },
  fontWeight: {
    regular: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },
  lineHeight: {
    tight: 1.3,
    normal: 1.5,
    relaxed: 1.6,
  },
} as const;
