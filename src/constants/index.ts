export const DEFAULT_CATEGORIES = [
  { id: 'cat-electronics', name: '电子产品', icon: '📱', sortOrder: 0 },
  { id: 'cat-accessories', name: '配件', icon: '🎧', sortOrder: 1 },
  { id: 'cat-clothing', name: '服饰', icon: '👔', sortOrder: 2 },
  { id: 'cat-furniture', name: '家具', icon: '🪑', sortOrder: 3 },
  { id: 'cat-books', name: '书籍', icon: '📚', sortOrder: 4 },
  { id: 'cat-sports', name: '运动', icon: '⚽', sortOrder: 5 },
  { id: 'cat-other', name: '其他', icon: '📦', sortOrder: 99 },
] as const;

export const ASSET_STATUS = {
  ACTIVE: 'active',
  RETIRED: 'retired',
  SOLD: 'sold',
} as const;

export const STATUS_LABELS: Record<string, string> = {
  active: '服役中',
  retired: '已退役',
  sold: '已卖出',
};
