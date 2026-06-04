export const MIGRATIONS = [
  {
    version: 1,
    sql: `
      CREATE TABLE IF NOT EXISTS categories (
        id          TEXT PRIMARY KEY,
        name        TEXT NOT NULL,
        icon        TEXT NOT NULL,
        sort_order  INTEGER NOT NULL DEFAULT 0,
        created_at  TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
      );

      CREATE TABLE IF NOT EXISTS assets (
        id                TEXT PRIMARY KEY,
        name              TEXT NOT NULL,
        category_id       TEXT NOT NULL,
        purchase_price    REAL NOT NULL CHECK(purchase_price >= 0),
        purchase_date     TEXT NOT NULL,
        current_valuation REAL CHECK(current_valuation >= 0),
        sold_price        REAL CHECK(sold_price >= 0),
        sold_date         TEXT,
        status            TEXT NOT NULL DEFAULT 'active'
                          CHECK(status IN ('active', 'retired', 'sold')),
        notes             TEXT DEFAULT '',
        created_at        TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
        updated_at        TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
        FOREIGN KEY (category_id) REFERENCES categories(id)
      );

      CREATE TABLE IF NOT EXISTS valuations (
        id            TEXT PRIMARY KEY,
        asset_id      TEXT NOT NULL,
        value         REAL NOT NULL CHECK(value >= 0),
        recorded_date TEXT NOT NULL,
        note          TEXT DEFAULT '',
        created_at    TEXT NOT NULL DEFAULT (datetime('now', 'localtime')),
        FOREIGN KEY (asset_id) REFERENCES assets(id) ON DELETE CASCADE
      );

      CREATE INDEX IF NOT EXISTS idx_assets_status ON assets(status);
      CREATE INDEX IF NOT EXISTS idx_assets_category ON assets(category_id);
      CREATE INDEX IF NOT EXISTS idx_valuations_asset ON valuations(asset_id, recorded_date);
    `,
  },
];
