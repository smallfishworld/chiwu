import { assetRepository } from './assetRepository';
import { valuationRepository } from './valuationRepository';
import type { AssetCreatePayload } from '../types';

/**
 * Seeds demo assets matching the UI mockups.
 * Only runs if no assets exist in the database.
 */
export async function seedDemoDataIfEmpty(): Promise<void> {
  const existing = await assetRepository.getAll();
  if (existing.length > 0) return;

  const demoAssets: AssetCreatePayload[] = [
    {
      name: 'iPhone 17 Pro Max',
      categoryId: 'cat-electronics',
      purchasePrice: 9999.00,
      purchaseDate: '2026-05-31',
      currentValuation: 9999.00,
      notes: '256GB, 原钛色',
    },
    {
      name: 'iPad mini 6',
      categoryId: 'cat-electronics',
      purchasePrice: 4834.00,
      purchaseDate: '2025-04-17',
      currentValuation: 4834.00,
      notes: '64GB, 星光色',
    },
    {
      name: 'AirPods 4',
      categoryId: 'cat-accessories',
      purchasePrice: 650.00,
      purchaseDate: '2026-01-03',
      currentValuation: 650.00,
      notes: '',
    },
    {
      name: 'MacBook Pro 13',
      categoryId: 'cat-electronics',
      purchasePrice: 8650.00,
      purchaseDate: '2022-03-15',
      currentValuation: 8650.00,
      notes: 'M1, 8GB, 256GB',
    },
    {
      name: 'iPhone 13 Pro Max',
      categoryId: 'cat-electronics',
      purchasePrice: 9799.00,
      purchaseDate: '2022-06-01',
      currentValuation: 9799.00,
      notes: '256GB, 远峰蓝',
    },
  ];

  for (const asset of demoAssets) {
    const created = await assetRepository.create(asset);
    // Add a valuation record at purchase
    await valuationRepository.create(created.id, asset.purchasePrice, asset.purchaseDate);
    // Add a current valuation record
    await valuationRepository.create(created.id, asset.currentValuation!, new Date().toISOString().substring(0, 10));
  }
}
