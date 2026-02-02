/* ========================================
   ADVANCED ANIMATIONS - Professional Level
   ======================================== */

// ==========================================
// 1. PARALLAX SCROLLING EFFECTS
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;

    // Parallax for home image
    const homeImg = document.querySelector('.home-img');
    if (homeImg) {
        homeImg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    // Parallax for section headings
    document.querySelectorAll('.heading').forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            const offset = (window.innerHeight - rect.top) * 0.1;
            heading.style.transform = `translateY(${offset}px)`;
        }
    });
});

// ==========================================
// 2. MAGNETIC BUTTON EFFECT
// ==========================================
document.querySelectorAll('.btn, .social-media a').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
    });

    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0) scale(1)';
    });
});

// ==========================================
// 3. PARTICLE BACKGROUND ANIMATION
// ==========================================
class ParticleBackground {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'particle-canvas';
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.zIndex = '-1';
        this.canvas.style.pointerEvents = 'none';
        document.body.prepend(this.canvas);

        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;

        this.resize();
        this.init();
        this.animate();

        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 2 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, i) => {
            particle.x += particle.vx;
            particle.y += particle.vy;

            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(2, 132, 199, ${particle.opacity})`;
            this.ctx.fill();

            // Draw connections
            this.particles.forEach((particle2, j) => {
                if (i !== j) {
                    const dx = particle.x - particle2.x;
                    const dy = particle.y - particle2.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 150) {
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = `rgba(2, 132, 199, ${0.2 * (1 - distance / 150)})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(particle2.x, particle2.y);
                        this.ctx.stroke();
                    }
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize particle background
const particleBg = new ParticleBackground();

// ==========================================
// 4. TEXT REVEAL ANIMATION ON SCROLL
// ==========================================
const observeTextReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const text = entry.target;
            const chars = text.textContent.split('');
            text.textContent = '';

            chars.forEach((char, i) => {
                const span = document.createElement('span');
                span.textContent = char;
                span.style.opacity = '0';
                span.style.display = 'inline-block';
                span.style.animation = `charFadeIn 0.5s ease forwards ${i * 0.03}s`;
                text.appendChild(span);
            });

            observeTextReveal.unobserve(text);
        }
    });
}, { threshold: 0.5 });

// Apply to specific headings
document.querySelectorAll('.heading').forEach(heading => {
    observeTextReveal.observe(heading);
});

// ==========================================
// 5. 3D TILT EFFECT ON CARDS
// ==========================================
document.querySelectorAll('.portfolio-box, .skills-box').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
    });
});

// ==========================================
// 6. RIPPLE EFFECT ON CLICK
// ==========================================
document.querySelectorAll('.btn, button').forEach(button => {
    button.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple-effect');

        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';

        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// ==========================================
// 7. SMOOTH SCROLL WITH EASING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const targetPosition = target.offsetTop - 80;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000;
            let start = null;

            function animation(currentTime) {
                if (start === null) start = currentTime;
                const timeElapsed = currentTime - start;
                const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) requestAnimationFrame(animation);
            }

            function easeInOutCubic(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t * t + b;
                t -= 2;
                return c / 2 * (t * t * t + 2) + b;
            }

            requestAnimationFrame(animation);
        }
    });
});

// ==========================================
// 8. TYPING EFFECT FOR SKILLS
// ==========================================
const observeSkillsTyping = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillName = entry.target.querySelector('h3');
            if (skillName && !skillName.dataset.typed) {
                const originalText = skillName.firstChild.textContent;
                const percentage = skillName.querySelector('span').textContent;
                skillName.firstChild.textContent = '';

                let i = 0;
                const typeInterval = setInterval(() => {
                    if (i < originalText.length) {
                        skillName.firstChild.textContent += originalText.charAt(i);
                        i++;
                    } else {
                        clearInterval(typeInterval);
                    }
                }, 50);

                skillName.dataset.typed = 'true';
            }
            observeSkillsTyping.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.progress').forEach(progress => {
    observeSkillsTyping.observe(progress);
});

