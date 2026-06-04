import { useMemo } from 'react';
import { useAssetStore } from '../stores/useAssetStore';
import { useFilterStore } from '../stores/useFilterStore';
import { useSettingsStore } from '../stores/useSettingsStore';
import { useRefreshOnFocus } from './useRefreshOnFocus';

export function useAssets() {
  const assets = useAssetStore((s) => s.assets);
  const isLoading = useAssetStore((s) => s.isLoading);
  const loadAssets = useAssetStore((s) => s.loadAssets);
  const statusFilter = useFilterStore((s) => s.statusFilter);
  const categoryFilter = useFilterStore((s) => s.categoryFilter);
  const sortOrder = useFilterStore((s) => s.sortOrder);
  const categories = useSettingsStore((s) => s.categories);

  useRefreshOnFocus(loadAssets);

  const filtered = useMemo(() => {
    let result = [...assets];

    // Apply status filter
    if (statusFilter !== 'all') {
      result = result.filter((a) => a.status === statusFilter);
    }

    // Apply category filter
    if (categoryFilter) {
      result = result.filter((a) => a.categoryId === categoryFilter);
    }

    // Apply sort
    result.sort((a, b) => {
      switch (sortOrder) {
        case 'name':
          return a.name.localeCompare(b.name, 'zh-CN');
        case 'dailyCost': {
          const aDays = Math.max(1, Math.floor((Date.now() - new Date(a.purchaseDate).getTime()) / 86400000));
          const bDays = Math.max(1, Math.floor((Date.now() - new Date(b.purchaseDate).getTime()) / 86400000));
          return (b.purchasePrice / bDays) - (a.purchasePrice / aDays);
        }
        case 'purchaseDate':
        default:
          return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
      }
    });

    return result;
  }, [assets, statusFilter, categoryFilter, sortOrder]);

  // Collect unique categories from asset list for filter chips
  const availableCategories = useMemo(() => {
    const ids = new Set(assets.map((a) => a.categoryId));
    return categories.filter((c) => ids.has(c.id));
  }, [assets, categories]);

  return {
    assets: filtered,
    allAssets: assets,
    isLoading,
    loadAssets,
    availableCategories,
  };
}
