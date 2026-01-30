// ===================================
// FILIP HIRT PORTFOLIO - JAVASCRIPT
// ===================================

// ===== PROJECT DATA =====
const projects = [
    {
        id: 1,
        title: "ADNP a.s. - Corporate Website",
        category: "Firemní Prezentace",
        description: "Prémiová firemní prezentace pro investiční společnost ADNP a.s. zaměřenou na fúze a akvizice. Moderní design s důrazem na profesionalitu a důvěryhodnost.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive"],
        metrics: {
            conversion: "+52%",
            speed: "98/100",
            satisfaction: "4.9/5"
        },
        thumbnail: "https://cesucashew.github.io/ADNP/",
        url: "https://cesucashew.github.io/ADNP/",
        color: {
            primary: "#D4AF37",
            secondary: "#F4D03F",
            gradient: "linear-gradient(135deg, #D4AF37 0%, #F4D03F 100%)"
        }
    },
    {
        id: 2,
        title: "Všechno Caffè ",
        category: "Weby pro Restaurace",
        description: "Moderní webová prezentace pro kavárnu Všechno Caffè s důrazem na atmosféru, menu a rezervační systém. Plně responzivní design s interaktivními prvky.",
        technologies: ["HTML5", "CSS3", "JavaScript", "Responsive"],
        metrics: {
            conversion: "+40%",
            speed: "95/100",
            satisfaction: "4.8/5"
        },
        thumbnail: "https://cesucashew.github.io/vsechnocaffepro/",
        url: "https://cesucashew.github.io/vsechnocaffepro/",
        color: {
            primary: "#8B4513",
            secondary: "#D2691E",
            gradient: "linear-gradient(135deg, #8B4513 0%, #D2691E 100%)"
        }
    },
    {
        id: 3,
        title: "Premium E-commerce Store",
        category: "Online Obchody",
        description: "Moderní e-shop s pokročilou filtrací produktů, AI doporučovacím systémem a seamless checkout procesem optimalizovaným pro konverze.",
        technologies: ["Shopify", "React", "AI/ML", "Stripe"],
        metrics: {
            conversion: "+45%",
            speed: "94/100",
            satisfaction: "4.9/5"
        },
        thumbnail: "https://themes.shopify.com/themes/symmetry/styles/beatnik/preview",
        url: "https://themes.shopify.com/themes/symmetry/styles/beatnik/preview",
        color: {
            primary: "#B026FF",
            secondary: "#D946EF",
            gradient: "linear-gradient(135deg, #B026FF 0%, #D946EF 100%)"
        }
    }
];

// ===== STATE MANAGEMENT =====
let currentProjectIndex = 0;
let currentDevice = 'desktop';

