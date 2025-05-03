/**
 * Server entry point for AuthMini.
 * @module server
 */
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
import { registerRoutes } from './backend/routes/auth.mjs';
import { registerUserRoutes } from './backend/routes/users.mjs';
import { initDb } from './backend/data/db.mjs';

// Load environment variables
config();

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Starts the server.
 * @async
 */
export async function startServer() {
  const fastify = Fastify({
    logger: { level: process.env.LOG_LEVEL || 'info' },
  });

  // Initialize Prisma client
  initDb();

  // Serve static files from frontend directory
  fastify.register(fastifyStatic, {
    root: path.join(__dirname, 'frontend'),
    prefix: '/',
  });

  // Register API routes
  fastify.register(registerRoutes, { prefix: '/api' });
  fastify.register(registerUserRoutes, { prefix: '/api' });

  // Catch-all route for SPA
  fastify.setNotFoundHandler((request, reply) => {
    reply.sendFile('index.html');
  });

  // Get port from environment or use default
  const port = process.env.PORT || 3000;

  try {
    const address = await fastify.listen({ port, host: '0.0.0.0' });
    console.log(`Server listening on ${address}`);
  } catch (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
}

startServer();
