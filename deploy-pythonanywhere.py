#!/usr/bin/env python3
"""
PythonAnywhere Deployment Script for Sagarmatha Investments
This script automates the deployment process to PythonAnywhere.
"""

import os
import sys
import subprocess

def deploy_to_pythonanywhere():
    print("🐍 Deploying to PythonAnywhere")
    print("=" * 50)
    
    # PythonAnywhere credentials
    PA_USERNAME = "pratikshyab"
    PA_PASSWORD = "S=@:5:&s9mwk?nU"
    
    print(f"👤 Username: {PA_USERNAME}")
    print(f"🔑 Password: {'*' * len(PA_PASSWORD)}")
    
    print("\n📋 Deployment Steps:")
    print("1. Go to https://www.pythonanywhere.com")
    print("2. Login with your credentials")
    print("3. Go to Consoles → Bash")
    print("4. Run the following commands:")
    
    print("\n🔧 Commands to run on PythonAnywhere:")
    print("""
# Clone your repository
git clone https://github.com/Pratikshya-Bhattarai/sagarmatha-investments.git
cd sagarmatha-investments/django-backend

# Create virtual environment
python3.10 -m venv venv
source venv/bin/activate

# Install dependencies
pip install --upgrade pip
pip install -r requirements-pythonanywhere.txt

# Create .env file
nano .env
""")
    
    print("\n📝 Add to .env file:")
    print("""
SECRET_KEY=your-very-secure-secret-key-here-change-this
DEBUG=False
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-supabase-database-password
SUPABASE_DB_HOST=db.your-project-ref.supabase.co
SUPABASE_DB_PORT=5432
""")
    
    print("\n🔧 Continue with:")
    print("""
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Generate sample data
python manage.py generate_sample_data --days 30

# Collect static files
python manage.py collectstatic --noinput
""")
    
    print("\n🌐 Web App Configuration:")
    print("1. Go to Web tab in PythonAnywhere")
    print("2. Add new web app → Manual configuration → Python 3.10")
    print("3. Update WSGI file with:")
    
    print("""
import os
import sys

path = '/home/pratikshyab/sagarmatha-investments/django-backend'
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'sagarmatha_backend.settings_pythonanywhere'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
""")
    
    print("\n📁 Static Files Configuration:")
    print("URL: /static/")
    print("Directory: /home/pratikshyab/sagarmatha-investments/django-backend/staticfiles/")
    
    print("\n🚀 After configuration:")
    print("1. Click Reload in Web tab")
    print("2. Your API will be live at: https://pratikshyab.pythonanywhere.com/api/v1/")
    print("3. Test with: curl https://pratikshyab.pythonanywhere.com/api/v1/")
    
    return True

if __name__ == "__main__":
    deploy_to_pythonanywhere()
