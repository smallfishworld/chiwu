import React from 'react';
import { ViewStyle } from 'react-native';
import { Box } from './Box';
import { useTheme } from '../../theme';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
}

export function Card({ children, style }: CardProps) {
  const { colors, radii } = useTheme();

  return (
    <Box
      bg={colors.neutral.bgSurface}
      radius="xl"
      p={5}
      border={colors.neutral.borderSubtle}
      borderWidth={1}
      shadow="sm"
      style={style}
    >
      {children}
    </Box>
  );
}
