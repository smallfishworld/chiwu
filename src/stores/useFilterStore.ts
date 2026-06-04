import { create } from 'zustand';

export type StatusFilter = 'all' | 'active' | 'retired' | 'sold';
export type SortOrder = 'dailyCost' | 'purchaseDate' | 'name';

interface FilterState {
  statusFilter: StatusFilter;
  categoryFilter: string | null;   // categoryId or null = all
  sortOrder: SortOrder;

  setStatusFilter: (s: StatusFilter) => void;
  setCategoryFilter: (id: string | null) => void;
  setSortOrder: (s: SortOrder) => void;
  clearFilters: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  statusFilter: 'all',
  categoryFilter: null,
  sortOrder: 'purchaseDate',

  setStatusFilter: (statusFilter) => set({ statusFilter }),
  setCategoryFilter: (categoryFilter) => set({ categoryFilter }),
  setSortOrder: (sortOrder) => set({ sortOrder }),
  clearFilters: () => set({ statusFilter: 'all', categoryFilter: null }),
}));
