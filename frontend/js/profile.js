// Profile page functionality
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fireApp } from '../../firebase-config.js';

const auth = getAuth(fireApp);

// DOM Elements
const userEmail = document.getElementById('userEmail');
const userPhone = document.getElementById('userPhone');
const userBio = document.getElementById('userBio');
const userContact = document.getElementById('userContact');
const profileImage = document.getElementById('profileImage');
const reportsList = document.getElementById('reportsList');

// Check auth state and load profile
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in
        userEmail.textContent = user.email || 'No email';
        userPhone.textContent = user.phoneNumber || 'No phone number';
        
        // Load saved profile data from localStorage
        const savedBio = localStorage.getItem('userBio');
        const savedContact = localStorage.getItem('userContact');
        const savedImage = localStorage.getItem('profileImage');
        
        if (savedBio) userBio.textContent = `Bio: ${savedBio}`;
        if (savedContact) userContact.textContent = `Contact: ${savedContact}`;
        if (savedImage) profileImage.src = savedImage;
        
        // Load user's reports (placeholder)
        loadUserReports();
    } else {
        // User is not signed in, redirect to login
        window.location.href = 'login.html';
    }
});

function loadUserReports() {
    // Placeholder for user's crime reports
    reportsList.innerHTML = '<p>No reports submitted yet.</p>';
}
