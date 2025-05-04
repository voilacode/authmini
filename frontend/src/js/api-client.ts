/**
 * API client module
 * Provides typed methods for interacting with the backend API
 */
declare const axios: any;
import {
  User,
  LoginResponse,
  RegistrationInput,
  LoginInput,
  ApiError,
  UsersResponse,
} from './client-types.js';

// Base URL for API requests
const API_BASE_URL = '/api';

/**
 * Get authorization header with JWT token
 * @returns {Object} Headers object with Authorization
 */
function getAuthHeaders(): { Authorization: string } | {} {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
}

/**
 * Format error message from API response
 * @param {unknown} error - Error object from axios
 * @returns {string} Formatted error message
 */
function formatError(error: unknown): string {
  // Using type checking instead of instanceof for AxiosError
  if (error && typeof error === 'object' && 'response' in error) {
    const axiosError = error as any;
    if (axiosError.response?.data) {
      return (axiosError.response.data as ApiError).error || axiosError.message;
    }
  }
  return error instanceof Error ? error.message : 'Unknown error';
}

/**
 * Register a new user
 * @param {RegistrationInput} userData - User registration data
 * @returns {Promise<{ message: string }>} Success message
 * @throws {Error} If registration fails
 */
export async function registerUser(
  userData: RegistrationInput
): Promise<{ message: string }> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/register`,
      userData
    );
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
}

/**
 * Log in a user
 * @param {LoginInput} credentials - User login credentials
 * @returns {Promise<LoginResponse>} Login response with token
 * @throws {Error} If login fails
 */
export async function loginUser(
  credentials: LoginInput
): Promise<LoginResponse> {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/auth/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
}

/**
 * Get current user data
 * @returns {Promise<{ user: User }>} Current user
 * @throws {Error} If fetching user fails
 */
export async function getCurrentUser(): Promise<{ user: User }> {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/me`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
}

/**
 * Get all users (admin only)
 * @returns {Promise<UsersResponse>} List of users
 * @throws {Error} If fetching users fails
 */
export async function getUsers(): Promise<UsersResponse> {
  try {
    const response = await axios.get(`${API_BASE_URL}/auth/users`, {
      headers: getAuthHeaders(),
    });
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
}

/**
 * Log out current user
 * @returns {Promise<{ message: string }>} Success message
 */
export async function logoutUser(): Promise<{ message: string }> {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/logout`);
    return response.data;
  } catch (error) {
    throw new Error(formatError(error));
  }
}