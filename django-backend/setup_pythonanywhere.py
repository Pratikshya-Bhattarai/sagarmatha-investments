#!/usr/bin/env python3
"""
PythonAnywhere setup script for Sagarmatha Investments Django Backend
"""

import os
import sys
import subprocess
import django
from django.core.management import execute_from_command_line

def run_command(command, description):
    """Run a command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} completed successfully")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed: {e.stderr}")
        return False

def setup_pythonanywhere():
    """Setup Django project for PythonAnywhere"""
    print("🚀 Setting up Sagarmatha Investments Django Backend for PythonAnywhere")
    
    # Set Django settings for PythonAnywhere
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sagarmatha_backend.settings_pythonanywhere')
    
    # Create logs directory
    os.makedirs('logs', exist_ok=True)
    
    # Install requirements
    if not run_command("pip install -r requirements-pythonanywhere.txt", "Installing PythonAnywhere requirements"):
        return False
    
    # Run migrations
    if not run_command("python manage.py makemigrations", "Creating migrations"):
        return False
    
    if not run_command("python manage.py migrate", "Running migrations"):
        return False
    
    # Collect static files
    if not run_command("python manage.py collectstatic --noinput", "Collecting static files"):
        print("⚠️  Static files collection failed, but continuing...")
    
    # Load sample data
    if not run_command("python manage.py update_nepse_data --type all --source live", "Loading sample data"):
        print("⚠️  Sample data loading failed, but the server will still work")
    
    print("🎉 PythonAnywhere setup completed!")
    print("\n📋 Next steps:")
    print("1. Go to PythonAnywhere Web tab")
    print("2. Create a new web app with Manual configuration")
    print("3. Set Python version to 3.10")
    print("4. Set source code to: /home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend")
    print("5. Set working directory to: /home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend")
    print("6. Set WSGI file to: /home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend/wsgi.py")
    print("7. Add static files mapping: /static/ -> /home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend/staticfiles")
    print("8. Set environment variables:")
    print("   - SECRET_KEY=your-secret-key-here")
    print("   - DEBUG=False")
    print("   - KAGGLE_USERNAME=your-kaggle-username")
    print("   - KAGGLE_KEY=your-kaggle-api-key")
    print("9. Reload the web app")
    print("\n🌐 Your API will be available at: https://pratikshya-bhattarai.pythonanywhere.com/api/v1/")
    
    return True

if __name__ == "__main__":
    setup_pythonanywhere()
