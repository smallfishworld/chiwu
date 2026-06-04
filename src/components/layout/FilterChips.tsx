import React from 'react';
import { View } from 'react-native';
import { Chip } from '../ui/Chip';

interface ChipData {
  key: string | null;
  label: string;
}

interface FilterChipsProps {
  chips: ChipData[];
  activeKey: string | null;
  onChange: (key: string | null) => void;
}

export function FilterChips({ chips, activeKey, onChange }: FilterChipsProps) {
  return (
    <View style={{ flexDirection: 'row', gap: 8, flexWrap: 'wrap' }}>
      {chips.map((chip) => (
        <Chip
          key={chip.key ?? 'all'}
          label={chip.label}
          active={chip.key === activeKey}
          onPress={() => onChange(chip.key)}
        />
      ))}
    </View>
  );
}
