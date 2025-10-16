#!/usr/bin/env python3
"""
Sagarmatha Investments Backend Deployment Script
Automates deployment to PythonAnywhere
"""

import os
import sys
import subprocess
import shutil
from pathlib import Path

def run_command(command, cwd=None):
    """Run a command and return the result"""
    try:
        result = subprocess.run(
            command, 
            shell=True, 
            cwd=cwd, 
            capture_output=True, 
            text=True, 
            check=True
        )
        return result.stdout.strip()
    except subprocess.CalledProcessError as e:
        print(f"Error running command: {command}")
        print(f"Error: {e.stderr}")
        return None

def create_deployment_structure():
    """Create the deployment structure for Sagarmatha backend"""
    print("🏔️ Creating Sagarmatha backend deployment structure...")
    
    # Create deployment directory
    deployment_dir = Path("sagarmatha-backend-deployment")
    if deployment_dir.exists():
        shutil.rmtree(deployment_dir)
    deployment_dir.mkdir()
    
    # Copy essential files
    essential_files = [
        "manage.py",
        "requirements_production.txt",
        "wsgi_production.py",
        "SAGARMATHA_API_DOCUMENTATION.md",
        "SAGARMATHA_DEPLOYMENT_GUIDE.md"
    ]
    
    for file in essential_files:
        if os.path.exists(file):
            shutil.copy2(file, deployment_dir / file)
            print(f"✅ Copied {file}")
    
    # Copy sagarmatha_backend directory
    if os.path.exists("sagarmatha_backend"):
        shutil.copytree("sagarmatha_backend", deployment_dir / "sagarmatha_backend")
        print("✅ Copied sagarmatha_backend directory")
    
    # Copy nepse app
    if os.path.exists("nepse"):
        shutil.copytree("nepse", deployment_dir / "nepse")
        print("✅ Copied nepse app")
    
    # Create logs directory
    logs_dir = deployment_dir / "logs"
    logs_dir.mkdir()
    print("✅ Created logs directory")
    
    # Create staticfiles directory
    staticfiles_dir = deployment_dir / "staticfiles"
    staticfiles_dir.mkdir()
    print("✅ Created staticfiles directory")
    
    # Create media directory
    media_dir = deployment_dir / "media"
    media_dir.mkdir()
    print("✅ Created media directory")
    
    return deployment_dir

def create_production_wsgi():
    """Create production WSGI file"""
    wsgi_content = '''"""
WSGI config for Sagarmatha Investments Backend production deployment.
Optimized for PythonAnywhere.
"""

import os
import sys

# Add the project directory to Python path
project_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, project_dir)

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sagarmatha_backend.settings_production')

# Import Django WSGI application
from django.core.wsgi import get_wsgi_application

# Create WSGI application
application = get_wsgi_application()
'''
    
    with open("wsgi_production.py", "w") as f:
        f.write(wsgi_content)
    print("✅ Created production WSGI file")

def create_production_requirements():
    """Create production requirements file"""
    requirements = '''# Production requirements for Sagarmatha Investments Backend
# Optimized for PythonAnywhere deployment

# Core Django
Django==5.0.8
djangorestframework==3.15.2
django-cors-headers==4.3.1
django-filter==24.2
django-extensions==3.2.3

# Database
mysqlclient==2.2.4
psycopg2-binary==2.9.9

# Caching and Background Tasks
redis==5.0.1
celery==5.3.6
django-redis==5.4.0

# Data Processing
pandas==2.2.2
numpy==1.26.4
requests==2.31.0
beautifulsoup4==4.12.3
lxml==5.1.0

# Configuration
python-decouple==3.8

# Production Server
gunicorn==21.2.0
whitenoise==6.6.0

# Monitoring and Logging
sentry-sdk==1.40.0
django-health-check==3.17.0

# Security
django-ratelimit==4.1.0
django-csp==3.7

# API Documentation
drf-spectacular==0.27.0

# Data Import
kaggle==1.5.16

# Performance
django-cachalot==2.6.1

# Backup
django-dbbackup==3.3.0

# Email
django-anymail==10.2

# Utilities
python-dateutil==2.8.2
pytz==2023.3
'''
    
    with open("requirements_production.txt", "w") as f:
        f.write(requirements)
    print("✅ Created production requirements file")

