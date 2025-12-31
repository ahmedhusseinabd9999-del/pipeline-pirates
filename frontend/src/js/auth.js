// API Configuration
const API_BASE_URL = 'http://localhost:8000';
const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

// DOM Elements
let currentPanel = 'signin';

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    initializeForms();
    initializePasswordStrength();
    checkAuthStatus();
});

// Switch between Sign In and Sign Up
function switchToSignUp() {
    const container = document.getElementById('container');
    container.classList.add('right-panel-active');
    currentPanel = 'signup';
    clearErrors();
}

function switchToSignIn() {
    const container = document.getElementById('container');
    container.classList.remove('right-panel-active');
    currentPanel = 'signin';
    clearErrors();
}

// Toggle password visibility
function togglePassword(passwordId) {
    const passwordInput = document.getElementById(passwordId);
    const toggleBtn = passwordInput.parentNode.querySelector('.toggle-password i');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleBtn.classList.remove('fa-eye');
        toggleBtn.classList.add('fa-eye-slash');
    } else {
        passwordInput.type = 'password';
        toggleBtn.classList.remove('fa-eye-slash');
        toggleBtn.classList.add('fa-eye');
    }
}

// Password strength checker
function initializePasswordStrength() {
    const passwordInput = document.getElementById('signupPassword');
    if (!passwordInput) return;

    passwordInput.addEventListener('input', function() {
        const password = this.value;
        const strengthFill = document.getElementById('strengthFill');
        const strengthText = document.getElementById('strengthText');
        
        if (!password) {
            strengthFill.style.width = '0%';
            strengthText.textContent = 'Password strength';
            strengthFill.style.background = '#ff4444';
            return;
        }
        
        let strength = 0;
        const hasLength = password.length >= 8;
        const hasUppercase = /[A-Z]/.test(password);
        const hasLowercase = /[a-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecial = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
        
        // Calculate strength based on criteria
        strength = [hasLength, hasUppercase, hasLowercase, hasNumber, hasSpecial]
            .filter(Boolean).length;
        
        // Update strength bar
        const width = strength * 20;
        strengthFill.style.width = `${width}%`;
        
        // Update colors and text
        const strengthData = [
            { color: '#ff4444', text: 'Very Weak' },
            { color: '#ff7744', text: 'Weak' },
            { color: '#ffaa44', text: 'Fair' },
            { color: '#44bb44', text: 'Good' },
            { color: '#22aa22', text: 'Strong' }
        ];
        
        strengthFill.style.background = strengthData[strength - 1]?.color || '#ff4444';
        strengthText.textContent = strengthData[strength - 1]?.text || 'Very Weak';
        
        // Check password match
        checkPasswordMatch();
    });
    
    // Check password confirmation
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');
    if (confirmPasswordInput) {
        confirmPasswordInput.addEventListener('input', checkPasswordMatch);
    }
}

function checkPasswordMatch() {
    const password = document.getElementById('signupPassword')?.value;
    const confirmPassword = document.getElementById('signupConfirmPassword')?.value;
    const errorElement = document.getElementById('signupError');
    
    if (confirmPassword && password !== confirmPassword) {
        showError('signupError', 'Passwords do not match');
        return false;
    } else {
        clearError('signupError');
        return true;
    }
}

// Form validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validatePassword(password) {
    return password.length >= 6;
}

// Error handling
function showError(elementId, message) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = message;
        element.style.display = 'block';
    }
}

function clearError(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.textContent = '';
        element.style.display = 'none';
    }
}

function clearErrors() {
    clearError('signinError');
    clearError('signupError');
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastIcon = toast.querySelector('.toast-icon');
    const toastMessage = toast.querySelector('.toast-message');
    const toastProgress = toast.querySelector('.toast-progress');
    
    // Set icon based on type
    if (type === 'success') {
        toastIcon.className = 'fas fa-check-circle toast-icon';
        toastIcon.style.color = '#4CAF50';
        toastProgress.style.background = '#4CAF50';
    } else if (type === 'error') {
        toastIcon.className = 'fas fa-exclamation-circle toast-icon';
        toastIcon.style.color = '#ff4444';
        toastProgress.style.background = '#ff4444';
    } else if (type === 'warning') {
        toastIcon.className = 'fas fa-exclamation-triangle toast-icon';
        toastIcon.style.color = '#ff9800';
        toastProgress.style.background = '#ff9800';
    }
    
    toastMessage.textContent = message;
    toast.classList.add('show');
    
    // Remove toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
    
    // Reset progress bar animation
    toastProgress.style.animation = 'none';
    setTimeout(() => {
        toastProgress.style.animation = 'progress 3s linear forwards';
    }, 10);
}

// Form initialization
function initializeForms() {
    // Sign In Form
    const signinForm = document.getElementById('signinForm');
    if (signinForm) {
        signinForm.addEventListener('submit', handleSignIn);
    }
    
    // Sign Up Form
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignUp);
    }
}

