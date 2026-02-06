// ==========================================
// IRON PROGRESS - AUTHENTICATION
// ==========================================

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqe_AjvuFAAlhKg_-FEPgpLuenoPZZbBA",
    authDomain: "workout-tracker-67c59.firebaseapp.com",
    projectId: "workout-tracker-67c59",
    storageBucket: "workout-tracker-67c59.firebasestorage.app",
    messagingSenderId: "31262790204",
    appId: "1:31262790204:web:a0c824ba505a0745d92939",
    measurementId: "G-SBEQ0GRZR3"
};

// Demo mode flag - set to false to use real Firebase auth
const DEMO_MODE = false;

// Initialize Firebase (only if not in demo mode)
let auth = null;
if (!DEMO_MODE && typeof firebase !== 'undefined') {
    try {
        firebase.initializeApp(firebaseConfig);
        auth = firebase.auth();
    } catch (e) {
        console.log('Firebase not configured, running in demo mode');
    }
}

// ==========================================
// AUTH STATE
// ==========================================
let currentUser = null;
let authMode = 'login'; // 'login' or 'signup'

// Check auth state on load
document.addEventListener('DOMContentLoaded', () => {
    checkAuthState();
});

function checkAuthState() {
    // Check localStorage for demo user
    const storedUser = localStorage.getItem('ironProgressUser');
    if (storedUser) {
        currentUser = JSON.parse(storedUser);
        handleAuthSuccess(currentUser);
    } else if (auth) {
        // Check Firebase auth state
        auth.onAuthStateChanged((user) => {
            if (user) {
                currentUser = {
                    uid: user.uid,
                    email: user.email,
                    displayName: user.displayName || user.email.split('@')[0],
                    photoURL: user.photoURL
                };
                localStorage.setItem('ironProgressUser', JSON.stringify(currentUser));
                handleAuthSuccess(currentUser);
            }
        });
    }
}

// ==========================================
// AUTH MODAL
// ==========================================
function showAuthModal(mode = 'login') {
    authMode = mode;
    const modal = document.getElementById('auth-modal');
    const title = document.getElementById('modal-title');
    const subtitle = document.getElementById('modal-subtitle');
    const submitBtn = document.getElementById('auth-submit-btn');
    const toggleText = document.getElementById('toggle-text');
    const toggleLink = document.getElementById('toggle-link');

    if (mode === 'login') {
        title.textContent = 'Welcome Back';
        subtitle.textContent = 'Sign in to access your workouts';
        submitBtn.textContent = 'Sign In';
        toggleText.textContent = "Don't have an account?";
        toggleLink.textContent = 'Sign Up';
    } else {
        title.textContent = 'Join Iron Progress';
        subtitle.textContent = 'Create your free account';
        submitBtn.textContent = 'Create Account';
        toggleText.textContent = 'Already have an account?';
        toggleLink.textContent = 'Sign In';
    }

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function hideAuthModal() {
    const modal = document.getElementById('auth-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function toggleAuthMode(e) {
    e.preventDefault();
    showAuthModal(authMode === 'login' ? 'signup' : 'login');
}

// ==========================================
// GOOGLE SIGN IN
// ==========================================
function signInWithGoogle() {
    if (DEMO_MODE) {
        // Demo mode - simulate Google sign in
        const demoUser = {
            uid: 'demo-' + Date.now(),
            email: 'demo@ironprogress.com',
            displayName: 'Demo User',
            photoURL: null
        };
        localStorage.setItem('ironProgressUser', JSON.stringify(demoUser));
        currentUser = demoUser;
        hideAuthModal();
        handleAuthSuccess(demoUser);
        return;
    }

    if (!auth) {
        showNotification('Firebase not configured. Running in demo mode.', false);
        signInWithGoogle(); // Will hit demo mode
        return;
    }

    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then((result) => {
            currentUser = {
                uid: result.user.uid,
                email: result.user.email,
                displayName: result.user.displayName,
                photoURL: result.user.photoURL
            };
            localStorage.setItem('ironProgressUser', JSON.stringify(currentUser));
            hideAuthModal();
            handleAuthSuccess(currentUser);
        })
        .catch((error) => {
            console.error('Google sign-in error:', error);
            showNotification('Sign-in failed. Please try again.', false);
        });
}

// ==========================================
// EMAIL AUTH
// ==========================================
function handleEmailAuth(e) {
    e.preventDefault();

    const email = document.getElementById('auth-email').value;
    const password = document.getElementById('auth-password').value;

    if (DEMO_MODE) {
        // Demo mode - accept any email/password
        const demoUser = {
            uid: 'demo-' + Date.now(),
            email: email,
            displayName: email.split('@')[0],
            photoURL: null
        };
        localStorage.setItem('ironProgressUser', JSON.stringify(demoUser));
        currentUser = demoUser;
        hideAuthModal();
        handleAuthSuccess(demoUser);
        return;
    }

    if (!auth) {
        showNotification('Firebase not configured. Using demo mode.', false);
        return;
    }

    if (authMode === 'signup') {
        auth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                currentUser = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: email.split('@')[0],
                    photoURL: null
                };
                localStorage.setItem('ironProgressUser', JSON.stringify(currentUser));
                hideAuthModal();
                handleAuthSuccess(currentUser);
            })
            .catch((error) => {
                showNotification(error.message, false);
            });
    } else {
        auth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                currentUser = {
                    uid: result.user.uid,
                    email: result.user.email,
                    displayName: result.user.displayName || email.split('@')[0],
                    photoURL: result.user.photoURL
                };
                localStorage.setItem('ironProgressUser', JSON.stringify(currentUser));
                hideAuthModal();
                handleAuthSuccess(currentUser);
            })
            .catch((error) => {
                showNotification(error.message, false);
            });
    }
}

// ==========================================
// AUTH SUCCESS - Redirect to App
// ==========================================
function handleAuthSuccess(user) {
    // Redirect to main app
    if (window.location.pathname.includes('landing')) {
        window.location.href = 'index.html';
    }
}

// ==========================================
// SIGN OUT
// ==========================================
function signOut() {
    if (auth) {
        auth.signOut();
    }
    localStorage.removeItem('ironProgressUser');
    currentUser = null;
    window.location.href = 'landing.html';
}

// ==========================================
// GET CURRENT USER
// ==========================================
function getCurrentUser() {
    if (currentUser) return currentUser;
    const stored = localStorage.getItem('ironProgressUser');
    if (stored) {
        currentUser = JSON.parse(stored);
        return currentUser;
    }
    return null;
}

// ==========================================
// CHECK AUTH FOR PROTECTED PAGES
// ==========================================
function requireAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'landing.html';
        return false;
    }
    return true;
}

// ==========================================
// NOTIFICATION HELPER
// ==========================================
function showNotification(message, isBadge = false) {
    const notification = document.createElement('div');
    notification.className = `notification${isBadge ? ' badge-notification' : ''}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideInRight 0.3s ease-in-out reverse';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}
