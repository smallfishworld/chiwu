import { getDatabase } from './database';
import type { Asset, AssetWithCategory, AssetCreatePayload, AssetUpdatePayload } from '../types';

function mapAsset(row: any): Asset {
  return {
    id: row.id,
    name: row.name,
    categoryId: row.category_id,
    purchasePrice: row.purchase_price,
    purchaseDate: row.purchase_date,
    currentValuation: row.current_valuation,
    soldPrice: row.sold_price,
    soldDate: row.sold_date,
    status: row.status,
    notes: row.notes,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

function mapAssetWithCategory(row: any): AssetWithCategory {
  return {
    ...mapAsset(row),
    categoryName: row.category_name,
    categoryIcon: row.category_icon,
  };
}

export const assetRepository = {
  async getAll(): Promise<AssetWithCategory[]> {
    const db = getDatabase();
    const rows = await db.getAllAsync<any>(
      `SELECT a.*, c.name as category_name, c.icon as category_icon
       FROM assets a
       LEFT JOIN categories c ON a.category_id = c.id
       ORDER BY a.created_at DESC`
    );
    return rows.map(mapAssetWithCategory);
  },

  async getById(id: string): Promise<AssetWithCategory | null> {
    const db = getDatabase();
    const row = await db.getFirstAsync<any>(
      `SELECT a.*, c.name as category_name, c.icon as category_icon
       FROM assets a
       LEFT JOIN categories c ON a.category_id = c.id
       WHERE a.id = ?`,
      id
    );
    return row ? mapAssetWithCategory(row) : null;
  },

  async getByStatus(status: string): Promise<AssetWithCategory[]> {
    const db = getDatabase();
    const rows = await db.getAllAsync<any>(
      `SELECT a.*, c.name as category_name, c.icon as category_icon
       FROM assets a
       LEFT JOIN categories c ON a.category_id = c.id
       WHERE a.status = ?
       ORDER BY a.created_at DESC`,
      status
    );
    return rows.map(mapAssetWithCategory);
  },

  async getByCategory(categoryId: string): Promise<AssetWithCategory[]> {
    const db = getDatabase();
    const rows = await db.getAllAsync<any>(
      `SELECT a.*, c.name as category_name, c.icon as category_icon
       FROM assets a
       LEFT JOIN categories c ON a.category_id = c.id
       WHERE a.category_id = ?
       ORDER BY a.created_at DESC`,
      categoryId
    );
    return rows.map(mapAssetWithCategory);
  },

  async create(payload: AssetCreatePayload): Promise<Asset> {
    const db = getDatabase();
    const id = generateId();
    const now = new Date().toISOString();
    await db.runAsync(
      `INSERT INTO assets (id, name, category_id, purchase_price, purchase_date, current_valuation, status, notes, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, 'active', ?, ?, ?)`,
      id, payload.name, payload.categoryId, payload.purchasePrice,
      payload.purchaseDate, payload.currentValuation, payload.notes, now, now
    );
    const row = await db.getFirstAsync<any>('SELECT * FROM assets WHERE id = ?', id);
    return mapAsset(row!);
  },

  async update(id: string, payload: AssetUpdatePayload): Promise<void> {
    const db = getDatabase();
    const sets: string[] = [];
    const params: any[] = [];

    if (payload.name !== undefined) { sets.push('name = ?'); params.push(payload.name); }
    if (payload.categoryId !== undefined) { sets.push('category_id = ?'); params.push(payload.categoryId); }
    if (payload.purchasePrice !== undefined) { sets.push('purchase_price = ?'); params.push(payload.purchasePrice); }
    if (payload.purchaseDate !== undefined) { sets.push('purchase_date = ?'); params.push(payload.purchaseDate); }
    if (payload.currentValuation !== undefined) { sets.push('current_valuation = ?'); params.push(payload.currentValuation); }
    if (payload.status !== undefined) { sets.push('status = ?'); params.push(payload.status); }
    if (payload.soldPrice !== undefined) { sets.push('sold_price = ?'); params.push(payload.soldPrice); }
    if (payload.soldDate !== undefined) { sets.push('sold_date = ?'); params.push(payload.soldDate); }
    if (payload.notes !== undefined) { sets.push('notes = ?'); params.push(payload.notes); }

    if (sets.length > 0) {
      sets.push("updated_at = datetime('now', 'localtime')");
      params.push(id);
      await db.runAsync(`UPDATE assets SET ${sets.join(', ')} WHERE id = ?`, ...params);
    }
  },

  async remove(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync('DELETE FROM assets WHERE id = ?', id);
  },

  async markSold(id: string, soldPrice: number, soldDate: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `UPDATE assets SET status = 'sold', sold_price = ?, sold_date = ?, updated_at = datetime('now', 'localtime') WHERE id = ?`,
      soldPrice, soldDate, id
    );
  },

  async markRetired(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync(
      `UPDATE assets SET status = 'retired', updated_at = datetime('now', 'localtime') WHERE id = ?`,
      id
    );
  },
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 9);
}
