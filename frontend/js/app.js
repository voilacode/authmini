// frontend/js/app.js
/**
 * SPA state and navigation.
 * @module js/app
 */
console.log('app.js loaded'); // Debug: Confirm script execution

function app() {
  return {
    user: null,
    users: [],
    async init() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split('.')[1]));
          this.user = { email: payload.email, role: payload.role };
          if (this.user.role === 'admin') {
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
    logout() {
      localStorage.removeItem('token');
      window.location.reload();
    },
  };
}

// Expose app globally for Alpine.js
window.app = app;
