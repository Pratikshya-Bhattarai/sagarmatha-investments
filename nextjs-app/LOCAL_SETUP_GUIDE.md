# 🚀 Local Development Setup Guide

## Complete Local Setup for NEPSE Live Data with Charts and Backend

### 📋 **Prerequisites**
- Node.js 18+ installed
- Python 3.10+ installed
- Git installed
- Your repository cloned

---

## 🎯 **Quick Start (5 Minutes)**

### **Step 1: Clone and Setup Frontend**
```bash
# Navigate to your project
cd sagarmatha-investments/nextjs-app

# Install dependencies
npm install

# Start the frontend
npm run dev
```

### **Step 2: Setup Django Backend**
```bash
# Open new terminal
cd sagarmatha-investments/nextjs-app/django-backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# Windows:
venv\Scripts\activate
# Mac/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Load sample data
python manage.py update_nepse_data --type all --source live

# Start Django server
python manage.py runserver
```

### **Step 3: Test Everything**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/v1/
- **Django Admin**: http://localhost:8000/admin/

---

## 🔧 **Detailed Setup Instructions**

### **Frontend Setup (Next.js)**

#### **1. Install Dependencies**
```bash
cd nextjs-app
npm install
```

#### **2. Create Environment File**
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
```

#### **3. Start Development Server**
```bash
npm run dev
```

#### **4. Test Frontend**
- Visit: http://localhost:3000
- Check charts: http://localhost:3000/charts
- Test data: http://localhost:3000/nepse-test

---

### **Backend Setup (Django)**

#### **1. Navigate to Django Directory**
```bash
cd nextjs-app/django-backend
```

#### **2. Create Virtual Environment**
```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

#### **3. Install Dependencies**
```bash
pip install -r requirements.txt
```

#### **4. Setup Database**
```bash
python manage.py makemigrations
python manage.py migrate
```

#### **5. Create Superuser (Optional)**
```bash
python manage.py createsuperuser
```

#### **6. Load Sample Data**
```bash
python manage.py update_nepse_data --type all --source live
```

#### **7. Start Django Server**
```bash
python manage.py runserver
```

---

## 🔗 **Connect Frontend to Backend**

### **Update Environment Variables**
In `nextjs-app/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1
```

### **Test API Connection**
```bash
# Test API endpoint
curl http://localhost:8000/api/v1/overview/overview/

# Test specific endpoints
curl http://localhost:8000/api/v1/index/latest/
curl http://localhost:8000/api/v1/stocks/top_gainers/
```

---

## 📊 **Available Endpoints**

### **Django Backend API:**
- `GET /api/v1/overview/overview/` - Market overview
- `GET /api/v1/index/latest/` - Latest NEPSE index
- `GET /api/v1/stocks/top_gainers/` - Top gaining stocks
- `GET /api/v1/stocks/top_losers/` - Top losing stocks
- `GET /api/v1/stocks/most_active/` - Most active stocks
- `GET /api/v1/overview/chart_data/` - Chart data
- `GET /admin/` - Django admin interface

### **Next.js Frontend:**
- `http://localhost:3000` - Homepage with market overview
- `http://localhost:3000/charts` - Full analytics page
- `http://localhost:3000/nepse-simple` - Simple charts
- `http://localhost:3000/nepse-test` - Data testing page

---

## 🛠️ **Troubleshooting**

### **Common Issues:**

#### **1. Port Already in Use**
```bash
# If port 3000 is busy
npm run dev -- -p 3001

# If port 8000 is busy
python manage.py runserver 8001
```

#### **2. Python Virtual Environment Issues**
```bash
# Deactivate and recreate
deactivate
rm -rf venv
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
```

#### **3. Database Issues**
```bash
# Reset database
rm db.sqlite3
python manage.py migrate
python manage.py update_nepse_data --type all --source live
```

#### **4. CORS Issues**
Check `django-backend/sagarmatha_backend/settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
```

#### **5. API Connection Issues**
```bash
# Test if Django is running
curl http://localhost:8000/api/v1/overview/overview/

# Check Django logs
python manage.py runserver --verbosity=2
```

---

## 🚀 **Development Workflow**

### **Start Both Servers:**
```bash
# Terminal 1: Frontend
cd nextjs-app
npm run dev

# Terminal 2: Backend
cd nextjs-app/django-backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python manage.py runserver
```

### **Test Everything:**
1. **Frontend**: http://localhost:3000
2. **Charts**: http://localhost:3000/charts
3. **API**: http://localhost:8000/api/v1/overview/overview/
4. **Admin**: http://localhost:8000/admin/

---

## 📈 **Features Available Locally**

### **Frontend Features:**
- ✅ **Interactive Charts** with Chart.js
- ✅ **Real-time Data** from Django backend
- ✅ **Market Overview** on homepage
- ✅ **Responsive Design** for all devices
- ✅ **Auto-refresh** every 5 minutes

### **Backend Features:**
- ✅ **REST API** with Django REST Framework
- ✅ **Sample NEPSE Data** loaded automatically
- ✅ **Admin Interface** for data management
- ✅ **CORS Configuration** for frontend
- ✅ **Database** with SQLite

### **Chart Types:**
- ✅ **Line Charts** - Historical price trends
- ✅ **Bar Charts** - Trading volume
- ✅ **Doughnut Charts** - Sector distribution
- ✅ **Interactive Tables** - Stock data

---

## 🎉 **Success Checklist**

- [ ] Frontend running on http://localhost:3000
- [ ] Backend running on http://localhost:8000
- [ ] Charts displaying on homepage
- [ ] API endpoints returning data
- [ ] Admin interface accessible
- [ ] Auto-refresh working
- [ ] Mobile responsive design

Your complete NEPSE application with live data, charts, and backend is now running locally! 🚀
