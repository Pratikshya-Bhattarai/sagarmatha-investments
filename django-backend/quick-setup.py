#!/usr/bin/env python3
"""
Quick setup script for PythonAnywhere deployment
Run this script on PythonAnywhere console
"""

import os
import subprocess
import sys

def run_command(command, description):
    """Run a command and print the result"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(command, shell=True, capture_output=True, text=True)
        if result.returncode == 0:
            print(f"✅ {description} completed successfully")
            if result.stdout:
                print(result.stdout)
        else:
            print(f"❌ {description} failed")
            print(f"Error: {result.stderr}")
        return result.returncode == 0
    except Exception as e:
        print(f"❌ {description} failed with exception: {e}")
        return False

def main():
    print("🚀 Starting PythonAnywhere Quick Setup for Sagarmatha Backend")
    print("=" * 60)
    
    # Check if we're in the right directory
    if not os.path.exists('manage.py'):
        print("❌ Error: manage.py not found. Please run this script from the django-backend directory")
        return
    
    # Step 1: Create virtual environment
    if not os.path.exists('venv'):
        if not run_command('python3.10 -m venv venv', 'Creating virtual environment'):
            return
    else:
        print("✅ Virtual environment already exists")
    
    # Step 2: Activate virtual environment and upgrade pip
    activate_cmd = 'source venv/bin/activate'
    if not run_command(f'{activate_cmd} && pip install --upgrade pip', 'Upgrading pip'):
        return
    
    # Step 3: Install requirements
    if not run_command(f'{activate_cmd} && pip install -r requirements-pythonanywhere.txt', 'Installing requirements'):
        return
    
    # Step 4: Create necessary directories
    directories = ['logs', 'staticfiles', 'media']
    for directory in directories:
        if not os.path.exists(directory):
            os.makedirs(directory)
            print(f"✅ Created directory: {directory}")
        else:
            print(f"✅ Directory already exists: {directory}")
    
    # Step 5: Set up environment variables (create .env file)
    env_content = """# Django Configuration
SECRET_KEY=your-secret-key-here-change-this-in-production
DEBUG=False
ALLOWED_HOSTS=pratikshyab.pythonanywhere.com,localhost,127.0.0.1

# Supabase Database Configuration
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-supabase-password-here
SUPABASE_DB_HOST=db.your-project-ref.supabase.co
SUPABASE_DB_PORT=5432

# Kaggle API (Optional)
KAGGLE_USERNAME=your-kaggle-username
KAGGLE_KEY=your-kaggle-api-key

# CORS Configuration
CORS_ALLOWED_ORIGINS=https://sagarmatha-investments.vercel.app,http://localhost:3000
"""
    
    with open('.env', 'w') as f:
        f.write(env_content)
    print("✅ Created .env file with default configuration")
    
    # Step 6: Run migrations
    if not run_command(f'{activate_cmd} && python manage.py makemigrations', 'Creating migrations'):
        return
    
    if not run_command(f'{activate_cmd} && python manage.py migrate', 'Running migrations'):
        return
    
    # Step 7: Collect static files
    if not run_command(f'{activate_cmd} && python manage.py collectstatic --noinput', 'Collecting static files'):
        return
    
    # Step 8: Create superuser
    print("🔄 Creating superuser...")
    create_superuser_script = """
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print('Superuser created: admin / admin123')
else:
    print('Superuser already exists')
"""
    
    with open('create_superuser.py', 'w') as f:
        f.write(create_superuser_script)
    
    if not run_command(f'{activate_cmd} && python create_superuser.py', 'Creating superuser'):
        return
    
    # Clean up
    if os.path.exists('create_superuser.py'):
        os.remove('create_superuser.py')
    
    print("\n" + "=" * 60)
    print("🎉 Setup completed successfully!")
    print("\n📋 Next steps:")
    print("1. Update the .env file with your actual Supabase credentials")
    print("2. Configure your web app in PythonAnywhere dashboard")
    print("3. Set up the WSGI file as described in the deployment guide")
    print("4. Test your deployment")
    print("\n🌐 Your backend will be available at: https://pratikshyab.pythonanywhere.com")
    print("📊 Admin panel: https://pratikshyab.pythonanywhere.com/admin")
    print("🔑 Admin credentials: admin / admin123")

if __name__ == "__main__":
    main()
