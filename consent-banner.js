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

        banner.innerHTML = `
            <div>
                <h3>I value your privacy</h3>
                <p>
                    I use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you consent to my use of tracking scripts.
                </p>
            </div>
            <div style="display: flex; gap: 1rem; justify-content: center;">
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
