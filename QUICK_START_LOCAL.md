# 🚀 Quick Start - Local Development

## Prerequisites
- Python 3.10+ installed
- Node.js 18+ installed
- Supabase account (you have this!)

## Step 1: Set Up Supabase Database
1. Follow the instructions in `SUPABASE_SETUP_INSTRUCTIONS.md`
2. Get your database credentials
3. Note down your Supabase URL and API keys

## Step 2: Start Django Backend
```bash
# Navigate to backend
cd django-backend

# Activate virtual environment
venv\Scripts\activate

# Install dependencies (if not done)
pip install -r requirements-minimal.txt

# Create .env file with your Supabase credentials
# Update the database settings in settings.py to use Supabase

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Generate sample data
python manage.py generate_sample_data --days 30

# Start server
python manage.py runserver
```

## Step 3: Start Next.js Frontend
```bash
# Navigate to frontend (in new terminal)
cd nextjs-app

# Install dependencies
npm install

# Create .env.local file
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1" > .env.local

# Start development server
npm run dev
```

## Step 4: Test Your Application
1. **Backend API**: http://localhost:8000/api/v1/
2. **Frontend**: http://localhost:3000
3. **Admin Panel**: http://localhost:8000/admin/

## Step 5: Test Features
1. **Stock Search**: Try searching for "NICL" or "NABIL"
2. **Candlestick Charts**: Check the 30-day chart
3. **Latest Price API**: Test `/stocks/latest_price/?symbol=NICL`
4. **Mobile View**: Test on different screen sizes

## 🎉 You're Done!
Your NEPSE application is now running locally with:
- ✅ Supabase database
- ✅ Django REST API
- ✅ Next.js frontend with React
- ✅ Candlestick charts
- ✅ Stock search functionality
- ✅ Real-time data display

## Next Steps
1. Test everything locally
2. Deploy backend to PythonAnywhere
3. Deploy frontend to Vercel
4. Update production URLs
5. Go live! 🚀
