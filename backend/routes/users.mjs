/**
 * Admin user management routes.
 * @module routes/users
 */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import {
  getUsers,
  getUserById,
  setUserActive,
  deleteUser,
} from '../services/userService.mjs';
import { getActivityLogs } from '../services/activityService.mjs';

config();

/**
 * Verifies admin role from token.
 * @param {string} token - JWT token.
 * @returns {Object} Decoded token.
 * @throws {Error} If not admin.
 */
function verifyAdmin(token) {
  if (!token) {
    throw new Error('No token provided');
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== 'admin') {
    throw new Error('Admin access required');
  }

  return decoded;
}

/**
 * Registers user management routes.
 * @param {FastifyInstance} fastify - Fastify instance.
 * @param {Object} options - Route options.
 * @async
 */
export async function registerUserRoutes(fastify, options) {
  // Get all users (admin only)
  fastify.get('/users', async (request, reply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      verifyAdmin(token);

      const { search, active } = request.query;
      const users = await getUsers({ search, active });

      return reply.send({ users });
    } catch (err) {
      if (err.message === 'No token provided') {
        return reply.code(401).send({ error: 'No token provided' });
      }
      if (err.message === 'Admin access required') {
        return reply.code(403).send({ error: 'Admin access required' });
      }

      return reply.code(401).send({ error: 'Invalid token' });
    }
  });

  // Get user by ID (admin only)
  fastify.get('/users/:id', async (request, reply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      verifyAdmin(token);

      const userId = parseInt(request.params.id, 10);

      if (isNaN(userId) || userId <= 0) {
        return reply.code(400).send({ error: 'Invalid user ID' });
      }

      const user = await getUserById(userId);

      // Remove sensitive data
      delete user.passwordHash;

      return reply.send({ user });
    } catch (err) {
      if (err.message === 'No token provided') {
        return reply.code(401).send({ error: 'No token provided' });
      }
      if (err.message === 'Admin access required') {
        return reply.code(403).send({ error: 'Admin access required' });
      }
      if (err.message.includes('not found')) {
        return reply.code(404).send({ error: err.message });
      }

      return reply.code(401).send({ error: 'Invalid token' });
    }
  });

  // Update user active status (admin only)
  fastify.patch('/users/:id/active', async (request, reply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      verifyAdmin(token);

      const userId = parseInt(request.params.id, 10);
      const { isActive } = request.body;

      if (isNaN(userId) || userId <= 0) {
        return reply.code(400).send({ error: 'Invalid user ID' });
      }

      if (typeof isActive !== 'boolean') {
        return reply.code(400).send({ error: 'isActive must be a boolean' });
      }

      const user = await setUserActive(userId, isActive);

      return reply.send({
        message: `User ${isActive ? 'enabled' : 'disabled'}`,
        user,
      });
    } catch (err) {
      if (err.message === 'No token provided') {
        return reply.code(401).send({ error: 'No token provided' });
      }
      if (err.message === 'Admin access required') {
        return reply.code(403).send({ error: 'Admin access required' });
      }
      if (err.message.includes('not found')) {
        return reply.code(404).send({ error: err.message });
      }

      return reply.code(401).send({ error: 'Invalid token or server error' });
    }
  });

  // Delete user (admin only)
  fastify.delete('/users/:id', async (request, reply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      verifyAdmin(token);

      const userId = parseInt(request.params.id, 10);

      if (isNaN(userId) || userId <= 0) {
        return reply.code(400).send({ error: 'Invalid user ID' });
      }

      const result = await deleteUser(userId);

      return reply.send(result);
    } catch (err) {
      if (err.message === 'No token provided') {
        return reply.code(401).send({ error: 'No token provided' });
      }
      if (err.message === 'Admin access required') {
        return reply.code(403).send({ error: 'Admin access required' });
      }
      if (err.message.includes('not found')) {
        return reply.code(404).send({ error: err.message });
      }

      return reply.code(401).send({ error: 'Invalid token or server error' });
    }
  });

  // Get activity logs (admin only)
  fastify.get('/logs', async (request, reply) => {
    try {
      const token = request.headers.authorization?.replace('Bearer ', '');
      verifyAdmin(token);

      const { userId, startDate } = request.query;
      const logs = await getActivityLogs({ userId, startDate });

      return reply.send({ logs });
    } catch (err) {
      if (err.message === 'No token provided') {
        return reply.code(401).send({ error: 'No token provided' });
      }
      if (err.message === 'Admin access required') {
        return reply.code(403).send({ error: 'Admin access required' });
      }

      return reply.code(401).send({ error: 'Invalid token' });
    }
  });
}
