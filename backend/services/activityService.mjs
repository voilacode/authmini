/**
 * Activity log service for AuthMini.
 * @module services/activityService
 */
import { getDb } from '../data/db.mjs';

/**
 * Logs a user action.
 * @param {number} userId - User's ID.
 * @param {string} action - Action description.
 * @returns {Object} Created log entry.
 * @async
 */
export async function logActivity(userId, action) {
  const db = getDb();
  return db.activityLog.create({
    data: { userId, action },
  });
}

/**
 * Gets activity logs with optional filters.
 * @param {Object} filters - Filters (userId, startDate).
 * @returns {Array} Array of log entries.
 * @async
 */
export async function getActivityLogs(filters = {}) {
  const db = getDb();
  const where = {};

  if (filters.userId) {
    where.userId = Number(filters.userId);
  }

  if (filters.startDate) {
    where.createdAt = { gte: new Date(filters.startDate) };
  }

  return db.activityLog.findMany({
    where,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { email: true } } },
  });
}
