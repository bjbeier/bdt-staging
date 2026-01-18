/**
 * Cookie Consent Banner - Dark Glassmorphism Design
 * Manages user privacy preferences for BDT-Staging
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
        banner.style.cssText = `
            position: fixed;
            bottom: 2rem;
            left: 50%;
            transform: translateX(-50%);
            width: 90%;
            max-width: 600px;
            background: rgba(15, 23, 42, 0.8);
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 1rem;
            padding: 1.5rem;
            color: #f1f5f9;
            font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            z-index: 9999;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            animation: slideUp 0.5s ease-out;
        `;

        banner.innerHTML = `
            <style>
                @keyframes slideUp {
                    from { transform: translate(-50%, 100%); opacity: 0; }
                    to { transform: translate(-50%, 0); opacity: 1; }
                }
                .consent-btn {
                    padding: 0.625rem 1.25rem;
                    border-radius: 0.5rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.875rem;
                }
                .btn-accept {
                    background: #3b82f6;
                    color: white;
                    border: none;
                }
                .btn-accept:hover { background: #2563eb; }
                .btn-deny {
                    background: transparent;
                    color: #94a3b8;
                    border: 1px solid #475569;
                }
                .btn-deny:hover { background: rgba(255,255,255,0.05); color: #f1f5f9; }
            </style>
            <div>
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1.125rem; font-weight: 700; color: #fff;">We value your privacy</h3>
                <p style="margin: 0; font-size: 0.875rem; line-height: 1.5; color: #94a3b8;">
                    We use cookies to enhance your browsing experience and analyze our traffic. By clicking "Accept", you consent to our use of tracking scripts.
                </p>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button id="consent-deny" class="consent-btn btn-deny">Decline</button>
                <button id="consent-accept" class="consent-btn btn-accept">Accept</button>
            </div>
        `;

        document.body.appendChild(banner);

        document.getElementById('consent-accept').onclick = () => {
            localStorage.setItem(CONSENT_KEY, 'granted');
            banner.remove();
            initGA();
        };

        document.getElementById('consent-deny').onclick = () => {
            localStorage.setItem(CONSENT_KEY, 'denied');
            banner.remove();
        };
    }

    function initGA() {
        if (typeof window.loadTracking === 'function') {
            window.loadTracking();
        }
    }
})();
