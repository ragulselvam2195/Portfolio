/* ========================================
   ABOUT SECTION - ANIMATED STAT COUNTERS
   ======================================== */
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;

    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };

    updateCounter();
}

// Intersection Observer for stat counters
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(statNumber => {
                const target = parseInt(statNumber.getAttribute('data-target'));
                animateCounter(statNumber, target);
            });
            statsObserver.unobserve(entry.target); // Only animate once
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -50px 0px'
});

// Observe stats grid
const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}

/* ========================================
   SKILL TAGS - INTERACTIVE ANIMATIONS
   ======================================== */
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach((tag, index) => {
    // Staggered entrance animation
    tag.style.animationDelay = `${index * 0.1}s`;
    tag.classList.add('skill-tag-entrance');

    // Random floating animation
    tag.addEventListener('mouseenter', () => {
        const randomX = (Math.random() - 0.5) * 10;
        const randomY = (Math.random() - 0.5) * 10;
        tag.style.transform = `translate(${randomX}px, ${randomY}px) translateY(-3px)`;
    });

    tag.addEventListener('mouseleave', () => {
        tag.style.transform = 'translate(0, 0)';
    });
});

/* ========================================
   TIMELINE - SCROLL REVEAL ANIMATIONS
   ======================================== */
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all timeline items
document.querySelectorAll('.timeline-item').forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s ease-out';
    timelineObserver.observe(item);
});

/* ========================================
   HIGHLIGHT CARDS - ENTRANCE ANIMATIONS
   ======================================== */
const highlightObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
            }, index * 100);
            highlightObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.highlight-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px) scale(0.9)';
    card.style.transition = 'all 0.5s ease-out';
    highlightObserver.observe(card);
});

/* ========================================
   PROFILE CARD - ENTRANCE ANIMATION
   ======================================== */
const profileObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            profileObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

const profileCard = document.querySelector('.profile-card');
if (profileCard) {
    profileCard.style.opacity = '0';
    profileCard.style.transform = 'translateY(30px)';
    profileCard.style.transition = 'all 0.8s ease-out';
    profileObserver.observe(profileCard);
}
