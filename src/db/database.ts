import * as SQLite from 'expo-sqlite';
import { MIGRATIONS } from './migrations';
import { SEED_CATEGORIES_SQL } from './seed';
import { seedDemoDataIfEmpty } from './seedDemoData';

let db: SQLite.SQLiteDatabase | null = null;

export function getDatabase(): SQLite.SQLiteDatabase {
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
}

export async function initDatabase(): Promise<void> {
  db = await SQLite.openDatabaseAsync('chiwu.db');

  // Enable WAL mode for better concurrent read performance
  await db.execAsync('PRAGMA journal_mode = WAL;');
  await db.execAsync('PRAGMA foreign_keys = ON;');

  // Run migrations
  await db.execAsync(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      version INTEGER PRIMARY KEY,
      applied_at TEXT NOT NULL DEFAULT (datetime('now', 'localtime'))
    );
  `);

  const currentVersion = await db.getFirstAsync<{ version: number }>(
    'SELECT MAX(version) as version FROM schema_migrations'
  );

  const appliedVersion = currentVersion?.version ?? 0;

  for (const migration of MIGRATIONS) {
    if (migration.version > appliedVersion) {
      await db.execAsync(migration.sql);
      await db.runAsync(
        'INSERT INTO schema_migrations (version) VALUES (?)',
        migration.version
      );
    }
  }

  // Seed default categories
  await db.execAsync(SEED_CATEGORIES_SQL);

  // Seed demo data on first launch
  await seedDemoDataIfEmpty();
}

export async function closeDatabase(): Promise<void> {
  if (db) {
    await db.closeAsync();
    db = null;
  }
}
