// ==================== THEME INITIALIZATION ====================
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
}

// ==================== EMAIL OBFUSCATION UTILITY ====================
// Security Fix: Prevent email scraping by bots
function revealEmail(linkElement) {
    const user = linkElement.getAttribute('data-user');
    const domain = linkElement.getAttribute('data-domain');
    if (user && domain) {
        const email = user + '@' + domain;
        linkElement.href = 'mailto:' + email;
        linkElement.textContent = email;
        linkElement.removeAttribute('data-user');
        linkElement.removeAttribute('data-domain');
    }
}

// ==================== SAFE DOM CREATION UTILITIES ====================
// Security Fix: Replaced innerHTML with safe DOM methods to prevent XSS
function createElement(tag, attributes = {}, content = '') {
    const element = document.createElement(tag);

    for (const [key, value] of Object.entries(attributes)) {
        if (key === 'textContent') {
            element.textContent = value;
        } else if (key === 'innerHTML') {
            // Deliberately avoid innerHTML - this should not be used
            console.warn('innerHTML usage detected - use textContent or appendChildren instead');
        } else {
            element.setAttribute(key, value);
        }
    }

    if (content) {
        element.textContent = content;
    }

    return element;
}

function appendChildren(parent, children) {
    children.forEach(child => {
        if (typeof child === 'string') {
            parent.appendChild(document.createTextNode(child));
        } else if (child instanceof Node) {
            parent.appendChild(child);
        }
    });
}

// ==================== SHARED LAYOUT (NAV + FOOTER) ====================
function sectionHref(id) {
    // Use in-page anchor if the element exists, otherwise link back to index.html with hash
    return document.getElementById(id) ? `#${id}` : `index.html#${id}`;
}

