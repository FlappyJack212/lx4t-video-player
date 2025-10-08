// Authentication Frontend - LX4T Platform

// Tab switching
const tabs = document.querySelectorAll('.auth-tab');
const forms = document.querySelectorAll('.auth-form');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Update active tab
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Update active form
        forms.forEach(f => f.classList.remove('active'));
        document.getElementById(`${targetTab}Form`).classList.add('active');
        
        // Clear error
        hideError();
    });
});

// Error handling
function showError(message) {
    const errorEl = document.getElementById('authError');
    errorEl.textContent = message;
    errorEl.classList.add('show');
}

function hideError() {
    const errorEl = document.getElementById('authError');
    errorEl.classList.remove('show');
}

// Login form
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();
    
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    const submitBtn = e.target.querySelector('.auth-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Logging in...';
    
    try {
        const response = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Login failed');
        }
        
        // Store token
        localStorage.setItem('lx4t_token', data.token);
        localStorage.setItem('lx4t_user', JSON.stringify(data.user));
        
        // Redirect to homepage
        window.location.href = '/browse.html';
    } catch (error) {
        showError(error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Login';
    }
});

// Register form
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    hideError();
    
    const username = document.getElementById('registerUsername').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    const submitBtn = e.target.querySelector('.auth-submit');
    submitBtn.disabled = true;
    submitBtn.textContent = 'Creating account...';
    
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'Registration failed');
        }
        
        // Store token
        localStorage.setItem('lx4t_token', data.token);
        localStorage.setItem('lx4t_user', JSON.stringify(data.user));
        
        // Redirect to homepage
        window.location.href = '/browse.html';
    } catch (error) {
        showError(error.message);
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Account';
    }
});

// Check if already logged in
const token = localStorage.getItem('lx4t_token');
if (token) {
    // Verify token is still valid
    fetch('/api/auth/me', {
        headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => {
        if (res.ok) {
            // Already logged in, redirect
            window.location.href = '/browse.html';
        } else {
            // Token invalid, clear storage
            localStorage.removeItem('lx4t_token');
            localStorage.removeItem('lx4t_user');
        }
    })
    .catch(() => {
        localStorage.removeItem('lx4t_token');
        localStorage.removeItem('lx4t_user');
    });
}

