# 🚀 PythonAnywhere Deployment Guide

## Prerequisites

1. **PythonAnywhere Account**: You already have one at [pythonanywhere.com](https://www.pythonanywhere.com/user/pratikshyab/)
2. **Supabase Project**: Set up your Supabase database
3. **Git Repository**: Your code should be in a Git repository

## Step 1: Set Up Supabase Database

### 1.1 Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project named `sagarmatha-nepse`
3. Note down your database credentials

### 1.2 Get Database Connection Details
From your Supabase project dashboard:
- Go to **Settings** → **Database**
- Copy the connection details:
  - **Host**: `db.your-project-ref.supabase.co`
  - **Database**: `postgres`
  - **Username**: `postgres`
  - **Password**: Your database password
  - **Port**: `5432`

### 1.3 Create Database Tables
Run this SQL in your Supabase SQL Editor:

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

## Step 2: Deploy to PythonAnywhere

### 2.1 Access PythonAnywhere Console
1. Go to [pythonanywhere.com](https://www.pythonanywhere.com)
2. Login with username: `pratikshyab`
3. Password: `S=@:5:&s9mwk?nU`
4. Go to **Consoles** → **Bash**

### 2.2 Clone Your Repository
```bash
# Clone your repository
git clone https://github.com/your-username/sagarmatha-investments.git
cd sagarmatha-investments/django-backend
```

### 2.3 Set Up Environment Variables
```bash
# Create environment file
nano .env

# Add these variables (replace with your actual values):
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

### 2.4 Install Dependencies
```bash
# Create virtual environment
python3.10 -m venv venv
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install requirements
pip install -r requirements-pythonanywhere.txt
```

### 2.5 Run Database Migrations
```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser
```

### 2.6 Collect Static Files
```bash
# Create directories
mkdir -p logs staticfiles media

# Collect static files
python manage.py collectstatic --noinput
```

## Step 3: Configure Web App

### 3.1 Create Web App
1. Go to **Web** tab in PythonAnywhere dashboard
2. Click **Add a new web app**
3. Choose **Manual configuration**
4. Select **Python 3.10**
5. Click **Next**

### 3.2 Configure WSGI File
1. Click on the WSGI file link
2. Replace the content with:

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
1. Go to **Web** tab
2. Scroll down to **Static files**
3. Add these mappings:
   - **URL**: `/static/`
   - **Directory**: `/home/pratikshyab/sagarmatha-investments/django-backend/staticfiles/`
   - **URL**: `/media/`
   - **Directory**: `/home/pratikshyab/sagarmatha-investments/django-backend/media/`

### 3.4 Configure Domain
1. In **Web** tab, scroll to **Domain**
2. Your app will be available at: `https://pratikshyab.pythonanywhere.com`
3. You can also add a custom domain if you have one

## Step 4: Test Your Deployment

### 4.1 Test API Endpoints
```bash
# Test basic endpoints
curl https://pratikshyab.pythonanywhere.com/api/v1/
curl https://pratikshyab.pythonanywhere.com/api/v1/overview/overview/
```

### 4.2 Test Admin Panel
1. Go to `https://pratikshyab.pythonanywhere.com/admin/`
2. Login with your superuser credentials
3. Check if you can access the admin interface

### 4.3 Test Database Connection
```bash
# Test database connection
python manage.py shell
>>> from django.db import connection
>>> connection.ensure_connection()
```

## Step 5: Set Up Scheduled Tasks (Optional)

### 5.1 Create Scheduled Task
1. Go to **Tasks** tab in PythonAnywhere
2. Click **Add a new task**
3. Set up a task to run every hour:

```bash
# Command to run
cd /home/pratikshyab/sagarmatha-investments/django-backend && source venv/bin/activate && python manage.py update_nepse_data --type all --source kaggle
```

### 5.2 Set Up Cron Job
```bash
# Add to crontab
0 * * * * cd /home/pratikshyab/sagarmatha-investments/django-backend && source venv/bin/activate && python manage.py update_nepse_data --type all --source kaggle
```

## Step 6: Update Frontend Configuration

### 6.1 Update API URL
In your Next.js app, update the API URL to point to PythonAnywhere:

```javascript
// In your Next.js app
const API_URL = 'https://pratikshyab.pythonanywhere.com/api/v1';
```

### 6.2 Test Frontend Integration
1. Start your Next.js app locally
2. Test if it can fetch data from the PythonAnywhere backend
3. Deploy your frontend to Vercel

## Troubleshooting

### Common Issues

1. **Database Connection Error**
   - Check your Supabase credentials
   - Ensure your IP is whitelisted in Supabase
   - Verify the database host and port

2. **Static Files Not Loading**
   - Check static files configuration in Web tab
   - Ensure `collectstatic` was run successfully
   - Verify file permissions

3. **Import Errors**
   - Check if all dependencies are installed
   - Verify virtual environment is activated
   - Check Python path configuration

4. **CORS Issues**
   - Update CORS settings in Django
   - Add your frontend domain to allowed origins

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

## Security Notes

1. **Change Default Passwords**: Update all default passwords
2. **Environment Variables**: Never commit sensitive data to Git
3. **Database Security**: Use strong passwords and enable SSL
4. **CORS Configuration**: Only allow necessary origins
5. **Admin Access**: Use strong admin credentials

## Monitoring

1. **Check Logs Regularly**: Monitor error logs for issues
2. **Database Performance**: Monitor Supabase usage
3. **API Usage**: Track API calls and performance
4. **Scheduled Tasks**: Ensure data updates are running

## Support

If you encounter issues:
1. Check PythonAnywhere documentation
2. Review Django logs
3. Test locally first
4. Contact support if needed

Your backend will be available at: **https://pratikshyab.pythonanywhere.com**
