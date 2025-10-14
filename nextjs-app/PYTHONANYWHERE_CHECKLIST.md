# ✅ PythonAnywhere Deployment Checklist

## 🚀 **Quick Deployment Steps**

### **1. Create PythonAnywhere Account**
- [ ] Go to [PythonAnywhere.com](https://www.pythonanywhere.com)
- [ ] Sign up for free account
- [ ] Verify email address

### **2. Clone Repository**
```bash
git clone https://github.com/Pratikshya-Bhattarai/sagarmatha-investments.git
cd sagarmatha-investments/nextjs-app/django-backend
```

### **3. Setup Environment**
```bash
python3.10 -m venv venv
source venv/bin/activate
pip install -r requirements-pythonanywhere.txt
python setup_pythonanywhere.py
```

### **4. Create Web App**
- [ ] Go to **Web** tab
- [ ] Click **"Add a new web app"**
- [ ] Choose **"Manual configuration"**
- [ ] Select **Python 3.10**

### **5. Configure Paths**
- [ ] **Source code**: `/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend`
- [ ] **Working directory**: `/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend`
- [ ] **WSGI file**: `/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend/wsgi.py`

### **6. Static Files**
- [ ] **URL**: `/static/`
- [ ] **Directory**: `/home/pratikshya-bhattarai/sagarmatha-investments/nextjs-app/django-backend/staticfiles`

### **7. Environment Variables**
```
SECRET_KEY=your-secret-key-here
DEBUG=False
KAGGLE_USERNAME=your-kaggle-username
KAGGLE_KEY=your-kaggle-api-key
```

### **8. Reload & Test**
- [ ] Click **"Reload"** button
- [ ] Test: `https://pratikshya-bhattarai.pythonanywhere.com/api/v1/overview/overview/`
- [ ] Test: `https://pratikshya-bhattarai.pythonanywhere.com/admin/`

### **9. Load Sample Data**
```bash
python manage.py update_nepse_data --type all --source live
```

### **10. Update Frontend**
```env
NEXT_PUBLIC_API_URL=https://pratikshya-bhattarai.pythonanywhere.com/api/v1
```

## 🎉 **Your Backend is Live!**

**API URL**: `https://pratikshya-bhattarai.pythonanywhere.com/api/v1/`

**Test Endpoints**:
- Overview: `/api/v1/overview/overview/`
- Latest Index: `/api/v1/index/latest/`
- Top Gainers: `/api/v1/stocks/top_gainers/`
- Chart Data: `/api/v1/overview/chart_data/`
