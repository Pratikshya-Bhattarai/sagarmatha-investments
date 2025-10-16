#!/bin/bash
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
