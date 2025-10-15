# 🚀 Vercel Deployment Guide for NEPSE Application

## Step 1: Deploy to Vercel

### Option A: Deploy from GitHub (Recommended)

1. **Go to Vercel**: [vercel.com](https://vercel.com)
2. **Sign up/Login** with GitHub
3. **Import Project**: Click "Import Project"
4. **Select Repository**: `Pratikshya-Bhattarai/sagarmatha-investments`
5. **Configure Project**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `nextjs-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`

### Option B: Deploy with Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow prompts:
# - Set up and deploy? Y
# - Which scope? [Your account]
# - Link to existing project? N
# - Project name: sagarmatha-investments
# - Directory: nextjs-app
# - Override settings? N
```

## Step 2: Configure Environment Variables

In Vercel Dashboard:

1. **Go to Project Settings**
2. **Environment Variables**
3. **Add Variables**:

```
NEXT_PUBLIC_API_URL=https://pratikshyab.pythonanywhere.com/api/v1
```

## Step 3: Deploy Backend to PythonAnywhere

### Prerequisites
- PythonAnywhere account: `pratikshyab`
- Password: `S=@:5:&s9mwk?nU`
- Supabase database set up

### Quick Deployment Steps

1. **Login to PythonAnywhere**: [pythonanywhere.com](https://www.pythonanywhere.com)
2. **Go to Consoles → Bash**
3. **Run these commands**:

```bash
# Clone repository
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
```

4. **Add to .env file**:
```env
SECRET_KEY=your-very-secure-secret-key-here-change-this
DEBUG=False
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-supabase-database-password
SUPABASE_DB_HOST=db.your-project-ref.supabase.co
SUPABASE_DB_PORT=5432
```

5. **Continue with**:
```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Generate sample data
python manage.py generate_sample_data --days 30

# Collect static files
python manage.py collectstatic --noinput
```

## Step 4: Configure PythonAnywhere Web App

1. **Go to Web tab** in PythonAnywhere
2. **Add new web app** → Manual configuration → Python 3.10
3. **Update WSGI file**:

```python
import os
import sys

path = '/home/pratikshyab/sagarmatha-investments/django-backend'
if path not in sys.path:
    sys.path.append(path)

os.environ['DJANGO_SETTINGS_MODULE'] = 'sagarmatha_backend.settings_pythonanywhere'

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

4. **Configure Static Files**:
   - **URL**: `/static/`
   - **Directory**: `/home/pratikshyab/sagarmatha-investments/django-backend/staticfiles/`

5. **Click Reload**

## Step 5: Set Up Supabase Database

1. **Login to Supabase**: [supabase.com](https://supabase.com)
   - Email: `intern.pratikshya@gmail.com`
   - Password: `hVryQ6bfg@DWJ4G`

2. **Create Project**: `nepse-market-data`

3. **Go to SQL Editor** and run the SQL from `SUPABASE_DATABASE_SCHEMA.sql`

4. **Get Database Credentials**:
   - Go to Settings → Database
   - Note down: Host, Database, Username, Password

## Step 6: Test Your Deployment

### Test Backend API
```bash
# Test main API
curl https://pratikshyab.pythonanywhere.com/api/v1/

# Test latest price
curl "https://pratikshyab.pythonanywhere.com/api/v1/stocks/latest_price/?symbol=NICL"

# Test chart data
curl "https://pratikshyab.pythonanywhere.com/api/v1/index/chart_data/?days=30"
```

### Test Frontend
- **Vercel URL**: `https://your-app.vercel.app`
- **Features to test**:
  - Homepage loads
  - NEPSE index displays
  - Stock search works
  - Charts render
  - Mobile responsive

## Step 7: Update CORS Settings

In your Django backend, update `settings_pythonanywhere.py`:

```python
CORS_ALLOWED_ORIGINS = [
    "https://your-app.vercel.app",
    "https://sagarmatha-investments.vercel.app",
    "http://localhost:3000",
]
```

## 🎉 Success!

Your NEPSE application will be live at:

- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://pratikshyab.pythonanywhere.com/api/v1/`
- **Database**: Supabase PostgreSQL

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Update CORS settings in Django
   - Check allowed origins

2. **API Connection Issues**
   - Verify backend is running
   - Check environment variables
   - Test API endpoints directly

3. **Database Connection**
   - Verify Supabase credentials
   - Check database host and port
   - Test connection with Django shell

4. **Build Errors**
   - Check Node.js version (18+)
   - Verify all dependencies installed
   - Check for TypeScript errors

### Useful Commands:

```bash
# Test backend locally
cd django-backend
python manage.py runserver

# Test frontend locally
cd nextjs-app
npm run dev

# Check API endpoints
curl http://localhost:8000/api/v1/
curl http://localhost:3000
```

## 📱 Features After Deployment

- ✅ **Real-time NEPSE Index** display
- ✅ **Interactive Candlestick Charts** (30-day trends)
- ✅ **Stock Search** by symbol (NICL, NABIL, SCB, etc.)
- ✅ **Market Indices** overview
- ✅ **Top Stocks** with price changes
- ✅ **Mobile Responsive** design
- ✅ **Admin Panel** for data management

Your complete NEPSE application with charts is now live! 🚀
