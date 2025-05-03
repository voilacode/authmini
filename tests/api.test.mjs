/**
 * Integration tests for AuthMini APIs.
 * @module tests/api
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import supertest from 'supertest';
import Fastify from 'fastify';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { registerRoutes } from '../backend/routes/auth.mjs';
import { registerUserRoutes } from '../backend/routes/users.mjs';
import { initDb, getDb } from '../backend/data/db.mjs';

// Load environment variables
config();

// Test variables
let adminToken;
let userToken;
let testUserId;
const adminEmail = 'admin@example.com';
const testEmail = 'integration-test@example.com';
const testPassword = 'test123';

// Setup Fastify for testing
const fastify = Fastify({
  logger: false, // Disable logger for cleaner output
});

beforeAll(async () => {
  console.log('Starting beforeAll hook...');

  // Initialize database
  console.log('Initializing database...');
  const db = initDb();
  console.log('Database initialized');

  // Create admin user directly with Prisma instead of using seed
  console.log('Creating admin user...');
  try {
    // Check if admin user exists
    const existingAdmin = await db.user.findUnique({
      where: { email: adminEmail },
    });

    if (!existingAdmin) {
      // Create admin user if doesn't exist
      await db.user.create({
        data: {
          email: adminEmail,
          passwordHash: await bcrypt.hash('admin123', 10),
          role: 'admin',
          is_active: true,
        },
      });
      console.log('Admin user created');
    } else {
      console.log('Admin user already exists');
    }

    // Generate token directly instead of using login API
    adminToken = jwt.sign(
      { id: 1, email: adminEmail, role: 'admin' },
      process.env.JWT_SECRET || 'fallback_secret_for_testing',
      { expiresIn: '1h' }
    );
    console.log('Admin token generated manually');

    // Register routes to the Fastify instance
    console.log('Registering routes...');
    await fastify.register(registerRoutes, { prefix: '/api' });
    await fastify.register(registerUserRoutes, { prefix: '/api' });
    await fastify.ready();
    console.log('Routes registered and server ready');
  } catch (err) {
    console.error('Error in beforeAll:', err);
    throw err; // Make the test fail with the actual error
  }

  console.log('beforeAll hook completed');
}, 120000); // 2 minutes timeout

afterAll(async () => {
  console.log('Starting afterAll hook...');

  // Clean up test user if created
  if (testUserId) {
    console.log(`Cleaning up test user ID ${testUserId}...`);
    try {
      const db = getDb();
      await db.profile.deleteMany({ where: { userId: testUserId } });
      await db.settings.deleteMany({ where: { userId: testUserId } });
      await db.activityLog.deleteMany({ where: { userId: testUserId } });
      await db.user.delete({ where: { id: testUserId } }).catch(() => {});
      console.log('Test user cleaned up');
    } catch (err) {
      console.error('Error cleaning up test user:', err);
    }
  }

  // Close Fastify and disconnect from DB
  try {
    await fastify.close();
    console.log('Fastify server closed');

    const db = getDb();
    await db.$disconnect();
    console.log('Database disconnected');
  } catch (err) {
    console.error('Error in afterAll:', err);
  }

  console.log('afterAll hook completed');
}, 120000); // 2 minutes timeout

describe('Authentication Flow', () => {
  it('should register a new user', async () => {
    console.log('Starting register test...');
    const response = await supertest(fastify.server)
      .post('/api/register')
      .send({ email: testEmail, password: testPassword });

    console.log('Register response status:', response.status);
    console.log('Register response body:', response.body);

    expect(response.statusCode).toBe(201);
    expect(response.body).toEqual({ message: 'User registered' });

    // Get user ID for cleanup
    console.log('Fetching created user for cleanup...');
    try {
      const db = getDb();
      const user = await db.user.findUnique({ where: { email: testEmail } });
      testUserId = user?.id;
      console.log('Test user ID:', testUserId);
    } catch (err) {
      console.error('Error fetching user ID:', err);
    }
  }, 30000);

  it('should not register a duplicate email', async () => {
    console.log('Starting duplicate email test...');
    const response = await supertest(fastify.server)
      .post('/api/register')
      .send({ email: testEmail, password: testPassword });

    console.log('Duplicate email response status:', response.status);
    console.log('Duplicate email response body:', response.body);

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toContain('Email already exists');
  }, 30000);

  it('should login a user', async () => {
    console.log('Starting login test...');
    const response = await supertest(fastify.server)
      .post('/api/login')
      .send({ email: testEmail, password: testPassword });

    console.log('Login response status:', response.status);
    console.log('Login response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.user.email).toBe(testEmail);

    // Save token for later tests
    userToken = response.body.token;
    console.log('User token obtained:', !!userToken);
  }, 30000);

  it('should reject invalid credentials', async () => {
    console.log('Starting invalid credentials test...');
    const response = await supertest(fastify.server)
      .post('/api/login')
      .send({ email: testEmail, password: 'wrongpassword' });

    console.log('Invalid credentials response status:', response.status);
    console.log('Invalid credentials response body:', response.body);

    expect(response.statusCode).toBe(401);
    expect(response.body.error).toContain('Invalid credentials');
  }, 30000);

  it('should get current user profile', async () => {
    console.log('Starting get profile test...');
    const response = await supertest(fastify.server)
      .get('/api/me')
      .set('Authorization', `Bearer ${userToken}`);

    console.log('Get profile response status:', response.status);
    console.log('Get profile response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.email).toBe(testEmail);
    expect(response.body.user.passwordHash).toBeUndefined();
  }, 30000);
});

describe('User Management Flow', () => {
  it('should update profile', async () => {
    console.log('Starting update profile test...');
    const profileData = {
      displayName: 'Test User',
      bio: 'Integration test profile',
      avatarUrl: 'https://example.com/avatar.png',
    };

    const response = await supertest(fastify.server)
      .post('/api/profile')
      .set('Authorization', `Bearer ${userToken}`)
      .send(profileData);

    console.log('Update profile response status:', response.status);
    console.log('Update profile response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Profile updated');

    // Verify profile was updated
    console.log('Verifying profile update...');
    const meResponse = await supertest(fastify.server)
      .get('/api/me')
      .set('Authorization', `Bearer ${userToken}`);

    console.log('Get updated profile response status:', meResponse.status);
    console.log(
      'Get updated profile response body profile:',
      meResponse.body.user.profile
    );

    expect(meResponse.body.user.profile.displayName).toBe(
      profileData.displayName
    );
    expect(meResponse.body.user.profile.bio).toBe(profileData.bio);
  }, 30000);

  it('should update settings', async () => {
    console.log('Starting update settings test...');
    const settingsData = {
      theme: 'dark',
      notifications: false,
    };

    const response = await supertest(fastify.server)
      .post('/api/settings')
      .set('Authorization', `Bearer ${userToken}`)
      .send(settingsData);

    console.log('Update settings response status:', response.status);
    console.log('Update settings response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Settings updated');
  }, 30000);

  it('should change password', async () => {
    console.log('Starting change password test...');
    const newPassword = 'newpassword123';

    const response = await supertest(fastify.server)
      .post('/api/password')
      .set('Authorization', `Bearer ${userToken}`)
      .send({ newPassword });

    console.log('Change password response status:', response.status);
    console.log('Change password response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('Password updated');

    // Verify by logging in with new password
    console.log('Verifying password change by logging in...');
    const loginResponse = await supertest(fastify.server)
      .post('/api/login')
      .send({ email: testEmail, password: newPassword });

    console.log('New password login response status:', loginResponse.status);
    console.log(
      'New password login response body token exists:',
      !!loginResponse.body.token
    );

    expect(loginResponse.statusCode).toBe(200);
    expect(loginResponse.body.token).toBeDefined();
  }, 30000);
});

describe('Admin Operations', () => {
  it('should get all users (admin only)', async () => {
    console.log('Starting get all users test...');
    const response = await supertest(fastify.server)
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Get all users response status:', response.status);
    console.log(
      'Get all users response body users count:',
      response.body.users?.length
    );

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.users)).toBe(true);
    expect(response.body.users.length).toBeGreaterThan(0);

    // Should include our test user
    const testUser = response.body.users.find((u) => u.email === testEmail);
    console.log('Test user found in users list:', !!testUser);

    expect(testUser).toBeDefined();
  }, 30000);

  it('should filter users by search', async () => {
    console.log('Starting filter users test...');
    const response = await supertest(fastify.server)
      .get(`/api/users?search=${testEmail}`)
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Filter users response status:', response.status);
    console.log(
      'Filter users response body users count:',
      response.body.users?.length
    );

    expect(response.statusCode).toBe(200);
    expect(response.body.users.length).toBe(1);
    expect(response.body.users[0].email).toBe(testEmail);
  }, 30000);

  it('should get user by ID (admin only)', async () => {
    console.log('Starting get user by ID test...');
    if (!testUserId) {
      console.warn('testUserId is not defined, skipping test');
      return;
    }

    const response = await supertest(fastify.server)
      .get(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Get user by ID response status:', response.status);
    console.log('Get user by ID response body user:', response.body.user);

    expect(response.statusCode).toBe(200);
    expect(response.body.user.id).toBe(testUserId);
    expect(response.body.user.email).toBe(testEmail);
  }, 30000);

  it('should toggle user active status (admin only)', async () => {
    console.log('Starting toggle user active test...');
    if (!testUserId) {
      console.warn('testUserId is not defined, skipping test');
      return;
    }

    const response = await supertest(fastify.server)
      .patch(`/api/users/${testUserId}/active`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isActive: false });

    console.log('Toggle user active response status:', response.status);
    console.log('Toggle user active response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toBe('User disabled');
    expect(response.body.user.is_active).toBe(false);

    // Verify user can't login when disabled
    console.log('Verifying user cannot login when disabled...');
    const loginResponse = await supertest(fastify.server)
      .post('/api/login')
      .send({ email: testEmail, password: 'newpassword123' });

    console.log('Disabled user login response status:', loginResponse.status);
    console.log('Disabled user login response body:', loginResponse.body);

    expect(loginResponse.statusCode).toBe(401);

    // Re-enable user
    console.log('Re-enabling user...');
    await supertest(fastify.server)
      .patch(`/api/users/${testUserId}/active`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ isActive: true });
  }, 30000);

  it('should get activity logs (admin only)', async () => {
    console.log('Starting get activity logs test...');
    const response = await supertest(fastify.server)
      .get('/api/logs')
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Get activity logs response status:', response.status);
    console.log(
      'Get activity logs response body logs count:',
      response.body.logs?.length
    );

    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body.logs)).toBe(true);

    // Should include logs for our test user
    if (testUserId) {
      const userLogs = response.body.logs.filter(
        (log) => log.userId === testUserId
      );
      console.log('Test user logs found:', userLogs.length);

      expect(userLogs.length).toBeGreaterThan(0);
    }
  }, 30000);

  it('should delete a user (admin only)', async () => {
    console.log('Starting delete user test...');
    if (!testUserId) {
      console.warn('testUserId is not defined, skipping test');
      return;
    }

    const response = await supertest(fastify.server)
      .delete(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Delete user response status:', response.status);
    console.log('Delete user response body:', response.body);

    expect(response.statusCode).toBe(200);
    expect(response.body.message).toContain('deleted successfully');

    // Verify user is gone
    console.log('Verifying user is deleted...');
    const userResponse = await supertest(fastify.server)
      .get(`/api/users/${testUserId}`)
      .set('Authorization', `Bearer ${adminToken}`);

    console.log('Get deleted user response status:', userResponse.status);
    console.log('Get deleted user response body:', userResponse.body);

    expect(userResponse.statusCode).toBe(404);

    // Clear testUserId since we've deleted it
    console.log('Clearing testUserId variable');
    testUserId = null;
  }, 30000);
});