def create_deployment_script():
    """Create deployment script for PythonAnywhere"""
    script_content = '''#!/bin/bash
# Sagarmatha Investments Backend Deployment Script for PythonAnywhere

echo "🏔️ Deploying Sagarmatha Investments Backend to PythonAnywhere..."

# Set variables
PROJECT_DIR="/home/$USER/sagarmatha-investments/django-backend"
VENV_DIR="$PROJECT_DIR/venv"

# Navigate to project directory
cd $PROJECT_DIR

# Activate virtual environment
source $VENV_DIR/bin/activate

# Install/update requirements
echo "📦 Installing requirements..."
pip install --upgrade pip
pip install -r requirements_production.txt

# Run database migrations
echo "🗄️ Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

# Create superuser if it doesn't exist
echo "👤 Creating superuser..."
python manage.py shell << EOF
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@sagarmathainvestments.com', 'admin123')
    print('Superuser created')
else:
    print('Superuser already exists')
EOF

# Import sample data
echo "📊 Importing sample data..."
python manage.py update_nepse_data --type all --source sample

# Set proper permissions
echo "🔐 Setting permissions..."
chmod -R 755 $PROJECT_DIR
chmod +x $PROJECT_DIR/manage.py

# Restart web app
echo "🔄 Restarting web app..."
touch $PROJECT_DIR/wsgi_production.py

echo "✅ Deployment completed successfully!"
echo "🌐 Your API is now available at: https://$USER.pythonanywhere.com/api/v1/"
echo "📊 Admin panel: https://$USER.pythonanywhere.com/admin/"
echo "📚 API Documentation: https://$USER.pythonanywhere.com/api/docs/"
'''
    
    with open("deploy_sagarmatha.sh", "w") as f:
        f.write(script_content)
    
    # Make script executable
    os.chmod("deploy_sagarmatha.sh", 0o755)
    print("✅ Created deployment script")

def create_env_template():
    """Create environment template"""
    env_template = '''# Sagarmatha Investments Backend Environment Configuration
# Copy this file to .env and update the values

# Django Configuration
SECRET_KEY=your-super-secret-key-here-change-this-in-production
DEBUG=False
ALLOWED_HOSTS=yourusername.pythonanywhere.com

# Database Configuration (MySQL)
DB_NAME=sagarmatha_investments
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=3306

# Redis Configuration
REDIS_URL=redis://localhost:6379/0

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@sagarmathainvestments.com

# Frontend URL
FRONTEND_URL=https://sagarmathainvestments.vercel.app

# Monitoring (Optional)
SENTRY_DSN=your-sentry-dsn-here

# Backup Configuration
BACKUP_ENABLED=True

# Custom Domain (Optional)
CUSTOM_DOMAIN=your-custom-domain.com
'''
    
    with open(".env.template", "w") as f:
        f.write(env_template)
    print("✅ Created environment template")

def main():
    """Main deployment function"""
    print("🏔️ Sagarmatha Investments Backend Deployment")
    print("=" * 50)
    
    # Check if we're in the right directory
    if not os.path.exists("manage.py"):
        print("❌ Error: manage.py not found. Please run this script from the django-backend directory.")
        sys.exit(1)
    
    # Create deployment structure
    deployment_dir = create_deployment_structure()
    
    # Create production files
    create_production_wsgi()
    create_production_requirements()
    create_deployment_script()
    create_env_template()
    
    print("\n✅ Sagarmatha backend deployment structure created!")
    print(f"📁 Deployment directory: {deployment_dir}")
    print("\n📋 Next steps:")
    print("1. Upload the deployment directory to PythonAnywhere")
    print("2. Set up your database and environment variables")
    print("3. Run the deployment script")
    print("4. Configure your web app in PythonAnywhere")
    print("\n📚 See SAGARMATHA_DEPLOYMENT_GUIDE.md for detailed instructions")

if __name__ == "__main__":
    main()
