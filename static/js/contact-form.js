/* ===============================================
   CONTACT FORM - ADVANCED FUNCTIONALITY
   Form validation, animations, and email sending
   =============================================== */

document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');
    const inputs = document.querySelectorAll('.form-input');
    const textarea = document.querySelector('.form-textarea');
    const submitBtn = document.querySelector('.submit-btn');
    const messageField = document.getElementById('message');
    const charCount = document.getElementById('char-count');

    // ========================================
    // FLOATING LABEL ANIMATIONS
    // ========================================

    inputs.forEach(input => {
        // Set placeholder attribute for :placeholder-shown to work
        input.setAttribute('placeholder', ' ');

        input.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        input.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });

    if (textarea) {
        textarea.setAttribute('placeholder', ' ');

        textarea.addEventListener('focus', function () {
            this.parentElement.classList.add('focused');
        });

        textarea.addEventListener('blur', function () {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    }

    // ========================================
    // CHARACTER COUNTER
    // ========================================

    if (messageField && charCount) {
        messageField.addEventListener('input', function () {
            const count = this.value.length;
            charCount.textContent = count;

            // Change color when nearing limit
            if (count > 450) {
                charCount.style.color = '#ef4444';
            } else if (count > 400) {
                charCount.style.color = '#f59e0b';
            } else {
                charCount.style.color = 'var(--main-color)';
            }

            // Limit to 500 characters
            if (count > 500) {
                this.value = this.value.substring(0, 500);
                charCount.textContent = '500';
            }
        });
    }

    // ========================================
    // FORM VALIDATION
    // ========================================

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function validatePhone(phone) {
        // Optional field - if filled, should be valid
        if (!phone) return true;
        const re = /^[\d\s\-\+\(\)]{10,}$/;
        return re.test(phone);
    }

    function showError(fieldId, message) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');

            // Shake animation
            const inputWrapper = errorElement.previousElementSibling;
            if (inputWrapper) {
                inputWrapper.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    inputWrapper.style.animation = '';
                }, 500);
            }
        }
    }

    function clearError(fieldId) {
        const errorElement = document.getElementById(`${fieldId}-error`);
        if (errorElement) {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
        }
    }

    function clearAllErrors() {
        ['name', 'email', 'message'].forEach(fieldId => clearError(fieldId));
    }

    // Real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const phoneInput = document.getElementById('phone');

    if (nameInput) {
        nameInput.addEventListener('blur', function () {
            if (this.value.trim().length < 2) {
                showError('name', 'Name must be at least 2 characters');
            } else {
                clearError('name');
            }
        });

        nameInput.addEventListener('input', function () {
            if (this.value.trim().length >= 2) {
                clearError('name');
            }
        });
    }

    if (emailInput) {
        emailInput.addEventListener('blur', function () {
            if (!validateEmail(this.value)) {
                showError('email', 'Please enter a valid email address');
            } else {
                clearError('email');
            }
        });

        emailInput.addEventListener('input', function () {
            if (validateEmail(this.value)) {
                clearError('email');
            }
        });
    }

    if (messageField) {
        messageField.addEventListener('blur', function () {
            if (this.value.trim().length < 10) {
                showError('message', 'Message must be at least 10 characters');
            } else {
                clearError('message');
            }
        });

        messageField.addEventListener('input', function () {
            if (this.value.trim().length >= 10) {
                clearError('message');
            }
        });
    }

    // ========================================
    // FORM SUBMISSION
    // ========================================

    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            clearAllErrors();

            // Get form values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone') ? document.getElementById('phone').value.trim() : '';
            const subject = document.getElementById('subject') ? document.getElementById('subject').value.trim() : 'Contact Form Submission';
            const message = document.getElementById('message').value.trim();

            // Validation
            let isValid = true;

            if (name.length < 2) {
                showError('name', 'Name must be at least 2 characters');
                isValid = false;
            }

            if (!validateEmail(email)) {
                showError('email', 'Please enter a valid email address');
                isValid = false;
            }

            if (message.length < 10) {
                showError('message', 'Message must be at least 10 characters');
                isValid = false;
            }

            if (!isValid) {
                // Shake form
                contactForm.style.animation = 'shake 0.5s';
                setTimeout(() => {
                    contactForm.style.animation = '';
                }, 500);
                return;
            }

            // Show loading state
            submitBtn.classList.add('loading');
            submitBtn.disabled = true;

            try {
                // Send data to backend
                const response = await fetch('/send-message', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        phone: phone,
                        subject: subject || 'Contact Form Submission',
                        message: message
                    })
                });

                const data = await response.json();

                // Remove loading state
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                if (response.ok && data.status === 'success') {
                    // Success animation
                    submitBtn.innerHTML = '<span class="btn-text"><i class="fa-solid fa-check"></i> Sent Successfully!</span>';
                    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';

                    // Show toast
                    showToast(data.message || 'Message sent successfully!', 'success');

                    // Reset form after delay
                    setTimeout(() => {
                        contactForm.reset();
                        submitBtn.innerHTML = '<span class="btn-text">Send Message</span><span class="btn-icon"><i class="fa-solid fa-paper-plane"></i></span><span class="btn-loader"></span>';
                        submitBtn.style.background = '';
                        charCount.textContent = '0';
                    }, 3000);
                } else {
                    // Error
                    throw new Error(data.message || 'Failed to send message');
                }
            } catch (error) {
                console.error('Error:', error);
                submitBtn.classList.remove('loading');
                submitBtn.disabled = false;

                showToast(error.message || 'Failed to send message. Please try again.', 'error');
            }
        });
    }

    // ========================================
    // TOAST NOTIFICATION
    // ========================================

    function showToast(message, type = 'success') {
        // Remove existing toast if any
        const existingToast = document.querySelector('.contact-toast');
        if (existingToast) {
            existingToast.remove();
        }

        // Create toast
        const toast = document.createElement('div');
        toast.className = `contact-toast ${type}`;

        const icon = type === 'success'
            ? '<i class="fa-solid fa-circle-check"></i>'
            : '<i class="fa-solid fa-circle-exclamation"></i>';

        toast.innerHTML = `${icon} <span>${message}</span>`;

        document.body.appendChild(toast);

        // Show toast
        setTimeout(() => {
            toast.classList.add('show');
        }, 100);

        // Hide and remove toast
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 5000);
    }

    // ========================================
    // CONTACT CARD ANIMATIONS
    // ========================================

    const contactCards = document.querySelectorAll('.contact-card');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const cardObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, observerOptions);

    contactCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-30px)';
        card.style.transition = 'all 0.6s ease-out';
        cardObserver.observe(card);
    });

    // ========================================
    // SOCIAL LINK RIPPLE EFFECT
    // ========================================

    const socialLinks = document.querySelectorAll('.social-link');

    socialLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');

            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
});

