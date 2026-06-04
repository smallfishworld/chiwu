export type AssetStatus = 'active' | 'retired' | 'sold';

export interface Asset {
  id: string;
  name: string;
  categoryId: string;
  purchasePrice: number;
  purchaseDate: string;          // ISO 8601: '2026-05-31'
  currentValuation: number | null;
  soldPrice: number | null;
  soldDate: string | null;
  status: AssetStatus;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

/** Asset joined with its category for display */
export interface AssetWithCategory extends Asset {
  categoryName: string;
  categoryIcon: string;
}

/** Form data for creating/editing an asset */
export interface AssetFormData {
  name: string;
  categoryId: string;
  purchasePrice: string;         // raw text input
  purchaseDate: string;
  currentValuation: string;      // raw text input
  notes: string;
}

/** Values passed to the database (parsed) */
export interface AssetCreatePayload {
  name: string;
  categoryId: string;
  purchasePrice: number;
  purchaseDate: string;
  currentValuation: number | null;
  notes: string;
}

export interface AssetUpdatePayload extends Partial<AssetCreatePayload> {
  status?: AssetStatus;
  soldPrice?: number | null;
  soldDate?: string | null;
}
