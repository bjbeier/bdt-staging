/**
 * Simple CMS - Blog Loader (BDT Adapted)
 */

const CMS_CONFIG = {
    postsUrl: 'CMS/posts.json'
};

async function fetchBlogPosts() {
    try {
        const response = await fetch(CMS_CONFIG.postsUrl);
        if (!response.ok) throw new Error('Failed to load posts');
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        return [];
    }
}

async function loadPosts(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = '<div class="text-center animate-pulse">Loading articles...</div>';
    const posts = await fetchBlogPosts();

    if (posts.length === 0) {
        container.innerHTML = '<div class="text-center">No articles found. Check back later!</div>';
        return;
    }

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    const html = posts.map(post => {
        const tagsHtml = (post.tags || []).map(t => `#${t}`).join(' ');
        return `
        <article class="blog-card">
            ${post.image ? `<div class="blog-card-image"><img src="${post.image}" alt="${post.title}"></div>` : ''}
            <div class="blog-card-content">
                <header>
                    <div class="blog-meta">
                        <span>${formatDate(post.date)}</span>
                        <span class="blog-tags">${tagsHtml}</span>
                    </div>
                    <h3>
                        <a href="post.html?slug=${post.slug}">${post.title}</a>
                    </h3>
                </header>
                <p>${post.summary || ''}</p>
                <div class="blog-card-footer">
                    <a href="post.html?slug=${post.slug}" class="read-more">Read Full Article &rarr;</a>
                </div>
            </div>
        </article>
        `;
    }).join('');

    container.innerHTML = html;
}

async function loadSinglePost(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
        container.innerHTML = '<div class="text-center text-red-500">Article not specified.</div>';
        return;
    }

    container.innerHTML = '<div class="text-center animate-pulse">Loading article...</div>';
    const posts = await fetchBlogPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
        container.innerHTML = '<div class="text-center py-20"><h1>404</h1><p>Article not found.</p><a href="blog.html">Return to Blog</a></div>';
        document.title = 'Post Not Found | BDT';
        return;
    }

    document.title = `${post.title} | BDT`;
    const tagsHtml = (post.tags || []).map(t => `#${t}`).join(' ');

    container.innerHTML = `
        <article class="blog-post-content">
            <header class="blog-post-header">
                <div class="blog-meta">${formatDate(post.date)} | <span class="blog-tags">${tagsHtml}</span></div>
                <h1 class="post-title">${post.title}</h1>
                ${post.image ? `<img src="${post.image}" alt="${post.title}" class="post-featured-image">` : ''}
            </header>
            <div class="post-body">
                ${post.content}
            </div>
            <div class="post-footer">
                <a href="blog.html" class="cta-button">Back to All Posts</a>
            </div>
        </article>
    `;
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
