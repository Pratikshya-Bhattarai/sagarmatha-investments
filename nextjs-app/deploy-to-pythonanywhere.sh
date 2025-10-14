#!/bin/bash

# PythonAnywhere Deployment Script
# This script helps you deploy your Django backend to PythonAnywhere

echo "🚀 PythonAnywhere Deployment Script"
echo "=================================="

# Check if we're in the right directory
if [ ! -f "manage.py" ]; then
    echo "❌ Error: Please run this script from the django-backend directory"
    echo "cd sagarmatha-investments/nextjs-app/django-backend"
    exit 1
fi

echo "✅ Found Django project"

# Create virtual environment
echo "🐍 Creating virtual environment..."
python3.10 -m venv venv
source venv/bin/activate

# Install requirements
echo "📦 Installing requirements..."
pip install -r requirements-pythonanywhere.txt

# Run migrations
echo "🗄️ Running migrations..."
python manage.py makemigrations
python manage.py migrate

# Collect static files
echo "📁 Collecting static files..."
python manage.py collectstatic --noinput

# Load sample data
echo "📊 Loading sample data..."
python manage.py update_nepse_data --type all --source live

echo "✅ Setup completed!"
echo ""
echo "📋 Next steps:"
echo "1. Go to PythonAnywhere Web tab"
echo "2. Create a new web app with Manual configuration"
echo "3. Set Python version to 3.10"
echo "4. Configure paths:"
echo "   - Source: $(pwd)"
echo "   - Working: $(pwd)"
echo "   - WSGI: $(pwd)/wsgi.py"
echo "5. Add static files mapping: /static/ -> $(pwd)/staticfiles"
echo "6. Set environment variables:"
echo "   - SECRET_KEY=your-secret-key"
echo "   - DEBUG=False"
echo "   - KAGGLE_USERNAME=your-username"
echo "   - KAGGLE_KEY=your-key"
echo "7. Click Reload"
echo ""
echo "🌐 Your API will be available at:"
echo "https://pratikshya-bhattarai.pythonanywhere.com/api/v1/"
