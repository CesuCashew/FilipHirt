// Social Icons - Email Copy Functionality
(function () {
    'use strict';

    const emailIcon = document.querySelector('.email-icon');

    if (!emailIcon) return;

    // Create tooltip element
    const tooltip = document.createElement('div');
    tooltip.className = 'email-tooltip';
    tooltip.textContent = 'Email zkopírován!';
    emailIcon.appendChild(tooltip);

    // Email copy functionality
    emailIcon.addEventListener('click', async function (e) {
        e.preventDefault();

        const email = this.getAttribute('data-email');

        try {
            // Modern clipboard API
            await navigator.clipboard.writeText(email);

            // Show success state
            this.classList.add('copied');
            tooltip.classList.add('show');

            // Reset after 2 seconds
            setTimeout(() => {
                this.classList.remove('copied');
                tooltip.classList.remove('show');
            }, 2000);

            console.log('Email copied:', email);

        } catch (err) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = email;
            textArea.style.position = 'fixed';
            textArea.style.left = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
                this.classList.add('copied');
                tooltip.classList.add('show');

                setTimeout(() => {
                    this.classList.remove('copied');
                    tooltip.classList.remove('show');
                }, 2000);

            } catch (err2) {
                console.error('Failed to copy email:', err2);
                tooltip.textContent = 'Chyba při kopírování';
                tooltip.classList.add('show');

                setTimeout(() => {
                    tooltip.classList.remove('show');
                    tooltip.textContent = 'Email zkopírován!';
                }, 2000);
            }

            document.body.removeChild(textArea);
        }
    });

    // Optional: Show email on hover (desktop only)
    if (window.innerWidth > 768) {
        let hoverTimeout;
        const emailTooltip = document.createElement('div');
        emailTooltip.className = 'email-tooltip';
        emailTooltip.style.bottom = '-35px';
        emailIcon.appendChild(emailTooltip);

        emailIcon.addEventListener('mouseenter', function () {
            const email = this.getAttribute('data-email');
            emailTooltip.textContent = email;

            hoverTimeout = setTimeout(() => {
                emailTooltip.classList.add('show');
            }, 500);
        });

        emailIcon.addEventListener('mouseleave', function () {
            clearTimeout(hoverTimeout);
            if (!this.classList.contains('copied')) {
                emailTooltip.classList.remove('show');
            }
        });
    }
})();
