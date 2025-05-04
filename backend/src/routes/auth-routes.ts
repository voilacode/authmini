/**
 * Authentication routes module
 * Handles user registration, login, logout, and data retrieval
 */
import { FastifyInstance } from 'fastify';
import {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
} from '../services/user-service';
import {
  authenticate,
  requireAdmin,
  AuthenticatedRequest,
} from '../middleware/auth-middleware';
import { ErrorResponse } from '../types/model-types';

/**
 * Request body for user registration
 */
interface RegisterBody {
  email: string;
  password: string;
  name: string;
}

/**
 * Request body for user login
 */
interface LoginBody {
  email: string;
  password: string;
}

/**
 * Register all authentication routes
 * @param {FastifyInstance} fastify - Fastify instance
 * @returns {Promise<void>}
 */
export async function registerAuthRoutes(
  fastify: FastifyInstance
): Promise<void> {
  /**
   * User registration endpoint
   * POST /register
   */
  fastify.post<{ Body: RegisterBody }>(
    '/register',
    async (request, reply) => {
      const { email, password, name } = request.body;

      // Validate request
      if (!email || !password || !name) {
        return reply.code(400).send({
          error: 'All fields required',
        } as ErrorResponse);
      }

      try {
        // Register the user
        await registerUser({ email, password, name });
        return reply.code(201).send({
          message: 'User registered successfully',
        });
      } catch (err: any) {
        // Handle registration errors
        return reply.code(400).send({
          error: err.message,
        } as ErrorResponse);
      }
    }
  );

  /**
   * User login endpoint
   * POST /login
   */
  fastify.post<{ Body: LoginBody }>('/login', async (request, reply) => {
    const { email, password } = request.body;

    // Validate request
    if (!email || !password) {
      return reply.code(400).send({
        error: 'Email and password required',
      } as ErrorResponse);
    }

    try {
      // Authenticate the user
      const result = await loginUser(email, password);
      return reply.send(result);
    } catch (err: any) {
      // Handle authentication errors
      return reply.code(401).send({
        error: err.message,
      } as ErrorResponse);
    }
  });

  /**
   * User logout endpoint
   * POST /logout
   */
  fastify.post('/logout', async (_request, reply) => {
    // We don't need to do anything server-side for logout
    // Token invalidation happens client-side
    return reply.send({
      message: 'Logged out successfully',
    });
  });

  /**
   * Get current user data
   * GET /me
   */
  fastify.get(
    '/me',
    { preHandler: [authenticate] },
    async (request: AuthenticatedRequest, reply) => {
      try {
        // Get user data using ID from authenticated request
        if (!request.user?.id) {
          return reply.code(401).send({
            error: 'Authentication required',
          });
        }

        const user = await getUserById(request.user.id);
        return reply.send({ user });
      } catch (err: any) {
        // Handle errors
        return reply.code(400).send({
          error: err.message,
        } as ErrorResponse);
      }
    }
  );

  /**
   * Get all users (admin only)
   * GET /users
   */
  fastify.get(
    '/users',
    { preHandler: [authenticate, requireAdmin] },
    async (_request, reply) => {
      try {
        // Get all users
        const users = await getUsers();
        return reply.send({ users });
      } catch (err: any) {
        // Handle errors
        return reply.code(400).send({
          error: err.message,
        } as ErrorResponse);
      }
    }
  );
}