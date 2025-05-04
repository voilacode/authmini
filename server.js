/**
 * Main server entry point
 * Configures and starts the Fastify server
 */
import Fastify from 'fastify';
import fastifyStatic from '@fastify/static';
import path from 'path';
import { fileURLToPath } from 'url';
import { config } from 'dotenv';
// Import from compiled backend files instead of source
import { registerRoutes } from './backend/dist/routes/route-registry.js';
import { initDb } from './backend/dist/data/prisma-manager.js';
import { validateEnv } from './backend/dist/config/env.js';
// Load environment variables
config();
// Validate environment variables
validateEnv();
// Get current file directory (ESM compatibility)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
/**
 * Start the server with configured routes and services
 * @returns {Promise<void>}
 */
async function startServer() {
    // Create Fastify instance
    const fastify = Fastify({
        logger: { level: process.env.LOG_LEVEL || 'info' },
    });
    // Initialize database connection
    initDb();
    // Serve static frontend files
    fastify.register(fastifyStatic, {
        root: path.join(__dirname, 'frontend/dist'),
        prefix: '/',
    });
    // Register API routes
    fastify.register(registerRoutes, { prefix: '/api' });
    // Serve index.html for all unmatched routes (SPA support)
    fastify.setNotFoundHandler((request, reply) => {
        reply.sendFile('index.html');
    });
    // Start the server
    const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
    try {
        const address = await fastify.listen({
            port: port,
            host: '0.0.0.0', // Listen on all interfaces
        });
        console.log(`Server listening on ${address}`);
    }
    catch (err) {
        console.error('Error starting server:', err);
        process.exit(1);
    }
}
// Start the server when this script is run directly
startServer();
//# sourceMappingURL=server.js.map