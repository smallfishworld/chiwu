import React from 'react';
import { View, TouchableOpacity, Text as RNText } from 'react-native';
import { useTheme } from '../../theme';

interface FilterTab {
  key: string;
  label: string;
}

interface FilterTabsProps {
  tabs: FilterTab[];
  activeKey: string;
  onChange: (key: string) => void;
}

export function FilterTabs({ tabs, activeKey, onChange }: FilterTabsProps) {
  const { colors, typography } = useTheme();

  return (
    <View style={{ flexDirection: 'row', gap: 16, alignItems: 'center' }}>
      {tabs.map((tab) => {
        const isActive = tab.key === activeKey;
        return (
          <TouchableOpacity
            key={tab.key}
            onPress={() => onChange(tab.key)}
            activeOpacity={0.7}
            style={{
              paddingVertical: 4,
              position: 'relative',
            }}
          >
            <RNText
              style={{
                fontFamily: typography.fontFamily.sans,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                color: isActive ? colors.neutral.textPrimary : colors.neutral.textTertiary,
              }}
            >
              {tab.label}
            </RNText>
            {isActive && (
              <View
                style={{
                  position: 'absolute',
                  bottom: -2,
                  left: 0,
                  right: 0,
                  height: 3,
                  backgroundColor: colors.brand[500],
                  borderRadius: 2,
                }}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
