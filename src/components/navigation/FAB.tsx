import React from 'react';
import { TouchableOpacity, Text as RNText, StyleSheet } from 'react-native';
import { useTheme } from '../../theme';

interface FABProps {
  onPress: () => void;
}

export function FAB({ onPress }: FABProps) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={{
        position: 'absolute',
        bottom: 96,
        right: 28,
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: colors.neutral.textPrimary,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#2c2a28',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.18,
        shadowRadius: 20,
        elevation: 8,
        zIndex: 40,
      }}
    >
      <RNText style={{ color: colors.neutral.textInverse, fontSize: 22, fontWeight: '800', lineHeight: 24 }}>
        +
      </RNText>
    </TouchableOpacity>
  );
}