// ===== UTILITY FUNCTIONS =====
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===== NAVIGATION =====
// Smooth scroll for navigation links
$$('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = $(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }

        // Update active state
        $$('.nav-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});


// Navbar scroll effect removed - navbar stays consistent

// Highlight active section in navigation
const sections = $$('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    $$('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== PORTFOLIO RENDERING =====
function renderProjects() {
    const portfolioGrid = $('#portfolioGrid');

    projects.forEach((project, index) => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';

        // Set custom CSS variables for this project's color
        projectCard.style.setProperty('--project-color-primary', project.color.primary);
        projectCard.style.setProperty('--project-color-secondary', project.color.secondary);
        projectCard.style.setProperty('--project-gradient', project.color.gradient);

        projectCard.innerHTML = `
            <div class="project-preview">
                <iframe 
                    src="${project.url}" 
                    class="project-iframe-preview"
                    scrolling="no"
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin"
                    title="${project.title} preview">
                </iframe>
                <div class="project-overlay">
                    <div class="overlay-content">
                        <div class="overlay-badge">VIEW PROJECT</div>
                        <div class="overlay-arrow">→</div>
                    </div>
                </div>
            </div>
            <div class="project-info">
                <p class="project-category">${project.category}</p>
                <h3>${project.title}</h3>
                <p style="color: var(--color-gray-text); margin-top: 0.5rem;">${project.description.substring(0, 100)}...</p>
                <div class="project-technologies">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        `;

        projectCard.addEventListener('click', () => openProjectModal(index));
        portfolioGrid.appendChild(projectCard);
    });
}

// ===== MODAL FUNCTIONALITY =====
function openProjectModal(index) {
    currentProjectIndex = index;
    const project = projects[index];
    const modal = $('#projectModal');
    const modalContent = modal.querySelector('.modal-content');

    // Apply project colors to modal
    modalContent.style.setProperty('--project-color-primary', project.color.primary);
    modalContent.style.setProperty('--project-color-secondary', project.color.secondary);
    modalContent.style.setProperty('--project-gradient', project.color.gradient);

    // Update modal content
    $('#modalCategory').textContent = project.category;
    $('#modalTitle').textContent = project.title;
    $('#modalDescription').textContent = project.description;

    // Update technologies
    const techContainer = $('#modalTechnologies');
    techContainer.innerHTML = project.technologies
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join('');

    // Update metrics
    $('#metricConversion').textContent = project.metrics.conversion;
    $('#metricSpeed').textContent = project.metrics.speed;
    $('#metricSatisfaction').textContent = project.metrics.satisfaction;

    // Update iframe with lazy loading
    const iframe = $('#projectIframe');
    iframe.src = project.url;

    // Update external link
    $('#externalLink').href = project.url;

    // Update navigation buttons state
    updateNavigationButtons();

    // Reset to desktop view
    switchDevice('desktop');

    // Show modal with animation
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = $('#projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = '';

    // Clear iframe to stop loading
    setTimeout(() => {
        $('#projectIframe').src = '';
    }, 300);
}

function updateNavigationButtons() {
    const prevBtn = $('#prevProject');
    const nextBtn = $('#nextProject');

    prevBtn.disabled = currentProjectIndex === 0;
    nextBtn.disabled = currentProjectIndex === projects.length - 1;
}

function navigateProject(direction) {
    if (direction === 'prev' && currentProjectIndex > 0) {
        openProjectModal(currentProjectIndex - 1);
    } else if (direction === 'next' && currentProjectIndex < projects.length - 1) {
        openProjectModal(currentProjectIndex + 1);
    }
}

function switchDevice(device) {
    currentDevice = device;
    const iframeWrapper = $('#iframeWrapper');

    // Remove all device classes
    iframeWrapper.classList.remove('device-desktop', 'device-tablet', 'device-mobile');

    // Add current device class
    iframeWrapper.classList.add(`device-${device}`);

    // Update button states
    $$('.device-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.device === device) {
            btn.classList.add('active');
        }
    });
}

// ===== MODAL EVENT LISTENERS =====
$('#closeModal').addEventListener('click', closeProjectModal);

$('#prevProject').addEventListener('click', () => navigateProject('prev'));
$('#nextProject').addEventListener('click', () => navigateProject('next'));

// Device switcher buttons
$$('.device-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        switchDevice(btn.dataset.device);
    });
});

// Close modal on overlay click
$('#projectModal').addEventListener('click', (e) => {
    if (e.target.id === 'projectModal') {
        closeProjectModal();
    }
});

// Close modal on ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && $('#projectModal').classList.contains('active')) {
        closeProjectModal();
    }

    // Navigate with arrow keys
    if ($('#projectModal').classList.contains('active')) {
        if (e.key === 'ArrowLeft') {
            navigateProject('prev');
        } else if (e.key === 'ArrowRight') {
            navigateProject('next');
        }
    }
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe all animatable elements
function initScrollAnimations() {
    const animatedElements = $$('.service-card, .project-card, .testimonial-card, .tech-item');
    animatedElements.forEach(el => observer.observe(el));
}

