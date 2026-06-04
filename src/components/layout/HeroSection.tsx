import React from 'react';
import { ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Box } from '../ui/Box';
import { useTheme } from '../../theme';

interface HeroSectionProps {
  children: React.ReactNode;
  style?: ViewStyle;
  /** Extra padding at the top (e.g., for status bar) */
  paddingTop?: number;
}

export function HeroSection({ children, style, paddingTop = 12 }: HeroSectionProps) {
  const { colors, radii } = useTheme();

  return (
    <Box
      radius="2xl"
      style={[{
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
      }, style]}
      overflow="hidden"
    >
      <LinearGradient
        colors={['#c9a97e', '#8b6f4e', '#6b5338']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          paddingTop,
          padding: 12,
          paddingBottom: 20,
          position: 'relative',
        }}
      >
        {/* Decorative circles */}
        <Box
          position="absolute"
          top={-40}
          right={-30}
          width={280}
          height={280}
          radius="full"
          style={{ backgroundColor: 'rgba(255,255,255,0.06)' }}
        />
        <Box
          position="absolute"
          bottom={-20}
          left={-20}
          width={200}
          height={200}
          radius="full"
          style={{ backgroundColor: 'rgba(255,255,255,0.04)' }}
        />
        {children}
      </LinearGradient>
    </Box>
  );
}
