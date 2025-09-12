const ADMIN_PASSWORD = 'admin123'; 

const loginSection = document.getElementById('login-section');
const adminContentSection = document.getElementById('admin-content-section');
const loginForm = document.getElementById('login-form');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('login-error');
const logoutButton = document.getElementById('logout-button');

function checkAuth() {
    if (sessionStorage.getItem('isAdmin') === 'true') {
        showAdminContent();
    } else {
        showLogin();
    }
}

function showAdminContent() {
    loginSection.style.display = 'none';
    adminContentSection.style.display = 'block';
}

function showLogin() {
    loginSection.style.display = 'flex';
    adminContentSection.style.display = 'none';
}

loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const enteredPassword = passwordInput.value;

    if (enteredPassword === ADMIN_PASSWORD) {
        sessionStorage.setItem('isAdmin', 'true');
        loginError.style.display = 'none';
        showAdminContent();
    } else {
        loginError.style.display = 'block';
    }
    passwordInput.value = '';
});

logoutButton.addEventListener('click', () => {
    sessionStorage.removeItem('isAdmin');
    showLogin();
});

document.addEventListener('DOMContentLoaded', checkAuth);