// ===== ANIMATED COUNTERS =====
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Counter observer
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
            const statItems = $$('.stat-item');
            const counters = [80, 5, 20]; // Values for each stat

            statItems.forEach((item, index) => {
                // Extract number from text
                const text = item.textContent;
                const match = text.match(/\d+/);
                if (match) {
                    const value = parseInt(match[0]);
                    const counterSpan = document.createElement('span');
                    counterSpan.textContent = '0';

                    // Replace number in text
                    item.textContent = text.replace(/\d+/, '');
                    item.insertBefore(counterSpan, item.firstChild);

                    // Animate
                    setTimeout(() => {
                        animateCounter(counterSpan, value, 2000);
                    }, index * 200);
                }
            });

            entry.target.dataset.animated = 'true';
        }
    });
}, { threshold: 0.5 });

// ===== FORM VALIDATION =====
const contactForm = $('#contactForm');

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm() {
    let isValid = true;

    // Name validation
    const nameInput = $('#name');
    const nameGroup = nameInput.closest('.form-group');
    if (nameInput.value.trim() === '') {
        nameGroup.classList.add('error');
        isValid = false;
    } else {
        nameGroup.classList.remove('error');
    }

    // Email validation
    const emailInput = $('#email');
    const emailGroup = emailInput.closest('.form-group');
    if (!validateEmail(emailInput.value)) {
        emailGroup.classList.add('error');
        isValid = false;
    } else {
        emailGroup.classList.remove('error');
    }

    // Message validation
    const messageInput = $('#message');
    const messageGroup = messageInput.closest('.form-group');
    if (messageInput.value.trim() === '') {
        messageGroup.classList.add('error');
        isValid = false;
    } else {
        messageGroup.classList.remove('error');
    }

    return isValid;
}

// Real-time validation
$$('.form-control').forEach(input => {
    input.addEventListener('blur', () => {
        const group = input.closest('.form-group');

        if (input.id === 'name' && input.value.trim() !== '') {
            group.classList.remove('error');
        } else if (input.id === 'email' && validateEmail(input.value)) {
            group.classList.remove('error');
        } else if (input.id === 'message' && input.value.trim() !== '') {
            group.classList.remove('error');
        }
    });
});

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (validateForm()) {
        // Form is valid - here you would normally send the data
        const formData = {
            name: $('#name').value,
            email: $('#email').value,
            phone: $('#phone').value,
            service: $('#service').value,
            message: $('#message').value
        };

        console.log('Form data:', formData);

        // Show success message
        alert('Děkuji za zprávu! Brzy se vám ozvu.');

        // Reset form
        contactForm.reset();

        // In production, you would send this to a backend:
        // fetch('/api/contact', {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // });
    }
});

// ===== MOBILE MENU =====
const mobileMenuBtn = $('#mobileMenuBtn');
const navLinks = $('.nav-links');

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Toggle icon
        if (navLinks.classList.contains('active')) {
            mobileMenuBtn.textContent = '✕';
        } else {
            mobileMenuBtn.textContent = '☰';
        }
    });

    // Close menu when clicking a link
    $$('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            mobileMenuBtn.textContent = '☰';
        });
    });
}

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    // Render portfolio projects
    renderProjects();

    // Initialize scroll animations
    initScrollAnimations();

    // Observe hero stats for counter animation
    const heroStats = $('.hero-stats');
    if (heroStats) {
        counterObserver.observe(heroStats);
    }

    // Add fade-in animation to hero content
    const heroText = $('.hero-text');
    if (heroText) {
        setTimeout(() => {
            heroText.style.opacity = '1';
        }, 100);
    }
});

// ===== PERFORMANCE OPTIMIZATIONS =====
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    $$('img[data-src]').forEach(img => imageObserver.observe(img));
}

// Console message
console.log('%c👋 Portfolio by Filip Hirt', 'font-size: 20px; color: #B026FF; font-weight: bold;');
console.log('%cInterested in working together? Let\'s chat!', 'font-size: 14px; color: #D946EF;');
