# 🚀 Complete PythonAnywhere Deployment Guide

## Step-by-Step Django Backend Deployment

### 📋 **Prerequisites**
- GitHub account with your repository
- PythonAnywhere account (free tier available)
- Your Django backend code in GitHub

---

## 🌐 **Step 1: Create PythonAnywhere Account**

1. **Go to [PythonAnywhere.com](https://www.pythonanywhere.com)**
2. **Sign up for a free account**
3. **Verify your email address**
4. **Complete the registration process**

---

## 📥 **Step 2: Clone Your Repository**

1. **Open PythonAnywhere Console**
   - Go to your PythonAnywhere dashboard
   - Click on **"Consoles"** tab
   - Click **"Bash"** to open a new console

2. **Clone your repository**
   ```bash
   git clone https://github.com/Pratikshya-Bhattarai/sagarmatha-investments.git
   cd sagarmatha-investments/nextjs-app/django-backend
   ```

3. **Verify the files are there**
   ```bash
   ls -la
   # You should see: manage.py, requirements.txt, sagarmatha_backend/, etc.
   ```

---

## 🐍 **Step 3: Setup Python Environment**

1. **Create virtual environment**
   ```bash
   python3.10 -m venv venv
   source venv/bin/activate
   ```

2. **Install dependencies**
   ```bash
   pip install -r requirements-pythonanywhere.txt
   ```

3. **Run setup script**
   ```bash
   python setup_pythonanywhere.py
   ```

4. **Create superuser (optional)**
   ```bash
   python manage.py createsuperuser
   ```

---

## 🌐 **Step 4: Create Web App**

1. **Go to Web tab** in PythonAnywhere dashboard
2. **Click "Add a new web app"**
3. **Choose "Manual configuration"**
4. **Select Python 3.10**

### 📁 **Configure Paths:**

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

---

## ⚙️ **Step 5: Configure Static Files**

1. **Go to Static files section**
2. **Add static file mapping:**
   - **URL**: `/static/`
   - **Directory**: `/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend/staticfiles`

---

## 🔧 **Step 6: Set Environment Variables**

1. **Go to Environment variables section**
2. **Add these variables:**

```
SECRET_KEY=your-secret-key-here-make-it-long-and-random
DEBUG=False
KAGGLE_USERNAME=your-kaggle-username
KAGGLE_KEY=your-kaggle-api-key
```

**Generate a secret key:**
```python
# Run this in Python console
import secrets
print(secrets.token_urlsafe(50))
```

---

## 🔄 **Step 7: Reload Web App**

1. **Click "Reload" button** in the Web tab
2. **Wait for the reload to complete**
3. **Check for any errors in the logs**

---

## 🧪 **Step 8: Test Your Deployment**

### **Test API Endpoints:**

1. **Visit your web app URL:**
   ```
   https://pratikshya-bhattarai.pythonanywhere.com
   ```

2. **Test API endpoints:**
   ```
   https://pratikshya-bhattarai.pythonanywhere.com/api/v1/overview/overview/
   https://pratikshya-bhattarai.pythonanywhere.com/api/v1/index/latest/
   https://pratikshya-bhattarai.pythonanywhere.com/admin/
   ```

3. **Check for errors:**
   - Go to **Files** tab → `logs/django.log`
   - Look for any error messages

---

## 🔗 **Step 9: Update Frontend**

### **Update Environment Variables:**

1. **In your Next.js project**, create/update `.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=https://pratikshya-bhattarai.pythonanywhere.com/api/v1
   ```

2. **Redeploy your frontend** (Vercel/Netlify)

---

## 🛠️ **Troubleshooting Common Issues**

### **Issue 1: Import Errors**
**Error**: `ModuleNotFoundError: No module named 'django'`

**Solution**:
```bash
# Make sure virtual environment is activated
source venv/bin/activate
pip install -r requirements-pythonanywhere.txt
```

### **Issue 2: Static Files Not Loading**
**Error**: CSS/JS files return 404

**Solution**:
```bash
# Collect static files
python manage.py collectstatic --noinput
```

### **Issue 3: Database Errors**
**Error**: Database connection issues

**Solution**:
```bash
# Run migrations
python manage.py migrate
```

### **Issue 4: CORS Errors**
**Error**: CORS policy blocks requests

**Solution**: Check CORS settings in `settings_pythonanywhere.py`

---

## 📊 **Step 10: Load Sample Data**

### **Load NEPSE Data:**

1. **Open PythonAnywhere Console**
2. **Navigate to your project**:
   ```bash
   cd /home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend
   source venv/bin/activate
   ```

3. **Load sample data**:
   ```bash
   python manage.py update_nepse_data --type all --source live
   ```

4. **Verify data is loaded**:
   ```bash
   python manage.py shell
   >>> from nepse.models import NEPSEIndex, NEPSEStock
   >>> print(NEPSEIndex.objects.count())
   >>> print(NEPSEStock.objects.count())
   ```

---

## 🔄 **Step 11: Set Up Auto-Refresh (Optional)**

### **For Paid Plans Only:**

1. **Go to Tasks tab**
2. **Add a new task:**
   - **Command**: `cd /home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend && source venv/bin/activate && python manage.py update_nepse_data --type all --source live`
   - **Schedule**: Every 5 minutes

---

## ✅ **Step 12: Verify Everything Works**

### **Test Checklist:**

- [ ] Web app loads without errors
- [ ] API endpoints return data
- [ ] Admin interface works
- [ ] Static files load properly
- [ ] CORS allows frontend requests
- [ ] Sample data is loaded

### **Test Commands:**

```bash
# Test API endpoint
curl https://pratikshya-bhattarai.pythonanywhere.com/api/v1/overview/overview/

# Test admin
curl https://pratikshya-bhattarai.pythonanywhere.com/admin/
```

---

## 🎉 **Success! Your Backend is Live**

### **Your API Endpoints:**
- **Base URL**: `https://pratikshya-bhattarai.pythonanywhere.com`
- **API Root**: `https://pratikshya-bhattarai.pythonanywhere.com/api/v1/`
- **Admin**: `https://pratikshya-bhattarai.pythonanywhere.com/admin/`

### **Available Endpoints:**
- `GET /api/v1/overview/overview/` - Market overview
- `GET /api/v1/index/latest/` - Latest NEPSE index
- `GET /api/v1/stocks/top_gainers/` - Top gaining stocks
- `GET /api/v1/stocks/top_losers/` - Top losing stocks
- `GET /api/v1/overview/chart_data/` - Chart data

---

## 📞 **Need Help?**

### **Common Resources:**
- **PythonAnywhere Help**: https://help.pythonanywhere.com/
- **Django Docs**: https://docs.djangoproject.com/
- **Your Repository**: https://github.com/Pratikshya-Bhattarai/sagarmatha-investments

### **Debug Commands:**
```bash
# Check logs
tail -f logs/django.log

# Check database
python manage.py shell

# Test API
curl -v https://pratikshya-bhattarai.pythonanywhere.com/api/v1/overview/overview/
```

Your Django backend with live NEPSE data is now running on PythonAnywhere! 🎊
