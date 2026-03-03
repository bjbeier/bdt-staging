# Tech Stack

Technologies, services, and tooling powering the Blue Droid Technologies site.

---

## Core Technologies

| Technology | Purpose |
|------------|---------|
| HTML5 | Page structure and semantic markup |
| Vanilla CSS | Styling via CSS custom properties (no framework) |
| Vanilla JavaScript | Interactivity (no framework) |
| Emoji Icons | Used in place of an icon library |

---

## Build Tools

| Tool | File | Purpose |
|------|------|---------|
| Node.js build script | `build.js` | Injects shared partials (nav, footer) into HTML pages |
| Sitemap generator | `generate-sitemap.js` | Generates `sitemap.xml` |

---

## Hosting & Deployment

| Item | Details |
|------|---------|
| Hosting | GitHub Pages |
| Custom Domain | `bluedroidtech.com` (via cname file) |
| SSL | Managed by GitHub Pages |

---

## Third-Party Services

| Service | Purpose | Loaded Via |
|---------|---------|------------|
| Google Analytics / Tag Manager | Site analytics | `analytics.js` (gated by cookie consent) |
| Cloudflare Web Analytics | Performance insights | `static.cloudflareinsights.com` |
| Facebook Messenger | Customer contact | External link (`m.me/bluedroidtech`) |

---

## Content Management

The site includes a custom cms under `cms/`:

| File | Purpose |
|------|---------|
| `cms/index.html` | Admin interface for managing blog posts |
| `cms/cms.js` | cms application logic |
| `cms/cms.css` | cms-specific styles |
| `cms/blog-loader.js` | Fetches and renders posts on `blog.html` and `post.html` |
| `cms/posts.json` | Blog post data store |

---

## Shared Partials

Reusable HTML fragments injected at build time by `build.js`:

| Partial | Purpose |
|---------|---------|
| `partials/nav.html` | Shared navigation bar |
| `partials/footer.html` | Shared footer |

---

## Security Headers

Content Security Policy (CSP) is set via a `<meta>` tag in each HTML file, whitelisting:
- Scripts: `self`, Google Tag Manager, Cloudflare Insights
- Styles: `self`, Google Fonts
- Fonts: `self`, Google Fonts (gstatic)
- Images: `self`, data URIs, Google Analytics, placehold.co
- Connections: `self`, Google Analytics, Cloudflare Insights

Additional headers:
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
