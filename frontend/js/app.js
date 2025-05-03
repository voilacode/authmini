/**
 * Main application component.
 * @returns {Object} Alpine.js component.
 */
function app() {
  return {
    user: null,
    showProfile: false,
    users: [],
    logs: [],
    search: '',
    activeFilter: '',
    selectedUser: null,
    error: null,
    loading: false,

    /**
     * Initializes application.
     * @async
     */
    async init() {
      // Check for token
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get('/api/me', {
            headers: { Authorization: `Bearer ${token}` },
          });

          this.user = res.data.user;

          // If admin, load users and logs
          if (this.user.role === 'admin') {
            await this.fetchUsers();
            await this.fetchLogs();
          }
        } catch (err) {
          console.error('Failed to verify token:', err);
          localStorage.removeItem('token');
        }
      }
    },

    /**
     * Fetches users for admin dashboard.
     * @async
     */
    async fetchUsers() {
      this.loading = true;
      this.error = null;
      try {
        const token = localStorage.getItem('token');
        let url = '/api/users';

        // Add filters if present
        if (this.search || this.activeFilter) {
          const params = new URLSearchParams();
          if (this.search) params.append('search', this.search);
          if (this.activeFilter) params.append('active', this.activeFilter);
          url += `?${params.toString()}`;
        }

        const res = await axios.get(url, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.users = res.data.users;
      } catch (err) {
        console.error('Failed to fetch users:', err);
        this.error = err.response?.data?.error || 'Failed to fetch users';
      } finally {
        this.loading = false;
      }
    },

    /**
     * Fetches activity logs for admin dashboard.
     * @async
     */
    async fetchLogs() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/logs', {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.logs = res.data.logs;
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    },

    /**
     * Views user details.
     * @param {number} userId - User ID.
     * @async
     */
    async viewUser(userId) {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        this.selectedUser = res.data.user;
      } catch (err) {
        console.error('Failed to fetch user details:', err);
        this.error =
          err.response?.data?.error || 'Failed to fetch user details';
      }
    },

    /**
     * Closes user details modal.
     */
    closeUserDetails() {
      this.selectedUser = null;
    },

    /**
     * Toggles user active status and refreshes users.
     * @param {number} userId - User ID.
     * @param {boolean} isActive - New active status.
     * @async
     */
    async toggleUserActive(userId, isActive) {
      try {
        const token = localStorage.getItem('token');
        await axios.patch(
          `/api/users/${userId}/active`,
          { isActive },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Refresh users list and logs
        await this.fetchUsers();
        await this.fetchLogs();
      } catch (err) {
        console.error('Failed to toggle user active:', err);
        this.error = err.response?.data?.error || 'Failed to update user';
      }
    },

    /**
     * Deletes a user after confirmation.
     * @param {number} userId - User ID.
     * @async
     */
    async deleteUser(userId) {
      if (
        !confirm(
          'Are you sure you want to delete this user? This action cannot be undone.'
        )
      ) {
        return;
      }

      try {
        const token = localStorage.getItem('token');
        await axios.delete(`/api/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Refresh users list and logs
        await this.fetchUsers();
        await this.fetchLogs();
      } catch (err) {
        console.error('Failed to delete user:', err);
        this.error = err.response?.data?.error || 'Failed to delete user';
      }
    },

    /**
     * Logs out the user.
     * @async
     */
    async logout() {
      try {
        await axios.post('/api/logout');
      } catch (err) {
        console.error('Logout error:', err);
      } finally {
        localStorage.removeItem('token');
        this.user = null;
        this.users = [];
        this.logs = [];
        window.location.href = '/';
      }
    },
  };
}

// Initialize Alpine.js
window.Alpine = Alpine;
Alpine.data('app', app);
Alpine.start();
