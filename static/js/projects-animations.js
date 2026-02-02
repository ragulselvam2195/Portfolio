/* =======================================
   ENHANCED PROJECTS WITH DETAILED MODAL
   ======================================= */

// Project Filtering System (keeping existing functionality)
document.addEventListener('DOMContentLoaded', function () {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectBoxes = document.querySelectorAll('.portfolio-box');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filter = this.getAttribute('data-filter');

            projectBoxes.forEach(box => {
                const category = box.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    box.classList.remove('hide');
                    box.style.animation = 'none';
                    setTimeout(() => {
                        box.style.animation = 'fadeInUp 0.6s ease-out forwards';
                    }, 10);
                } else {
                    box.classList.add('hide');
                }
            });
        });
    });
});

// Enhanced Project Modal with Comprehensive Data
function openProjectModal(element) {
    const projectTitle = element.getAttribute('data-title');
    const projectData = projectsData[projectTitle];

    if (!projectData) {
        console.warn('No detailed data found for:', projectTitle);
        openBasicModal(element);
        return;
    }

    const modal = document.getElementById('projectModal');

    // Populate header
    document.getElementById('modalTitle').textContent = projectTitle;
    document.getElementById('modalCategory').textContent = projectData.category || 'Project';

    // Set icon
    const modalIcon = document.querySelector('.modal-project-icon i');
    if (modalIcon) {
        modalIcon.className = `fa-solid ${projectData.icon}`;
    }

    // Set links
    document.getElementById('modalDemoLink').href = element.getAttribute('data-demo') || '#';
    document.getElementById('modalGithubLink').href = element.getAttribute('data-github') || '#';

    // Populate metrics
    if (projectData.metrics) {
        document.getElementById('modalDuration').textContent = projectData.metrics.duration;
        document.getElementById('modalTeam').textContent = projectData.metrics.team;
        document.getElementById('modalComplexity').textContent = projectData.metrics.complexity;
        document.getElementById('modalPerformance').textContent = projectData.metrics.performance;
    }

    // Populate Overview Tab
    document.getElementById('modalDesc').textContent = element.getAttribute('data-desc') || 'No description available.';

    // Project Goals
    const goalsContainer = document.getElementById('modalGoals');
    goalsContainer.innerHTML = '';
    if (projectData.goals) {
        projectData.goals.forEach(goal => {
            const li = document.createElement('li');
            li.textContent = goal;
            goalsContainer.appendChild(li);
        });
    }

    // Key Features
    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    const features = element.getAttribute('data-features');
    if (features) {
        const featuresArray = features.split('|');
        featuresArray.forEach(feature => {
            const featureCard = document.createElement('div');
            featureCard.className = 'feature-card';
            featureCard.innerHTML = `
                <i class="fa-solid fa-check-circle"></i>
                <span>${feature.trim()}</span>
            `;
            featuresContainer.appendChild(featureCard);
        });
    }

    // Populate Technical Tab
    const techStackContainer = document.getElementById('modalTechStack');
    techStackContainer.innerHTML = '';
    if (projectData.techStack) {
        for (const [category, technologies] of Object.entries(projectData.techStack)) {
            const techSection = document.createElement('div');
            techSection.className = 'tech-category';
            techSection.innerHTML = `
                <h4>${category}</h4>
                <div class="tech-items">
                    ${technologies.map(tech => `<span class="tech-item">${tech}</span>`).join('')}
                </div>
            `;
            techStackContainer.appendChild(techSection);
        }
    }

    document.getElementById('modalArchitecture').textContent = projectData.architecture || 'Architecture details not available.';
    document.getElementById('modalDatabase').textContent = projectData.database || 'Database information not available.';

    // APIs & Integrations
    const apisContainer = document.getElementById('modalAPIs');
    apisContainer.innerHTML = '';
    if (projectData.apis) {
        projectData.apis.forEach(api => {
            const li = document.createElement('li');
            li.textContent = api;
            apisContainer.appendChild(li);
        });
    }

    // Populate Challenges Tab
    const challengesContainer = document.getElementById('modalChallenges');
    challengesContainer.innerHTML = '';
    if (projectData.challenges) {
        projectData.challenges.forEach(challenge => {
            const challengeCard = document.createElement('div');
            challengeCard.className = 'challenge-card';
            challengeCard.innerHTML = `
                <h4><i class="fa-solid fa-exclamation-circle"></i> ${challenge.title}</h4>
                <p>${challenge.description}</p>
            `;
            challengesContainer.appendChild(challengeCard);
        });
    }

    // Solutions
    const solutionsContainer = document.getElementById('modalSolutions');
    solutionsContainer.innerHTML = '';
    if (projectData.solutions) {
        projectData.solutions.forEach(solution => {
            const solutionCard = document.createElement('div');
            solutionCard.className = 'solution-card';
            solutionCard.innerHTML = `
                <h4><i class="fa-solid fa-check-double"></i> ${solution.title}</h4>
                <p>${solution.description}</p>
            `;
            solutionsContainer.appendChild(solutionCard);
        });
    }

    // Lessons Learned
    const lessonsContainer = document.getElementById('modalLessons');
    lessonsContainer.innerHTML = '';
    if (projectData.lessons) {
        projectData.lessons.forEach(lesson => {
            const li = document.createElement('li');
            li.textContent = lesson;
            lessonsContainer.appendChild(li);
        });
    }

    // Populate Outcomes Tab
    const resultsContainer = document.getElementById('modalResults');
    resultsContainer.innerHTML = '';
    if (projectData.results) {
        projectData.results.forEach(result => {
            const resultCard = document.createElement('div');
            resultCard.className = 'result-card';
            resultCard.innerHTML = `
                <div class="result-value">${result.value}</div>
                <div class="result-label">${result.label}</div>
            `;
            resultsContainer.appendChild(resultCard);
        });
    }

    document.getElementById('modalImpact').textContent = projectData.impact || 'Impact information not available.';

    // Future Enhancements
    const futureContainer = document.getElementById('modalFuture');
    futureContainer.innerHTML = '';
    if (projectData.future) {
        projectData.future.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            futureContainer.appendChild(li);
        });
    }

    // Achievements
    const achievementsContainer = document.getElementById('modalAchievements');
    achievementsContainer.innerHTML = '';
    if (projectData.achievements) {
        projectData.achievements.forEach(achievement => {
            const achievementCard = document.createElement('div');
            achievementCard.className = 'achievement-card';
            achievementCard.innerHTML = `
                <i class="fa-solid ${achievement.icon}"></i>
                <span>${achievement.text}</span>
            `;
            achievementsContainer.appendChild(achievementCard);
        });
    }

    // Project Tags
    const tagsContainer = document.getElementById('modalTags');
    tagsContainer.innerHTML = '';
    if (projectData.tags) {
        projectData.tags.forEach(tag => {
            const tagSpan = document.createElement('span');
            tagSpan.className = 'project-tag';
            tagSpan.textContent = tag;
            tagsContainer.appendChild(tagSpan);
        });
    }

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    // Trigger tab content stagger animation
    setTimeout(staggerModalContent, 100);
}

