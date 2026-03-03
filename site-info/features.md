# Site Features

A living inventory of every section and interactive element on the Blue Droid Technologies site.

---

## Page Sections

### Navigation
- Sticky header with backdrop blur
- Logo image (`images/logo.png`)
- Links: Home, Services, Pricing, Blog, About, Contact
- "Call or Text" phone button (responsive — full text on desktop, number only on mobile/tablet)
- Hamburger menu toggle on mobile

### Hero
- Full-width background image (`images/blue-laptop.webp`) with blue overlay
- Headline: "Support Made Simple"
- Subtext: "Your local tech expert with over 20 years experience"
- CTA button → Contact section

### Trust Indicators
- 3-col grid: Locally Owned & Operated, 20+ Years Experience, Personal Service
- Emoji icons, alternating background

### Services (`#services`)
- **Residential Services** (6 cards): WiFi Dead Zones & Setup, Electronics Recycling, Smartphone & Tablet Help, Smart Home Setup, Home Office Setup, PC & Laptop Repair
- **Small Business Services** (4 cards): IT Support, Network & Mesh Installation, Security Solutions, Device Management

### About (`#about`)
- Two-column layout: text + photo (`images/bjbeier.webp`)
- Company story, mission, and discount mention (first responders, veterans, teachers)

### Contact (`#contact`)
- 3-col grid: Call or Text, Email (obfuscated via JS), Facebook Messenger

### Footer
- 4-col grid: Company info, Services links, Quick Links, Contact (phone, email, Facebook)

---

## Interactive Elements

| Element | Description |
|---------|-------------|
| **Mobile Menu** | Hamburger toggle for nav links on small screens |
| **Scroll Reveal** | Elements animate in on scroll via `.reveal` class |
| **Email Obfuscation** | Email address assembled via JS `data-user`/`data-domain` attributes |
| **Cookie Consent Banner** | Controls analytics scripts |
| **Active Nav Highlighting** | Current page/section highlighted in navigation |

---

## Additional Pages

| Page | File | Description |
|------|------|-------------|
| Pricing | `prices.html` | Service pricing with tiers |
| Blog Index | `blog.html` | Lists blog posts pulled from cms |
| Blog Post | `post.html` | Single-post template |
| cms | `cms/index.html` | Content management interface for blog posts |
