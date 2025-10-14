# 🚀 Quick Start: Deploy Django Backend to PythonAnywhere

## Step-by-Step Deployment Guide

### 1. 🌐 Create PythonAnywhere Account
- Go to [PythonAnywhere.com](https://www.pythonanywhere.com)
- Sign up for a **free account**
- Verify your email

### 2. 📥 Clone Your Repository
In PythonAnywhere console:
```bash
git clone https://github.com/Pratikshya-Bhattarai/sagarmatha-investments.git
cd sagarmatha-investments/nextjs-app/django-backend
```

### 3. 🐍 Setup Python Environment
```bash
# Create virtual environment
python3.10 -m venv venv
source venv/bin/activate

# Install dependencies
pip install -r requirements-pythonanywhere.txt
```

### 4. ⚙️ Configure Django
```bash
# Run setup script
python setup_pythonanywhere.py

# Or manually:
python manage.py makemigrations
python manage.py migrate
python manage.py collectstatic --noinput
python manage.py update_nepse_data --type all --source live
```

### 5. 🌐 Create Web App
1. Go to **Web** tab in PythonAnywhere dashboard
2. Click **"Add a new web app"**
3. Choose **"Manual configuration"**
4. Select **Python 3.10**

### 6. 📁 Configure Paths
Set these paths in your web app configuration:

**Source code**: 
```
/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend
```

**Working directory**: 
```
/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend
```

**WSGI file**: 
```
/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend/wsgi.py
```

### 7. 📂 Static Files
In **Static files** section:
- **URL**: `/static/`
- **Directory**: `/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend/staticfiles`

### 8. 🔧 Environment Variables
Add these environment variables:
```
SECRET_KEY=your-secret-key-here
DEBUG=False
KAGGLE_USERNAME=your-kaggle-username
KAGGLE_KEY=your-kaggle-api-key
```

### 9. 🔄 Reload Web App
Click **"Reload"** button to apply changes.

## 🎉 Your API is Live!

**Your Django backend will be available at:**
- **API Root**: `https://pratikshya-bhattarai.pythonanywhere.com/api/v1/`
- **Admin**: `https://pratikshya-bhattarai.pythonanywhere.com/admin/`

### 📊 Available Endpoints:
- `GET /api/v1/overview/overview/` - Market overview
- `GET /api/v1/index/latest/` - Latest NEPSE index
- `GET /api/v1/stocks/top_gainers/` - Top gaining stocks
- `GET /api/v1/stocks/top_losers/` - Top losing stocks
- `GET /api/v1/overview/chart_data/` - Chart data

## 🔗 Update Frontend

Update your Next.js environment variables:
```env
NEXT_PUBLIC_API_URL=https://pratikshya-bhattarai.pythonanywhere.com/api/v1
```

## 🛠️ Troubleshooting

### If you get errors:
1. **Check logs**: Go to **Files** tab → `logs/django.log`
2. **Verify paths**: Make sure all paths are correct
3. **Check environment**: Ensure all environment variables are set
4. **Reload**: Try reloading the web app

### Common fixes:
```bash
# If static files don't work:
python manage.py collectstatic --noinput

# If database errors:
python manage.py migrate

# If import errors:
# Check that your paths are correct in wsgi.py
```

## 📈 Next Steps

1. **Deploy Frontend**: Deploy your Next.js app to Vercel
2. **Update API URL**: Point your frontend to the PythonAnywhere backend
3. **Monitor**: Check logs regularly for any issues
4. **Scale**: Upgrade to paid plan for better performance

Your Django backend with live NEPSE data is now running on PythonAnywhere! 🎊