// ========================================
// SHAKE ANIMATION (for errors)
// ========================================

const shakeStyle = document.createElement('style');
shakeStyle.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
        20%, 40%, 60%, 80% { transform: translateX(5px); }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }

    /* Toast Notification Styles */
    .contact-toast {
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: white;
        padding: 1.8rem 2.5rem;
        border-radius: 1.2rem;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
        display: flex;
        align-items: center;
        gap: 1.5rem;
        font-size: 1.5rem;
        font-weight: 600;
        z-index: 10000;
        opacity: 0;
        transform: translateX(400px);
        transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
    }

    .contact-toast.show {
        opacity: 1;
        transform: translateX(0);
    }

    .contact-toast.success {
        border-left: 4px solid #10b981;
        color: #059669;
    }

    .contact-toast.error {
        border-left: 4px solid #ef4444;
        color: #dc2626;
    }

    .contact-toast i {
        font-size: 2.4rem;
    }

    .contact-toast.success i {
        color: #10b981;
    }

    .contact-toast.error i {
        color: #ef4444;
    }

    @media (max-width: 768px) {
        .contact-toast {
            bottom: 20px;
            right: 20px;
            left: 20px;
            padding: 1.5rem 2rem;
            font-size: 1.4rem;
        }
    }
`;
document.head.appendChild(shakeStyle);
