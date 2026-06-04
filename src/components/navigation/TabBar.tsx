import React from 'react';
import { View, Platform } from 'react-native';
import { BlurView } from 'expo-blur';
import { TabBarItem } from './TabBarItem';
import { useTheme } from '../../theme';

interface Tab {
  key: string;
  icon: string;
  label: string;
}

const TABS: Tab[] = [
  { key: 'index', icon: '🏠', label: '首页' },
  { key: 'statistics', icon: '📊', label: '统计' },
  { key: 'settings', icon: '⚙️', label: '设置' },
];

interface TabBarProps {
  activeTab: string;
  onTabPress: (key: string) => void;
}

export function TabBar({ activeTab, onTabPress }: TabBarProps) {
  const { colors } = useTheme();

  const content = (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
        paddingVertical: 4,
        gap: 4,
        borderRadius: 32,
        backgroundColor: Platform.OS === 'ios' ? 'transparent' : 'rgba(255,255,255,0.85)',
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.4)',
      }}
    >
      {TABS.map((tab) => (
        <TabBarItem
          key={tab.key}
          icon={tab.icon}
          label={tab.label}
          active={activeTab === tab.key}
          onPress={() => onTabPress(tab.key)}
        />
      ))}
    </View>
  );

  return (
    <View
      style={{
        position: 'absolute',
        bottom: 20,
        left: '50%',
        transform: [{ translateX: -160 }],
        width: 320,
        height: 64,
        borderRadius: 32,
        overflow: 'hidden',
        shadowColor: '#2c2a28',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.1,
        shadowRadius: 32,
        elevation: 10,
      }}
    >
      {Platform.OS === 'ios' ? (
        <BlurView
          tint="light"
          intensity={24}
          style={{
            flex: 1,
            borderRadius: 32,
            overflow: 'hidden',
          }}
        >
          {content}
        </BlurView>
      ) : (
        content
      )}
    </View>
  );
}
