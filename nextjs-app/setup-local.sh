#!/bin/bash

# Local Development Setup Script
# This script sets up both frontend and backend locally

echo "🚀 Setting up NEPSE Live Data Application Locally"
echo "=============================================="

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: Please run this script from the nextjs-app directory"
    echo "cd sagarmatha-investments/nextjs-app"
    exit 1
fi

echo "✅ Found Next.js project"

# Setup Frontend
echo "📦 Setting up Frontend..."
npm install

# Create environment file if it doesn't exist
if [ ! -f ".env.local" ]; then
    echo "🔧 Creating environment file..."
    cat > .env.local << EOF
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
EOF
    echo "✅ Created .env.local file"
fi

# Setup Backend
echo "🐍 Setting up Django Backend..."
cd django-backend

# Create virtual environment
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python -m venv venv
fi

# Activate virtual environment
echo "Activating virtual environment..."
source venv/bin/activate

# Install requirements
echo "Installing Python dependencies..."
pip install -r requirements.txt

# Run migrations
echo "Setting up database..."
python manage.py makemigrations
python manage.py migrate

# Load sample data
echo "Loading sample NEPSE data..."
python manage.py update_nepse_data --type all --source live

echo "✅ Setup completed!"
echo ""
echo "🚀 To start the application:"
echo ""
echo "Terminal 1 (Frontend):"
echo "cd nextjs-app"
echo "npm run dev"
echo ""
echo "Terminal 2 (Backend):"
echo "cd nextjs-app/django-backend"
echo "source venv/bin/activate"
echo "python manage.py runserver"
echo ""
echo "🌐 Your application will be available at:"
echo "Frontend: http://localhost:3000"
echo "Backend API: http://localhost:8000/api/v1/"
echo "Django Admin: http://localhost:8000/admin/"
echo ""
echo "📊 Features available:"
echo "- Interactive NEPSE charts"
echo "- Real-time market data"
echo "- Market overview on homepage"
echo "- Full analytics page at /charts"
echo "- Responsive design for all devices"
