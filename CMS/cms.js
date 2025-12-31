/**
 * BDT CMS - Admin Logic
 * Handles GitHub API integration and UI state.
 */

const GITHUB_API_BASE = 'https://api.github.com';
let posts = [];
let currentSha = '';
let config = {
    owner: '',
    repo: '',
    branch: 'main',
    token: ''
};

// DOM Elements
const postListEl = document.getElementById('post-list');
const editorModal = document.getElementById('editor-modal');
const settingsModal = document.getElementById('settings-modal');
const postForm = document.getElementById('post-form');
const settingsForm = document.getElementById('settings-form');
const statusEl = document.getElementById('status-bar');
const statusMsg = document.getElementById('status-msg');

function init() {
    loadConfig();

    if (!config.token || !config.repo) {
        showSettings();
    } else {
        fetchPosts();
    }

    // Event Listeners
    document.getElementById('btn-new-post').addEventListener('click', () => openEditor());
    document.getElementById('btn-settings').addEventListener('click', showSettings);
    document.getElementById('btn-close-editor').addEventListener('click', closeEditor);
    document.getElementById('btn-close-settings').addEventListener('click', closeSettings);

    postForm.addEventListener('submit', handlePostSave);
    settingsForm.addEventListener('submit', handleSettingsSave);
}

function loadConfig() {
    const saved = localStorage.getItem('cms_config_bdt');
    if (saved) {
        config = JSON.parse(saved);
        document.getElementById('setting-owner').value = config.owner || '';
        document.getElementById('setting-repo').value = config.repo || '';
        document.getElementById('setting-branch').value = config.branch || 'main';
        document.getElementById('setting-token').value = config.token || '';
    }
}

function handleSettingsSave(e) {
    e.preventDefault();
    config.owner = document.getElementById('setting-owner').value.trim();
    config.repo = document.getElementById('setting-repo').value.trim();
    config.branch = document.getElementById('setting-branch').value.trim();
    config.token = document.getElementById('setting-token').value.trim();

    localStorage.setItem('cms_config_bdt', JSON.stringify(config));
    closeSettings();
    showToast('Settings saved.');
    fetchPosts();
}

