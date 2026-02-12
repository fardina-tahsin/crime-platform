// Edit Profile page functionality
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fireApp } from '../../firebase-config.js';

const auth = getAuth(fireApp);

// DOM Elements
const bioInput = document.getElementById('bio');
const contactInput = document.getElementById('contact');
const profileImageInput = document.getElementById('newProfileImage');
const saveBtn = document.getElementById('saveBtn');

// Check auth state
onAuthStateChanged(auth, (user) => {
    if (user) {
        // Load existing data
        const savedBio = localStorage.getItem('userBio');
        const savedContact = localStorage.getItem('userContact');
        
        if (savedBio) bioInput.value = savedBio;
        if (savedContact) contactInput.value = savedContact;
    } else {
        // User is not signed in, redirect to login
        window.location.href = 'login.html';
    }
});

// Save profile changes
saveBtn.addEventListener('click', () => {
    const bio = bioInput.value.trim();
    const contact = contactInput.value.trim();
    
    // Save to localStorage
    if (bio) localStorage.setItem('userBio', bio);
    if (contact) localStorage.setItem('userContact', contact);
    
    // Handle profile image
    const file = profileImageInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            localStorage.setItem('profileImage', e.target.result);
            alert('Profile updated successfully!');
            window.location.href = 'profile.html';
        };
        reader.readAsDataURL(file);
    } else {
        alert('Profile updated successfully!');
        window.location.href = 'profile.html';
    }
});