function renderSharedLayout() {
    const header = document.getElementById('site-header');
    const footer = document.getElementById('site-footer');

    if (header) {
        const servicesHref = sectionHref('services');
        const aboutHref = sectionHref('about');
        const contactHref = sectionHref('contact');

        // Security Fix: Using safe DOM construction
        const nav = createElement('nav');
        const navContainer = createElement('div', { class: 'nav-container' });

        // Logo
        const logo = createElement('img', {
            src: 'images/logo.png',
            alt: 'Blue Droid Technologies',
            class: 'logo'
        });
        navContainer.appendChild(logo);

        // Menu toggle button - using HTML entity
        const menuToggle = createElement('button', {
            class: 'menu-toggle',
            'data-menu-toggle': '',
            'aria-label': 'Toggle navigation'
        });
        menuToggle.innerHTML = '&#9776;'; // Hamburger menu icon (safe - no user input)
        navContainer.appendChild(menuToggle);

        // Navigation links
        const navLinks = createElement('ul', { class: 'nav-links', id: 'navLinks' });

        const navItems = [
            { href: 'index.html', text: 'Home' },
            { href: servicesHref, text: 'Services' },
            { href: 'prices.html', text: 'Pricing' },
            { href: 'blog.html', text: 'Blog' },
            { href: aboutHref, text: 'About' },
            { href: contactHref, text: 'Contact' }
        ];

        navItems.forEach(item => {
            const li = createElement('li');
            const a = createElement('a', { href: item.href }, item.text);
            li.appendChild(a);
            navLinks.appendChild(li);
        });

        navContainer.appendChild(navLinks);

        // Phone button
        const phoneBtn = createElement('a', {
            href: 'tel:5132126714',
            class: 'phone-btn'
        });


        const fullText = createElement('span', { class: 'full' });

        fullText.innerHTML = 'Call or Text &bull; (513) 212-6714'; // Safe - no user input

        const shortText = createElement('span', { class: 'short' }, '(513) 212-6714');

        phoneBtn.appendChild(fullText);

        phoneBtn.appendChild(shortText);



        navContainer.appendChild(phoneBtn);

        nav.appendChild(navContainer);

        header.appendChild(nav);

    }



    if (footer) {

        // Security Fix: Using safe DOM construction

        const footerContent = createElement('div', { class: 'footer-content' });



        // Footer Section 1: Company Info

        const section1 = createElement('div', { class: 'footer-section' });

        const h4_1 = createElement('h4', {}, 'Blue Droid Technologies');

        const p1_1 = createElement('p', {}, 'Support Made Simple');

        const p1_2 = createElement('p', {}, 'Milford, OH');

        appendChildren(section1, [h4_1, p1_1, p1_2]);



        // Footer Section 2: Services

        const section2 = createElement('div', { class: 'footer-section' });

        const h4_2 = createElement('h4', {}, 'Services');

        const ul2 = createElement('ul');



        const services = [

            { href: sectionHref('services'), text: 'Residential Support' },

            { href: sectionHref('services'), text: 'Business IT Services' },

            { href: sectionHref('services'), text: 'Electronics Recycling' }

        ];



        services.forEach(service => {

            const li = createElement('li');

            const a = createElement('a', { href: service.href }, service.text);

            li.appendChild(a);

            ul2.appendChild(li);

        });



        section2.appendChild(h4_2);

        section2.appendChild(ul2);



        // Footer Section 3: Quick Links

        const section3 = createElement('div', { class: 'footer-section' });

        const h4_3 = createElement('h4', {}, 'Quick Links');

        const ul3 = createElement('ul');



        const quickLinks = [
            { href: 'index.html', text: 'Home' },
            { href: 'prices.html', text: 'Pricing' },
            { href: 'blog.html', text: 'Blog' },
            { href: sectionHref('about'), text: 'About' },
            { href: sectionHref('contact'), text: 'Contact' }
        ];



        quickLinks.forEach(link => {

            const li = createElement('li');

            const a = createElement('a', { href: link.href }, link.text);

            li.appendChild(a);

            ul3.appendChild(li);

        });



        section3.appendChild(h4_3);

        section3.appendChild(ul3);



        // Footer Section 4: Contact (with obfuscated email)

        const section4 = createElement('div', { class: 'footer-section' });

        const h4_4 = createElement('h4', {}, 'Contact');

        const ul4 = createElement('ul');



        // Phone

        const li4_1 = createElement('li');

        const phone = createElement('a', { href: 'tel:5132126714' }, '(513) 212-6714');

        li4_1.appendChild(phone);



        // Email (obfuscated)

        const li4_2 = createElement('li');

        const emailLink = createElement('a', {

            href: '#',

            id: 'emailLinkFooter',

            'data-user': 'contact',

            'data-domain': 'bluedroidtech.com'

        }, 'Click to reveal email');

        li4_2.appendChild(emailLink);



        // Facebook

        const li4_3 = createElement('li');

        const fbLink = createElement('a', {

            href: 'https://www.facebook.com/bluedroidtech',

            target: '_blank',

            rel: 'noopener noreferrer'

        });



        // Facebook SVG icon

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');

        svg.setAttribute('width', '24');

        svg.setAttribute('height', '24');

        svg.setAttribute('viewBox', '0 0 24 24');

        svg.setAttribute('fill', 'currentColor');

        svg.style.cssText = 'display:inline-block;vertical-align:middle;margin-right:8px;';



        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

        path.setAttribute('d', 'M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.99 3.66 9.13 8.44 9.88v-6.99h-2.54v-2.89h2.54V9.84c0-2.51 1.58-3.88 3.88-3.88 1.13 0 2.3.2 2.3.2v2.53h-1.29c-1.27 0-1.67.79-1.67 1.6v1.92h2.97l-.48 2.89h-2.49V22c4.78-.75 8.44-4.89 8.44-9.88z');

        svg.appendChild(path);



        fbLink.appendChild(svg);

        fbLink.appendChild(document.createTextNode('Facebook'));

        li4_3.appendChild(fbLink);



        ul4.appendChild(li4_1);

        ul4.appendChild(li4_2);

        ul4.appendChild(li4_3);

        section4.appendChild(h4_4);

        section4.appendChild(ul4);



        // Append all sections to footer content

        footerContent.appendChild(section1);

        footerContent.appendChild(section2);

        footerContent.appendChild(section3);

        footerContent.appendChild(section4);



        // Footer bottom with copyright symbol

        const footerBottom = createElement('div', { class: 'footer-bottom' });

        const copyright = createElement('p');

        copyright.innerHTML = '&copy; 2025 Blue Droid Technologies, LLC. All rights reserved.'; // Safe - no user input

        footerBottom.appendChild(copyright);



        footer.appendChild(footerContent);

        footer.appendChild(footerBottom);

    }

}



function initNav() {

    const navLinks = document.getElementById('navLinks');

    const menuToggle = document.querySelector('[data-menu-toggle]');



    if (menuToggle && navLinks) {

        menuToggle.addEventListener('click', () => {

            navLinks.classList.toggle('active');

        });



        // Close mobile menu when clicking a link

        navLinks.querySelectorAll('a').forEach(link => {

            link.addEventListener('click', () => {

                navLinks.classList.remove('active');

            });

        });

    }

}



// ==================== SMOOTH SCROLLING ====================

function initSmoothScroll() {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener('click', function (e) {

            const targetId = this.getAttribute('href');

            const target = document.querySelector(targetId);

            if (target) {

                e.preventDefault();

                target.scrollIntoView({

                    behavior: 'smooth',

                    block: 'start'

                });

            }

        });

    });

}



// ==================== DARK MODE TOGGLE ====================

