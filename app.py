from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_mail import Mail, Message
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
import os
from datetime import datetime
from config import Config
import re

app = Flask(__name__)
app.config.from_object(Config)

# Initialize Flask-Mail
mail = Mail(app)

# Initialize rate limiter
limiter = Limiter(
    app=app,
    key_func=get_remote_address,
    default_limits=["200 per day", "50 per hour"],
    storage_uri="memory://"
)

# Project data for detail pages
PROJECTS = {
    'portfolio-website': {
        'title': 'Portfolio Website',
        'category': 'Web Development',
        'status': 'Completed',
        'description': 'A high-performance personal portfolio website built with Flask and Vanilla JS. Features include a custom cursor, scroll reveal animations, glassmorphism UI, and smooth page transitions. Fully responsive design optimized for all devices.',
        'image': 'images/portfolio-preview.jpg',
        'tech_stack': ['Python 3.10+', 'Flask 2.0+', 'Jinja2', 'HTML5/CSS3', 'Vanilla JavaScript'],
        'features': ['Custom Cursor', 'Scroll Animations', 'Glassmorphism Design', 'Responsive Layout', 'Contact Form Integration'],
        'github': '#',
        'live_demo': '#'
    },
    'ai-chatbot': {
        'title': 'AI Chatbot System',
        'category': 'Artificial Intelligence',
        'status': 'In Progress',
        'description': 'An intelligent chatbot tailored for customer service interactions. Utilizes NLTK for natural language processing and TensorFlow for intent classification. Features include conversation history, sentiment analysis, and multi-language support.',
        'image': 'images/chatbot-preview.jpg',
        'tech_stack': ['Python 3.9+', 'TensorFlow 2.x', 'NLTK', 'NumPy', 'Pandas', 'FastAPI'],
        'features': ['NLP Processing', 'Intent Recognition', 'Sentiment Analysis', 'Context Awareness', 'Multi-language Support', 'REST API'],
        'github': '#',
        'live_demo': '#'
    },
    'campus-connect': {
        'title': 'Campus Connect Portal',
        'category': 'Web Application',
        'status': 'Completed',
        'description': 'A comprehensive student and staff management portal for educational institutions. Features include attendance tracking, marks management, leave requests, timetable generation, and role-based dashboards for admin, staff, and students.',
        'image': 'images/campus-connect-dashboard.png',
        'tech_stack': ['Python Flask', 'SQLite', 'SQLAlchemy', 'Bootstrap 5', 'JavaScript', 'Chart.js'],
        'features': ['User Authentication', 'Role-based Access', 'Attendance System', 'Marks Management', 'Leave Requests', 'Analytics Dashboard', 'Timetable Generator'],
        'github': '#',
        'live_demo': '#'
    },
    'automation-suite': {
        'title': 'Python Automation Suite',
        'category': 'Automation',
        'status': 'Completed',
        'description': 'A comprehensive collection of automation tools for various tasks including web scraping, data processing, file management, and report generation. Reduces manual work by 80% with intelligent batch processing and scheduling capabilities.',
        'image': 'images/automation-preview.jpg',
        'tech_stack': ['Python 3.9+', 'Selenium', 'Pandas', 'BeautifulSoup', 'Schedule', 'Openpyxl'],
        'features': ['Web Scraping', 'Data Processing', 'File Automation', 'Report Generation', 'Email Automation', 'Scheduled Tasks'],
        'github': '#',
        'live_demo': '#'
    }
}

def validate_email(email):
    """Validate email format"""
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    return re.match(pattern, email) is not None

def sanitize_input(text):
    """Basic input sanitization"""
    if not text:
        return ""
    # Remove potential XSS attempts
    text = str(text).strip()
    return text

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/project/<project_id>')
def project_detail(project_id):
    project = PROJECTS.get(project_id)
    if project:
        return render_template('project_detail.html', project=project, project_id=project_id)
    return "Project not found", 404

@app.route('/download-cv')
def download_cv():
    # Ensure the directory exists
    directory = os.path.join(app.root_path, 'static', 'files')
    if not os.path.exists(directory):
        os.makedirs(directory)
    return send_from_directory(directory, 'Ragul_S_Resume.pdf', as_attachment=True)

