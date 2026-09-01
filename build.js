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
    'business.html',
    'recycling.html',
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

        // Inject Navigation
        if (html.includes(NAV_PLACEHOLDER)) {
            html = html.replace(NAV_PLACEHOLDER, nav);
            changed = true;
        } else {
            const navRegex = /<header id="site-header">[\s\S]*?<\/header>/;
            if (navRegex.test(html)) {
                html = html.replace(navRegex, `<header id="site-header">\n${nav}\n    </header>`);
                changed = true;
            } else {
                console.warn(`  [WARN] ${page}: Navigation placeholder or <header id="site-header"> not found.`);
                anyError = true;
            }
        }

        // Inject Footer
        if (html.includes(FOOTER_PLACEHOLDER)) {
            html = html.replace(FOOTER_PLACEHOLDER, footer);
            changed = true;
        } else {
            const footerRegex = /<footer id="site-footer">[\s\S]*?<\/footer>/;
            if (footerRegex.test(html)) {
                html = html.replace(footerRegex, `<footer id="site-footer">\n${footer}\n    </footer>`);
                changed = true;
            } else {
                console.warn(`  [WARN] ${page}: Footer placeholder or <footer id="site-footer"> not found.`);
                anyError = true;
            }
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
