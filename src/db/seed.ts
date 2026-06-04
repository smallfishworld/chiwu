import { DEFAULT_CATEGORIES } from '../constants';

export const SEED_CATEGORIES_SQL = `
  INSERT OR IGNORE INTO categories (id, name, icon, sort_order)
  VALUES ${DEFAULT_CATEGORIES.map((c) => `('${c.id}', '${c.name}', '${c.icon}', ${c.sortOrder})`).join(', ')};
`;
