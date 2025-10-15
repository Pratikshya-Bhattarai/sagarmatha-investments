#!/bin/bash

# PythonAnywhere Deployment Script for Sagarmatha Backend
# Run this script on PythonAnywhere console

echo "🚀 Starting PythonAnywhere deployment for Sagarmatha Backend..."

# Set up environment variables
echo "📝 Setting up environment variables..."
export SECRET_KEY="your-secret-key-here-change-this"
export DEBUG="False"
export SUPABASE_DB_NAME="postgres"
export SUPABASE_DB_USER="postgres"
export SUPABASE_DB_PASSWORD="your-supabase-password"
export SUPABASE_DB_HOST="your-supabase-host"
export SUPABASE_DB_PORT="5432"
export KAGGLE_USERNAME="your-kaggle-username"
export KAGGLE_KEY="your-kaggle-key"

# Create virtual environment
echo "🐍 Creating virtual environment..."
python3.10 -m venv venv
source venv/bin/activate

# Upgrade pip
echo "⬆️ Upgrading pip..."
pip install --upgrade pip

# Install requirements
echo "📦 Installing requirements..."
pip install -r requirements-pythonanywhere.txt

# Create necessary directories
echo "📁 Creating directories..."
mkdir -p logs
mkdir -p staticfiles
mkdir -p media

# Run migrations
echo "🗄️ Running database migrations..."
python manage.py makemigrations
python manage.py migrate

# Collect static files
echo "📄 Collecting static files..."
python manage.py collectstatic --noinput

# Create superuser (optional)
echo "👤 Creating superuser..."
echo "from django.contrib.auth import get_user_model; User = get_user_model(); User.objects.create_superuser('admin', 'admin@example.com', 'admin123')" | python manage.py shell

echo "✅ Deployment completed successfully!"
echo "🌐 Your backend should be accessible at: https://pratikshyab.pythonanywhere.com"
echo "📊 Admin panel: https://pratikshyab.pythonanywhere.com/admin"
echo "🔑 Admin credentials: admin / admin123"
