# 🚀 Complete Deployment Checklist

## ✅ **Backend Deployment Steps**

### **Step 1: Choose Platform**
- [ ] **PythonAnywhere** (Recommended for Django)
- [ ] **Railway** (Modern & Easy)
- [ ] **Heroku** (Popular)
- [ ] **Vercel** (Serverless)

### **Step 2: Deploy Backend**

#### **For PythonAnywhere:**
- [ ] Create account at [pythonanywhere.com](https://pythonanywhere.com)
- [ ] Clone repository: `git clone https://github.com/Pratikshya-Bhattarai/sagarmatha-backend.git`
- [ ] Set up virtual environment: `python3.10 -m venv venv`
- [ ] Install dependencies: `pip install -r requirements.txt`
- [ ] Create `.env` file with configuration
- [ ] Run migrations: `python manage.py migrate`
- [ ] Load sample data: `python manage.py update_nepse_data --type all --source sample`
- [ ] Configure web app in PythonAnywhere dashboard
- [ ] Set WSGI file path
- [ ] Reload web app
- [ ] Test backend URL: `https://yourusername.pythonanywhere.com/api/v1/overview/overview/`

#### **For Railway:**
- [ ] Go to [railway.app](https://railway.app)
- [ ] Connect GitHub repository
- [ ] Set environment variables
- [ ] Deploy automatically
- [ ] Test backend URL

#### **For Heroku:**
- [ ] Install Heroku CLI
- [ ] Create app: `heroku create sagarmatha-backend`
- [ ] Set environment variables
- [ ] Deploy: `git push heroku main`
- [ ] Run migrations: `heroku run python manage.py migrate`
- [ ] Test backend URL

### **Step 3: Update Frontend**

#### **Environment Configuration:**
- [ ] Update `.env.local` with backend URL:
  ```env
  NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1
  ```

#### **Test Backend Connection:**
- [ ] Run test script: `node test-backend.js`
- [ ] Verify API endpoints work
- [ ] Check data flow

#### **Deploy Frontend:**
- [ ] Commit changes: `git add . && git commit -m "Update API URL"`
- [ ] Push to GitHub: `git push origin main`
- [ ] Deploy to Vercel (automatic)

### **Step 4: Verify Integration**

#### **Test API Endpoints:**
- [ ] Market Overview: `/api/v1/overview/overview/`
- [ ] NEPSE Index: `/api/v1/index/`
- [ ] Stock Data: `/api/v1/stocks/`
- [ ] Chart Data: `/api/v1/overview/chart_data/`

#### **Test Frontend:**
- [ ] Visit your frontend URL
- [ ] Check if charts load
- [ ] Verify data displays correctly
- [ ] Test all pages

#### **Monitor Performance:**
- [ ] Check backend logs
- [ ] Monitor API response times
- [ ] Verify data updates
- [ ] Test error handling

---

## 🔧 **Environment Variables**

### **Backend (.env):**
```env
SECRET_KEY=your-secret-key-here
DEBUG=False
ALLOWED_HOSTS=your-domain.com
DATABASE_URL=sqlite:///db.sqlite3
CORS_ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### **Frontend (.env.local):**
```env
NEXT_PUBLIC_API_URL=https://your-backend-domain.com/api/v1
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-key
```

---

## 🧪 **Testing Checklist**

### **Backend Tests:**
- [ ] API responds to requests
- [ ] Data loads correctly
- [ ] CORS headers set properly
- [ ] Error handling works
- [ ] Database queries work

### **Frontend Tests:**
- [ ] Charts render with real data
- [ ] API calls succeed
- [ ] Error states handled
- [ ] Loading states work
- [ ] Responsive design

### **Integration Tests:**
- [ ] Data flows from backend to frontend
- [ ] Charts update with real data
- [ ] All pages work correctly
- [ ] Performance is acceptable

---

## 🚨 **Troubleshooting**

### **Common Issues:**

#### **Backend Not Responding:**
- Check if backend is running
- Verify environment variables
- Check logs for errors
- Test API endpoints directly

#### **CORS Errors:**
- Update CORS_ALLOWED_ORIGINS
- Check frontend domain
- Verify headers

#### **Data Not Loading:**
- Check database connection
- Verify data exists
- Test API endpoints
- Check network requests

#### **Charts Not Rendering:**
- Check if data is available
- Verify chart configuration
- Test with sample data
- Check browser console

---

## 📞 **Support Resources**

### **Documentation:**
- [Backend README](https://github.com/Pratikshya-Bhattarai/sagarmatha-backend)
- [Frontend README](https://github.com/Pratikshya-Bhattarai/sagarmatha-investments)
- [Deployment Guides](https://github.com/Pratikshya-Bhattarai/sagarmatha-backend/blob/main/DEPLOYMENT.md)

### **Platform Support:**
- **PythonAnywhere**: [Help Center](https://help.pythonanywhere.com/)
- **Railway**: [Documentation](https://docs.railway.app/)
- **Heroku**: [Dev Center](https://devcenter.heroku.com/)
- **Vercel**: [Documentation](https://vercel.com/docs)

---

## 🎉 **Success Criteria**

### **Backend Working:**
- ✅ API endpoints respond
- ✅ Data loads correctly
- ✅ CORS configured
- ✅ Error handling works

### **Frontend Working:**
- ✅ Charts display real data
- ✅ All pages load
- ✅ API integration works
- ✅ Performance is good

### **Complete Integration:**
- ✅ Data flows from backend to frontend
- ✅ Charts update with real NEPSE data
- ✅ All features working
- ✅ Ready for production

**Your NEPSE application is now fully deployed and integrated!** 🚀
