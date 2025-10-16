# 🐍 PythonAnywhere Setup for Sagarmatha Backend

## Step-by-Step Deployment Guide

### 1. Create PythonAnywhere Account
1. Go to [PythonAnywhere](https://www.pythonanywhere.com)
2. Sign up for a free account
3. Verify your email

### 2. Upload Your Code
1. **Option A: Git Clone**
   ```bash
   # In PythonAnywhere console
   cd ~
   git clone https://github.com/yourusername/sagarmatha-investments.git
   cd sagarmatha-investments/django-backend
   ```

2. **Option B: File Upload**
   - Upload the `django-backend` folder to your home directory
   - Extract if it's compressed

### 3. Set Up Virtual Environment
```bash
# Navigate to your project
cd ~/sagarmatha-investments/django-backend

# Create virtual environment
python3.10 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install requirements
pip install --upgrade pip
pip install -r requirements_production.txt
```

### 4. Configure Environment Variables
```bash
# Create .env file
nano .env
```

Add the following content:
```env
SECRET_KEY=your-super-secret-key-here
DEBUG=False
ALLOWED_HOSTS=yourusername.pythonanywhere.com
DB_NAME=sagarmatha_investments
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=localhost
DB_PORT=3306
REDIS_URL=redis://localhost:6379/0
FRONTEND_URL=https://sagarmathainvestments.vercel.app
```

### 5. Set Up Database
1. Go to **Databases** tab in PythonAnywhere
2. Create a new MySQL database:
   - **Database name**: `sagarmatha_investments`
   - **Username**: `sagarmatha_user`
   - **Password**: (generate a strong password)

### 6. Run Database Migrations
```bash
# Activate virtual environment
source venv/bin/activate

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Collect static files
python manage.py collectstatic --noinput
```

### 7. Configure Web App
1. Go to **Web** tab in PythonAnywhere
2. Click **Add a new web app**
3. Choose **Manual configuration**
4. Select **Python 3.10**
5. Set the following:
   - **Source code**: `/home/yourusername/sagarmatha-investments/django-backend`
   - **Working directory**: `/home/yourusername/sagarmatha-investments/django-backend`
   - **WSGI configuration file**: `/home/yourusername/sagarmatha-investments/django-backend/wsgi_production.py`

### 8. Update WSGI Configuration
Edit the WSGI file to:
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

### 9. Import Sample Data
```bash
# Activate virtual environment
source venv/bin/activate

# Import sample data
python manage.py update_nepse_data --type all --source sample
```

### 10. Test Your Deployment
1. Go to your web app URL: `https://yourusername.pythonanywhere.com`
2. Test API endpoints:
   - `https://yourusername.pythonanywhere.com/api/v1/`
   - `https://yourusername.pythonanywhere.com/api/v1/overview/overview/`
   - `https://yourusername.pythonanywhere.com/admin/`

### 11. Set Up Scheduled Tasks (Optional)
1. Go to **Tasks** tab
2. Add a new task:
   - **Command**: `cd /home/yourusername/sagarmatha-investments/django-backend && source venv/bin/activate && python manage.py update_nepse_data --type all`
   - **Schedule**: Every 5 minutes

### 12. Set Up Custom Domain (Optional)
1. In **Web** tab, click **Add a new domain**
2. Enter your custom domain
3. Update DNS settings
4. Update `ALLOWED_HOSTS` in `.env`

## 🔧 Troubleshooting

### Common Issues

1. **Import Errors**
   ```bash
   # Check Python path
   echo $PYTHONPATH
   export PYTHONPATH="/home/yourusername/sagarmatha-investments/django-backend:$PYTHONPATH"
   ```

2. **Database Connection**
   ```bash
   # Test database connection
   python manage.py dbshell
   ```

3. **Static Files**
   ```bash
   # Collect static files
   python manage.py collectstatic --noinput
   ```

4. **Permission Issues**
   ```bash
   # Fix permissions
   chmod -R 755 /home/yourusername/sagarmatha-investments/
   ```

### Logs
- **Application logs**: Check the **Web** tab logs
- **Error logs**: Check the **Web** tab error logs
- **Console logs**: Check the **Tasks** tab

## 📊 API Endpoints

Once deployed, your API will be available at:
- **Base URL**: `https://yourusername.pythonanywhere.com/api/v1/`
- **Admin Panel**: `https://yourusername.pythonanywhere.com/admin/`

### Key Endpoints
- `GET /api/v1/overview/overview/` - Market overview
- `GET /api/v1/analytics/market_summary/` - Market summary
- `GET /api/v1/reports/daily_report/` - Daily report
- `GET /api/v1/stocks/top_gainers/` - Top gainers
- `GET /api/v1/stocks/top_losers/` - Top losers

## 🚀 Production Checklist

- [ ] Set `DEBUG=False`
- [ ] Use strong `SECRET_KEY`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Set up SSL certificate
- [ ] Configure database
- [ ] Set up Redis (optional)
- [ ] Configure email
- [ ] Set up monitoring
- [ ] Configure backups
- [ ] Test all endpoints

## 📞 Support

If you encounter issues:
1. Check the logs in the **Web** tab
2. Verify your environment variables
3. Test database connectivity
4. Check file permissions
5. Contact PythonAnywhere support if needed

---

**Your Sagarmatha Investments backend is now live! 🏔️**
