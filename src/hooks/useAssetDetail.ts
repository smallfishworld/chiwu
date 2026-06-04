import { useMemo } from 'react';
import { useAssetStore } from '../stores/useAssetStore';
import { valuationRepository } from '../db';
import { computeAssetDerived } from '../services/calculations';
import { useRefreshOnFocus } from './useRefreshOnFocus';
import { useState, useEffect } from 'react';
import type { ValuationRecord } from '../types';

export function useAssetDetail(id: string) {
  const selectedAsset = useAssetStore((s) => s.selectedAsset);
  const loadAssetById = useAssetStore((s) => s.loadAssetById);
  const [valuations, setValuations] = useState<ValuationRecord[]>([]);

  const load = async () => {
    await loadAssetById(id);
    const vals = await valuationRepository.getByAssetId(id);
    setValuations(vals);
  };

  useRefreshOnFocus(load);

  const derived = useMemo(() => {
    if (!selectedAsset) return null;
    return computeAssetDerived(selectedAsset);
  }, [selectedAsset]);

  return {
    asset: selectedAsset,
    valuations,
    derived,
    reload: load,
  };
}
