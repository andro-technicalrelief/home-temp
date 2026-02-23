/**
 * auth.js
 * Mock authentication system for Technical Relief
 * Uses localStorage to persist session state
 */

const Auth = {
    // Check if user is logged in
    isLoggedIn: function () {
        return localStorage.getItem('isLoggedIn') === 'true';
    },

    // Get mock user data
    getUser: function () {
        if (!this.isLoggedIn()) return null;
        return JSON.parse(localStorage.getItem('user')) || { email: 'client@technicalrelief.co.za', name: 'Premium Client' };
    },

    // Handle Mock Login
    login: function (email, password) {
        return new Promise((resolve, reject) => {
            // Simulate network delay
            setTimeout(() => {
                if (email && password) {
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('user', JSON.stringify({
                        email: email,
                        name: email.split('@')[0],
                        lastLogin: new Date().toISOString()
                    }));
                    this.updateUI();
                    resolve({ success: true });
                } else {
                    reject({ success: false, message: 'Please enter both email and password.' });
                }
            }, 1000);
        });
    },

    // Handle Mock Registration
    register: function (data) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (data.email && data.password) {
                    // In a real app, we'd save to DB. Here we just log them in.
                    localStorage.setItem('isLoggedIn', 'true');
                    localStorage.setItem('user', JSON.stringify({
                        email: data.email,
                        name: data.fullName || data.email.split('@')[0],
                        registered: new Date().toISOString()
                    }));
                    this.updateUI();
                    resolve({ success: true });
                } else {
                    reject({ success: false, message: 'Please fill in all required fields.' });
                }
            }, 1200);
        });
    },

    // Handle Mock Password Reset
    resetPassword: function (email) {
        return new Promise((resolve) => {
            setTimeout(() => {
                // Just simulate success
                resolve({ success: true, message: 'Reset link sent to ' + email });
            }, 1000);
        });
    },

    // Handle Logout
    logout: function () {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('user');
        this.updateUI();
        window.location.href = 'index.html';
    },

    // Update UI based on auth state
    updateUI: function () {
        const loggedIn = this.isLoggedIn();

        // Update body class for CSS selectors (.logged-in-only, .logged-out-only)
        if (loggedIn) {
            document.body.classList.add('is-logged-in');
        } else {
            document.body.classList.remove('is-logged-in');
        }

        // Update Client Area links or User Greeting if elements exist
        const userNameDisplays = document.querySelectorAll('.user-name-display');
        if (userNameDisplays.length > 0) {
            const user = this.getUser();
            userNameDisplays.forEach(el => el.textContent = user ? user.name : '');
        }
    },

    // Initialize
    init: function () {
        this.updateUI();

        // Bind logout buttons
        document.addEventListener('click', (e) => {
            if (e.target.closest('[data-logout]')) {
                e.preventDefault();
                this.logout();
            }
        });
    }
};

// Auto-initialize when script loads
document.addEventListener('DOMContentLoaded', () => Auth.init());
window.Auth = Auth; // Export for global access
