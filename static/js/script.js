/* Toggle Icon Navbar */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark');
    navbar.classList.toggle('active');
}

/* Scroll Section Active Link */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });

    /* Sticky Navbar */
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    /* Remove toggle icon and navbar when click navbar link */
    menuIcon.classList.remove('fa-xmark');
    navbar.classList.remove('active');
};

/* Scroll Reveal */
ScrollReveal({
    reset: true,
    distance: '80px',
    duration: 2000,
    delay: 200
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .portfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });

/* Typed JS */
const typed = new Typed('.multiple-text', {
    strings: ['Frontend Developer', 'Python Programmer', 'Web Designer'],
    typeSpeed: 100,
    backSpeed: 100,
    backDelay: 1000,
    loop: true
});

/* ========================================
   ENHANCED CUSTOM CURSOR
   ======================================== */
const cursorDot = document.querySelector("[data-cursor-dot]");
const cursorOutline = document.querySelector("[data-cursor-outline]");

window.addEventListener("mousemove", function (e) {
    const posX = e.clientX;
    const posY = e.clientY;

    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;

    cursorOutline.animate({
        left: `${posX}px`,
        top: `${posY}px`
    }, { duration: 500, fill: "forwards" });
});

// Enhanced cursor interaction - scale on interactive elements
const interactiveElements = document.querySelectorAll('a, button, input, textarea, .portfolio-box, .btn-details');

interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        if (cursorOutline) {
            cursorOutline.style.transform = 'scale(2)';
        }
        if (cursorDot) {
            cursorDot.style.transform = 'scale(0.5)';
        }
    });

    el.addEventListener('mouseleave', () => {
        if (cursorOutline) {
            cursorOutline.style.transform = 'scale(1)';
        }
        if (cursorDot) {
            cursorDot.style.transform = 'scale(1)';
        }
    });
});

/* ========================================
   SCROLL-BASED ANIMATIONS
   ======================================== */

// Portfolio Cards - Intersection Observer
const portfolioObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            portfolioObserver.unobserve(entry.target); // Only animate once
        }
    });
}, {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all portfolio boxes
document.querySelectorAll('.portfolio-box').forEach(box => {
    portfolioObserver.observe(box);
});

// Skills Section - Trigger bar animations on scroll
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-bars');
            skillsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px'
});

document.querySelectorAll('.skills-column').forEach(column => {
    skillsObserver.observe(column);
});

/* ========================================
   MODAL LOGIC
   ======================================== */
function openModal(element) {
    const modal = document.getElementById('projectModal');
    const title = document.getElementById('modalTitle');
    const desc = document.getElementById('modalDesc');
    const reqList = document.getElementById('modalReqList');

    // Get data attributes
    const projectTitle = element.getAttribute('data-title');
    const projectDesc = element.getAttribute('data-desc');
    const projectReqs = element.getAttribute('data-req').split(',');

    // Populate Modal
    title.innerText = projectTitle;
    desc.innerText = projectDesc;

    // Clear and populate requirements list
    reqList.innerHTML = '';
    projectReqs.forEach(req => {
        const li = document.createElement('li');
        li.innerText = req.trim();
        reqList.appendChild(li);
    });

    // Show Modal
    modal.classList.add('show');
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
}

// Close modal if clicked outside content
window.onclick = function (event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeModal();
    }
}

/* ========================================
   READ MORE TOGGLE - Enhanced
   ======================================== */
function toggleReadMore() {
    const moreContent = document.getElementById('more-about');
    const btn = document.getElementById('readMoreBtn');

    if (moreContent.style.display === 'none' || moreContent.style.display === '') {
        moreContent.style.display = 'block';
        btn.innerText = 'Read Less';
        // Smooth reveal animation
        moreContent.style.opacity = 0;
        moreContent.style.transform = 'translateY(10px)';
        setTimeout(() => {
            moreContent.style.opacity = 1;
            moreContent.style.transform = 'translateY(0)';
            moreContent.style.transition = 'all 0.5s ease';
        }, 10);
    } else {
        moreContent.style.opacity = 0;
        moreContent.style.transform = 'translateY(10px)';
        setTimeout(() => {
            moreContent.style.display = 'none';
            btn.innerText = 'Read More';
        }, 500);
    }
}

/* ========================================
   CONTACT FORM SUBMISSION
   ======================================== */
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        const btn = contactForm.querySelector('button');
        const originalText = btn.innerText;

        btn.innerText = 'Sending...';
        btn.disabled = true;

        fetch('/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        })
            .then(response => response.json())
            .then(data => {
                showToast();
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            })
            .catch((error) => {
                console.error('Error:', error);
                btn.innerText = 'Error! Try Again';
                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.disabled = false;
                }, 3000);
            });
    });
}

/* ========================================
   ENHANCED TOAST NOTIFICATION
   ======================================== */
function showToast() {
    const toast = document.getElementById("toast");
    toast.classList.add("show");

    // Auto-hide after 3 seconds with smooth exit
    setTimeout(function () {
        toast.classList.remove("show");
        toast.classList.add("hide");

        // Remove hide class after animation completes
        setTimeout(() => {
            toast.classList.remove("hide");
        }, 400);
    }, 3000);
}

