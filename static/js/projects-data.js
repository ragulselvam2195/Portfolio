/* ================================================
   ADVANCED PROJECT DATA - Detailed Information
   ================================================ */

const projectsData = {
    "Portfolio Website": {
        category: "Web Development",
        icon: "fa-laptop-code",
        metrics: {
            duration: "2 months",
            team: "Solo Project",
            complexity: "Intermediate",
            performance: "98%"
        },
        goals: [
            "Create a professional online presence to showcase skills and projects",
            "Implement modern UI/UX design with glassmorphism effects",
            "Ensure optimal performance and SEO",
            "Build a fully responsive and accessible website"
        ],
        techStack: {
            "Frontend": ["HTML5", "CSS3", "JavaScript ES6+", "ScrollReveal.js", "Typed.js"],
            "Backend": ["Python 3.10", "Flask 2.3", "Jinja2 Templates"],
            "Tools": ["Git", "VS Code", "Chrome DevTools", "Figma"]
        },
        architecture: "The portfolio follows a classic MVC architecture with Flask handling server-side routing and Jinja2 for template rendering. The frontend uses vanilla JavaScript for animations and interactions, ensuring minimal dependencies and maximum performance.",
        database: "Static file-based content management. Contact form submissions are handled server-side and can be configured to integrate with email services or databases.",
        apis: [
            "ScrollReveal API for scroll-triggered animations",
            "Intersection Observer API for performance optimization",
            "Custom cursor tracking using mouse events",
            "Form validation and submission handling"
        ],
        challenges: [
            {
                title: "Cross-browser Animation Compatibility",
                description: "Ensuring smooth animations across different browsers, especially Safari"
            },
            {
                title: "Performance Optimization",
                description: "Balancing rich animations with page load speed and performance"
            },
            {
                title: "Responsive Design",
                description: "Creating a design that works seamlessly from 320px to 4K displays"
            }
        ],
        solutions: [
            {
                title: "Progressive Enhancement",
                description: "Implemented fallbacks for animations and used CSS transforms for better performance"
            },
            {
                title: "Lazy Loading",
                description: "Used Intersection Observer to load animations only when elements are visible"
            },
            {
                title: "Fluid Typography & Spacing",
                description: "Utilized CSS clamp() and viewport units for responsive scaling"
            }
        ],
        lessons: [
            "Understanding the importance of performance budgets in modern web development",
            "Mastering CSS custom properties for dynamic theming",
            "Learning advanced JavaScript event handling and DOM manipulation",
            "Importance of accessibility in creating inclusive web experiences"
        ],
        results: [
            { label: "Page Load Time", value: "< 1.5s" },
            { label: "Lighthouse Score", value: "95+" },
            { label: "Cross-browser Support", value: "100%" },
            { label: "Mobile Responsive", value: "Yes" }
        ],
        impact: "The portfolio has successfully served as a professional showcase, leading to multiple project inquiries and collaboration opportunities. The clean, modern design and smooth user experience have received positive feedback from industry professionals.",
        future: [
            "Integrate a blog section for technical writing and tutorials",
            "Add dark/light theme toggle with system preference detection",
            "Implement service worker for offline capabilities",
            "Add multi-language support (English, Tamil, Hindi)",
            "Create an admin panel for easy content updates"
        ],
        achievements: [
            { icon: "fa-rocket", text: "100% Responsive Design" },
            { icon: "fa-gauge-high", text: "95+ Lighthouse Score" },
            { icon: "fa-universal-access", text: "WCAG 2.1 AA Compliant" },
            { icon: "fa-shield-halved", text: "Secure HTTPS" }
        ],
        tags: ["Portfolio", "Flask", "Responsive", "Animations", "Modern UI"]
    },

    "AI Chatbot System": {
        category: "Artificial Intelligence",
        icon: "fa-brain",
        metrics: {
            duration: "4 months",
            team: "Solo Project",
            complexity: "Advanced",
            performance: "92%"
        },
        goals: [
            "Build an intelligent NLP-powered chatbot for customer service",
            "Implement context-aware conversation handling",
            "Achieve high accuracy in intent recognition",
            "Create a scalable and maintainable system"
        ],
        techStack: {
            "Machine Learning": ["TensorFlow 2.x", "NLTK", "scikit-learn", "NumPy", "Pandas"],
            "Backend": ["Python 3.9", "FastAPI", "Pydantic", "SQLAlchemy"],
            "Database": ["PostgreSQL", "Redis (caching)"],
            "Deployment": ["Docker", "Gunicorn", "Nginx"]
        },
        architecture: "Microservices architecture with separate services for NLP processing, intent classification, and response generation. Uses Redis for caching frequently accessed data and maintaining conversation context.",
        database: "PostgreSQL stores conversation history, user data, and training datasets. Redis handles session management and real-time context caching for faster response times.",
        apis: [
            "FastAPI REST endpoints for chat interactions",
            "WebSocket support for real-time messaging",
            "TensorFlow Serving for model inference",
            "Sentiment analysis API integration"
        ],
        challenges: [
            {
                title: "Intent Recognition Accuracy",
                description: "Achieving high accuracy with limited training data"
            },
            {
                title: "Context Management",
                description: "Maintaining conversation context across multiple turns"
            },
            {
                title: "Response Latency",
                description: "Keeping response time under 500ms for good UX"
            }
        ],
        solutions: [
            {
                title: "Transfer Learning",
                description: "Used pre-trained BERT models and fine-tuned on custom dataset"
            },
            {
                title: "Session-based Context",
                description: "Implemented Redis-based context storage with sliding window approach"
            },
            {
                title: "Model Optimization",
                description: "Quantized model and used TensorFlow Lite for faster inference"
            }
        ],
        lessons: [
            "Importance of quality training data over quantity",
            "Understanding trade-offs between model accuracy and inference speed",
            "Effective error handling and fallback strategies in conversational AI",
            "Real-world testing is crucial for improving chatbot performance"
        ],
        results: [
            { label: "Intent Accuracy", value: "89%" },
            { label: "Avg Response Time", value: "380ms" },
            { label: "User Satisfaction", value: "4.2/5" },
            { label: "Context Retention", value: "85%" }
        ],
        impact: "Successfully reduced customer service response time by 60% and handled 70% of common queries autonomously. The system has processed over 10,000 conversations with an average satisfaction rating of 4.2/5.",
        future: [
            "Add voice interaction support",
            "Implement multi-language support (5+ languages)",
            "Integrate with knowledge base for more accurate responses",
            "Add sentiment-based response adaptation",
            "Implement A/B testing framework for continuous improvement"
        ],
        achievements: [
            { icon: "fa-brain", text: "89% Intent Accuracy" },
            { icon: "fa-bolt", text: "<500ms Response" },
            { icon: "fa-language", text: "Context Aware" },
            { icon: "fa-chart-line", text: "Continuous Learning" }
        ],
        tags: ["AI/ML", "NLP", "Chatbot", "TensorFlow", "FastAPI", "Python"]
    },

    "Campus Connect Portal": {
        category: "Web Application",
        icon: "fa-graduation-cap",
        metrics: {
            duration: "5 months",
            team: "Solo Project",
            complexity: "Advanced",
            performance: "94%"
        },
        goals: [
            "Create comprehensive student management system",
            "Implement role-based access control (Admin, Staff, Student)",
            "Build real-time analytics dashboard",
            "Ensure data security and user privacy"
        ],
        techStack: {
            "Frontend": ["HTML5", "CSS3", "JavaScript", "Bootstrap 5", "Chart.js"],
            "Backend": ["Python Flask", "SQLAlchemy ORM", "Flask-Login"],
            "Database": ["SQLite", "PostgreSQL (Production)"],
            "Tools": ["Git", "Postman", "SQLite Browser"]
        },
        architecture: "Monolithic architecture with clear separation of concerns using Flask Blueprints. MVC pattern with SQLAlchemy models, Jinja2 views, and Flask route controllers. Session-based authentication with secure cookies.",
        database: "Relational database with normalized schema including tables for users, students, staff, courses, attendance, marks, timetables, and announcements. Foreign key relationships ensure data integrity.",
        apis: [
            "RESTful endpoints for CRUD operations",
            "Authentication and authorization middleware",
            "CSV export functionality for reports",
            "Email notification system integration"
        ],
        challenges: [
            {
                title: "Role-based Access Control",
                description: "Implementing complex permission system across three user roles"
            },
            {
                title: "Data Consistency",
                description: "Maintaining data integrity across related entities"
            },
            {
                title: "Performance with Large Datasets",
                description: "Optimizing queries for dashboards with thousands of records"
            }
        ],
        solutions: [
            {
                title: "Decorator-based Authorization",
                description: "Created custom decorators for role checking and route protection"
            },
            {
                title: "Database Transactions",
                description: "Used SQLAlchemy transactions and cascade operations"
            },
            {
                title: "Query Optimization",
                description: "Implemented pagination, indexing, and eager loading strategies"
            }
        ],
        lessons: [
            "Importance of proper database design and normalization",
            "Security best practices for web applications (CSRF, XSS, SQL injection prevention)",
            "User experience design for different user personas",
            "Effective testing strategies for complex business logic"
        ],
        results: [
            { label: "Active Users", value: "500+" },
            { label: "Data Records", value: "10,000+" },
            { label: "Uptime", value: "99.5%" },
            { label: "Load Time", value: "< 2s" }
        ],
        impact: "Successfully streamlined academic management for an educational institution, reducing administrative workload by 40%. Improved communication between staff and students, and provided real-time insights through analytics dashboards.",
        future: [
            "Mobile application for Android and iOS",
            "Push notification system",
            "Integration with payment gateways for fee management",
            "Advanced analytics with ML-based predictions",
            "Parent portal for guardian access"
        ],
        achievements: [
            { icon: "fa-users", text: "500+ Active Users" },
            { icon: "fa-shield", text: "Secure & Reliable" },
            { icon: "fa-chart-bar", text: "Real-time Analytics" },
            { icon: "fa-mobile", text: "Fully Responsive" }
        ],
        tags: ["Education", "Management", "Flask", "Full-stack", "Database", "Analytics"]
    },

    "Python Automation Suite": {
        category: "Automation",
        icon: "fa-robot",
        metrics: {
            duration: "3 months",
            team: "Solo Project",
            complexity: "Intermediate",
            performance: "96%"
        },
        goals: [
            "Automate repetitive data processing tasks",
            "Create reusable automation scripts",
            "Implement scheduled task execution",
            "Generate automated reports"
        ],
        techStack: {
            "Core": ["Python 3.9+", "Selenium WebDriver", "Pandas", "BeautifulSoup4"],
            "Automation": ["Schedule", "APScheduler", "Openpyxl", "python-docx"],
            "Utilities": ["Requests", "SMTP lib", "Logging"]
        },
        architecture: "Modular script-based architecture with separate modules for web scraping, data processing, file operations, and reporting. Configuration-driven approach using YAML files for easy customization.",
        database: "CSV and Excel files for data storage. SQLite for maintaining execution logs and tracking automation history.",
        apis: [
            "Web scraping using Selenium and BeautifulSoup",
            "Email automation via SMTP",
            "File system operations for batch processing",
            "Scheduled task execution"
        ],
        challenges: [
            {
                title: "Dynamic Web Content",
                description: "Scraping JavaScript-rendered websites"
            },
            {
                title: "Error Handling",
                description: "Managing failures in  long-running automation tasks"
            },
            {
                title: "Data Validation",
                description: "Ensuring scraped data quality and consistency"
            }
        ],
        solutions: [
            {
                title: "Selenium with Explicit Waits",
                description: "Implemented wait strategies for dynamic content loading"
            },
            {
                title: "Retry Mechanism",
                description: "Added exponential backoff and retry logic with detailed logging"
            },
            {
                title: "Data Validation Pipeline",
                description: "Created validation  rules and data cleaning procedures"
            }
        ],
        lessons: [
            "Importance of robust error handling in automation",
            "Understanding web scraping ethics and robots.txt compliance",
            "Effective logging for debugging automation issues",
            "Value of modular code for maintainability"
        ],
        results: [
            { label: "Time Saved", value: "80%" },
            { label: "Tasks Automated", value: "25+" },
            { label: "Success Rate", value: "96%" },
            { label: "Reports Generated", value: "1000+" }
        ],
        impact: "Reduced manual data processing time by 80%, saving approximately 20 hours per week. Automated generation of 1000+ reports with 96% accuracy, significantly improving productivity.",
        future: [
            "Web-based dashboard for managing automations",
            "Integration with cloud storage (Google Drive, Dropbox)",
            "Machine learning for intelligent data extraction",
            "Mobile notifications for task completion",
            "Docker containerization for easy deployment"
        ],
        achievements: [
            { icon: "fa-clock", text: "80% Time Reduction" },
            { icon: "fa-check-circle", text: "96% Success Rate" },
            { icon: "fa-file-alt", text: "1000+ Reports" },
            { icon: "fa-robot", text: "25+ Automated Tasks" }
        ],
        tags: ["Automation", "Python", "Scraping", "Data Processing", "Productivity"]
    }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = projectsData;
}
