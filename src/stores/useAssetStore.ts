import { create } from 'zustand';
import { assetRepository } from '../db';
import type { AssetWithCategory, AssetCreatePayload, AssetUpdatePayload } from '../types';

interface AssetState {
  assets: AssetWithCategory[];
  selectedAsset: AssetWithCategory | null;
  isLoading: boolean;

  loadAssets: () => Promise<void>;
  loadAssetById: (id: string) => Promise<void>;
  createAsset: (payload: AssetCreatePayload) => Promise<void>;
  updateAsset: (id: string, payload: AssetUpdatePayload) => Promise<void>;
  deleteAsset: (id: string) => Promise<void>;
  markAsSold: (id: string, soldPrice: number, soldDate: string) => Promise<void>;
  markAsRetired: (id: string) => Promise<void>;
}

export const useAssetStore = create<AssetState>((set, get) => ({
  assets: [],
  selectedAsset: null,
  isLoading: false,

  loadAssets: async () => {
    set({ isLoading: true });
    try {
      const assets = await assetRepository.getAll();
      set({ assets, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  loadAssetById: async (id: string) => {
    set({ isLoading: true });
    try {
      const asset = await assetRepository.getById(id);
      set({ selectedAsset: asset, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  createAsset: async (payload: AssetCreatePayload) => {
    await assetRepository.create(payload);
    await get().loadAssets();
  },

  updateAsset: async (id: string, payload: AssetUpdatePayload) => {
    await assetRepository.update(id, payload);
    await get().loadAssets();
    // Refresh selected asset if it's the one being edited
    if (get().selectedAsset?.id === id) {
      const updated = await assetRepository.getById(id);
      set({ selectedAsset: updated });
    }
  },

  deleteAsset: async (id: string) => {
    await assetRepository.remove(id);
    set({ selectedAsset: null });
    await get().loadAssets();
  },

  markAsSold: async (id: string, soldPrice: number, soldDate: string) => {
    await assetRepository.markSold(id, soldPrice, soldDate);
    await get().loadAssets();
    if (get().selectedAsset?.id === id) {
      const updated = await assetRepository.getById(id);
      set({ selectedAsset: updated });
    }
  },

  markAsRetired: async (id: string) => {
    await assetRepository.markRetired(id);
    await get().loadAssets();
    if (get().selectedAsset?.id === id) {
      const updated = await assetRepository.getById(id);
      set({ selectedAsset: updated });
    }
  },
}));
