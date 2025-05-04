/**
 * Route registry module
 * Registers all API routes
 */
import { FastifyInstance } from 'fastify';
import { registerAuthRoutes } from './auth-routes.js';

/**
 * Register all application routes
 * @param {FastifyInstance} fastify - Fastify instance
 * @returns {Promise<void>}
 */
export async function registerRoutes(
  fastify: FastifyInstance
): Promise<void> {
  // Register auth routes
  await fastify.register(registerAuthRoutes, { prefix: '/auth' });

  // Additional route registrations can go here
}