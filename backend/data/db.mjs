/**
 * SQLite database management for AuthMini.
 * @module data/db
 */
import sqlite3 from 'better-sqlite3';
import bcrypt from 'bcrypt';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
let db;

/**
 * Initializes database with users, profiles, settings, and logs tables.
 * @returns {Database} Database instance.
 */
export function initDb() {
  // Connect to SQLite database
  db = sqlite3(resolve(__dirname, '../../db/authmini.db'));
  // Create tables for users, profiles, settings, and activity logs
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL DEFAULT 'user',
      is_active BOOLEAN DEFAULT 1,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    CREATE TABLE IF NOT EXISTS profiles (
      user_id INTEGER PRIMARY KEY,
      display_name TEXT,
      bio TEXT,
      avatar_url TEXT,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS settings (
      user_id INTEGER PRIMARY KEY,
      theme TEXT DEFAULT 'light',
      notifications BOOLEAN DEFAULT 1,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
    CREATE TABLE IF NOT EXISTS activity_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      action TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    );
  `);

  // Seed admin user if not exists
  const adminExists = db
    .prepare('SELECT id FROM users WHERE email = ?')
    .get('admin@example.com');
  if (!adminExists) {
    // Hash admin password for secure storage
    const passwordHash = bcrypt.hashSync('admin123', 10);
    // Insert admin user with admin role
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
  // Ensure database is initialized
  if (!db) throw new Error('Database not initialized');
  return db;
}

// Initialize database on module load
initDb();
export { db };
