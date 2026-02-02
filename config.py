"""
Configuration file for Portfolio application
Contains email settings and other configuration variables
"""

import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    """Application configuration"""
    
    # Flask Configuration
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'dev-secret-key-change-in-production'
    
    # Email Configuration for Gmail
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 587
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    
    # Email credentials (will be loaded from .env file)
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME')  # Your Gmail address
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD')  # App password (not regular password)
    MAIL_DEFAULT_SENDER = os.environ.get('MAIL_USERNAME')
    
    # Recipient email (where contact form messages will be sent)
    RECIPIENT_EMAIL = os.environ.get('RECIPIENT_EMAIL') or os.environ.get('MAIL_USERNAME')
    
    # Rate limiting
    RATELIMIT_ENABLED = True
    RATELIMIT_DEFAULT = "5 per hour"  # Max 5 messages per hour per IP
    
    # Application settings
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB max file size
    
    @staticmethod
    def init_app(app):
        """Initialize application with this config"""
        pass
