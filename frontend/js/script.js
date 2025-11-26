// --- Tabs ---
const tabs = document.querySelectorAll('.tab-btn');
const sections = document.querySelectorAll('.auth-section');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        const target = tab.dataset.target;
        sections.forEach(s => {
            if(s.id === target) s.classList.add('active');
            else s.classList.remove('active');
        });
    });
});

// --- Login ---
document.getElementById('login-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Logged in successfully!');
    window.location.href = 'index.html';
});

// --- Signup ---
document.getElementById('signup-form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Registered successfully!');
    window.location.href = 'index.html';
});

// --- Google login placeholder ---
document.getElementById('google-login-btn').addEventListener('click', () => {
    alert('Redirecting to Google Auth...');
});
document.getElementById('signup-google-btn').addEventListener('click', () => {
    alert('Redirecting to Google Auth...');
});

// --- Phone OTP login ---
const phoneLoginForm = document.getElementById('phone-login-form');
const otpLoginSection = document.getElementById('otp-section-login');
const backFromOtpLogin = document.getElementById('back-from-otp-login');

phoneLoginForm.addEventListener('submit', e => {
    e.preventDefault();
    phoneLoginForm.style.display = 'none';
    otpLoginSection.classList.remove('hidden');
});

backFromOtpLogin.addEventListener('click', () => {
    otpLoginSection.classList.add('hidden');
    phoneLoginForm.style.display = 'block';
});

document.getElementById('otp-form-login').addEventListener('submit', e => {
    e.preventDefault();
    alert('Phone login verified! Redirecting...');
    window.location.href = 'index.html';
});

// --- Phone OTP signup ---
const otpSignupSection = document.getElementById('otp-section-signup');
const backFromOtpSignup = document.getElementById('back-from-otp-signup');
document.getElementById('signup-phone-btn').addEventListener('click', () => {
    otpSignupSection.classList.remove('hidden');
});
backFromOtpSignup?.addEventListener('click', () => {
    otpSignupSection.classList.add('hidden');
});

// --- Forgot Password ---
const forgotBtn = document.getElementById('forgot-password-btn');
const forgotSection = document.getElementById('forgot-password-section');
const backToLogin = document.getElementById('back-to-login');

forgotBtn?.addEventListener('click', () => {
    sections.forEach(s => s.classList.remove('active'));
    forgotSection.classList.add('active');
});

backToLogin?.addEventListener('click', () => {
    forgotSection.classList.remove('active');
    document.getElementById('login-section').classList.add('active');
});
