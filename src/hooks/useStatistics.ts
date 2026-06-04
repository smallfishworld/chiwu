import { useMemo } from 'react';
import { useAssetStore } from '../stores/useAssetStore';
import { computeStatistics, computeCategoryBreakdown } from '../services/calculations';
import { useRefreshOnFocus } from './useRefreshOnFocus';

export function useStatistics() {
  const assets = useAssetStore((s) => s.assets);
  const isLoading = useAssetStore((s) => s.isLoading);
  const loadAssets = useAssetStore((s) => s.loadAssets);

  useRefreshOnFocus(loadAssets);

  const statistics = useMemo(() => {
    const breakdowns = computeCategoryBreakdown(assets);
    return computeStatistics(assets, breakdowns);
  }, [assets]);

  return { statistics, isLoading, loadAssets };
}
