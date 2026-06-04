import { Platform, ViewStyle } from 'react-native';

const shadowColor = '#2c2a28';

interface Shadow {
  ios: Pick<ViewStyle, 'shadowColor' | 'shadowOffset' | 'shadowOpacity' | 'shadowRadius'>;
  android: Pick<ViewStyle, 'elevation'>;
}

export const shadows: Record<string, Shadow> = {
  sm: {
    ios: {
      shadowColor,
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.04,
      shadowRadius: 3,
    },
    android: { elevation: 1 },
  },
  md: {
    ios: {
      shadowColor,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.06,
      shadowRadius: 16,
    },
    android: { elevation: 4 },
  },
  lg: {
    ios: {
      shadowColor,
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.08,
      shadowRadius: 32,
    },
    android: { elevation: 8 },
  },
  float: {
    ios: {
      shadowColor,
      shadowOffset: { width: 0, height: 12 },
      shadowOpacity: 0.12,
      shadowRadius: 40,
    },
    android: { elevation: 12 },
  },
  brand: {
    ios: {
      shadowColor: '#b8956a',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 16,
    },
    android: { elevation: 4 },
  },
};

export function applyShadow(style: ViewStyle, shadow: Shadow): ViewStyle {
  return {
    ...style,
    ...(Platform.OS === 'ios' ? shadow.ios : shadow.android),
  };
}
