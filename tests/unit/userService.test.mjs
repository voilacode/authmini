/**
 * Unit tests for User Service.
 * @module tests/unit/userService
 */
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUserProfile,
  setUserActive,
  deleteUser,
} from '../../backend/services/userService.mjs';
import { initDb } from '../../backend/data/db.mjs';
import { logActivity } from '../../backend/services/activityService.mjs';

// Mock activityService
vi.mock('../../backend/services/activityService.mjs', () => ({
  logActivity: vi.fn().mockResolvedValue({}),
}));

describe('User Service', () => {
  let db;
  let testUserId;

  beforeAll(async () => {
    db = initDb();
    // Create a test user for operations
    const result = await registerUser(
      'test-service@example.com',
      'password123'
    );
    testUserId = result.id;
  });

  afterAll(async () => {
    // Clean up test data
    try {
      await db.profile.deleteMany({ where: { userId: testUserId } });
      await db.user.delete({ where: { id: testUserId } });
    } catch (err) {
      // Already deleted in test
    }
    await db.$disconnect();
  });

  it('should register a new user', async () => {
    const result = await registerUser('new-user@example.com', 'password123');
    expect(result.id).toBeDefined();
    expect(logActivity).toHaveBeenCalled();

    // Clean up
    await db.user.delete({ where: { id: result.id } });
  });

  it('should not register duplicate email', async () => {
    await expect(
      registerUser('test-service@example.com', 'password123')
    ).rejects.toThrow('Email already exists');
  });

  it('should login a user', async () => {
    const result = await loginUser('test-service@example.com', 'password123');
    expect(result.token).toBeDefined();
    expect(result.user.email).toBe('test-service@example.com');
    expect(logActivity).toHaveBeenCalled();
  });

  it('should reject login with wrong password', async () => {
    await expect(
      loginUser('test-service@example.com', 'wrongpassword')
    ).rejects.toThrow('Invalid credentials');
  });

  it('should get all users', async () => {
    const users = await getUsers();
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
  });

  it('should filter users by search', async () => {
    const users = await getUsers({ search: 'test-service' });
    expect(users.length).toBe(1);
    expect(users[0].email).toBe('test-service@example.com');
  });

  it('should get a user by ID', async () => {
    const user = await getUserById(testUserId);
    expect(user.id).toBe(testUserId);
    expect(user.email).toBe('test-service@example.com');
  });

  it('should throw error for non-existent user ID', async () => {
    await expect(getUserById(999999)).rejects.toThrow('not found');
  });

  it('should update user profile', async () => {
    const profileData = {
      displayName: 'Test User',
      bio: 'This is a test profile',
    };

    const result = await updateUserProfile(testUserId, profileData);
    expect(result).toEqual(profileData);
    expect(logActivity).toHaveBeenCalled();

    // Verify update
    const user = await getUserById(testUserId);
    expect(user.profile.displayName).toBe('Test User');
  });

  it('should set user active status', async () => {
    const user = await setUserActive(testUserId, false);
    expect(user.is_active).toBe(false);
    expect(logActivity).toHaveBeenCalled();

    // Reset status for other tests
    await setUserActive(testUserId, true);
  });

  it('should delete a user', async () => {
    // Create a user to delete
    const { id } = await registerUser('to-delete@example.com', 'password123');

    const result = await deleteUser(id);
    expect(result.message).toContain('deleted successfully');

    // Verify deletion
    await expect(getUserById(id)).rejects.toThrow('not found');
  });
});
