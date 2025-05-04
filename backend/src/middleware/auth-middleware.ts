/**
 * Authentication middleware
 * Verifies JWT tokens and adds user info to request
 */
import { FastifyRequest, FastifyReply } from 'fastify';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/model-types';

/**
 * Extended FastifyRequest with authenticated user information
 */
export interface AuthenticatedRequest extends FastifyRequest {
  user?: {
    id: number;
    email: string;
    role: 'user' | 'admin';
  };
}

/**
 * Middleware to verify user authentication
 * @param {AuthenticatedRequest} request - FastifyRequest with user property
 * @param {FastifyReply} reply - FastifyReply
 * @returns {Promise<void>}
 */
export async function authenticate(
  request: AuthenticatedRequest,
  reply: FastifyReply
): Promise<void> {
  // Extract token from Authorization header
  const token = request.headers.authorization?.replace('Bearer ', '');
  if (!token) {
    reply.code(401).send({ error: 'No token provided' });
    return;
  }

  try {
    // Verify JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;

    // Attach user data to request for route handlers
    request.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
  } catch (err) {
    reply.code(401).send({ error: 'Invalid token' });
  }
}

/**
 * Middleware to ensure user has admin role
 * Must be used after authenticate middleware
 * @param {AuthenticatedRequest} request - FastifyRequest with user property
 * @param {FastifyReply} reply - FastifyReply
 * @returns {Promise<void>}
 */
export async function requireAdmin(
  request: AuthenticatedRequest,
  reply: FastifyReply
): Promise<void> {
  if (request.user?.role !== 'admin') {
    reply.code(403).send({ error: 'Admin access required' });
  }
}