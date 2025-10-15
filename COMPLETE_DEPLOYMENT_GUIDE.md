# 🚀 Complete NEPSE Application Deployment Guide

## 📋 Overview
This guide will help you deploy a complete NEPSE (Nepal Stock Exchange) application with:
- **Frontend**: Next.js with React components and candlestick charts
- **Backend**: Django REST API on PythonAnywhere
- **Database**: Supabase PostgreSQL
- **Features**: Real-time stock data, candlestick charts, stock search by symbol

## 🗄️ Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project named `nepse-market-data`
3. Choose your region and set a strong database password
4. Wait for project creation (2-3 minutes)

### 1.2 Configure Database Schema
1. Go to **SQL Editor** in your Supabase dashboard
2. Run the SQL script from `SUPABASE_DATABASE_SCHEMA.sql`:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- NEPSE Index table
CREATE TABLE nepse_index (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    open_price DECIMAL(10,2) NOT NULL,
    high_price DECIMAL(10,2) NOT NULL,
    low_price DECIMAL(10,2) NOT NULL,
    close_price DECIMAL(10,2) NOT NULL,
    volume BIGINT NOT NULL,
    turnover BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date)
);

-- NEPSE Stocks table
CREATE TABLE nepse_stocks (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(10) NOT NULL UNIQUE,
    company_name VARCHAR(255) NOT NULL,
    sector VARCHAR(100),
    current_price DECIMAL(10,2),
    change_amount DECIMAL(10,2),
    change_percent DECIMAL(5,2),
    volume BIGINT,
    turnover BIGINT,
    high_52w DECIMAL(10,2),
    low_52w DECIMAL(10,2),
    market_cap VARCHAR(50),
    pe_ratio DECIMAL(5,2),
    last_trade_time TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NEPSE Indices table
CREATE TABLE nepse_indices (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    symbol VARCHAR(20) NOT NULL,
    current_value DECIMAL(10,2),
    change_amount DECIMAL(10,2),
    change_percent DECIMAL(5,2),
    high_52w DECIMAL(10,2),
    low_52w DECIMAL(10,2),
    date DATE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(name, date)
);

-- Data update logs
CREATE TABLE data_update_logs (
    id SERIAL PRIMARY KEY,
    update_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    message TEXT,
    records_updated INTEGER DEFAULT 0,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE nepse_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE nepse_stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE nepse_indices ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_update_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON nepse_index FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON nepse_stocks FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON nepse_indices FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON data_update_logs FOR SELECT USING (true);
```

### 1.3 Get Database Credentials
1. Go to **Settings** → **Database** in your Supabase project
2. Copy these details:
   - **Host**: `db.xxxxx.supabase.co`
   - **Database**: `postgres`
   - **Username**: `postgres`
   - **Password**: (your database password)
   - **Port**: `5432`

## 🐍 Step 2: Deploy Django Backend to PythonAnywhere

### 2.1 Access PythonAnywhere
1. Go to [pythonanywhere.com](https://www.pythonanywhere.com)
2. Login with your credentials
3. Go to **Consoles** → **Bash**

### 2.2 Clone and Set Up Backend
```bash
# Clone your repository
git clone https://github.com/your-username/sagarmatha-investments.git
cd sagarmatha-investments/django-backend

# Create virtual environment
python3.10 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements-pythonanywhere.txt
```

### 2.3 Configure Environment Variables
```bash
# Create .env file
nano .env
```

Add your Supabase credentials:
```env
SECRET_KEY=your-very-secure-secret-key-here
DEBUG=False
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-supabase-password
SUPABASE_DB_HOST=db.your-project-ref.supabase.co
SUPABASE_DB_PORT=5432
KAGGLE_USERNAME=your-kaggle-username
KAGGLE_KEY=your-kaggle-api-key
```

### 2.4 Run Database Migrations
```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Generate sample data
python manage.py generate_sample_data --days 30
```

### 2.5 Configure Web App
1. Go to **Web** tab in PythonAnywhere dashboard
2. Click **Add a new web app**
3. Choose **Manual configuration** → **Python 3.10**
4. Configure WSGI file:

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

5. Configure static files:
   - **URL**: `/static/`
   - **Directory**: `/home/pratikshyab/sagarmatha-investments/django-backend/staticfiles/`

## ⚛️ Step 3: Deploy Next.js Frontend to Vercel

### 3.1 Prepare Frontend
```bash
cd nextjs-app
npm install
```

### 3.2 Configure Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=https://pratikshyab.pythonanywhere.com/api/v1
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

### 3.3 Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔧 Step 4: API Endpoints

### 4.1 Available Endpoints
- **Base URL**: `https://pratikshyab.pythonanywhere.com/api/v1/`
- **NEPSE Index**: `/index/`
- **Stocks**: `/stocks/`
- **Latest Price**: `/stocks/latest_price/?symbol=NICL`
- **Indices**: `/indices/`
- **Chart Data**: `/index/chart_data/?days=30`

### 4.2 Test API Endpoints
```bash
# Test base API
curl https://pratikshyab.pythonanywhere.com/api/v1/

# Test latest price endpoint
curl "https://pratikshyab.pythonanywhere.com/api/v1/stocks/latest_price/?symbol=NICL"

# Test chart data
curl "https://pratikshyab.pythonanywhere.com/api/v1/index/chart_data/?days=30"
```

## 📊 Step 5: Features

### 5.1 Frontend Features
- **Real-time NEPSE Index Display**
- **Candlestick Charts** (30-day historical data)
- **Stock Search** by symbol
- **Market Indices** overview
- **Top Stocks** display
- **Responsive Design** for mobile and desktop

### 5.2 Backend Features
- **REST API** with Django REST Framework
- **Supabase Database** integration
- **Latest Price API** by stock symbol
- **Chart Data API** for candlestick charts
- **CORS** configured for frontend
- **Admin Panel** for data management

### 5.3 Database Features
- **NEPSE Index** historical data
- **Stock Information** with real-time prices
- **Market Indices** tracking
- **Data Update Logs** for monitoring

## 🚀 Step 6: Testing Your Application

### 6.1 Test Backend
1. Visit: `https://pratikshyab.pythonanywhere.com/api/v1/`
2. Test admin panel: `https://pratikshyab.pythonanywhere.com/admin/`
3. Test latest price: `https://pratikshyab.pythonanywhere.com/api/v1/stocks/latest_price/?symbol=NICL`

### 6.2 Test Frontend
1. Visit your Vercel deployment URL
2. Check if data loads correctly
3. Test stock search functionality
4. Verify candlestick charts display

## 🔧 Step 7: Data Management

### 7.1 Import Real NEPSE Data
```bash
# Import from Kaggle dataset
python manage.py import_kaggle_nepse path/to/kaggle-data.csv

# Generate more sample data
python manage.py generate_sample_data --days 60
```

### 7.2 Update Data Regularly
Set up a scheduled task in PythonAnywhere:
```bash
# Run every hour
0 * * * * cd /home/pratikshyab/sagarmatha-investments/django-backend && source venv/bin/activate && python manage.py update_nepse_data --type all --source sample
```

## 📱 Step 8: Mobile Responsiveness

The application is fully responsive and works on:
- **Desktop** browsers
- **Tablet** devices
- **Mobile** phones
- **Progressive Web App** features

## 🎯 Step 9: Performance Optimization

### 9.1 Backend Optimization
- **Database indexing** for faster queries
- **Caching** for frequently accessed data
- **Pagination** for large datasets
- **API rate limiting** for protection

### 9.2 Frontend Optimization
- **Code splitting** for faster loading
- **Image optimization** for charts
- **Lazy loading** for components
- **CDN** delivery via Vercel

## 🔒 Step 10: Security

### 10.1 Backend Security
- **CORS** properly configured
- **Environment variables** for secrets
- **Database SSL** connections
- **Input validation** for API endpoints

### 10.2 Frontend Security
- **HTTPS** only connections
- **API key** protection
- **XSS** prevention
- **CSRF** protection

## 📈 Step 11: Monitoring

### 11.1 Backend Monitoring
- **PythonAnywhere** logs
- **Database** performance monitoring
- **API** response times
- **Error** tracking

### 11.2 Frontend Monitoring
- **Vercel** analytics
- **User** interactions
- **Performance** metrics
- **Error** reporting

## 🎉 Success!

Your complete NEPSE application is now deployed with:
- ✅ **Supabase Database** with NEPSE data
- ✅ **PythonAnywhere Backend** with REST API
- ✅ **Vercel Frontend** with React components
- ✅ **Candlestick Charts** for data visualization
- ✅ **Stock Search** by symbol functionality
- ✅ **Real-time Data** updates
- ✅ **Mobile Responsive** design

## 🔗 Your Application URLs

- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://pratikshyab.pythonanywhere.com/api/v1/`
- **Admin Panel**: `https://pratikshyab.pythonanywhere.com/admin/`
- **Database**: Supabase Dashboard

## 📞 Support

If you encounter any issues:
1. Check the logs in PythonAnywhere
2. Verify Supabase connection
3. Test API endpoints individually
4. Check Vercel deployment logs

Your NEPSE application is now live and ready to serve real-time stock market data! 🚀
