#!/usr/bin/env python3
"""
Setup script for Sagarmatha Investments Django Backend
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

def setup_django():
    """Setup Django project"""
    print("🚀 Setting up Sagarmatha Investments Django Backend")
    
    # Set Django settings
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sagarmatha_backend.settings')
    
    # Install requirements
    if not run_command("pip install -r requirements.txt", "Installing requirements"):
        return False
    
    # Create logs directory
    os.makedirs('logs', exist_ok=True)
    
    # Run migrations
    if not run_command("python manage.py makemigrations", "Creating migrations"):
        return False
    
    if not run_command("python manage.py migrate", "Running migrations"):
        return False
    
    # Create superuser (optional)
    print("👤 You can create a superuser by running: python manage.py createsuperuser")
    
    # Load sample data
    if not run_command("python manage.py update_nepse_data --type all --source live", "Loading sample data"):
        print("⚠️  Sample data loading failed, but the server will still work")
    
    print("🎉 Django backend setup completed!")
    print("\n📋 Next steps:")
    print("1. Start the Django server: python manage.py runserver")
    print("2. Start the Next.js frontend: npm run dev")
    print("3. Visit http://localhost:3000/nepse-live to see the live data")
    
    return True

if __name__ == "__main__":
    setup_django()
