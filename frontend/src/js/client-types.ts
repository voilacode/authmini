/**
 * Frontend type definitions
 * Defines interfaces for API interaction and UI state
 */

/**
 * User model (matches backend, but without password)
 */
export interface User {
    id: number;
    email: string;
    name: string;
    role: 'user' | 'admin';
  }
  
  /**
   * Login API response
   */
  export interface LoginResponse {
    token: string;
    user: User;
  }
  
  /**
   * User registration input
   */
  export interface RegistrationInput {
    email: string;
    password: string;
    name: string;
  }
  
  /**
   * Login input
   */
  export interface LoginInput {
    email: string;
    password: string;
  }
  
  /**
   * Generic API error response
   */
  export interface ApiError {
    error: string;
  }
  
  /**
   * Users list response
   */
  export interface UsersResponse {
    users: User[];
  }