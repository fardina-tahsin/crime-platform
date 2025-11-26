// Main entry point - currently not used since each page has its own script
// This file can be used for shared functionality across pages

import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fireApp } from '../../firebase-config.js';

const auth = getAuth(fireApp);

// Export auth state checker for use in other modules
export function checkAuthState(callback) {
    onAuthStateChanged(auth, callback);
}

// Export auth instance
export { auth };