// Fallback to basic modal if detailed data not available
function openBasicModal(element) {
    const modal = document.getElementById('projectModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDesc = document.getElementById('modalDesc');

    modalTitle.textContent = element.getAttribute('data-title');
    modalDesc.textContent = element.getAttribute('data-desc');

    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeProjectModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';

    // Reset to overview tab
    switchTab('overview');
}

// Tab Switching Functionality
function switchTab(tabName) {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        if (btn.getAttribute('data-tab') === tabName) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    tabContents.forEach(content => {
        if (content.getAttribute('data-tab-content') === tabName) {
            content.classList.add('active');
            // Trigger stagger animation
            setTimeout(() => staggerTabSections(content), 50);
        } else {
            content.classList.remove('active');
        }
    });
}

// Initialize tab switching
document.addEventListener('DOMContentLoaded', function () {
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const tabName = this.getAttribute('data-tab');
            switchTab(tabName);
        });
    });
});

// Stagger animation for modal content
function staggerModalContent() {
    const sections = document.querySelectorAll('.modal-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.4s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Stagger animation for tab sections
function staggerTabSections(tabContent) {
    const sections = tabContent.querySelectorAll('.modal-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateX(-20px)';
        setTimeout(() => {
            section.style.transition = 'all 0.4s ease';
            section.style.opacity = '1';
            section.style.transform = 'translateX(0)';
        }, index * 80);
    });
}

// Close modal on Escape key
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        closeProjectModal();
    }
});

// 3D Tilt Effect on Project Cards
document.querySelectorAll('.portfolio-box').forEach(card => {
    card.addEventListener('mousemove', function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', function () {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// Share functionality
document.addEventListener('DOMContentLoaded', function () {
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const projectTitle = document.getElementById('modalTitle').textContent;
            const icon = this.querySelector('i');

            if (icon.classList.contains('fa-twitter')) {
                const url = `https://twitter.com/intent/tweet?text=Check out my project: ${projectTitle}`;
                window.open(url, '_blank');
            } else if (icon.classList.contains('fa-linkedin')) {
                const url = `https://www.linkedin.com/sharing/share-offsite/?url=${window.location.href}`;
                window.open(url, '_blank');
            } else if (icon.classList.contains('fa-link')) {
                // Copy link to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    showToast('Link copied to clipboard!');
                });
            }
        });
    });
});

// Simple toast notification
function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'custom-toast';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: var(--main-color);
        color: white;
        padding: 1rem 2rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    document.body.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

console.log(' Enhanced project modal with comprehensive data loaded!');
