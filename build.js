/**
 * build.js
 * Injects shared nav and footer partials into all HTML pages.
 * Run with: node build.js
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const PARTIALS_DIR = path.join(ROOT, 'partials');

const NAV_PLACEHOLDER = '<!-- NAV_PLACEHOLDER -->';
const FOOTER_PLACEHOLDER = '<!-- FOOTER_PLACEHOLDER -->';

const PAGES = [
    'index.html',
    'prices.html',
    'blog.html',
    'post.html',
];

function main() {
    const nav = fs.readFileSync(path.join(PARTIALS_DIR, 'nav.html'), 'utf8').trim();
    const footer = fs.readFileSync(path.join(PARTIALS_DIR, 'footer.html'), 'utf8').trim();

    let anyError = false;

    for (const page of PAGES) {
        const filePath = path.join(ROOT, page);

        if (!fs.existsSync(filePath)) {
            console.warn(`  [SKIP] ${page} not found.`);
            continue;
        }

        let html = fs.readFileSync(filePath, 'utf8');
        let changed = false;

        if (html.includes(NAV_PLACEHOLDER)) {
            html = html.replace(NAV_PLACEHOLDER, nav);
            changed = true;
        } else {
            console.warn(`  [WARN] ${page}: NAV_PLACEHOLDER not found.`);
            anyError = true;
        }

        if (html.includes(FOOTER_PLACEHOLDER)) {
            html = html.replace(FOOTER_PLACEHOLDER, footer);
            changed = true;
        } else {
            console.warn(`  [WARN] ${page}: FOOTER_PLACEHOLDER not found.`);
            anyError = true;
        }

        if (changed) {
            fs.writeFileSync(filePath, html, 'utf8');
            console.log(`  [OK]   ${page} updated.`);
        }
    }

    if (anyError) {
        console.log('\nBuild completed with warnings. Check the output above.');
    } else {
        console.log('\nBuild complete. All pages updated successfully.');
    }
}

main();
