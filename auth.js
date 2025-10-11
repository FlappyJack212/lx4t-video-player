// Authentication JavaScript
const API_URL = window.location.origin;

// Check if user is already logged in
function checkAuth() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    if (token && user) {
        // User is logged in, redirect to homepage
        if (window.location.pathname.includes('login') || window.location.pathname.includes('register')) {
            window.location.href = 'index.html';
        }
        return true;
    }
    return false;
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check if already authenticated (only redirect from auth pages)
    checkAuth();
    
    // Handle login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Handle register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // Handle social login buttons (placeholder)
    const socialBtns = document.querySelectorAll('.social-btn');
    socialBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            showError('Social login coming soon!');
        });
    });
});

// Handle Login
async function handleLogin(e) {
    e.preventDefault();
    
    const btn = document.getElementById('loginBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    // Get form data
    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = formData.get('password');
    const remember = formData.get('remember') === 'on';
    
    // Validation
    if (!email || !password) {
        showError('Please fill in all fields');
        return;
    }
    
    // Show loading
    btn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
    
    try {
        const response = await fetch(`${API_URL}/api/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Store token and user info
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            if (remember) {
                localStorage.setItem('remember', 'true');
            }
            
            // Show success
            successMessage.classList.remove('hidden');
            
            // Redirect after short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1000);
        } else {
            showError(data.error || 'Login failed. Please try again.');
            btn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
        }
    } catch (error) {
        console.error('Login error:', error);
        showError('Network error. Please check your connection.');
        btn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
    }
}

// Handle Register
async function handleRegister(e) {
    e.preventDefault();
    
    const btn = document.getElementById('registerBtn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoader = btn.querySelector('.btn-loader');
    const errorMessage = document.getElementById('errorMessage');
    const successMessage = document.getElementById('successMessage');
    
    // Get form data
    const formData = new FormData(e.target);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    const terms = formData.get('terms') === 'on';
    
    // Validation
    if (!username || !email || !password || !confirmPassword) {
        showError('Please fill in all fields');
        return;
    }
    
    if (username.length < 3 || username.length > 20) {
        showError('Username must be 3-20 characters');
        return;
    }
    
    if (password.length < 6) {
        showError('Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('Passwords do not match');
        return;
    }
    
    if (!terms) {
        showError('You must agree to the terms of service');
        return;
    }
    
    // Show loading
    btn.disabled = true;
    btnText.classList.add('hidden');
    btnLoader.classList.remove('hidden');
    errorMessage.classList.add('hidden');
    successMessage.classList.add('hidden');
    
    try {
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            // Store token and user info
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            
            // Show success
            successMessage.classList.remove('hidden');
            
            // Redirect after short delay
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            showError(data.error || 'Registration failed. Please try again.');
            btn.disabled = false;
            btnText.classList.remove('hidden');
            btnLoader.classList.add('hidden');
        }
    } catch (error) {
        console.error('Registration error:', error);
        showError('Network error. Please check your connection.');
        btn.disabled = false;
        btnText.classList.remove('hidden');
        btnLoader.classList.add('hidden');
    }
}

// Show error message
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    const errorText = document.getElementById('errorText');
    
    if (errorMessage && errorText) {
        errorText.textContent = message;
        errorMessage.classList.remove('hidden');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            errorMessage.classList.add('hidden');
        }, 5000);
    }
}

// Check authentication for protected pages
function requireAuth() {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Get current user
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    }
    return null;
}

// Logout
function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('remember');
    window.location.href = 'login.html';
}

// Get auth token for API requests
function getAuthToken() {
    return localStorage.getItem('token');
}

// Make authenticated API request
async function fetchWithAuth(url, options = {}) {
    const token = getAuthToken();
    
    if (!token) {
        throw new Error('Not authenticated');
    }
    
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${token}`
    };
    
    const response = await fetch(url, {
        ...options,
        headers
    });
    
    // If unauthorized, logout and redirect
    if (response.status === 401 || response.status === 403) {
        logout();
        return;
    }
    
    return response;
}

// Export functions for use in other scripts
window.auth = {
    checkAuth,
    requireAuth,
    getCurrentUser,
    logout,
    getAuthToken,
    fetchWithAuth
};

