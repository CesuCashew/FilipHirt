
// ===== EMAIL COPY FUNCTIONALITY =====
document.addEventListener('DOMContentLoaded', () => {
    const emailLink = document.getElementById('emailCopyLink');
    const toast = document.getElementById('copyToast');
    const emailAddress = "f.hirt@seznam.cz";

    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            e.preventDefault();

            // Copy to clipboard
            navigator.clipboard.writeText(emailAddress).then(() => {
                // Determine if device is mobile
                const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

                if (isMobile) {
                    // On mobile, try to open mail client after a slight delay
                    // giving time for the "copied" feedback
                    setTimeout(() => {
                        window.location.href = `mailto:${emailAddress}`;
                    }, 500);
                }

                // Show Toast
                toast.classList.add('show');

                // Visual feedback on link (handled by CSS :active, but let's ensure it stays green briefly)
                emailLink.style.color = "#28cd41";

                // Reset after 2 seconds
                setTimeout(() => {
                    toast.classList.remove('show');
                    emailLink.style.color = ""; // Revert to CSS hover/default
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
                // Fallback to mailto if copy fails
                window.location.href = `mailto:${emailAddress}`;
            });
        });
    }
});
