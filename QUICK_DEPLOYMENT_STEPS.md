# 🚀 Quick Deployment Steps for NEPSE Application

## 🎯 Your Application is Ready!

Your complete NEPSE application with Django backend, Next.js frontend, and Supabase database is ready for deployment.

## 📋 Deployment Checklist

### ✅ Step 1: GitHub Repository (DONE)
- ✅ Repository: `https://github.com/Pratikshya-Bhattarai/sagarmatha-investments`
- ✅ Code pushed to GitHub
- ✅ All files committed

### 🔄 Step 2: Deploy Backend to PythonAnywhere

**Login**: [pythonanywhere.com](https://www.pythonanywhere.com)
- Username: `pratikshyab`
- Password: `S=@:5:&s9mwk?nU`

**Commands to run in PythonAnywhere Console**:

```bash
# Clone your repository
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

**Add to .env file**:
```env
SECRET_KEY=your-very-secure-secret-key-here-change-this
DEBUG=False
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-supabase-database-password
SUPABASE_DB_HOST=db.your-project-ref.supabase.co
SUPABASE_DB_PORT=5432
```

**Continue with**:
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

**Configure Web App**:
1. Go to **Web** tab in PythonAnywhere
2. **Add new web app** → Manual configuration → Python 3.10
3. **Update WSGI file** with:

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
   - URL: `/static/`
   - Directory: `/home/pratikshyab/sagarmatha-investments/django-backend/staticfiles/`

5. **Click Reload**

**Result**: Backend live at `https://pratikshyab.pythonanywhere.com/api/v1/`

### 🔄 Step 3: Set Up Supabase Database

**Login**: [supabase.com](https://supabase.com)
- Email: `intern.pratikshya@gmail.com`
- Password: `hVryQ6bfg@DWJ4G`

**Steps**:
1. **Create Project**: `nepse-market-data`
2. **Go to SQL Editor**
3. **Copy and run** the SQL from `SUPABASE_DATABASE_SCHEMA.sql`
4. **Get Database Credentials**:
   - Go to Settings → Database
   - Note: Host, Database, Username, Password
5. **Update .env file** in PythonAnywhere with these credentials

### 🔄 Step 4: Deploy Frontend to Vercel

**Go to**: [vercel.com](https://vercel.com)

**Steps**:
1. **Sign up/Login** with GitHub
2. **Import Project**: `Pratikshya-Bhattarai/sagarmatha-investments`
3. **Configure**:
   - **Framework Preset**: Next.js
   - **Root Directory**: `nextjs-app`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
4. **Environment Variables**:
   - `NEXT_PUBLIC_API_URL`: `https://pratikshyab.pythonanywhere.com/api/v1`
5. **Deploy**

**Result**: Frontend live at `https://your-app.vercel.app`

## 🎉 Success!

Your complete NEPSE application will be live with:

### 🎯 Features
- ✅ **Real-time NEPSE Index** display
- ✅ **Interactive Candlestick Charts** (30-day trends)
- ✅ **Stock Search** by symbol (NICL, NABIL, SCB, etc.)
- ✅ **Market Indices** overview
- ✅ **Top Stocks** with price changes
- ✅ **Mobile Responsive** design

### 🔗 URLs
- **Frontend**: `https://your-app.vercel.app`
- **Backend API**: `https://pratikshyab.pythonanywhere.com/api/v1/`
- **Database**: Supabase PostgreSQL

### 📊 API Endpoints
- `GET /api/v1/` - API root
- `GET /api/v1/stocks/latest_price/?symbol=NICL` - Latest price by symbol
- `GET /api/v1/index/chart_data/?days=30` - Chart data
- `GET /api/v1/stocks/top_gainers/` - Top gaining stocks
- `GET /api/v1/indices/` - Market indices

## 🧪 Test Your Application

### Test Backend
```bash
# Test main API
curl https://pratikshyab.pythonanywhere.com/api/v1/

# Test latest price
curl "https://pratikshyab.pythonanywhere.com/api/v1/stocks/latest_price/?symbol=NICL"

# Test chart data
curl "https://pratikshyab.pythonanywhere.com/api/v1/index/chart_data/?days=30"
```

### Test Frontend
- Visit your Vercel URL
- Test stock search: "NICL", "NABIL", "SCB"
- Check candlestick charts
- Test mobile responsiveness

## 🔧 Troubleshooting

### Common Issues:

1. **CORS Errors**
   - Update CORS settings in Django backend
   - Add your Vercel domain to allowed origins

2. **Database Connection**
   - Verify Supabase credentials
   - Check database host and port
   - Test connection

3. **API Connection**
   - Verify backend is running
   - Check environment variables
   - Test API endpoints directly

4. **Build Errors**
   - Check Node.js version (18+)
   - Verify all dependencies
   - Check for TypeScript errors

## 📱 Your Complete Application

Once deployed, you'll have:

- 🏠 **Homepage** with NEPSE index overview
- 📊 **Candlestick Charts** showing 30-day trends
- 🔍 **Stock Search** by symbol functionality
- 📈 **Market Indices** display
- 📱 **Mobile Responsive** design
- ⚡ **Real-time Data** from backend
- 🗄️ **Supabase Database** for data storage

**Built with ❤️ for the Nepalese stock market community** 🇳🇵

Your NEPSE application with charts is ready for deployment! 🚀
