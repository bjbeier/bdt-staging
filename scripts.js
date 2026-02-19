
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
    document.addEventListener('click', function (e) {
        const anchor = e.target.closest('a[href^="#"]');
        if (!anchor) return;

        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();

            const headerOffset = 80;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition - headerOffset;
            const duration = 1200;
            let start = null;

            function easeInOutCubic(t) {
                return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
            }

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutCubic(Math.min(timeElapsed / duration, 1));

                window.scrollTo(0, startPosition + (distance * run));

                if (timeElapsed < duration) {
                    requestAnimationFrame(animation);
                }
            }

            requestAnimationFrame(animation);
        }
    });
}



// ==================== DARK MODE TOGGLE ====================



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

    initNav();

    initSmoothScroll();

    initHeroParticles();

    initEmailReveal(); // Security Fix: Initialize email obfuscation
    initScrollReveal();
    initBackToTop();

});
// ==================== BACK TO TOP BUTTON INITIALIZATION ====================
function initBackToTop() {
    if (!document.body.id) document.body.id = 'top';

    const bttWrapper = document.createElement('div');
    bttWrapper.className = 'back-to-top-wrapper';

    const bttButton = document.createElement('a');
    bttButton.href = '#top';
    bttButton.className = 'back-to-top-button';
    bttButton.setAttribute('aria-label', 'Back to top');
    bttButton.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>`;

    bttWrapper.appendChild(bttButton);
    document.body.appendChild(bttWrapper);

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            bttWrapper.classList.add('visible');
        } else {
            bttWrapper.classList.remove('visible');
        }
    });
}
