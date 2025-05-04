/**
 * Frontend application script
 * Manages user interface with Alpine.js
 */
import {
    getCurrentUser,
    getUsers,
    loginUser,
    logoutUser,
    registerUser,
  } from './api-client.js';
  import { User } from './client-types.js';
  
  // Type declaration for Alpine.js and our global components
  declare global {
    interface Window {
      Alpine: any;
      app: any;
      authComponent: any;
    }
  }
  
  /**
   * Main application component
   * @returns Alpine.js component definition
   */
  function app() {
    return {
      // Component state
      user: null as User | null,
      users: [] as User[],
      error: null as string | null,
  
      /**
       * Initialize the application
       * Checks for existing session
       * @returns {Promise<void>}
       */
      async init(): Promise<void> {
        try {
          // Check if user is already logged in
          const token = localStorage.getItem('token');
          if (token) {
            const { user } = await getCurrentUser();
            this.user = user;
  
            // Load users list for admin
            if (this.user.role === 'admin') {
              await this.fetchUsers();
            }
          }
        } catch (err) {
          // Handle invalid token by removing it
          console.error('Session error:', err);
          localStorage.removeItem('token');
          this.user = null;
        }
      },
  
      /**
       * Fetch all users (admin only)
       * @returns {Promise<void>}
       */
      async fetchUsers(): Promise<void> {
        try {
          const { users } = await getUsers();
          this.users = users;
        } catch (err: any) {
          // Handle API errors
          this.error = err.message || 'Failed to fetch users';
        }
      },
  
      /**
       * Log out the current user
       * @returns {Promise<void>}
       */
      async logout(): Promise<void> {
        try {
          // Call logout API
          await logoutUser();
        } catch (err: any) {
          console.error('Logout error:', err);
        } finally {
          // Always clear local session
          localStorage.removeItem('token');
          this.user = null;
          this.users = [];
  
          // Redirect to login page
          window.location.href = '/';
        }
      },
    };
  }
  
  /**
   * Authentication component for login/register
   * @returns Alpine.js component definition
   */
  function authComponent() {
    return {
      // Form fields
      email: '',
      password: '',
      name: '',
      error: null as string | null,
  
      /**
       * Submit login or registration form
       * @param {'register' | 'login'} action - Action to perform
       * @returns {Promise<void>}
       */
      async submit(action: 'register' | 'login'): Promise<void> {
        this.error = null;
  
        try {
          // Handle registration
          if (action === 'register') {
            // Validate all fields for registration
            if (!this.email || !this.password || !this.name) {
              this.error = 'All fields required';
              return;
            }
  
            // Register new user
            await registerUser({
              email: this.email,
              password: this.password,
              name: this.name,
            });
  
            // Auto-login after successful registration
            const loginResponse = await loginUser({
              email: this.email,
              password: this.password,
            });
  
            // Store token and refresh page
            localStorage.setItem('token', loginResponse.token);
            window.location.href = '/';
          } else {
            // Validate login fields
            if (!this.email || !this.password) {
              this.error = 'Email and password required';
              return;
            }
  
            // Log in user
            const loginResponse = await loginUser({
              email: this.email,
              password: this.password,
            });
  
            // Store token and refresh page
            localStorage.setItem('token', loginResponse.token);
            window.location.href = '/';
          }
        } catch (err: any) {
          // Handle API errors
          this.error = err.message || 'An error occurred';
        }
      },
    };
  }
  
  // Make components globally available for both module and global access
  window.app = app;
  window.authComponent = authComponent;
  
  // Register Alpine.js components when DOM loaded
  document.addEventListener('DOMContentLoaded', () => {
    window.Alpine = window.Alpine || {};
    window.Alpine.data = window.Alpine.data || {};
    window.Alpine.data('app', app);
    window.Alpine.data('authComponent', authComponent);
  });