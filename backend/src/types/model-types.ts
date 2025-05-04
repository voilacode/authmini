/**
 * Shared type definitions for the application
 * Defines interfaces for User, authentication, and JWT
 */

/**
 * User model interface
 */
export interface User {
    id: number;
    email: string;
    passwordHash: string;
    name: string;
    role: 'user' | 'admin'; // Using literal union type for role
  }
  
  /**
   * User registration input
   */
  export interface UserInput {
    email: string;
    password: string;
    name: string;
  }
  
  /**
   * Login response with token and user info
   */
  export interface LoginResponse {
    token: string;
    user: Omit<User, 'passwordHash'>; // Exclude password from response
  }
  
  /**
   * JWT payload structure
   */
  export interface JwtPayload {
    id: number;
    email: string;
    role: 'user' | 'admin';
  }
  
  /**
   * API error response
   */
  export interface ErrorResponse {
    error: string;
  }