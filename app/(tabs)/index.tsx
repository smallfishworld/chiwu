import React from 'react';
import { View, Text as RNText } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenContainer } from '../../src/components/layout/ScreenContainer';
import { HeroSection } from '../../src/components/layout/HeroSection';
import { FilterTabs } from '../../src/components/layout/FilterTabs';
import { FilterChips } from '../../src/components/layout/FilterChips';
import { ValueCard } from '../../src/components/asset/ValueCard';
import { AssetGrid } from '../../src/components/asset/AssetGrid';
import { useTheme } from '../../src/theme';
import { useAssets } from '../../src/hooks/useAssets';
import { useStatistics } from '../../src/hooks/useStatistics';
import { useFilterStore, StatusFilter } from '../../src/stores/useFilterStore';
import type { AssetWithCategory } from '../../src/types';

const STATUS_TABS = [
  { key: 'all', label: '全部' },
  { key: 'active', label: '服役中' },
  { key: 'retired', label: '已退役' },
  { key: 'sold', label: '已卖出' },
];

export default function HomeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors, typography } = useTheme();
  const { assets, isLoading, loadAssets, availableCategories } = useAssets();
  const { statistics } = useStatistics();
  const statusFilter = useFilterStore((s) => s.statusFilter);
  const categoryFilter = useFilterStore((s) => s.categoryFilter);
  const setStatusFilter = useFilterStore((s) => s.setStatusFilter);
  const setCategoryFilter = useFilterStore((s) => s.setCategoryFilter);

  const handleAssetPress = (asset: AssetWithCategory) => {
    router.push(`/asset/${asset.id}`);
  };

  const categoryChips = [
    { key: null, label: '全部' },
    ...availableCategories.map((c) => ({ key: c.id, label: c.name })),
  ];

  return (
    <ScreenContainer noScroll paddingTop={0}>
      {/* Hero Section */}
      <HeroSection paddingTop={insets.top + 4}>
        {/* Header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <RNText
            style={{
              fontFamily: typography.fontFamily.sans,
              fontSize: typography.fontSize['5xl'],
              fontWeight: typography.fontWeight.extrabold,
              color: colors.neutral.textInverse,
              letterSpacing: -0.5,
            }}
          >
            持物
          </RNText>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: 'rgba(255,255,255,0.15)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RNText style={{ fontSize: 16, color: colors.neutral.textInverse }}>🔍</RNText>
            </View>
            <View
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: 'rgba(255,255,255,0.15)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <RNText style={{ fontSize: 16, color: colors.neutral.textInverse }}>▼</RNText>
            </View>
          </View>
        </View>

        {/* Value Card */}
        <ValueCard stats={statistics} />
      </HeroSection>

      {/* Content */}
      <View style={{ flex: 1 }}>
        {/* Filters */}
        <View style={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <FilterTabs
              tabs={STATUS_TABS}
              activeKey={statusFilter}
              onChange={(key) => setStatusFilter(key as StatusFilter)}
            />
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <RNText style={{ fontSize: 18, color: colors.neutral.textSecondary }}>☰</RNText>
              <RNText style={{ fontSize: 18, color: colors.neutral.textSecondary }}>⋯</RNText>
            </View>
          </View>
          <FilterChips
            chips={categoryChips}
            activeKey={categoryFilter}
            onChange={setCategoryFilter}
          />
        </View>

        {/* Asset Grid */}
        <AssetGrid
          assets={assets}
          onAssetPress={handleAssetPress}
          refreshing={isLoading}
          onRefresh={loadAssets}
        />
      </View>
    </ScreenContainer>
  );
}
