import React from 'react';
import { FlatList, View } from 'react-native';
import { AssetCard } from './AssetCard';
import { EmptyState } from './EmptyState';
import type { AssetWithCategory } from '../../types';

interface AssetGridProps {
  assets: AssetWithCategory[];
  onAssetPress: (asset: AssetWithCategory) => void;
  refreshing?: boolean;
  onRefresh?: () => void;
}

export function AssetGrid({ assets, onAssetPress, refreshing, onRefresh }: AssetGridProps) {
  if (assets.length === 0) {
    return <EmptyState />;
  }

  return (
    <FlatList
      data={assets}
      keyExtractor={(item) => item.id}
      numColumns={2}
      renderItem={({ item }) => (
        <View style={{ flex: 1, padding: 4 }}>
          <AssetCard asset={item} onPress={() => onAssetPress(item)} />
        </View>
      )}
      columnWrapperStyle={{ paddingHorizontal: 12 }}
      contentContainerStyle={{ paddingBottom: 16 }}
      scrollEnabled={false}
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
}
