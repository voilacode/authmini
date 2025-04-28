// backend/routes/users.mjs
/**
 * Admin user list route.
 * @module routes/users
 */
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { getDb } from '../data/db.mjs';

config();

/**
 * Registers user routes.
 * @param {FastifyInstance} fastify - Fastify instance.
 * @param {Object} options - Route options.
 */
export async function registerUserRoutes(fastify, options) {
  fastify.get('/users', async (request, reply) => {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      reply.code(401).send({ error: 'No token provided' });
      return;
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (decoded.role !== 'admin') {
        reply.code(403).send({ error: 'Admin access required' });
        return;
      }
      const db = getDb();
      const users = db
        .prepare('SELECT id, email, role, created_at FROM users')
        .all();
      reply.send({ users });
    } catch (err) {
      reply.code(401).send({ error: 'Invalid token' });
    }
  });
}
