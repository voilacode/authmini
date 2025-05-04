/**
 * Auth routes integration tests
 * Tests API endpoints for authentication
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';
import { registerAuthRoutes } from '../../src/routes/auth-routes';
import { initDb, getDb } from '../../src/data/prisma-manager';

describe('Auth Routes', () => {
  let fastify: FastifyInstance;
  let db: ReturnType<typeof getDb>;
  let testUserId: number;
  let authToken: string;

  const testUser = {
    email: 'integration@example.com',
    password: 'password123',
    name: 'Integration Test',
  };

  // Setup before tests run
  beforeAll(async () => {
    // Initialize database
    db = initDb();

    // Clean up any existing test user
    await db.user.deleteMany({ where: { email: testUser.email } });

    // Create Fastify instance for testing
    fastify = Fastify();

    // Register routes
    await fastify.register(registerAuthRoutes);

    // Start Fastify server
    await fastify.ready();
  });

  // Cleanup after tests complete
  afterAll(async () => {
    // Clean up test user if it exists
    if (testUserId) {
      await db.user.delete({ where: { id: testUserId } });
    }

    // Close Fastify server
    await fastify.close();

    // Disconnect from database
    await db.$disconnect();
  });

  it('should register a new user', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/register',
      payload: testUser,
    });

    // Verify response
    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.payload)).toEqual({
      message: 'User registered successfully',
    });

    // Verify user was created in database
    const createdUser = await db.user.findUnique({
      where: { email: testUser.email },
    });

    expect(createdUser).not.toBeNull();
    if (createdUser) {
      testUserId = createdUser.id;
    }
  });

  it('should log in a user', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/login',
      payload: {
        email: testUser.email,
        password: testUser.password,
      },
    });

    // Verify response
    expect(response.statusCode).toBe(200);

    const result = JSON.parse(response.payload);
    expect(result.token).toBeDefined();
    expect(result.user.email).toBe(testUser.email);
    expect(result.user.name).toBe(testUser.name);

    // Save token for later tests
    authToken = result.token;
  });

  it('should get current user data', async () => {
    // Skip if we don't have a token
    if (!authToken) {
      return;
    }

    const response = await fastify.inject({
      method: 'GET',
      url: '/me',
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });

    // Verify response
    expect(response.statusCode).toBe(200);

    const result = JSON.parse(response.payload);
    expect(result.user).toBeDefined();
    expect(result.user.email).toBe(testUser.email);
    expect(result.user.name).toBe(testUser.name);
  });

  it('should reject authentication without token', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/me',
    });

    // Verify response
    expect(response.statusCode).toBe(401);
  });
});