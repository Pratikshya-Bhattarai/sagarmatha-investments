# PythonAnywhere Deployment Guide

This guide will help you deploy the Sagarmatha Investments Django backend to PythonAnywhere.

## 🚀 Quick Setup

### 1. Create PythonAnywhere Account
1. Go to [PythonAnywhere.com](https://www.pythonanywhere.com)
2. Sign up for a free account
3. Verify your email address

### 2. Clone Your Repository
```bash
# In PythonAnywhere console
git clone https://github.com/Pratikshya-Bhattarai/sagarmatha-investments.git
cd sagarmatha-investments/nextjs-app/django-backend
```

### 3. Install Dependencies
```bash
# Create virtual environment
python3.10 -m venv venv
source venv/bin/activate

# Install requirements
pip install -r requirements-pythonanywhere.txt
```

### 4. Configure Django Settings
```bash
# Set up environment variables
echo "SECRET_KEY=your-secret-key-here" > .env
echo "DEBUG=False" >> .env
echo "KAGGLE_USERNAME=your-kaggle-username" >> .env
echo "KAGGLE_KEY=your-kaggle-api-key" >> .env

# Create logs directory
mkdir -p logs

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Load sample data
python manage.py update_nepse_data --type all --source live
```

### 5. Configure Web App
1. Go to **Web** tab in PythonAnywhere dashboard
2. Click **Add a new web app**
3. Choose **Manual configuration**
4. Select **Python 3.10**
5. Set the following:

**Source code**: `/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend`

**Working directory**: `/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend`

**WSGI file**: `/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend/wsgi.py`

### 6. Configure Static Files
In the **Static files** section:
- **URL**: `/static/`
- **Directory**: `/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend/staticfiles`

### 7. Configure Environment Variables
In the **Environment variables** section:
```
SECRET_KEY=your-secret-key-here
DEBUG=False
KAGGLE_USERNAME=your-kaggle-username
KAGGLE_KEY=your-kaggle-api-key
```

### 8. Reload Web App
Click **Reload** button to apply changes.

## 🔧 Configuration Details

### WSGI Configuration
The `wsgi.py` file is configured to:
- Add the project directory to Python path
- Use PythonAnywhere-specific settings
- Handle Django application startup

### Settings Configuration
The `settings_pythonanywhere.py` file includes:
- PythonAnywhere-specific ALLOWED_HOSTS
- SQLite database configuration
- Static files configuration
- CORS settings for frontend integration
- Security settings for production

### API Endpoints
Your Django backend will be available at:
- **Base URL**: `https://pratikshya-bhattarai.pythonanywhere.com`
- **API Root**: `https://pratikshya-bhattarai.pythonanywhere.com/api/v1/`
- **Admin**: `https://pratikshya-bhattarai.pythonanywhere.com/admin/`

### Available Endpoints:
- `GET /api/v1/overview/overview/` - Market overview
- `GET /api/v1/index/latest/` - Latest NEPSE index
- `GET /api/v1/stocks/top_gainers/` - Top gaining stocks
- `GET /api/v1/stocks/top_losers/` - Top losing stocks
- `GET /api/v1/overview/chart_data/` - Chart data

## 🔄 Data Updates

### Manual Data Update
```bash
# In PythonAnywhere console
cd /home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend
source venv/bin/activate
python manage.py update_nepse_data --type all --source live
```

### Scheduled Updates (Paid Plans)
For automatic data updates, you can set up scheduled tasks:
1. Go to **Tasks** tab
2. Add a new task:
   - **Command**: `cd /home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend && source venv/bin/activate && python manage.py update_nepse_data --type all --source live`
   - **Schedule**: Every 5 minutes

## 🌐 Frontend Integration

Update your Next.js frontend environment variables:
```env
NEXT_PUBLIC_API_URL=https://pratikshya-bhattarai.pythonanywhere.com/api/v1
```

## 📊 Monitoring

### View Logs
```bash
# In PythonAnywhere console
tail -f logs/django.log
```

### Check Database
```bash
# Access Django shell
python manage.py shell
```

### Admin Interface
Visit: `https://pratikshya-bhattarai.pythonanywhere.com/admin/`

## 🚨 Troubleshooting

### Common Issues:

1. **Import Errors**: Make sure the project path is correct in `wsgi.py`
2. **Static Files**: Ensure static files are collected: `python manage.py collectstatic`
3. **Database**: Check if migrations are applied: `python manage.py showmigrations`
4. **CORS**: Verify CORS settings allow your frontend domain

### Debug Mode:
Set `DEBUG=True` in environment variables to see detailed error messages.

## 📈 Performance Tips

1. **Enable Caching**: Use PythonAnywhere's Redis cache (paid plans)
2. **Database Optimization**: Use PostgreSQL for better performance (paid plans)
3. **Static Files**: Use CDN for static file delivery
4. **Background Tasks**: Use Celery for data updates (paid plans)

## 🔒 Security

1. **Change Secret Key**: Generate a new SECRET_KEY for production
2. **Environment Variables**: Never commit sensitive data to Git
3. **HTTPS**: PythonAnywhere provides HTTPS by default
4. **CORS**: Configure CORS to allow only your frontend domains

## 📞 Support

- **PythonAnywhere Docs**: https://help.pythonanywhere.com/
- **Django Docs**: https://docs.djangoproject.com/
- **Project Repository**: https://github.com/Pratikshya-Bhattarai/sagarmatha-investments

Your Django backend will be live at: `https://pratikshya-bhattarai.pythonanywhere.com`
