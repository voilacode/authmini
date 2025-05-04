/**
 * User service module
 * Handles user-related business logic including authentication
 */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { getDb } from '../data/prisma-manager.js';
import {
  User,
  UserInput,
  LoginResponse,
  JwtPayload,
} from '../types/model-types.js';

/**
 * Register a new user
 * @param {UserInput} input - User registration data
 * @returns {Promise<{id: number}>} Newly created user ID
 * @throws {Error} If email already exists or validation fails
 */
export async function registerUser(
  input: UserInput
): Promise<{ id: number }> {
  const db = getDb();
  const { email, password, name } = input;

  // Validate input
  if (!email || !password || !name) {
    throw new Error('All fields are required');
  }

  // Check for existing user
  const existingUser = await db.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new Error('Email already exists');
  }

  // Hash password and create user
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = await db.user.create({
    data: {
      email,
      passwordHash,
      name,
      role: 'user',
    },
  });

  return { id: user.id };
}

/**
 * Authenticate a user
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise<LoginResponse>} Login response with token and user info
 * @throws {Error} If credentials are invalid
 */
export async function loginUser(
  email: string,
  password: string
): Promise<LoginResponse> {
  const db = getDb();

  // Find user by email
  const user = await db.user.findUnique({ where: { email } });
  if (!user) {
    throw new Error('Invalid credentials');
  }

  // Verify password
  const passwordMatch = await bcrypt.compare(password, user.passwordHash);
  if (!passwordMatch) {
    throw new Error('Invalid credentials');
  }

  // Create JWT payload
  const payload: JwtPayload = {
    id: user.id,
    email: user.email,
    role: user.role as 'user' | 'admin',
  };

  // Sign JWT token
  const token = jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '1h',
  });

  // Return token and user info (excluding password)
  return {
    token,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role as 'user' | 'admin', // Add type assertion here
    },
  };
}

/**
 * Get all users (for admin use)
 * @returns {Promise<Omit<User, 'passwordHash'>[]>} List of users without passwords
 */
export async function getUsers(): Promise<Omit<User, 'passwordHash'>[]> {
  const db = getDb();
  const users = await db.user.findMany({
    select: { id: true, email: true, name: true, role: true },
  });
  
  // Map and convert role to the correct type
  return users.map(user => ({
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'user' | 'admin'
  }));
}

/**
 * Get user by ID
 * @param {number} userId - User ID to find
 * @returns {Promise<Omit<User, 'passwordHash'>>} User without password
 * @throws {Error} If user not found
 */
export async function getUserById(
  userId: number
): Promise<Omit<User, 'passwordHash'>> {
  const db = getDb();
  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!user) {
    throw new Error('User not found');
  }

  // Convert role to the correct type
  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as 'user' | 'admin'
  };
}