// Scroll to Top Button Functionality
const scrollTopBtn = document.createElement('button');
scrollTopBtn.className = 'scroll-top-btn';
scrollTopBtn.innerHTML = '↑';
scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
document.body.appendChild(scrollTopBtn);

// Show/hide button on scroll
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

// Scroll to top on click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
