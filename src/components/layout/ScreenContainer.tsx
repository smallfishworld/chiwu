import React from 'react';
import { ScrollView, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useTheme } from '../../theme';

interface ScreenContainerProps {
  children: React.ReactNode;
  noScroll?: boolean;
  style?: ViewStyle;
  paddingTop?: number;
}

export function ScreenContainer({ children, noScroll, style, paddingTop }: ScreenContainerProps) {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  const containerStyle: ViewStyle = {
    flex: 1,
    backgroundColor: colors.neutral.bgBase,
    paddingBottom: 100, // space for floating tab bar + FAB
  };

  if (noScroll) {
    const { View } = require('react-native');
    return <View style={[containerStyle, { paddingTop: paddingTop ?? insets.top }, style]}>{children}</View>;
  }

  return (
    <ScrollView
      style={containerStyle}
      contentContainerStyle={[{ paddingTop: paddingTop ?? 0 }, style]}
      showsVerticalScrollIndicator={false}
      bounces={true}
    >
      {children}
    </ScrollView>
  );
}
