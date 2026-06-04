import { getDatabase } from './database';
import type { ValuationRecord } from '../types';

export const valuationRepository = {
  async getByAssetId(assetId: string): Promise<ValuationRecord[]> {
    const db = getDatabase();
    return db.getAllAsync<ValuationRecord>(
      `SELECT id, asset_id as assetId, value, recorded_date as recordedDate, note, created_at as createdAt
       FROM valuations
       WHERE asset_id = ?
       ORDER BY recorded_date ASC`,
      assetId
    );
  },

  async getLatest(assetId: string): Promise<ValuationRecord | null> {
    const db = getDatabase();
    return db.getFirstAsync<ValuationRecord>(
      `SELECT id, asset_id as assetId, value, recorded_date as recordedDate, note, created_at as createdAt
       FROM valuations
       WHERE asset_id = ?
       ORDER BY recorded_date DESC
       LIMIT 1`,
      assetId
    );
  },

  async create(assetId: string, value: number, recordedDate: string, note?: string): Promise<void> {
    const db = getDatabase();
    const id = Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
    await db.runAsync(
      `INSERT INTO valuations (id, asset_id, value, recorded_date, note) VALUES (?, ?, ?, ?, ?)`,
      id, assetId, value, recordedDate, note || ''
    );
    // Update the current valuation on the asset
    await db.runAsync(
      `UPDATE assets SET current_valuation = ?, updated_at = datetime('now', 'localtime') WHERE id = ?`,
      value, assetId
    );
  },

  async removeByAssetId(assetId: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync('DELETE FROM valuations WHERE asset_id = ?', assetId);
  },
};
