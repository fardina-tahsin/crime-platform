// Feed page functionality - Vanilla JS
import { addPost, readPost } from '../src/db.js';
import { auth } from '../src/login.js';
import { onAuthStateChanged } from "firebase/auth";

// DOM Elements
const toggleFormBtn = document.getElementById('toggleFormBtn');
const formContainer = document.getElementById('formContainer');
const reportForm = document.getElementById('reportForm');
const errorMessage = document.getElementById('errorMessage');
const postsList = document.getElementById('postsList');

// Form fields
const titleInput = document.getElementById('title');
const descriptionInput = document.getElementById('description');
const divisionInput = document.getElementById('division');
const districtInput = document.getElementById('district');
const crimeTimeInput = document.getElementById('crimeTime');
const imageUrlInput = document.getElementById('imageUrl');
const videoUrlInput = document.getElementById('videoUrl');

// State
let showForm = false;
let currentUser = null;

// Initialize
onAuthStateChanged(auth, (user) => {
    currentUser = user;
});

// Load posts on page load
loadPosts();

// Toggle form visibility
toggleFormBtn.addEventListener('click', () => {
    showForm = !showForm;
    formContainer.classList.toggle('hidden', !showForm);
    toggleFormBtn.textContent = showForm ? 'Cancel' : 'Create New Report';
});

// Handle form submission
reportForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    await handleAddPost();
});

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.classList.remove('hidden');
}

// Hide error message
function hideError() {
    errorMessage.textContent = '';
    errorMessage.classList.add('hidden');
}

// Load all posts
async function loadPosts() {
    postsList.innerHTML = '<p>Loading posts...</p>';
    
    const result = await readPost();
    
    if (result.success) {
        renderPosts(result.posts);
    } else {
        showError(result.error);
        postsList.innerHTML = '<p>Failed to load posts.</p>';
    }
}

// Render posts to DOM
function renderPosts(posts) {
    if (posts.length === 0) {
        postsList.innerHTML = '<p>No reports yet. Be the first to submit one!</p>';
        return;
    }
    
    postsList.innerHTML = posts.map(post => `
        <div class="post-card">
            <h4>${escapeHtml(post.title)}</h4>
            <p class="description">${escapeHtml(post.description)}</p>
            <div class="post-meta">
                <span>📍 ${escapeHtml(post.division)}, ${escapeHtml(post.district)}</span>
                <span>👍 ${post.upvotes || 0} 👎 ${post.downvotes || 0}</span>
                <span>✓ ${((post.verificationScore || 0) * 100).toFixed(0)}%</span>
            </div>
            ${post.imageUrl ? '<p class="media-link">🖼️ Image attached</p>' : ''}
            ${post.videoUrl ? '<p class="media-link">🎥 Video attached</p>' : ''}
            <p class="timestamp">Incident: ${formatDate(post.crimeTime)}</p>
            <p class="timestamp">Posted: ${formatDate(post.postedAt)}</p>
            <p class="reporter-id">Reporter: ${escapeHtml(post.reporterId || 'anonymous')}</p>
            ${renderComments(post.comments)}
        </div>
    `).join('');
}

// Render comments section
function renderComments(comments) {
    if (!comments || comments.length === 0) return '';
    
    return `
        <div class="comments">
            <h5>Comments (${comments.length})</h5>
            ${comments.map(comment => `
                <div class="comment">
                    <p>${escapeHtml(comment.text)}</p>
                    <span class="comment-meta">- ${escapeHtml(comment.userId)} at ${formatDate(comment.createdAt)}</span>
                </div>
            `).join('')}
        </div>
    `;
}

// Handle adding a new post
async function handleAddPost() {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();
    const division = divisionInput.value.trim();
    const district = districtInput.value.trim();
    const crimeTime = crimeTimeInput.value;
    const imageUrl = imageUrlInput.value.trim();
    const videoUrl = videoUrlInput.value.trim();
    
    if (!title || !description || !division || !district || !crimeTime) {
        showError('Please fill in all required fields');
        return;
    }
    
    hideError();
    
    const upvotes = 0;
    const downvotes = 0;
    const verificationScore = 0;
    
    const post = {
        title,
        description,
        imageUrl: imageUrl || null,
        videoUrl: videoUrl || null,
        division,
        district,
        postedAt: new Date().toISOString(),
        crimeTime: new Date(crimeTime).toISOString(),
        reporterId: currentUser?.uid || 'anonymous',
        upvotes,
        downvotes,
        verificationScore,
        comments: []
    };
    
    const result = await addPost(post);
    
    if (result.success) {
        // Clear form
        reportForm.reset();
        showForm = false;
        formContainer.classList.add('hidden');
        toggleFormBtn.textContent = 'Create New Report';
        
        // Reload posts
        await loadPosts();
    } else {
        showError(result.error);
    }
}

// Utility: Escape HTML to prevent XSS
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Utility: Format date
function formatDate(dateString) {
    if (!dateString) return 'Unknown';
    try {
        return new Date(dateString).toLocaleString();
    } catch {
        return 'Invalid date';
    }
}
