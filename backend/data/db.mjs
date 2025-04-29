// backend/data/db.mjs
/**
 * SQLite database management.
 * @module data/db
 */
import sqlite3 from 'better-sqlite3';
import bcrypt from 'bcrypt';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
let db;

/**
 * Initializes database with users table and admin user.
 * @returns {Database} Database instance.
 */
export function initDb() {
  db = sqlite3(resolve(__dirname, '../../db/authmini.db'));
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Seed admin user if not exists
  const adminExists = db
    .prepare('SELECT id FROM users WHERE email = ?')
    .get('admin@example.com');
  if (!adminExists) {
    const passwordHash = bcrypt.hashSync('admin123', 10);
    db.prepare(
      'INSERT INTO users (email, password_hash, role) VALUES (?, ?, ?)'
    ).run('admin@example.com', passwordHash, 'admin');
  }

  return db;
}

/**
 * Gets database instance.
 * @returns {Database} Database instance.
 */
export function getDb() {
  if (!db) throw new Error('Database not initialized');
  return db;
}

initDb();
export { db };
