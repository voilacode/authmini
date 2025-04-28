// server.mjs
/**
 * Entry point for AuthMini server.
 * @module server
 */
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import { config } from 'dotenv';
import { registerRoutes } from './backend/routes/auth.mjs';
import { registerUserRoutes } from './backend/routes/users.mjs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

config();

const fastify = Fastify({ logger: true });
const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * Starts the Fastify server.
 * @async
 */
async function startServer() {
  await fastify.register(fastifyStatic, {
    root: join(__dirname, 'frontend'),
    prefix: '/',
    setHeaders: (res) => {
      res.setHeader('Cache-Control', 'public, max-age=3600');
    },
  });

  await fastify.register(registerRoutes, { prefix: '/api' });
  await fastify.register(registerUserRoutes, { prefix: '/api' });

  try {
    await fastify.listen({ port: process.env.PORT || 3000 });
    fastify.log.info(`Server running on port ${process.env.PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
}

startServer();
