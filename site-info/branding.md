# Branding & Visual Identity

Design tokens, color palette, and visual guidelines for the Blue Droid Technologies site.

---

## Color Palette

All colors are defined as CSS custom properties in `styles.css` under `:root`.

### Core Palette

| Variable | Hex | Usage |
|----------|-----|-------|
| `--clr-blue` | `#4169E1` | Primary brand color (Royal Blue) |
| `--clr-blue-alt` | `#5B7FE8` | Primary in dark mode |
| `--clr-slate` | `#2C3E50` | Dark text / footer background |
| `--clr-slate-dark` | `#0f172a` | Dark mode background |
| `--clr-gray-light` | `#E2E8F0` | Alt background (light mode) |
| `--clr-gray-dark` | `#1e293b` | Alt background (dark mode) |
| `--clr-white` | `#FFFFFF` | Light mode background |
| `--clr-indigo` | `#e0e7ff` | Dark mode text |

### Semantic Mappings (Light Mode Default)

| Variable | Value | Purpose |
|----------|-------|---------|
| `--primary` | `--clr-blue` | Accent color, headings, links |
| `--bg-main` | `--clr-white` | Page background |
| `--bg-alt` | `--clr-gray-light` | Alternating section backgrounds |
| `--text-main` | `--clr-slate` | Body text |
| `--text-muted` | `#666` | Secondary text |
| `--card-bg` | `--clr-white` | Card backgrounds |
| `--card-border` | `#e5e7eb` | Card borders |
| `--nav-bg` | `rgba(255,255,255,0.7)` | Frosted glass navigation |
| `--hero-overlay` | `rgba(65,105,225,0.7)` | Blue overlay on hero image |
| `--on-primary` | `#FFFFFF` | Text on primary-colored elements |

Dark mode overrides are applied automatically via `@media (prefers-color-scheme: dark)`.

---

## Typography

| Role | Font Family | Source |
|------|-------------|--------|
| Primary (all text) | System stack | `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif` |

No external font CDN is used — the site relies on the native system font stack for performance.

---

## Logo

- **File**: `images/logo.png` (1500×450)
- Displayed in the navbar, scaled to 50px height
- No text-based fallback

---

## Design Patterns

- **Light/dark mode** — automatic via `prefers-color-scheme` media query
- **Card-based layout** — service cards, contact cards, blog cards with hover lift effects
- **Frosted glass nav** — `backdrop-filter: blur(12px)` with semi-transparent background
- **Reveal on scroll** — `.reveal` class for fade-in animations
- **Responsive** — mobile-first with breakpoints at 480px, 768px, and 1024px

---

## Tone & Voice

- **Approachable and personal** — first-person ("I'm here to help"), plain English, no jargon
- **Trust-focused** — emphasizes local ownership, experience, and personal service
- **Tagline**: "Support Made Simple"
- **Target audience**: Residential users and small businesses in Milford, OH area
- **Discounts**: Special pricing for first responders, veterans, and teachers
