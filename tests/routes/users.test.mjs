/**
 * Tests for User Routes.
 * @module tests/routes/users
 */
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import Fastify from 'fastify';
import jwt from 'jsonwebtoken';
import { registerUserRoutes } from '../../backend/routes/users.mjs';
import * as userService from '../../backend/services/userService.mjs';
import * as activityService from '../../backend/services/activityService.mjs';

// Mock the services and JWT
vi.mock('jsonwebtoken');
vi.mock('../../backend/services/userService.mjs');
vi.mock('../../backend/services/activityService.mjs');

describe('User Routes', () => {
  let fastify;
  const adminToken = 'admin-token';
  const userToken = 'user-token';

  beforeAll(async () => {
    // Setup fastify instance
    fastify = Fastify({ logger: false });
    await fastify.register(registerUserRoutes, { prefix: '/api' });
    await fastify.ready();

    // Setup mock JWT implementation
    jwt.verify = vi.fn().mockImplementation((token) => {
      if (token === adminToken) {
        return { id: 1, email: 'admin@example.com', role: 'admin' };
      }
      if (token === userToken) {
        return { id: 2, email: 'user@example.com', role: 'user' };
      }
      throw new Error('Invalid token');
    });

    // Setup mock service implementations
    userService.getUsers = vi.fn().mockResolvedValue([
      { id: 1, email: 'admin@example.com', role: 'admin', is_active: true },
      { id: 2, email: 'user@example.com', role: 'user', is_active: true },
    ]);

    userService.getUserById = vi.fn().mockImplementation(async (id) => {
      if (id === 1) {
        return {
          id: 1,
          email: 'admin@example.com',
          role: 'admin',
          is_active: true,
        };
      }
      if (id === 2) {
        return {
          id: 2,
          email: 'user@example.com',
          role: 'user',
          is_active: true,
        };
      }
      throw new Error(`User with ID ${id} not found`);
    });

    userService.setUserActive = vi
      .fn()
      .mockImplementation(async (id, isActive) => {
        if (id === 1 || id === 2) {
          return { id, is_active: isActive };
        }
        throw new Error(`User with ID ${id} not found`);
      });

    userService.deleteUser = vi.fn().mockImplementation(async (id) => {
      if (id === 2) {
        return { message: `User with ID ${id} deleted successfully` };
      }
      throw new Error(`User with ID ${id} not found`);
    });

    activityService.getActivityLogs = vi
      .fn()
      .mockResolvedValue([
        { id: 1, userId: 1, action: 'User logged in', createdAt: new Date() },
      ]);
  });

  afterAll(async () => {
    await fastify.close();
    vi.restoreAllMocks();
  });

  it('GET /api/users should return users for admin', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/users',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.users.length).toBe(2);
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it('GET /api/users should reject non-admin users', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/users',
      headers: { Authorization: `Bearer ${userToken}` },
    });

    expect(response.statusCode).toBe(403);
    expect(JSON.parse(response.body)).toEqual({
      error: 'Admin access required',
    });
  });

  it('GET /api/users/:id should return user details for admin', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/users/2',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.user.id).toBe(2);
    expect(body.user.email).toBe('user@example.com');
    expect(userService.getUserById).toHaveBeenCalledWith(2);
  });

  it('GET /api/users/:id should return 404 for non-existent user', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/users/999',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body).error).toContain('not found');
  });

  it('PATCH /api/users/:id/active should update user status for admin', async () => {
    const response = await fastify.inject({
      method: 'PATCH',
      url: '/api/users/2/active',
      headers: { Authorization: `Bearer ${adminToken}` },
      payload: { isActive: false },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.message).toBe('User disabled');
    expect(body.user.is_active).toBe(false);
    expect(userService.setUserActive).toHaveBeenCalledWith(2, false);
  });

  it('DELETE /api/users/:id should delete a user for admin', async () => {
    const response = await fastify.inject({
      method: 'DELETE',
      url: '/api/users/2',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.message).toContain('deleted successfully');
    expect(userService.deleteUser).toHaveBeenCalledWith(2);
  });

  it('GET /api/logs should return activity logs for admin', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/logs',
      headers: { Authorization: `Bearer ${adminToken}` },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(Array.isArray(body.logs)).toBe(true);
    expect(activityService.getActivityLogs).toHaveBeenCalled();
  });
});
