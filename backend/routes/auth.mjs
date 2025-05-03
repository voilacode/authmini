/**
 * Authentication routes for AuthMini.
 * @module routes/auth
 */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import {
  registerUser,
  loginUser,
  getUserById,
  updateUserProfile,
  updateUserSettings,
  changeUserPassword,
} from '../services/userService.mjs';

config();

/**
 * Registers authentication routes.
 * @param {FastifyInstance} fastify - Fastify instance.
 * @param {Object} options - Route options.
 * @async
 */
export async function registerRoutes(fastify, options) {
  fastify.post('/register', async (request, reply) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return reply.code(400).send({ error: 'Email and password are required' });
    }

    try {
      await registerUser(email, password);
      return reply.code(201).send({ message: 'User registered' });
    } catch (err) {
      return reply.code(400).send({ error: err.message });
    }
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;

    if (!email || !password) {
      return reply.code(400).send({ error: 'Email and password are required' });
    }

    try {
      const result = await loginUser(email, password);
      return reply.send(result);
    } catch (err) {
      return reply.code(401).send({ error: err.message });
    }
  });

  fastify.post('/logout', async (request, reply) => {
    // Server-side there's not much to do for logout with JWT
    // The client will remove the token
    return reply.send({ message: 'Logged out' });
  });

  fastify.get('/me', async (request, reply) => {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return reply.code(401).send({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await getUserById(decoded.id);

      // Remove sensitive fields
      delete user.passwordHash;

      return reply.send({ user });
    } catch (err) {
      return reply.code(401).send({ error: 'Invalid token' });
    }
  });

  fastify.post('/profile', async (request, reply) => {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return reply.code(401).send({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { displayName, bio, avatarUrl } = request.body;

      await updateUserProfile(decoded.id, { displayName, bio, avatarUrl });

      return reply.send({ message: 'Profile updated' });
    } catch (err) {
      return reply.code(401).send({ error: 'Invalid token' });
    }
  });

  fastify.post('/settings', async (request, reply) => {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return reply.code(401).send({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { theme, notifications } = request.body;

      await updateUserSettings(decoded.id, { theme, notifications });

      return reply.send({ message: 'Settings updated' });
    } catch (err) {
      return reply.code(401).send({ error: 'Invalid token' });
    }
  });

  fastify.post('/password', async (request, reply) => {
    const token = request.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      return reply.code(401).send({ error: 'No token provided' });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { newPassword } = request.body;

      if (!newPassword || newPassword.length < 6) {
        return reply.code(400).send({
          error: 'New password is required and must be at least 6 characters',
        });
      }

      await changeUserPassword(decoded.id, newPassword);

      return reply.send({ message: 'Password updated' });
    } catch (err) {
      return reply.code(401).send({ error: 'Invalid token' });
    }
  });
}
