// frontend/js/auth.js
/**
 * Authentication component.
 * @module js/auth
 */
console.log('auth.js loaded'); // Debug: Confirm script execution

function authComponent() {
  return {
    email: '',
    password: '',
    error: '',
    /**
     * Submits register or login request.
     * @param {string} action - 'register' or 'login'.
     * @async
     */
    async submit(action) {
      try {
        const res = await axios.post(`/api/${action}`, {
          email: this.email,
          password: this.password,
        });
        if (action === 'login') {
          localStorage.setItem('token', res.data.token);
          window.location.reload();
        } else {
          this.error = 'Registration successful. Please login.';
        }
      } catch (err) {
        this.error = err.response?.data?.error || 'An error occurred';
      }
    },
  };
}

// Expose authComponent globally for Alpine.js
window.authComponent = authComponent;
