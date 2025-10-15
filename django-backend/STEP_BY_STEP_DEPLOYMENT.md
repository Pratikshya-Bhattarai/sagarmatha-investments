# 🚀 Step-by-Step PythonAnywhere Deployment

## Prerequisites ✅
- PythonAnywhere account: `pratikshyab` 
- Password: `S=@:5:&s9mwk?nU`
- Supabase project set up
- Your code in a Git repository

## Step 1: Set Up Supabase Database 🗄️

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Sign in and click "New Project"
3. Name: `sagarmatha-nepse`
4. Choose region closest to you
5. Set a strong database password
6. Wait for project creation (2-3 minutes)

### 1.2 Get Database Credentials
1. Go to **Settings** → **Database** in your Supabase project
2. Copy these details:
   - **Host**: `db.xxxxx.supabase.co`
   - **Database**: `postgres`
   - **Username**: `postgres`
   - **Password**: (the one you set)
   - **Port**: `5432`

### 1.3 Create Database Tables
1. Go to **SQL Editor** in Supabase
2. Click "New query"
3. Run this SQL:

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
    symbol VARCHAR(10) NOT NULL,
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
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Data update logs
CREATE TABLE data_update_logs (
    id SERIAL PRIMARY KEY,
    update_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    message TEXT,
    records_updated INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
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

## Step 2: Deploy to PythonAnywhere 🐍

### 2.1 Access PythonAnywhere
1. Go to [pythonanywhere.com](https://www.pythonanywhere.com)
2. Login with:
   - Username: `pratikshyab`
   - Password: `S=@:5:&s9mwk?nU`
3. Go to **Consoles** → **Bash**

### 2.2 Clone Your Repository
```bash
# Clone your repository (replace with your actual Git URL)
git clone https://github.com/your-username/sagarmatha-investments.git
cd sagarmatha-investments/django-backend
```

### 2.3 Run Quick Setup
```bash
# Run the automated setup script
python3 quick-setup.py
```

### 2.4 Configure Environment Variables
```bash
# Edit the .env file with your actual Supabase credentials
nano .env
```

Update these values in the `.env` file:
```env
SECRET_KEY=your-very-secure-secret-key-here
DEBUG=False
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-actual-supabase-password
SUPABASE_DB_HOST=db.your-project-ref.supabase.co
SUPABASE_DB_PORT=5432
KAGGLE_USERNAME=your-kaggle-username
KAGGLE_KEY=your-kaggle-api-key
```

## Step 3: Configure Web App 🌐

### 3.1 Create Web App
1. Go to **Web** tab in PythonAnywhere dashboard
2. Click **Add a new web app**
3. Choose **Manual configuration**
4. Select **Python 3.10**
5. Click **Next**

### 3.2 Configure WSGI File
1. Click on the WSGI file link (usually `/var/www/pratikshyab_pythonanywhere_com_wsgi.py`)
2. Replace all content with:

```python
import os
import sys

# Add your project directory to the Python path
path = '/home/pratikshyab/sagarmatha-investments/django-backend'
if path not in sys.path:
    sys.path.append(path)

# Set the Django settings module
os.environ['DJANGO_SETTINGS_MODULE'] = 'sagarmatha_backend.settings_pythonanywhere'

# Import Django WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

### 3.3 Configure Static Files
1. In **Web** tab, scroll to **Static files**
2. Add these mappings:
   - **URL**: `/static/`
   - **Directory**: `/home/pratikshyab/sagarmatha-investments/django-backend/staticfiles/`
   - **URL**: `/media/`
   - **Directory**: `/home/pratikshyab/sagarmatha-investments/django-backend/media/`

### 3.4 Reload Web App
1. Click **Reload** button in the Web tab
2. Your app should now be live at: `https://pratikshyab.pythonanywhere.com`

## Step 4: Test Your Deployment ✅

### 4.1 Test Basic Endpoints
```bash
# Test in PythonAnywhere console
curl https://pratikshyab.pythonanywhere.com/api/v1/
```

### 4.2 Test Admin Panel
1. Go to `https://pratikshyab.pythonanywhere.com/admin/`
2. Login with:
   - Username: `admin`
   - Password: `admin123`

### 4.3 Test Database Connection
```bash
# In PythonAnywhere console
cd /home/pratikshyab/sagarmatha-investments/django-backend
source venv/bin/activate
python manage.py shell
```

In the Python shell:
```python
from django.db import connection
connection.ensure_connection()
print("Database connection successful!")
```

## Step 5: Set Up Data Updates 📊

### 5.1 Test Data Update Command
```bash
# In PythonAnywhere console
cd /home/pratikshyab/sagarmatha-investments/django-backend
source venv/bin/activate
python manage.py update_nepse_data --type all --source kaggle
```

### 5.2 Set Up Scheduled Task (Optional)
1. Go to **Tasks** tab in PythonAnywhere
2. Click **Add a new task**
3. Set up to run every hour:

```bash
cd /home/pratikshyab/sagarmatha-investments/django-backend && source venv/bin/activate && python manage.py update_nepse_data --type all --source kaggle
```

## Step 6: Update Frontend 🔗

### 6.1 Update API URL
In your Next.js app, update the API configuration:

```javascript
// In your Next.js app's API configuration
const API_URL = 'https://pratikshyab.pythonanywhere.com/api/v1';
```

### 6.2 Test Frontend Integration
1. Start your Next.js app locally
2. Test if it can fetch data from the PythonAnywhere backend
3. Deploy your frontend to Vercel

## Troubleshooting 🔧

### Common Issues and Solutions

1. **Database Connection Error**
   ```bash
   # Check your .env file
   cat .env
   
   # Test database connection
   python manage.py dbshell
   ```

2. **Static Files Not Loading**
   ```bash
   # Recollect static files
   python manage.py collectstatic --noinput
   
   # Check static files configuration in Web tab
   ```

3. **Import Errors**
   ```bash
   # Check if virtual environment is activated
   which python
   
   # Reinstall requirements
   pip install -r requirements-pythonanywhere.txt
   ```

4. **CORS Issues**
   - Update CORS settings in `settings_pythonanywhere.py`
   - Add your frontend domain to `CORS_ALLOWED_ORIGINS`

### Useful Commands

```bash
# Check logs
tail -f /var/log/pratikshyab.pythonanywhere.com.error.log

# Restart web app
touch /var/www/pratikshyab_pythonanywhere_com_wsgi.py

# Check database connection
python manage.py dbshell

# Run management commands
python manage.py update_nepse_data --type all --source kaggle
```

## Final Checklist ✅

- [ ] Supabase project created and configured
- [ ] Database tables created
- [ ] Code deployed to PythonAnywhere
- [ ] Environment variables configured
- [ ] Web app configured
- [ ] Static files configured
- [ ] Database migrations run
- [ ] Admin user created
- [ ] API endpoints working
- [ ] Frontend updated with new API URL
- [ ] Scheduled tasks set up (optional)

## Your Backend URLs 🌐

- **Main API**: https://pratikshyab.pythonanywhere.com/api/v1/
- **Admin Panel**: https://pratikshyab.pythonanywhere.com/admin/
- **API Documentation**: https://pratikshyab.pythonanywhere.com/api/v1/

## Support 📞

If you encounter issues:
1. Check the PythonAnywhere error logs
2. Verify your Supabase credentials
3. Test database connection
4. Check Django logs

Your backend is now ready to serve your Next.js frontend! 🎉
