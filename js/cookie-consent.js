// Cookie Consent Functionality
(function () {
    'use strict';

    const COOKIE_NAME = 'portfolio_cookie_consent';
    const COOKIE_EXPIRY_DAYS = 365;

    // Check if user has already made a choice
    function getCookieConsent() {
        return localStorage.getItem(COOKIE_NAME);
    }

    // Save user's choice
    function setCookieConsent(value) {
        localStorage.setItem(COOKIE_NAME, value);
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + COOKIE_EXPIRY_DAYS);
        localStorage.setItem(COOKIE_NAME + '_expiry', expiryDate.toISOString());
    }

    // Check if consent has expired
    function isConsentExpired() {
        const expiry = localStorage.getItem(COOKIE_NAME + '_expiry');
        if (!expiry) return true;
        return new Date() > new Date(expiry);
    }

    // Create cookie banner HTML
    function createCookieBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-consent';
        banner.id = 'cookieConsent';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Cookie consent');
        banner.innerHTML = `
            <div class="cookie-consent-content">
                <h3>🍪 Cookies na této stránce</h3>
                <p>
                    Používáme základní cookies pro zajištění správné funkce webu a analytické cookies 
                    pro zlepšení vašeho zážitku. Kliknutím na "Přijmout" souhlasíte s používáním cookies.
                </p>
            </div>
            <div class="cookie-consent-buttons">
                <button class="cookie-btn cookie-btn-accept" id="acceptCookies">
                    Přijmout vše
                </button>
                <button class="cookie-btn cookie-btn-decline" id="declineCookies">
                    Pouze nutné
                </button>
            </div>
        `;

        document.body.appendChild(banner);

        // Show banner with animation
        setTimeout(() => {
            banner.classList.add('show');
        }, 500);

        // Add event listeners
        document.getElementById('acceptCookies').addEventListener('click', acceptCookies);
        document.getElementById('declineCookies').addEventListener('click', declineCookies);
    }

    // Handle accept
    function acceptCookies() {
        setCookieConsent('accepted');
        hideBanner();

        // Here you can enable analytics/tracking
        console.log('Cookies accepted - Analytics enabled');
        // Example: initializeAnalytics();
    }

    // Handle decline
    function declineCookies() {
        setCookieConsent('declined');
        hideBanner();

        console.log('Cookies declined - Only essential cookies');
    }

    // Hide banner with animation
    function hideBanner() {
        const banner = document.getElementById('cookieConsent');
        if (banner) {
            banner.classList.remove('show');
            setTimeout(() => {
                banner.remove();
            }, 400);
        }
    }

    // Initialize on page load
    function init() {
        const consent = getCookieConsent();

        // Show banner if no consent or if expired
        if (!consent || isConsentExpired()) {
            createCookieBanner();
        } else if (consent === 'accepted') {
            // User has accepted cookies
            console.log('Cookies already accepted');
            // Example: initializeAnalytics();
        }
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
