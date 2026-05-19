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

    container.innerHTML = '';
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'text-center animate-pulse';
    loadingDiv.textContent = 'Loading articles...';
    container.appendChild(loadingDiv);
    const posts = await fetchBlogPosts();

    if (posts.length === 0) {
        container.innerHTML = '';
        const noArticlesDiv = document.createElement('div');
        noArticlesDiv.className = 'text-center';
        noArticlesDiv.textContent = 'No articles found. Check back later!';
        container.appendChild(noArticlesDiv);
        return;
    }

    posts.sort((a, b) => new Date(b.date) - new Date(a.date));

    container.innerHTML = '';
    posts.forEach(post => {
        const article = document.createElement('article');
        article.className = 'blog-card reveal';

        if (post.image) {
            const imgDiv = document.createElement('div');
            imgDiv.className = 'blog-card-image';
            const img = document.createElement('img');
            img.src = post.image;
            img.alt = post.title;
            imgDiv.appendChild(img);
            article.appendChild(imgDiv);
        }

        const contentDiv = document.createElement('div');
        contentDiv.className = 'blog-card-content';

        const header = document.createElement('header');
        
        const metaDiv = document.createElement('div');
        metaDiv.className = 'blog-meta';
        
        const dateSpan = document.createElement('span');
        dateSpan.textContent = formatDate(post.date);
        metaDiv.appendChild(dateSpan);

        const tagsSpan = document.createElement('span');
        tagsSpan.className = 'blog-tags';
        tagsSpan.textContent = (post.tags || []).map(t => `#${t}`).join(' ');
        metaDiv.appendChild(tagsSpan);

        header.appendChild(metaDiv);

        const h3 = document.createElement('h3');
        const titleLink = document.createElement('a');
        titleLink.href = `post.html?slug=${post.slug}`;
        titleLink.textContent = post.title;
        h3.appendChild(titleLink);
        header.appendChild(h3);

        contentDiv.appendChild(header);

        const summaryP = document.createElement('p');
        summaryP.textContent = post.summary || '';
        contentDiv.appendChild(summaryP);

        const footerDiv = document.createElement('div');
        footerDiv.className = 'blog-card-footer';
        const readMoreLink = document.createElement('a');
        readMoreLink.href = `post.html?slug=${post.slug}`;
        readMoreLink.className = 'read-more';
        readMoreLink.innerHTML = 'Read Full Article &rarr;';
        footerDiv.appendChild(readMoreLink);
        
        contentDiv.appendChild(footerDiv);
        article.appendChild(contentDiv);
        container.appendChild(article);
    });
    if (typeof initScrollReveal === 'function') {
        initScrollReveal();
    }
}

async function loadSinglePost(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const slug = params.get('slug');

    if (!slug) {
        container.innerHTML = '';
        const noSlugDiv = document.createElement('div');
        noSlugDiv.className = 'text-center text-red-500';
        noSlugDiv.textContent = 'Article not specified.';
        container.appendChild(noSlugDiv);
        return;
    }

    container.innerHTML = '';
    const loadingSingleDiv = document.createElement('div');
    loadingSingleDiv.className = 'text-center animate-pulse';
    loadingSingleDiv.textContent = 'Loading article...';
    container.appendChild(loadingSingleDiv);
    const posts = await fetchBlogPosts();
    const post = posts.find(p => p.slug === slug);

    if (!post) {
        container.innerHTML = '';
        const errorContainer = document.createElement('div');
        errorContainer.className = 'text-center py-20';
        
        const h1 = document.createElement('h1');
        h1.textContent = '404';
        errorContainer.appendChild(h1);
        
        const p = document.createElement('p');
        p.textContent = 'Article not found.';
        errorContainer.appendChild(p);
        
        const backLink = document.createElement('a');
        backLink.href = 'blog.html';
        backLink.textContent = 'Return to Blog';
        errorContainer.appendChild(backLink);
        
        container.appendChild(errorContainer);
        document.title = 'Post Not Found | BDT';
        return;
    }

    document.title = `${post.title} | BDT`;
    const tagsHtml = (post.tags || []).map(t => `#${t}`).join(' ');

    container.innerHTML = '';
    const article = document.createElement('article');
    article.className = 'blog-post-content reveal';

    const header = document.createElement('header');
    header.className = 'blog-post-header reveal';

    const metaDiv = document.createElement('div');
    metaDiv.className = 'blog-meta';
    metaDiv.textContent = `${formatDate(post.date)} | `;
    const tagsSpan = document.createElement('span');
    tagsSpan.className = 'blog-tags';
    tagsSpan.textContent = tagsHtml;
    metaDiv.appendChild(tagsSpan);
    header.appendChild(metaDiv);

    const titleH1 = document.createElement('h1');
    titleH1.className = 'post-title';
    titleH1.textContent = post.title;
    header.appendChild(titleH1);

    if (post.image) {
        const img = document.createElement('img');
        img.src = post.image;
        img.alt = post.title;
        img.className = 'post-featured-image reveal';
        header.appendChild(img);
    }
    article.appendChild(header);

    const bodyDiv = document.createElement('div');
    bodyDiv.className = 'post-body reveal';
    bodyDiv.innerHTML = post.content;
    article.appendChild(bodyDiv);

    const footerDiv = document.createElement('div');
    footerDiv.className = 'post-footer reveal';
    const ctaLink = document.createElement('a');
    ctaLink.href = 'blog.html';
    ctaLink.className = 'cta-button';
    ctaLink.textContent = 'Back to All Posts';
    footerDiv.appendChild(ctaLink);
    article.appendChild(footerDiv);

    container.appendChild(article);
    if (typeof initScrollReveal === 'function') {
        initScrollReveal();
    }
}

function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}
