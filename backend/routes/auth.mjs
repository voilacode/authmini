// backend/routes/auth.mjs
/**
 * Authentication routes.
 * @module routes/auth
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';
import { getDb } from '../data/db.mjs';

config();

/**
 * Registers auth routes.
 * @param {FastifyInstance} fastify - Fastify instance.
 * @param {Object} options - Route options.
 */
export async function registerRoutes(fastify, options) {
  fastify.post('/register', async (request, reply) => {
    const { email, password } = request.body;
    try {
      const db = getDb();
      // Hash password for secure storage
      const passwordHash = await bcrypt.hash(password, 10);
      db.prepare('INSERT INTO users (email, password_hash) VALUES (?, ?)').run(
        email,
        passwordHash
      );
      reply.code(201).send({ message: 'User registered' });
    } catch (err) {
      reply.code(400).send({ error: 'Registration failed: Email exists' });
    }
  });

  fastify.post('/login', async (request, reply) => {
    const { email, password } = request.body;
    try {
      const db = getDb();
      const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
      // Verify credentials
      if (!user || !(await bcrypt.compare(password, user.password_hash))) {
        throw new Error('Invalid credentials');
      }
      // Generate JWT
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        {
          expiresIn: '1h',
        }
      );
      reply.send({ token, user: { email: user.email, role: user.role } });
    } catch (err) {
      reply.code(401).send({ error: err.message });
    }
  });

  fastify.post('/logout', async (request, reply) => {
    reply.send({ message: 'Logged out' });
  });
}
