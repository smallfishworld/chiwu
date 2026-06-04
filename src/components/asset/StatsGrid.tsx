import React from 'react';
import { View } from 'react-native';
import { StatsBox } from './StatsBox';

interface StatsItem {
  label: string;
  value: string;
  color?: 'default' | 'success' | 'danger' | 'warning' | 'brand';
}

interface StatsGridProps {
  items: StatsItem[];
}

export function StatsGrid({ items }: StatsGridProps) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12 }}>
      {items.map((item) => (
        <View key={item.label} style={{ flex: 1, minWidth: '45%' }}>
          <StatsBox label={item.label} value={item.value} color={item.color} />
        </View>
      ))}
    </View>
  );
}