// ==========================================
// 9. GLOWING TRAIL CURSOR
// ==========================================
const trailCanvas = document.createElement('canvas');
trailCanvas.id = 'cursor-trail';
trailCanvas.style.position = 'fixed';
trailCanvas.style.top = '0';
trailCanvas.style.left = '0';
trailCanvas.style.width = '100%';
trailCanvas.style.height = '100%';
trailCanvas.style.zIndex = '9999';
trailCanvas.style.pointerEvents = 'none';
document.body.appendChild(trailCanvas);

const trailCtx = trailCanvas.getContext('2d');
trailCanvas.width = window.innerWidth;
trailCanvas.height = window.innerHeight;

const trail = [];
const trailLength = 20;

window.addEventListener('resize', () => {
    trailCanvas.width = window.innerWidth;
    trailCanvas.height = window.innerHeight;
});

window.addEventListener('mousemove', (e) => {
    trail.push({ x: e.clientX, y: e.clientY, opacity: 1 });
    if (trail.length > trailLength) trail.shift();
});

function drawTrail() {
    trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);

    trail.forEach((point, index) => {
        const opacity = point.opacity * (index / trailLength);
        const radius = 3 * (index / trailLength);

        trailCtx.beginPath();
        trailCtx.arc(point.x, point.y, radius, 0, Math.PI * 2);
        trailCtx.fillStyle = `rgba(2, 132, 199, ${opacity * 0.5})`;
        trailCtx.fill();

        point.opacity *= 0.95;
    });

    requestAnimationFrame(drawTrail);
}

drawTrail();

// ==========================================
// 10. IMAGE REVEAL ANIMATION
// ==========================================
const observeImageReveal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
            entry.target.style.transform = 'scale(1)';
            observeImageReveal.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 }); // Lower threshold for better trigger

document.querySelectorAll('.img-box img').forEach((img, index) => {
    // Show hero image immediately, animate others
    if (index === 0) {
        // Hero section image - show immediately
        img.style.clipPath = 'polygon(0 0, 100% 0, 100% 100%, 0 100%)';
        img.style.transform = 'scale(1)';
        img.style.transition = 'transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
    } else {
        // Other images - use reveal animation
        img.style.clipPath = 'polygon(0 0, 100% 0, 100% 0, 0 0)';
        img.style.transform = 'scale(1.2)';
        img.style.transition = 'clip-path 1s cubic-bezier(0.4, 0, 0.2, 1), transform 1s cubic-bezier(0.4, 0, 0.2, 1)';
        observeImageReveal.observe(img);
    }
});

// ==========================================
// 11. SECTION ENTRANCE ANIMATION
// ==========================================
const observeSectionEntrance = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
            observeSectionEntrance.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
    section.classList.add('section-hidden');
    observeSectionEntrance.observe(section);
});

// ==========================================
// 12. COUNTER ANIMATION FOR STATS
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// ==========================================
// 13. SCROLL PROGRESS INDICATOR
// ==========================================
const scrollProgress = document.createElement('div');
scrollProgress.id = 'scroll-progress';
scrollProgress.style.position = 'fixed';
scrollProgress.style.top = '0';
scrollProgress.style.left = '0';
scrollProgress.style.height = '3px';
scrollProgress.style.background = 'linear-gradient(to right, #0284c7, #38bdf8)';
scrollProgress.style.width = '0%';
scrollProgress.style.zIndex = '10001';
scrollProgress.style.transition = 'width 0.1s ease';
document.body.appendChild(scrollProgress);

window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.pageYOffset / windowHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ==========================================
// 14. PORTFOLIO CARD HOVER DEPTH EFFECT
// ==========================================
document.querySelectorAll('.portfolio-box').forEach(box => {
    const icon = box.querySelector('.portfolio-icon i');

    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const moveX = (x - rect.width / 2) / 20;
        const moveY = (y - rect.height / 2) / 20;

        if (icon) {
            icon.style.transform = `translate(${moveX}px, ${moveY}px) scale(1.1)`;
        }
    });

    box.addEventListener('mouseleave', () => {
        if (icon) {
            icon.style.transform = 'translate(0, 0) scale(1)';
        }
    });
});

console.log('🎨 Advanced animations loaded successfully!');
