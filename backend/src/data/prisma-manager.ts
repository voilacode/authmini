/**
 * Database connection module
 * Manages Prisma client initialization and access
 */
import { PrismaClient } from '@prisma/client';

// Singleton instance of PrismaClient
let prisma: PrismaClient;

/**
 * Initialize database connection
 * @returns {PrismaClient} Initialized Prisma client
 */
export function initDb(): PrismaClient {
  if (!prisma) {
    prisma = new PrismaClient({
      log: ['error', 'warn'],
    });
  }
  return prisma;
}

/**
 * Get the database client
 * @returns {PrismaClient} Prisma client instance
 * @throws {Error} If database not initialized
 */
export function getDb(): PrismaClient {
  if (!prisma) {
    throw new Error('Database not initialized');
  }
  return prisma;
}

// Initialize DB on module load
initDb();