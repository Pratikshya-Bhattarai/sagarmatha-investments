# 🏠 Local Development Setup Guide

## Prerequisites
- Python 3.8+ installed
- Git installed
- Your project repository

## Step 1: Navigate to Backend Directory

```bash
cd django-backend
```

## Step 2: Create Virtual Environment

```bash
# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate
```

## Step 3: Install Dependencies

```bash
# Upgrade pip
pip install --upgrade pip

# Install requirements
pip install -r requirements.txt
```

## Step 4: Set Up Environment Variables

Create a `.env` file in the django-backend directory:

```env
# Django Configuration
SECRET_KEY=your-secret-key-here-for-local-development
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Kaggle API (Optional - for data import)
KAGGLE_USERNAME=your-kaggle-username
KAGGLE_KEY=your-kaggle-api-key

# Redis (Optional - for Celery)
REDIS_URL=redis://localhost:6379/0
```

## Step 5: Run Database Migrations

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate
```

## Step 6: Create Superuser (Optional)

```bash
python manage.py createsuperuser
```

## Step 7: Create Logs Directory

```bash
mkdir logs
```

## Step 8: Start Development Server

```bash
python manage.py runserver
```

Your backend will be available at: **http://localhost:8000**

## Step 9: Test Your API

### Test Basic Endpoints:
- **API Root**: http://localhost:8000/api/v1/
- **Admin Panel**: http://localhost:8000/admin/
- **NEPSE Data**: http://localhost:8000/api/v1/overview/overview/

### Test with curl:
```bash
# Test API root
curl http://localhost:8000/api/v1/

# Test overview endpoint
curl http://localhost:8000/api/v1/overview/overview/
```

## Step 10: Import Sample Data (Optional)

```bash
# Import NEPSE data from Kaggle (if you have Kaggle credentials)
python manage.py update_nepse_data --type all --source kaggle

# Or import sample data
python manage.py update_nepse_data --type all --source sample
```

## Troubleshooting

### Common Issues:

1. **Port Already in Use**
   ```bash
   # Use a different port
   python manage.py runserver 8001
   ```

2. **Database Errors**
   ```bash
   # Delete database and recreate
   rm db.sqlite3
   python manage.py migrate
   ```

3. **Import Errors**
   ```bash
   # Make sure virtual environment is activated
   which python
   # Should show path to venv/bin/python
   ```

4. **Static Files Issues**
   ```bash
   # Collect static files
   python manage.py collectstatic
   ```

## Development Tips

1. **Use Django Admin**: Access http://localhost:8000/admin/ to manage data
2. **Check Logs**: Monitor `logs/django.log` for debugging
3. **API Testing**: Use tools like Postman or curl to test endpoints
4. **Database**: Use SQLite browser to view database contents

## Next Steps

Once your local backend is running:
1. Test all API endpoints
2. Import sample data
3. Connect your Next.js frontend
4. Deploy to PythonAnywhere when ready

Your local backend is now ready for development! 🚀
