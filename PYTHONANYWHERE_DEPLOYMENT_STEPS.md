# 🐍 PythonAnywhere Deployment Steps

## Prerequisites
- PythonAnywhere account: `pratikshyab`
- Password: `S=@:5:&s9mwk?nU`
- Supabase database set up

## Step 1: Access PythonAnywhere Console

1. Go to [pythonanywhere.com](https://www.pythonanywhere.com)
2. Login with:
   - Username: `pratikshyab`
   - Password: `S=@:5:&s9mwk?nU`
3. Go to **Consoles** → **Bash**

## Step 2: Clone Your Repository

```bash
# Clone your GitHub repository
git clone https://github.com/your-username/sagarmatha-investments.git
cd sagarmatha-investments/django-backend
```

## Step 3: Set Up Virtual Environment

```bash
# Create virtual environment
python3.10 -m venv venv
source venv/bin/activate

# Upgrade pip
pip install --upgrade pip

# Install dependencies
pip install -r requirements-pythonanywhere.txt
```

## Step 4: Configure Environment Variables

```bash
# Create .env file
nano .env
```

Add your Supabase credentials:
```env
SECRET_KEY=your-very-secure-secret-key-here-change-this
DEBUG=False
SUPABASE_DB_NAME=postgres
SUPABASE_DB_USER=postgres
SUPABASE_DB_PASSWORD=your-supabase-database-password
SUPABASE_DB_HOST=db.your-project-ref.supabase.co
SUPABASE_DB_PORT=5432
KAGGLE_USERNAME=your-kaggle-username
KAGGLE_KEY=your-kaggle-api-key
```

## Step 5: Run Database Migrations

```bash
# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Generate sample data
python manage.py generate_sample_data --days 30
```

## Step 6: Configure Web App

1. Go to **Web** tab in PythonAnywhere dashboard
2. Click **Add a new web app**
3. Choose **Manual configuration** → **Python 3.10**
4. Click **Next**

## Step 7: Configure WSGI File

1. Click on the WSGI file link
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

## Step 8: Configure Static Files

1. In **Web** tab, scroll to **Static files**
2. Add these mappings:
   - **URL**: `/static/`
   - **Directory**: `/home/pratikshyab/sagarmatha-investments/django-backend/staticfiles/`
   - **URL**: `/media/`
   - **Directory**: `/home/pratikshyab/sagarmatha-investments/django-backend/media/`

## Step 9: Collect Static Files

```bash
# In the console
cd /home/pratikshyab/sagarmatha-investments/django-backend
source venv/bin/activate
python manage.py collectstatic --noinput
```

## Step 10: Reload Web App

1. Click **Reload** button in the Web tab
2. Your app should now be live at: `https://pratikshyab.pythonanywhere.com`

## Step 11: Test Your Deployment

### Test API Endpoints:
```bash
# Test main API
curl https://pratikshyab.pythonanywhere.com/api/v1/

# Test latest price endpoint
curl "https://pratikshyab.pythonanywhere.com/api/v1/stocks/latest_price/?symbol=NICL"

# Test chart data
curl "https://pratikshyab.pythonanywhere.com/api/v1/index/chart_data/?days=30"
```

### Test in Browser:
- **Main API**: https://pratikshyab.pythonanywhere.com/api/v1/
- **Admin Panel**: https://pratikshyab.pythonanywhere.com/admin/

## Step 12: Set Up Scheduled Tasks (Optional)

1. Go to **Tasks** tab in PythonAnywhere
2. Click **Add a new task**
3. Set up to run every hour:

```bash
cd /home/pratikshyab/sagarmatha-investments/django-backend && source venv/bin/activate && python manage.py update_nepse_data --type all --source sample
```

## 🎉 Success!

Your Django backend is now deployed and accessible at:
- **API**: https://pratikshyab.pythonanywhere.com/api/v1/
- **Admin**: https://pratikshyab.pythonanywhere.com/admin/

## 🔧 Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check your Supabase credentials in .env file
   - Verify database host and port
   - Test connection: `python manage.py dbshell`

2. **Static Files Not Loading**
   - Run: `python manage.py collectstatic --noinput`
   - Check static files configuration in Web tab

3. **Import Errors**
   - Check if virtual environment is activated
   - Verify all dependencies are installed
   - Check Python path in WSGI file

4. **CORS Issues**
   - Update CORS settings in settings_pythonanywhere.py
   - Add your frontend domain to allowed origins

### Useful Commands:

```bash
# Check logs
tail -f /var/log/pratikshyab.pythonanywhere.com.error.log

# Restart web app
touch /var/www/pratikshyab_pythonanywhere_com_wsgi.py

# Test database connection
python manage.py dbshell

# Update data
python manage.py generate_sample_data --days 60
```

## 📊 Your Backend URLs

- **Main API**: https://pratikshyab.pythonanywhere.com/api/v1/
- **Admin Panel**: https://pratikshyab.pythonanywhere.com/admin/
- **Latest Price**: https://pratikshyab.pythonanywhere.com/api/v1/stocks/latest_price/?symbol=NICL
- **Chart Data**: https://pratikshyab.pythonanywhere.com/api/v1/index/chart_data/?days=30

Your Django backend is now live and ready to serve your Next.js frontend! 🚀
