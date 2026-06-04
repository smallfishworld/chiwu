import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';

interface DividerProps {
  style?: any;
}

export function Divider({ style }: DividerProps) {
  const { colors } = useTheme();

  return (
    <View
      style={[
        {
          height: 1,
          backgroundColor: colors.neutral.borderSubtle,
        },
        style,
      ]}
    />
  );
}
