// frontend/js/app.js
/**
 * SPA state and navigation.
 * @module js/app
 */
function app() {
  return {
    user: null,
    users: [],
    /**
     * Initializes SPA state based on stored token.
     * @async
     */
    async init() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          // Decode JWT to set user
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.user = { email: payload.email, role: payload.role };
          if (this.user.role === 'admin') {
            // Fetch users for admin
            const res = await axios.get('/api/users', {
              headers: { Authorization: `Bearer ${token}` },
            });
            this.users = res.data.users;
          }
        } catch (err) {
          localStorage.removeItem('token');
        }
      }
    },
    /**
     * Logs out user and resets UI.
     */
    logout() {
      localStorage.removeItem('token');
      window.location.reload();
    },
  };
}

window.app = app;
