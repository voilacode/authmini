/**
 * Unit tests for database client.
 * @module tests/unit/db
 */
import { describe, it, expect } from 'vitest';
import { initDb, getDb } from '../../backend/data/db.mjs';

describe('Database Client', () => {
  it('should initialize Prisma client', () => {
    const db = initDb();
    expect(db).toBeDefined();
    expect(typeof db.$connect).toBe('function');
  });

  it('should get initialized Prisma client', () => {
    const db = getDb();
    expect(db).toBeDefined();
    expect(typeof db.$connect).toBe('function');
  });

  it('should return the same instance when called multiple times', () => {
    const db1 = initDb();
    const db2 = initDb();
    expect(db1).toBe(db2);
  });
});