async function fetchPosts() {
    showToast('Loading from GitHub...', 'info');
    postListEl.innerHTML = '<div style="grid-column: 1/-1; text-align:center; padding:2rem;">Loading...</div>';

    try {
        const path = 'CMS/posts.json';
        const url = `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`;

        const response = await fetch(url, {
            headers: {
                'Authorization': `token ${config.token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            if (response.status === 404) {
                posts = [];
                currentSha = '';
                renderPosts();
                return;
            }
            throw new Error(`GitHub Error: ${response.status}`);
        }

        const data = await response.json();
        currentSha = data.sha;
        const cleanContent = data.content.replace(/\n/g, '');
        const content = atob(cleanContent);
        const jsonStr = decodeURIComponent(escape(content));
        posts = JSON.parse(jsonStr);

        renderPosts();
        showToast('Blog loaded.');

    } catch (error) {
        console.error(error);
        postListEl.innerHTML = `<div style="grid-column: 1/-1; text-align:center; color:red;">Error: ${error.message}</div>`;
        showToast('Error loading blog', 'error');
    }
}

async function savePostsToGitHub() {
    showToast('Syncing...', 'info');

    try {
        const path = 'CMS/posts.json';
        const url = `${GITHUB_API_BASE}/repos/${config.owner}/${config.repo}/contents/${path}?ref=${config.branch}`;

        const jsonStr = JSON.stringify(posts, null, 2);
        const contentEncoded = btoa(unescape(encodeURIComponent(jsonStr)));

        const body = {
            message: `Update posts [BDT CMS]`,
            content: contentEncoded,
            branch: config.branch
        };

        if (currentSha) body.sha = currentSha;

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `token ${config.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errData = await response.json();
            throw new Error(`Failed to save: ${errData.message}`);
        }

        const data = await response.json();
        currentSha = data.content.sha;
        showToast('Synced to GitHub.');

    } catch (error) {
        console.error(error);
        showToast(`Error: ${error.message}`, 'error');
    }
}

function renderPosts() {
    postListEl.innerHTML = '';

    if (posts.length === 0) {
        postListEl.innerHTML = '<div style="grid-column:1/-1; text-align:center; opacity:0.6;">No posts. Create your first one!</div>';
        return;
    }

    const sorted = [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));

    sorted.forEach(post => {
        const card = document.createElement('div');
        card.className = 'post-card';
        card.innerHTML = `
            <div style="font-size:0.8rem; opacity:0.6; margin-bottom:0.5rem">${post.date}</div>
            <h3 style="margin-bottom:0.5rem">${escapeHtml(post.title)}</h3>
            <p style="font-size:0.9rem; opacity:0.8; margin-bottom:1.5rem">${escapeHtml(post.summary || '')}</p>
            <div style="display:flex; gap:0.5rem; justify-content:flex-end">
                <button class="btn" style="padding:0.4rem 0.8rem; font-size:0.85rem" onclick="editPost('${post.id}')">Edit</button>
                <button class="btn" style="padding:0.4rem 0.8rem; font-size:0.85rem; color:red; border-color:red" onclick="deletePost('${post.id}')">Delete</button>
            </div>
        `;
        postListEl.appendChild(card);
    });
}

function openEditor(postId = null) {
    postForm.reset();

    if (postId) {
        const post = posts.find(p => p.id === postId);
        if (post) {
            document.getElementById('post-id').value = post.id;
            document.getElementById('post-title').value = post.title;
            document.getElementById('post-slug').value = post.slug;
            document.getElementById('post-date').value = post.date;
            document.getElementById('post-summary').value = post.summary || '';
            document.getElementById('post-content').value = post.content || '';
            document.getElementById('post-tags').value = (post.tags || []).join(', ');
            document.getElementById('modal-title').innerText = 'Edit Post';
        }
    } else {
        document.getElementById('post-id').value = crypto.randomUUID();
        document.getElementById('post-date').value = new Date().toISOString().split('T')[0];
        document.getElementById('modal-title').innerText = 'New Post';
    }

    editorModal.classList.add('open');
}

function handlePostSave(e) {
    e.preventDefault();

    const id = document.getElementById('post-id').value;
    const newPost = {
        id: id,
        title: document.getElementById('post-title').value,
        slug: document.getElementById('post-slug').value,
        date: document.getElementById('post-date').value,
        summary: document.getElementById('post-summary').value,
        content: document.getElementById('post-content').value,
        tags: document.getElementById('post-tags').value.split(',').map(t => t.trim()).filter(t => t)
    };

    const existingIndex = posts.findIndex(p => p.id === id);
    if (existingIndex >= 0) posts[existingIndex] = newPost;
    else posts.push(newPost);

    renderPosts();
    closeEditor();
    savePostsToGitHub();
}

window.editPost = (id) => openEditor(id);
window.deletePost = (id) => {
    if (confirm('Delete this post?')) {
        posts = posts.filter(p => p.id !== id);
        renderPosts();
        savePostsToGitHub();
    }
};

function closeEditor() { editorModal.classList.remove('open'); }
function showSettings() { settingsModal.classList.add('open'); }
function closeSettings() { settingsModal.classList.remove('open'); }

function showToast(msg) {
    statusMsg.innerText = msg;
    statusEl.classList.add('show');
    setTimeout(() => statusEl.classList.remove('show'), 3000);
}

function escapeHtml(text) {
    if (!text) return '';
    return text.replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": "&#39;" }[m]));
}

document.getElementById('post-title').addEventListener('input', (e) => {
    const slugInput = document.getElementById('post-slug');
    if (document.activeElement !== slugInput) {
        slugInput.value = e.target.value.toLowerCase().replace(/[^\w ]+/g, '').replace(/ +/g, '-');
    }
});

init();
