/**
 * Cookie Consent Banner - Theme Aware Refined Design
 * Manages user privacy preferences with dynamic light/dark mode support.
 */

(function () {
    const CONSENT_KEY = 'bdt_cookie_consent';

    // Check for existing consent
    const consent = localStorage.getItem(CONSENT_KEY);

    if (consent === 'granted') {
        initGA();
    } else if (consent === null) {
        showBanner();
    }

    function showBanner() {
        const banner = document.createElement('div');
        banner.id = 'cookie-consent-banner';

        function updateBannerStyles() {
            const isDark = document.documentElement.classList.contains('dark');

            banner.style.cssText = `
                position: fixed;
                bottom: 2rem;
                left: 50%;
                transform: translateX(-50%);
                width: 90%;
                max-width: 600px;
                background: ${isDark ? 'rgba(15, 23, 42, 0.72)' : 'rgba(255, 255, 255, 0.6)'};
                backdrop-filter: blur(16px);
                -webkit-backdrop-filter: blur(16px);
                border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.4)'};
                border-radius: 1rem;
                padding: 1.5rem;
                color: ${isDark ? '#f1f5f9' : '#1e293b'};
                font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, ${isDark ? '0.5' : '0.08'});
                z-index: 9999;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                animation: slideUp 0.5s ease-out;
                text-align: center;
                transition: background 0.3s, color 0.3s, border-color 0.3s;
            `;

            const heading = banner.querySelector('h3');
            const paragraph = banner.querySelector('p');
            const acceptBtn = banner.querySelector('#consent-accept');
            const denyBtn = banner.querySelector('#consent-deny');

            if (heading) heading.style.color = isDark ? '#fff' : '#0f172a';
            if (paragraph) paragraph.style.color = isDark ? '#94a3b8' : '#475569';

            if (acceptBtn) {
                acceptBtn.style.background = isDark ? '#5B7FE8' : '#4169E1';
            }

            if (denyBtn) {
                denyBtn.style.color = isDark ? '#94a3b8' : '#64748b';
                denyBtn.style.borderColor = isDark ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)';
            }
        }

        banner.innerHTML = `
            <style>
                @keyframes slideUp {
                    from { transform: translate(-50%, 100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
                .consent-btn {
                    padding: 0.75rem 1.5rem;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.25s ease;
                    font-size: 0.875rem;
                }
                .btn-accept {
                    background: #4169E1;
                    color: white;
                    border: none;
                    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                }
                .btn-accept:hover { 
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                    filter: brightness(1.1);
                }
                .btn-deny {
                    background: transparent;
                    border: 1px solid currentColor;
                    opacity: 0.9;
                }
                .btn-deny:hover { 
                    transform: translateY(-2px);
                    background: rgba(0,0,0,0.05); 
                    opacity: 1; 
                }
                html.dark .btn-deny:hover {
                    background: rgba(255,255,255,0.05);
                }
            </style>
            <div>
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 700;">I value your privacy</h3>
                <p style="margin: 0; font-size: 0.875rem; line-height: 1.5;">
                    I use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you consent to my use of tracking scripts.
                </p>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button id="consent-deny" class="consent-btn btn-deny">Decline</button>
                <button id="consent-accept" class="consent-btn btn-accept">Accept</button>
            </div>
        `;

        document.body.appendChild(banner);
        updateBannerStyles();

        // Watch for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.attributeName === 'class') {
                    updateBannerStyles();
                }
            });
        });
        observer.observe(document.documentElement, { attributes: true });

        document.getElementById('consent-accept').onclick = () => {
            localStorage.setItem(CONSENT_KEY, 'granted');
            banner.remove();
            observer.disconnect();
            initGA();
        };

        document.getElementById('consent-deny').onclick = () => {
            localStorage.setItem(CONSENT_KEY, 'denied');
            banner.remove();
            observer.disconnect();
        };
    }

    function initGA() {
        if (typeof window.loadTracking === 'function') {
            window.loadTracking();
        }
    }
})();
