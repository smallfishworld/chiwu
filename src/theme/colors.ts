/**
 * 持物 — 暖灰陶土系配色
 * 直接映射 ui-mockups.html 中的 CSS 自定义属性
 */
export const colors = {
  brand: {
    50: '#faf6f0',
    100: '#f3ebe0',
    400: '#c9a97e',
    500: '#b8956a',
    600: '#a07d52',
  },
  semantic: {
    success: '#7a9e7a',
    successBg: 'rgba(122,158,122,0.10)',
    danger: '#c27d7d',
    dangerBg: 'rgba(194,125,125,0.10)',
    warning: '#c9a05c',
    warningBg: 'rgba(201,160,92,0.10)',
  },
  neutral: {
    bgBase: '#f7f5f2',
    bgSurface: '#ffffff',
    bgElevated: '#faf8f5',
    bgHover: 'rgba(0,0,0,0.02)',
    textPrimary: '#2c2a28',
    textSecondary: '#8a8580',
    textTertiary: '#b5afa8',
    textDisabled: '#d8d4cf',
    textInverse: '#ffffff',
    borderSubtle: 'rgba(44,42,40,0.06)',
    borderActive: 'rgba(184,149,106,0.35)',
  },
  chart: {
    cat3: '#8a9e9e',
    cat4: '#9e8a9e',
    cat5: '#8a9e8a',
  },
} as const;

export type ColorBrand = keyof typeof colors.brand;
export type ColorNeutral = keyof typeof colors.neutral;
export type ColorSemantic = keyof typeof colors.semantic;
