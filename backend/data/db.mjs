/**
 * Prisma database client for AuthMini.
 * @module data/db
 */
import { PrismaClient } from '@prisma/client';

/** @type {PrismaClient} */
let prisma;

/**
 * Initializes Prisma client.
 * @returns {PrismaClient} Prisma client instance.
 */
export function initDb() {
  if (!prisma) {
    prisma = new PrismaClient();
  }
  return prisma;
}

/**
 * Gets Prisma client.
 * @returns {PrismaClient} Prisma client instance.
 */
export function getDb() {
  if (!prisma) {
    throw new Error('Database not initialized');
  }
  return prisma;
}

// Initialize database on module load
initDb();
export { prisma };
