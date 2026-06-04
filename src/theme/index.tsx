import React, { createContext, useContext } from 'react';
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { shadows, applyShadow } from './shadows';
import { radii } from './radii';

export const theme = {
  colors,
  spacing,
  typography,
  shadows,
  radii,
  applyShadow,
} as const;

export type Theme = typeof theme;

const ThemeContext = createContext<Theme>(theme);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): Theme {
  return useContext(ThemeContext);
}

export { colors } from './colors';
export { spacing } from './spacing';
export { typography } from './typography';
export { shadows, applyShadow } from './shadows';
export { radii } from './radii';
