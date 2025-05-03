/**
 * Unit tests for Activity Service.
 * @module tests/unit/activityService
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import {
  logActivity,
  getActivityLogs,
} from '../../backend/services/activityService.mjs';
import { registerUser } from '../../backend/services/userService.mjs';
import { initDb } from '../../backend/data/db.mjs';

describe('Activity Service', () => {
  let db;
  let testUserId;

  beforeAll(async () => {
    db = initDb();
    // Create a test user for operations
    const result = await registerUser(
      'test-activity@example.com',
      'password123'
    );
    testUserId = result.id;
  });

  afterAll(async () => {
    // Clean up test data
    await db.activityLog.deleteMany({ where: { userId: testUserId } });
    await db.user.delete({ where: { id: testUserId } });
    await db.$disconnect();
  });

  it('should log an activity', async () => {
    const action = 'Test action';
    const log = await logActivity(testUserId, action);

    expect(log.id).toBeDefined();
    expect(log.userId).toBe(testUserId);
    expect(log.action).toBe(action);
  });

  it('should get activity logs', async () => {
    // Log another activity
    await logActivity(testUserId, 'Another test action');

    const logs = await getActivityLogs({ userId: testUserId });

    expect(Array.isArray(logs)).toBe(true);
    expect(logs.length).toBeGreaterThanOrEqual(2);
    expect(logs[0].userId).toBe(testUserId);
  });

  it('should filter logs by date', async () => {
    const startDate = new Date();

    // Ensure date is slightly in the past
    startDate.setSeconds(startDate.getSeconds() - 1);

    // Log a new action
    await logActivity(testUserId, 'Recent action');

    const logs = await getActivityLogs({
      userId: testUserId,
      startDate: startDate.toISOString(),
    });

    expect(logs.length).toBeGreaterThanOrEqual(1);
    expect(logs[0].action).toBe('Recent action');
  });
});