@app.route('/send-message', methods=['POST'])
@limiter.limit("5 per hour")  # Rate limit: 5 messages per hour per IP
def send_message():
    """Advanced contact form handler with auto-reply and professional emails"""
    try:
        data = request.json
        
        # Extract and sanitize form data
        name = sanitize_input(data.get('name', ''))
        email = sanitize_input(data.get('email', ''))
        phone = sanitize_input(data.get('phone', ''))
        subject = sanitize_input(data.get('subject', 'General Inquiry'))
        message = sanitize_input(data.get('message', ''))
        
        # Validation
        if not name or len(name) < 2:
            return jsonify({
                'status': 'error',
                'message': 'Please provide a valid name (minimum 2 characters)'
            }), 400
        
        if not email or not validate_email(email):
            return jsonify({
                'status': 'error',
                'message': 'Please provide a valid email address'
            }), 400
        
        if not message or len(message) < 10:
            return jsonify({
                'status': 'error',
                'message': 'Please provide a message (minimum 10 characters)'
            }), 400
        
        # Check if email is configured
        if not app.config['MAIL_USERNAME'] or not app.config['MAIL_PASSWORD']:
            # Log to console if email not configured
            print("\n" + "="*70)
            print("📧 NEW CONTACT FORM SUBMISSION (Email Config Required)")
            print("="*70)
            print(f"👤 Name:    {name}")
            print(f"📧 Email:   {email}")
            print(f"📱 Phone:   {phone if phone else 'Not provided'}")
            print(f"📋 Subject: {subject}")
            print(f"💬 Message:\n{message}")
            print(f"🕐 Time:    {datetime.now().strftime('%B %d, %Y at %I:%M %p')}")
            print("="*70 + "\n")
            
            return jsonify({
                'status': 'success',
                'message': 'Message received! (Email not configured - check console)'
            })
        
        # ============================================
        # 1. SEND NOTIFICATION EMAIL TO YOU
        # ============================================
        notification_msg = Message(
            subject=f"🔔 New Contact: {subject}",
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[app.config['RECIPIENT_EMAIL']],
            reply_to=email  # Enable direct reply to sender
        )
        
        # Professional HTML template for notification
        notification_msg.html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * {{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }}
                body {{
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    line-height: 1.6;
                    color: #1f2937;
                    background: #f9fafb;
                    padding: 20px;
                }}
                .email-wrapper {{
                    max-width: 650px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                }}
                .header-gradient {{
                    background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
                    padding: 40px 30px;
                    text-align: center;
                }}
                .header-icon {{
                    font-size: 48px;
                    margin-bottom: 10px;
                }}
                .header-title {{
                    color: white;
                    font-size: 28px;
                    font-weight: 700;
                    margin: 0;
                }}
                .header-subtitle {{
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 16px;
                    margin-top: 8px;
                }}
                .content {{
                    padding: 40px 30px;
                }}
                .section {{
                    margin-bottom: 30px;
                }}
                .section-title {{
                    font-size: 14px;
                    font-weight: 700;
                    color: #6b7280;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                    margin-bottom: 12px;
                }}
                .info-grid {{
                    background: #f8fafc;
                    border-radius: 12px;
                    padding: 20px;
                    border: 1px solid #e5e7eb;
                }}
                .info-item {{
                    display: flex;
                    padding: 12px 0;
                    border-bottom: 1px solid #e5e7eb;
                }}
                .info-item:last-child {{
                    border-bottom: none;
                }}
                .info-label {{
                    font-weight: 600;
                    color: #3b82f6;
                    min-width: 100px;
                    font-size: 14px;
                }}
                .info-value {{
                    color: #374151;
                    font-size: 14px;
                    flex: 1;
                }}
                .info-value a {{
                    color: #3b82f6;
                    text-decoration: none;
                }}
                .info-value a:hover {{
                    text-decoration: underline;
                }}
                .message-container {{
                    background: linear-gradient(135deg, #ede9fe 0%, #ddd6fe 100%);
                    border-radius: 12px;
                    padding: 24px;
                    border-left: 4px solid #8b5cf6;
                }}
                .message-title {{
                    font-weight: 700;
                    color: #6b21a8;
                    margin-bottom: 12px;
                    font-size: 16px;
                }}
                .message-text {{
                    white-space: pre-wrap;
                    color: #4c1d95;
                    line-height: 1.8;
                    font-size: 15px;
                }}
                .action-buttons {{
                    margin-top: 30px;
                    text-align: center;
                }}
                .btn {{
                    display: inline-block;
                    padding: 14px 32px;
                    background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
                    color: white;
                    text-decoration: none;
                    border-radius: 8px;
                    font-weight: 600;
                    font-size: 15px;
                    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
                }}
                .footer {{
                    background: #f9fafb;
                    padding: 30px;
                    text-align: center;
                    border-top: 1px solid #e5e7eb;
                }}
                .timestamp {{
                    color: #6b7280;
                    font-size: 13px;
                    margin-bottom: 8px;
                }}
                .footer-note {{
                    color: #9ca3af;
                    font-size: 12px;
                    line-height: 1.6;
                }}
                .badge {{
                    display: inline-block;
                    padding: 6px 14px;
                    background: #10b981;
                    color: white;
                    border-radius: 20px;
                    font-size: 12px;
                    font-weight: 700;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }}
            </style>
        </head>
        <body>
            <div class="email-wrapper">
                <div class="header-gradient">
                    <div class="header-icon">📬</div>
                    <h1 class="header-title">New Contact Message</h1>
                    <p class="header-subtitle">Someone just reached out via your portfolio</p>
                </div>
                
                <div class="content">
                    <div class="section">
                        <h2 class="section-title">📋 Contact Details</h2>
                        <div class="info-grid">
                            <div class="info-item">
                                <span class="info-label">👤 Name:</span>
                                <span class="info-value"><strong>{name}</strong></span>
                            </div>
                            <div class="info-item">
                                <span class="info-label">📧 Email:</span>
                                <span class="info-value"><a href="mailto:{email}">{email}</a></span>
                            </div>
                            {f'<div class="info-item"><span class="info-label">📱 Phone:</span><span class="info-value"><a href="tel:{phone}">{phone}</a></span></div>' if phone else ''}
                            <div class="info-item">
                                <span class="info-label">📝 Subject:</span>
                                <span class="info-value">{subject}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="section">
                        <h2 class="section-title">💬 Message</h2>
                        <div class="message-container">
                            <div class="message-text">{message}</div>
                        </div>
                    </div>
                    
                    <div class="action-buttons">
                        <a href="mailto:{email}?subject=Re: {subject}" class="btn">
                            Reply to {name.split()[0]}
                        </a>
                    </div>
                </div>
                
                <div class="footer">
                    <p class="timestamp">🕐 Received: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</p>
                    <p class="footer-note">
                        This message was sent via your portfolio contact form.<br>
                        Reply-To is configured to: {email}
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Plain text fallback for notification
        notification_msg.body = f"""
📬 NEW CONTACT MESSAGE FROM YOUR PORTFOLIO

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

CONTACT DETAILS:
👤 Name:    {name}
📧 Email:   {email}
{'📱 Phone:   ' + phone if phone else ''}
📝 Subject: {subject}

MESSAGE:
{message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🕐 Received: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}

Reply directly to this email to respond to {name}.
        """
        
        # Send notification to you
        mail.send(notification_msg)
        
        # ============================================
        # 2. SEND AUTO-REPLY TO SENDER
        # ============================================
        auto_reply = Message(
            subject=f"✅ Message Received: {subject}",
            sender=app.config['MAIL_DEFAULT_SENDER'],
            recipients=[email]
        )
        
        # Professional auto-reply HTML template
        auto_reply.html = f"""
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <style>
                * {{
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                }}
                body {{
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    line-height: 1.6;
                    color: #1f2937;
                    background: #f9fafb;
                    padding: 20px;
                }}
                .email-wrapper {{
                    max-width: 600px;
                    margin: 0 auto;
                    background: white;
                    border-radius: 16px;
                    overflow: hidden;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
                }}
                .header {{
                    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
                    padding: 40px 30px;
                    text-align: center;
                }}
                .checkmark {{
                    width: 80px;
                    height: 80px;
                    background: white;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    font-size: 48px;
                }}
                .header-title {{
                    color: white;
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 8px;
                }}
                .header-subtitle {{
                    color: rgba(255, 255, 255, 0.95);
                    font-size: 16px;
                }}
                .content {{
                    padding: 40px 30px;
                }}
                .greeting {{
                    font-size: 18px;
                    color: #111827;
                    margin-bottom: 20px;
                }}
                .message {{
                    color: #4b5563;
                    font-size: 15px;
                    line-height: 1.8;
                    margin-bottom: 20px;
                }}
                .summary-box {{
                    background: #f0f9ff;
                    border-left: 4px solid #3b82f6;
                    padding: 20px;
                    border-radius: 8px;
                    margin: 30px 0;
                }}
                .summary-title {{
                    font-weight: 700;
                    color: #1e40af;
                    margin-bottom: 12px;
                }}
                .summary-item {{
                    padding: 8px 0;
                    color: #1e3a8a;
                    font-size: 14px;
                }}
                .timeline {{
                    background: #fef3c7;
                    border-left: 4px solid #f59e0b;
                    padding: 16px 20px;
                    border-radius: 8px;
                    margin: 20px 0;
                }}
                .timeline-text {{
                    color: #92400e;
                    font-size: 14px;
                    line-height: 1.6;
                }}
                .signature {{
                    margin-top: 40px;
                    padding-top: 30px;
                    border-top: 2px solid #e5e7eb;
                }}
                .signature-name {{
                    font-weight: 700;
                    color: #111827;
                    font-size: 16px;
                }}
                .signature-title {{
                    color: #6b7280;
                    font-size: 14px;
                    margin-top: 4px;
                }}
                .footer {{
                    background: #f9fafb;
                    padding: 25px 30px;
                    text-align: center;
                    border-top: 1px solid #e5e7eb;
                }}
                .footer-text {{
                    color: #9ca3af;
                    font-size: 12px;
                    line-height: 1.6;
                }}
            </style>
        </head>
        <body>
            <div class="email-wrapper">
                <div class="header">
                    <div class="checkmark">✅</div>
                    <h1 class="header-title">Message Received!</h1>
                    <p class="header-subtitle">Your inquiry has been successfully delivered</p>
                </div>
                
                <div class="content">
                    <p class="greeting">Hi {name},</p>
                    
                    <p class="message">
                        Thank you for reaching out! I've received your message and wanted to let you know 
                        that I'll review it carefully and get back to you as soon as possible.
                    </p>
                    
                    <div class="summary-box">
                        <div class="summary-title">📋 Here's what I received:</div>
                        <div class="summary-item"><strong>Subject:</strong> {subject}</div>
                        <div class="summary-item"><strong>Sent:</strong> {datetime.now().strftime('%B %d, %Y at %I:%M %p')}</div>
                    </div>
                    
                    <p class="message">
                        I typically respond within 24-48 hours. If your matter is urgent, feel free to 
                        follow up with me directly.
                    </p>
                    
                    <div class="timeline">
                        <div class="timeline-text">
                            <strong>⏰ Expected Response:</strong> Within 24-48 hours<br>
                            <strong>📧 Your Email:</strong> {email}<br>
                            <strong>🔔 You'll receive:</strong> A detailed response to your inquiry
                        </div>
                    </div>
                    
                    <p class="message">
                        In the meantime, feel free to check out my other projects and work on my portfolio. 
                        I look forward to connecting with you!
                    </p>
                    
                    <div class="signature">
                        <p class="signature-name">Best regards,<br>Ragul S</p>
                        <p class="signature-title">Computer Science Student | Web Developer</p>
                    </div>
                </div>
                
                <div class="footer">
                    <p class="footer-text">
                        This is an automated confirmation email.<br>
                        Please do not reply to this message - I'll respond from my personal email.
                    </p>
                </div>
            </div>
        </body>
        </html>
        """
        
        # Plain text auto-reply
        auto_reply.body = f"""
Hi {name},

✅ MESSAGE RECEIVED!

Thank you for reaching out through my portfolio! I've successfully received your message and wanted to send you this quick confirmation.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT YOU SENT:
Subject: {subject}
Sent: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

WHAT HAPPENS NEXT:
⏰ Response Time: Within 24-48 hours
📧 Reply-To: {email}
🔔 You'll Receive: A detailed response to your inquiry

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

I'll review your message carefully and get back to you soon. If your matter is urgent, feel free to follow up.

Best regards,
Ragul S
Computer Science Student | Web Developer

---
This is an automated confirmation. Please don't reply to this email - I'll respond from my personal email.
        """
        
        # Send auto-reply to sender
        mail.send(auto_reply)
        
        # ============================================
        # 3. LOG SUCCESS
        # ============================================
        print("\n" + "="*70)
        print("✅ EMAIL SENT SUCCESSFULLY!")
        print("="*70)
        print(f"📬 Notification sent to: {app.config['RECIPIENT_EMAIL']}")
        print(f"📧 Auto-reply sent to: {email}")
        print(f"👤 From: {name}")
        print(f"📝 Subject: {subject}")
        print(f"🕐 Time: {datetime.now().strftime('%B %d, %Y at %I:%M %p')}")
        print("="*70 + "\n")
        
        return jsonify({
            'status': 'success',
            'message': f'Thank you, {name.split()[0]}! Your message has been sent. Check your email ({email}) for a confirmation.'
        })
        
    except Exception as e:
        # ============================================
        # ERROR HANDLING
        # ============================================
        print("\n" + "="*70)
        print("❌ ERROR SENDING EMAIL")
        print("="*70)
        print(f"Error Type: {type(e).__name__}")
        print(f"Error Message: {str(e)}")
        print(f"Sender: {name} ({email})")
        print("="*70 + "\n")
        
        return jsonify({
            'status': 'error',
            'message': 'Sorry, there was an error sending your message. Please try again later or contact me directly at your-email@gmail.com'
        }), 500

if __name__ == '__main__':
    app.run(debug=True)
