/**
 * User service unit tests
 * Tests user registration, login, and retrieval
 */
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
} from '../../src/services/user-service';
import { initDb, getDb } from '../../src/data/prisma-manager';
import { UserInput } from '../../src/types/model-types';

// Mock JWT to avoid actual token generation in tests
vi.mock('jsonwebtoken', async () => {
  return {
    default: {
      sign: vi.fn(() => 'mock-token'),
      verify: vi.fn(() => ({ id: 1, email: 'test@example.com', role: 'user' })),
    },
    sign: vi.fn(() => 'mock-token'),
    verify: vi.fn(() => ({ id: 1, email: 'test@example.com', role: 'user' })),
  };
});

describe('User Service', () => {
  // Test database connection
  let db: ReturnType<typeof getDb>;
  let testUserId: number;

  // Test user data
  const testUser: UserInput = {
    email: 'test@example.com',
    password: 'password123',
    name: 'Test User',
  };

  // Setup before tests run
  beforeAll(async () => {
    db = initDb();
    // Register a test user to use in the tests
    const result = await registerUser(testUser);
    testUserId = result.id;
  });

  // Cleanup after tests complete
  afterAll(async () => {
    // Remove test user
    await db.user.deleteMany({ where: { id: testUserId } });
    await db.$disconnect();
  });

  it('should register a new user', async () => {
    // Create a unique email for this test
    const uniqueEmail = `new${Date.now()}@example.com`;

    const result = await registerUser({
      email: uniqueEmail,
      password: 'password123',
      name: 'New User',
    });

    // Verify user was created
    expect(result.id).toBeDefined();
    expect(typeof result.id).toBe('number');

    // Clean up created user
    await db.user.delete({ where: { id: result.id } });
  });

  it('should reject registration with missing fields', async () => {
    // Missing name
    await expect(
      registerUser({
        email: 'test2@example.com',
        password: 'password123',
        name: '',
      })
    ).rejects.toThrow('All fields are required');
  });

  it('should not register duplicate email', async () => {
    // Attempt to register with existing email
    await expect(registerUser(testUser)).rejects.toThrow(
      'Email already exists'
    );
  });

  it('should login a user', async () => {
    // Login with test user credentials
    const result = await loginUser(testUser.email, testUser.password);

    // Verify token and user data
    expect(result.token).toBeDefined();
    expect(result.user.email).toBe(testUser.email);
    expect(result.user.name).toBe(testUser.name);
    // Password should not be included in response
    expect(result.user).not.toHaveProperty('passwordHash');
  });

  it('should not login with invalid credentials', async () => {
    // Attempt login with wrong password
    await expect(loginUser(testUser.email, 'wrongpassword')).rejects.toThrow(
      'Invalid credentials'
    );
  });

  it('should get user by ID', async () => {
    // Get user by ID
    const user = await getUserById(testUserId);

    // Verify user data
    expect(user.id).toBe(testUserId);
    expect(user.email).toBe(testUser.email);
    expect(user.name).toBe(testUser.name);
    // Password should not be included
    expect(user).not.toHaveProperty('passwordHash');
  });

  it('should throw error for non-existent user ID', async () => {
    // Attempt to get non-existent user
    await expect(getUserById(9999)).rejects.toThrow('User not found');
  });

  it('should get all users', async () => {
    // Get all users
    const users = await getUsers();

    // Verify users array
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);

    // Check if our test user is included
    const testUserInList = users.find((u) => u.email === testUser.email);
    expect(testUserInList).toBeDefined();
    expect(testUserInList?.name).toBe(testUser.name);

    // Verify password is not included
    expect(testUserInList).not.toHaveProperty('passwordHash');
  });
});