import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../theme';
import type { SpacingKey as SpacingKeyType } from '../../theme/spacing';

interface SpacerProps {
  size?: SpacingKeyType;
}

export function Spacer({ size = 4 }: SpacerProps) {
  const { spacing } = useTheme();
  return <View style={{ height: spacing[size] }} />;
}
