/**
 * Tests for Auth Routes.
 * @module tests/routes/auth
 */
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';
import Fastify from 'fastify';
import jwt from 'jsonwebtoken';
import { registerRoutes } from '../../backend/routes/auth.mjs';
import * as userService from '../../backend/services/userService.mjs';

// Mock the user service
vi.mock('../../backend/services/userService.mjs');

describe('Auth Routes', () => {
  let fastify;

  beforeAll(async () => {
    // Setup fastify instance
    fastify = Fastify({ logger: false });
    await fastify.register(registerRoutes, { prefix: '/api' });
    await fastify.ready();

    // Setup mock implementations
    userService.registerUser = vi.fn().mockResolvedValue({ id: 1 });
    userService.loginUser = vi.fn().mockResolvedValue({
      token: 'fake-token',
      user: { id: 1, email: 'test@example.com', role: 'user' },
    });
    userService.getUserById = vi.fn().mockResolvedValue({
      id: 1,
      email: 'test@example.com',
      role: 'user',
      profile: null,
    });
    userService.updateUserProfile = vi.fn().mockResolvedValue({});
    userService.updateUserSettings = vi.fn().mockResolvedValue({});
    userService.changeUserPassword = vi.fn().mockResolvedValue({});

    // Mock JWT verification
    vi.spyOn(jwt, 'verify').mockImplementation(() => ({
      id: 1,
      email: 'test@example.com',
      role: 'user',
    }));
  });

  afterAll(async () => {
    await fastify.close();
    vi.restoreAllMocks();
  });

  it('POST /api/register should register a user', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/register',
      payload: { email: 'test@example.com', password: 'password123' },
    });

    expect(response.statusCode).toBe(201);
    expect(JSON.parse(response.body)).toEqual({ message: 'User registered' });
    expect(userService.registerUser).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
  });

  it('POST /api/register should validate required fields', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/register',
      payload: { email: 'test@example.com' }, // Missing password
    });

    expect(response.statusCode).toBe(400);
    expect(JSON.parse(response.body).error).toContain('required');
  });

  it('POST /api/login should authenticate a user', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/login',
      payload: { email: 'test@example.com', password: 'password123' },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.token).toBe('fake-token');
    expect(userService.loginUser).toHaveBeenCalledWith(
      'test@example.com',
      'password123'
    );
  });

  it('GET /api/me should return user profile', async () => {
    const response = await fastify.inject({
      method: 'GET',
      url: '/api/me',
      headers: { Authorization: 'Bearer fake-token' },
    });

    expect(response.statusCode).toBe(200);
    const body = JSON.parse(response.body);
    expect(body.user.email).toBe('test@example.com');
    expect(userService.getUserById).toHaveBeenCalledWith(1);
  });

  it('POST /api/profile should update user profile', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/profile',
      headers: { Authorization: 'Bearer fake-token' },
      payload: { displayName: 'Test User', bio: 'Test bio' },
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ message: 'Profile updated' });
    expect(userService.updateUserProfile).toHaveBeenCalledWith(1, {
      displayName: 'Test User',
      bio: 'Test bio',
      avatarUrl: undefined,
    });
  });

  it('POST /api/settings should update user settings', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/settings',
      headers: { Authorization: 'Bearer fake-token' },
      payload: { theme: 'dark', notifications: true },
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      message: 'Settings updated',
    });
    expect(userService.updateUserSettings).toHaveBeenCalledWith(1, {
      theme: 'dark',
      notifications: true,
    });
  });

  it('POST /api/password should update user password', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/password',
      headers: { Authorization: 'Bearer fake-token' },
      payload: { newPassword: 'newpassword123' },
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({
      message: 'Password updated',
    });
    expect(userService.changeUserPassword).toHaveBeenCalledWith(
      1,
      'newpassword123'
    );
  });

  it('POST /api/logout should acknowledge logout', async () => {
    const response = await fastify.inject({
      method: 'POST',
      url: '/api/logout',
    });

    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body)).toEqual({ message: 'Logged out' });
  });
});
