import { create } from 'zustand';
import { categoryRepository } from '../db';
import type { Category } from '../types';

interface SettingsState {
  categories: Category[];
  isLoading: boolean;

  loadCategories: () => Promise<void>;
  addCategory: (id: string, name: string, icon: string) => Promise<void>;
  removeCategory: (id: string) => Promise<void>;
  updateCategory: (id: string, data: { name?: string; icon?: string }) => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set, get) => ({
  categories: [],
  isLoading: false,

  loadCategories: async () => {
    set({ isLoading: true });
    try {
      const categories = await categoryRepository.getAll();
      set({ categories, isLoading: false });
    } catch {
      set({ isLoading: false });
    }
  },

  addCategory: async (id: string, name: string, icon: string) => {
    await categoryRepository.create(id, name, icon);
    await get().loadCategories();
  },

  removeCategory: async (id: string) => {
    await categoryRepository.remove(id);
    await get().loadCategories();
  },

  updateCategory: async (id: string, data) => {
    await categoryRepository.update(id, data);
    await get().loadCategories();
  },
}));
