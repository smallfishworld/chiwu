import { getDatabase } from './database';
import type { Category } from '../types';

export const categoryRepository = {
  async getAll(): Promise<Category[]> {
    const db = getDatabase();
    return db.getAllAsync<Category>(
      'SELECT id, name, icon, sort_order as sortOrder, created_at as createdAt FROM categories ORDER BY sort_order ASC'
    );
  },

  async getById(id: string): Promise<Category | null> {
    const db = getDatabase();
    return db.getFirstAsync<Category>(
      'SELECT id, name, icon, sort_order as sortOrder, created_at as createdAt FROM categories WHERE id = ?',
      id
    );
  },

  async create(id: string, name: string, icon: string, sortOrder?: number): Promise<void> {
    const db = getDatabase();
    const maxOrder = await db.getFirstAsync<{ max: number }>(
      'SELECT MAX(sort_order) as max FROM categories'
    );
    const order = sortOrder ?? (maxOrder?.max ?? 0) + 1;
    await db.runAsync(
      'INSERT INTO categories (id, name, icon, sort_order) VALUES (?, ?, ?, ?)',
      id, name, icon, order
    );
  },

  async update(id: string, data: { name?: string; icon?: string; sortOrder?: number }): Promise<void> {
    const db = getDatabase();
    const sets: string[] = [];
    const params: (string | number)[] = [];

    if (data.name !== undefined) { sets.push('name = ?'); params.push(data.name); }
    if (data.icon !== undefined) { sets.push('icon = ?'); params.push(data.icon); }
    if (data.sortOrder !== undefined) { sets.push('sort_order = ?'); params.push(data.sortOrder); }

    if (sets.length > 0) {
      params.push(id);
      await db.runAsync(`UPDATE categories SET ${sets.join(', ')} WHERE id = ?`, ...params);
    }
  },

  async remove(id: string): Promise<void> {
    const db = getDatabase();
    await db.runAsync('DELETE FROM categories WHERE id = ?', id);
  },
};