// Handle Sign In
async function handleSignIn(e) {
    e.preventDefault();
    
    const email = document.getElementById('signinEmail').value;
    const password = document.getElementById('signinPassword').value;
    const signinBtn = document.getElementById('signinBtn');
    const spinner = document.getElementById('signinSpinner');
    const btnText = signinBtn.querySelector('.btn-text');
    
    // Validate
    if (!validateEmail(email)) {
        showError('signinError', 'Please enter a valid email address');
        return;
    }
    
    if (!validatePassword(password)) {
        showError('signinError', 'Password must be at least 6 characters');
        return;
    }
    
    // Show loading
    signinBtn.disabled = true;
    btnText.style.opacity = '0.5';
    spinner.classList.remove('hidden');
    
    try {
        // Simulate API call (replace with actual API call)
        await simulateAPICall(1000);
        
        // Mock successful response
        const mockResponse = {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
                id: 1,
                email: email,
                firstName: 'John',
                lastName: 'Doe'
            }
        };
        
        // Store token and user data
        localStorage.setItem(TOKEN_KEY, mockResponse.token);
        localStorage.setItem(USER_KEY, JSON.stringify(mockResponse.user));
        
        showToast('Successfully signed in!', 'success');
        
        // Redirect to dashboard after 1 second
        setTimeout(() => {
            window.location.href = '/dashboard.html';
        }, 1000);
        
    } catch (error) {
        showError('signinError', error.message || 'Invalid credentials. Please try again.');
        showToast('Sign in failed', 'error');
    } finally {
        // Reset button state
        signinBtn.disabled = false;
        btnText.style.opacity = '1';
        spinner.classList.add('hidden');
    }
}

// Handle Sign Up
async function handleSignUp(e) {
    e.preventDefault();
    
    const firstName = document.getElementById('signupFirstName').value;
    const lastName = document.getElementById('signupLastName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;
    const terms = document.getElementById('terms').checked;
    
    const signupBtn = document.getElementById('signupBtn');
    const spinner = document.getElementById('signupSpinner');
    const btnText = signupBtn.querySelector('.btn-text');
    
    // Validate
    if (!firstName || !lastName) {
        showError('signupError', 'Please enter your first and last name');
        return;
    }
    
    if (!validateEmail(email)) {
        showError('signupError', 'Please enter a valid email address');
        return;
    }
    
    if (!validatePassword(password)) {
        showError('signupError', 'Password must be at least 6 characters');
        return;
    }
    
    if (password !== confirmPassword) {
        showError('signupError', 'Passwords do not match');
        return;
    }
    
    if (!terms) {
        showError('signupError', 'You must agree to the terms and conditions');
        return;
    }
    
    // Show loading
    signupBtn.disabled = true;
    btnText.style.opacity = '0.5';
    spinner.classList.remove('hidden');
    
    try {
        // Simulate API call (replace with actual API call)
        await simulateAPICall(1500);
        
        // Mock successful response
        const mockResponse = {
            token: 'mock-jwt-token-' + Date.now(),
            user: {
                id: Date.now(),
                email: email,
                firstName: firstName,
                lastName: lastName
            }
        };
        
        // Store token and user data
        localStorage.setItem(TOKEN_KEY, mockResponse.token);
        localStorage.setItem(USER_KEY, JSON.stringify(mockResponse.user));
        
        showToast('Account created successfully!', 'success');
        
        // Auto switch to sign in after 2 seconds
        setTimeout(() => {
            switchToSignIn();
            showToast('Please sign in with your new account', 'success');
        }, 2000);
        
    } catch (error) {
        showError('signupError', error.message || 'Sign up failed. Please try again.');
        showToast('Sign up failed', 'error');
    } finally {
        // Reset button state
        signupBtn.disabled = false;
        btnText.style.opacity = '1';
        spinner.classList.add('hidden');
    }
}

// Check authentication status
function checkAuthStatus() {
    const token = localStorage.getItem(TOKEN_KEY);
    const user = localStorage.getItem(USER_KEY);
    
    if (token && user) {
        // User is already logged in, redirect to dashboard
        // window.location.href = '/dashboard.html';
    }
}

// Simulate API call delay
function simulateAPICall(delay) {
    return new Promise((resolve, reject) => {
        // Simulate 10% chance of failure
        const shouldFail = Math.random() < 0.1;
        
        setTimeout(() => {
            if (shouldFail) {
                reject(new Error('Network error or server is unavailable'));
            } else {
                resolve();
            }
        }, delay);
    });
}

// Forgot password functionality
document.addEventListener('click', function(e) {
    if (e.target.closest('.forgot-password')) {
        e.preventDefault();
        const email = prompt('Please enter your email address to reset password:');
        if (email && validateEmail(email)) {
            showToast('Password reset link sent to ' + email, 'success');
        } else if (email) {
            showToast('Please enter a valid email address', 'error');
        }
    }
});

// Social login buttons
document.addEventListener('click', function(e) {
    if (e.target.closest('.social')) {
        e.preventDefault();
        showToast('Social login functionality coming soon!', 'info');
    }
});
