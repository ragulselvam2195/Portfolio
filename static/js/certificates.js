// ============================================
// CERTIFICATES SECTION ANIMATIONS
// ============================================

// Initialize certificates animations on page load
document.addEventListener('DOMContentLoaded', function () {
    initCertificatesAnimations();
    initLightbox();
    initStatsCounter();
});

// Scroll reveal animation for certificate cards
function initCertificatesAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation for multiple cards
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 150);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all certificate cards
    const cards = document.querySelectorAll('.certificate-card');
    cards.forEach(card => observer.observe(card));
}

// Lightbox functionality for full-screen certificate view
function initLightbox() {
    const magnifyButtons = document.querySelectorAll('.magnify-btn');
    const lightbox = document.querySelector('.certificate-lightbox');
    const lightboxImg = lightbox?.querySelector('img');
    const closeBtn = lightbox?.querySelector('.lightbox-close');

    magnifyButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const certImg = btn.closest('.certificate-image-container').querySelector('img');

            if (lightbox && lightboxImg) {
                lightboxImg.src = certImg.src;
                lightboxImg.alt = certImg.alt;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    // Close lightbox
    function closeLightbox() {
        if (lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    closeBtn?.addEventListener('click', closeLightbox);

    // Close on overlay click
    lightbox?.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox?.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// Animated counter for statistics
function initStatsCounter() {
    const stats = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => observer.observe(stat));
}

function animateCounter(element, target) {
    let current = 0;
    const increment = target / 50; // Complete in ~50 frames
    const duration = 1500; // 1.5 seconds
    const stepTime = duration / 50;

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, stepTime);
}

// Parallax effect on certificate cards
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.certificate-card');

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        // Only apply if hovering
        if (card.matches(':hover')) {
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
        }
    });
});

// Reset transform on mouse leave
document.querySelectorAll('.certificate-card').forEach(card => {
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Smooth scroll to certificates section from navbar
const certificatesLink = document.querySelector('a[href="#certificates"]');
if (certificatesLink) {
    certificatesLink.addEventListener('click', (e) => {
        e.preventDefault();
        const certificatesSection = document.querySelector('#certificates');
        if (certificatesSection) {
            certificatesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// Badge icon animation on hover
document.querySelectorAll('.certificate-badge').forEach(badge => {
    badge.addEventListener('mouseenter', () => {
        const icon = badge.querySelector('.badge-icon');
        icon.style.animation = 'none';
        setTimeout(() => {
            icon.style.animation = 'pulse 0.6s ease-in-out';
        }, 10);
    });
});

// Add shimmer effect to tags
document.querySelectorAll('.cert-tag').forEach((tag, index) => {
    tag.style.animationDelay = `${index * 0.1}s`;
});