function initThemeSwitch() {

    const themeSwitch = document.getElementById('themeSwitch');

    if (!themeSwitch) return;

    themeSwitch.addEventListener('click', () => {

        document.documentElement.classList.toggle('dark');

        const isDark = document.documentElement.classList.contains('dark');

        localStorage.setItem('theme', isDark ? 'dark' : 'light');

    });

}

// ==================== FLOATING TOGGLE SCROLL HANDLER ====================
function initFloatingToggle() {
    const toggle = document.getElementById('themeSwitch');
    const hero = document.querySelector('.hero') || document.querySelector('.hero-condensed');

    if (!toggle || !hero) return;

    window.addEventListener('scroll', () => {
        // Calculate trigger point: when hero bottom passes the button
        // Simple logic: if scrolled past 100px.
        // Or if scrolled past hero height relative to viewport.
        // Button is fixed at ~105px from top.
        // If hero bottom is < 105px relative to viewport, then button is over content.

        const rect = hero.getBoundingClientRect();
        const buttonTop = 105; // Approximate fixed top

        // rect.bottom is the distance from viewport top to bottom of hero.
        // If rect.bottom < buttonTop, we are past hero.
        if (rect.bottom < buttonTop + 50) { // +50 buffer
            toggle.classList.add('toggle-scrolled');
        } else {
            toggle.classList.remove('toggle-scrolled');
        }
    });
}

// ==================== ELEGANT PARTICLE MOTION FOR HERO ====================

function initHeroParticles() {

    const heroSection = document.querySelector('.hero');

    if (!heroSection) return;



    const canvas = document.createElement('canvas');

    canvas.style.position = 'absolute';

    canvas.style.top = '0';

    canvas.style.left = '0';

    canvas.style.width = '100%';

    canvas.style.height = '100%';

    canvas.style.zIndex = '2';

    canvas.style.pointerEvents = 'none';

    heroSection.appendChild(canvas);



    const ctx = canvas.getContext('2d');



    function setCanvasDimensions() {

        canvas.width = heroSection.offsetWidth;

        canvas.height = heroSection.offsetHeight;

    }

    setCanvasDimensions();

    window.addEventListener('resize', setCanvasDimensions);



    class Particle {

        constructor() {

            this.reset();

        }



        reset() {

            this.x = Math.random() * canvas.width;

            this.y = Math.random() * canvas.height;

            this.size = Math.random() * 3 + 1;

            this.speedX = Math.random() * 0.3 - 0.15;

            this.speedY = Math.random() * 0.3 - 0.15;

            this.opacity = Math.random() * 0.5 + 0.1;

        }



        update() {

            this.x += this.speedX;

            this.y += this.speedY;



            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {

                this.reset();

            }

        }



        draw() {

            ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;

            ctx.beginPath();

            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);

            ctx.closePath();

            ctx.fill();

        }

    }



    const particlesArray = [];

    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {

        particlesArray.push(new Particle());

    }



    function animate() {

        requestAnimationFrame(animate);

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < particlesArray.length; i++) {

            particlesArray[i].update();

            particlesArray[i].draw();

        }

    }

    animate();

}



// ==================== EMAIL REVEAL INITIALIZATION ====================

function initEmailReveal() {

    // Contact page email link

    const emailLink = document.getElementById('emailLink');

    if (emailLink) {

        emailLink.addEventListener('click', function (e) {

            e.preventDefault();

            revealEmail(this);

        });

    }



    // Footer email link

    const emailLinkFooter = document.getElementById('emailLinkFooter');

    if (emailLinkFooter) {

        emailLinkFooter.addEventListener('click', function (e) {

            e.preventDefault();

            revealEmail(this);

        });

    }

}



// ==================== NEWSLETTER FORM (if present) ====================

function handleNewsletter(event) {

    event.preventDefault();

    alert('Thank you for subscribing! Newsletter feature coming soon.');

    event.target.reset();

}



// ==================== SCROLL REVEAL ANIMATION ====================

let revealObserver;
function initScrollReveal() {
    if (!revealObserver) {
        const revealCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Once animated, we can stop observing this specific element
                    observer.unobserve(entry.target);
                }
            });
        };

        revealObserver = new IntersectionObserver(revealCallback, {
            threshold: 0.15
        });
    }

    document.querySelectorAll('.reveal:not(.active)').forEach(element => {
        revealObserver.observe(element);
    });
}



// ==================== MAIN INIT ====================

document.addEventListener('DOMContentLoaded', () => {

    renderSharedLayout();

    initNav();

    initThemeSwitch();
    initFloatingToggle();
    initSmoothScroll();

    initHeroParticles();

    initEmailReveal(); // Security Fix: Initialize email obfuscation
    initScrollReveal();

});