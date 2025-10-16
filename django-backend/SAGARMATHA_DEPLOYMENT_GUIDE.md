# 🏔️ Sagarmatha Investments Backend Deployment Guide

## PythonAnywhere Deployment

This guide will help you deploy the Sagarmatha Investments backend to PythonAnywhere.

### Prerequisites
1. PythonAnywhere account (free or paid)
2. Git repository access
3. Domain name (optional, for custom domain)

### Step 1: Create PythonAnywhere Account
1. Go to [PythonAnywhere](https://www.pythonanywhere.com)
2. Sign up for a free account
3. Verify your email address

### Step 2: Set Up Your Web App
1. Go to the **Web** tab in your PythonAnywhere dashboard
2. Click **Add a new web app**
3. Choose **Manual configuration**
4. Select **Python 3.10** (or latest available)
5. Click **Next**

### Step 3: Clone Your Repository
```bash
# In the PythonAnywhere console
cd ~
git clone https://github.com/yourusername/sagarmatha-investments.git
cd sagarmatha-investments/django-backend
```

### Step 4: Set Up Virtual Environment
```bash
# Create virtual environment
python3.10 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install production requirements
pip install --upgrade pip
pip install -r requirements_production.txt
```

### Step 5: Configure Environment Variables
Create a `.env` file in the django-backend directory:

```bash
# Create .env file
nano .env
```

Add the following content:
```env
# Django Configuration
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=sagarmathainvestments.pythonanywhere.com

# Database Configuration
DB_NAME=sagarmatha_investments
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=3306

# Redis Configuration
REDIS_URL=redis://localhost:6379/0

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USE_TLS=True
EMAIL_HOST_USER=your-email@gmail.com
EMAIL_HOST_PASSWORD=your-app-password
DEFAULT_FROM_EMAIL=noreply@sagarmathainvestments.com

# Frontend URL
FRONTEND_URL=https://sagarmathainvestments.vercel.app

# Monitoring (Optional)
SENTRY_DSN=your-sentry-dsn-here

# Backup Configuration
BACKUP_ENABLED=True
```

### Step 6: Set Up Database
```bash
# Create database migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput
```

### Step 7: Configure Web App
1. Go to the **Web** tab in PythonAnywhere
2. Click on your web app
3. Set the following:
   - **Source code**: `/home/yourusername/sagarmatha-investments/django-backend`
   - **Working directory**: `/home/yourusername/sagarmatha-investments/django-backend`
   - **WSGI configuration file**: `/home/yourusername/sagarmatha-investments/django-backend/wsgi_production.py`

### Step 8: Update WSGI Configuration
Edit the WSGI file to point to your project:

```python
import os
import sys

# Add your project directory to Python path
path = '/home/yourusername/sagarmatha-investments/django-backend'
if path not in sys.path:
    sys.path.append(path)

# Set Django settings module
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'sagarmatha_backend.settings_production')

# Import Django WSGI application
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
```

### Step 9: Set Up Scheduled Tasks (Optional)
1. Go to the **Tasks** tab
2. Add a new task:
   - **Command**: `cd /home/yourusername/sagarmatha-investments/django-backend && source venv/bin/activate && python manage.py update_nepse_data --type all`
   - **Schedule**: Every 5 minutes

### Step 10: Set Up Database (MySQL)
1. Go to the **Databases** tab
2. Create a new MySQL database:
   - **Database name**: `sagarmatha_investments`
   - **Username**: `sagarmatha_user`
   - **Password**: (generate a strong password)

### Step 11: Configure Redis (Optional)
For caching and background tasks:
1. Go to the **Consoles** tab
2. Start a Redis console
3. Test Redis connection

### Step 12: Test Your Deployment
1. Go to your web app URL: `https://yourusername.pythonanywhere.com`
2. Test API endpoints:
   - `https://yourusername.pythonanywhere.com/api/v1/`
   - `https://yourusername.pythonanywhere.com/api/v1/overview/overview/`

### Step 13: Set Up Custom Domain (Optional)
1. In the **Web** tab, click **Add a new domain**
2. Enter your custom domain
3. Update DNS settings to point to PythonAnywhere
4. Update `ALLOWED_HOSTS` in your `.env` file

### Step 14: Set Up SSL Certificate
1. In the **Web** tab, click **Enable HTTPS**
2. Follow the instructions to set up SSL

### Step 15: Monitor Your Application
1. Check logs in the **Web** tab
2. Monitor database usage
3. Set up monitoring with Sentry (optional)

## Production Checklist

### Security
- [ ] Set `DEBUG=False`
- [ ] Use strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up SSL certificate
- [ ] Enable security headers
- [ ] Configure CORS properly

### Performance
- [ ] Enable Redis caching
- [ ] Set up database connection pooling
- [ ] Configure static file serving
- [ ] Set up CDN (optional)
- [ ] Enable compression

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure logging
- [ ] Set up health checks
- [ ] Monitor database performance
- [ ] Set up uptime monitoring

### Backup
- [ ] Set up database backups
- [ ] Configure file backups
- [ ] Test backup restoration
- [ ] Set up automated backups

## Troubleshooting

### Common Issues

1. **Import Errors**
   ```bash
   # Check Python path
   echo $PYTHONPATH
   # Add project directory to path
   export PYTHONPATH="/home/yourusername/sagarmatha-investments/django-backend:$PYTHONPATH"
   ```

2. **Database Connection Issues**
   ```bash
   # Check database credentials
   python manage.py dbshell
   ```

3. **Static Files Not Loading**
   ```bash
   # Collect static files
   python manage.py collectstatic --noinput
   ```

4. **Permission Issues**
   ```bash
   # Fix file permissions
   chmod -R 755 /home/yourusername/sagarmatha-investments/
   ```

### Logs
- **Django logs**: `/home/yourusername/sagarmatha-investments/django-backend/logs/`
- **PythonAnywhere logs**: Available in the **Web** tab
- **Error logs**: Check the **Web** tab for error details

## API Endpoints

Once deployed, your API will be available at:
- **Base URL**: `https://yourusername.pythonanywhere.com/api/v1/`
- **Admin Panel**: `https://yourusername.pythonanywhere.com/admin/`
- **API Documentation**: `https://yourusername.pythonanywhere.com/api/docs/`

### Key Endpoints
- `GET /api/v1/overview/overview/` - Market overview
- `GET /api/v1/analytics/market_summary/` - Market summary
- `GET /api/v1/reports/daily_report/` - Daily report
- `GET /api/v1/stocks/top_gainers/` - Top gainers
- `GET /api/v1/stocks/top_losers/` - Top losers

## Support

For deployment issues:
1. Check PythonAnywhere documentation
2. Review Django deployment guide
3. Check application logs
4. Contact support if needed

## Next Steps

After successful deployment:
1. Test all API endpoints
2. Set up monitoring
3. Configure backups
4. Set up CI/CD pipeline
5. Deploy frontend to connect to backend

Your Sagarmatha Investments backend is now live! 🚀
