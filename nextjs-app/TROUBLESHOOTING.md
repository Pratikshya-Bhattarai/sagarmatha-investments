# 🔧 NEPSE Data Troubleshooting Guide

## 🚨 Issue: NEPSE Live Data Not Showing

### ✅ **Quick Fix - Test Pages Available:**

1. **Test Page**: Visit `/nepse-test` to see raw data
2. **Simple Page**: Visit `/nepse-simple` to see working charts
3. **Live Page**: Visit `/nepse-live` for full functionality

### 🔍 **Common Issues & Solutions:**

#### 1. **Data Not Loading**
**Symptoms**: Loading spinner never stops, blank page
**Solutions**:
- Check browser console for errors
- Visit `/nepse-test` to see if API is working
- Verify the API endpoint is responding

#### 2. **Charts Not Rendering**
**Symptoms**: Data loads but charts don't appear
**Solutions**:
- Check if Chart.js is properly imported
- Visit `/nepse-simple` for a working chart example
- Check browser console for Chart.js errors

#### 3. **API Errors**
**Symptoms**: Error messages, 500 status codes
**Solutions**:
- Check `/api/nepse` endpoint directly
- Verify fallback data is working
- Check server logs

### 🛠️ **Step-by-Step Debugging:**

#### Step 1: Test API Endpoint
```bash
# Test the API directly
curl http://localhost:3000/api/nepse
```

#### Step 2: Check Browser Console
1. Open Developer Tools (F12)
2. Go to Console tab
3. Look for error messages
4. Check Network tab for failed requests

#### Step 3: Test Individual Components
1. Visit `/nepse-test` - Should show raw data
2. Visit `/nepse-simple` - Should show charts
3. Visit `/nepse-live` - Should show full functionality

### 📊 **Data Sources:**

#### Current Implementation:
- **Primary**: Django backend (when running)
- **Fallback**: Sample data from `nepse-data.ts`
- **Test**: Direct API calls

#### Data Structure:
```typescript
{
  indices: NEPSEIndicesData[],
  stocks: NEPSEStockData[],
  historical: NEPSEIndexData[],
  last_updated: string,
  source: string,
  message: string
}
```

### 🔧 **Development Setup:**

#### 1. **Start Development Server**
```bash
npm run dev
```

#### 2. **Test Pages**
- `/nepse-test` - Raw data display
- `/nepse-simple` - Simple charts
- `/nepse-live` - Full functionality

#### 3. **API Testing**
- `/api/nepse` - Main API endpoint
- Check browser Network tab for requests

### 🚀 **Production Deployment:**

#### 1. **Vercel Deployment**
```bash
# Deploy to Vercel
vercel --prod
```

#### 2. **Environment Variables**
```env
NEXT_PUBLIC_API_URL=https://your-django-backend.com/api/v1
```

#### 3. **Django Backend**
- Deploy Django backend to PythonAnywhere
- Update API URL in frontend
- Test with live data

### 📈 **Performance Issues:**

#### 1. **Slow Loading**
- Check network requests
- Verify API response times
- Check for large data payloads

#### 2. **Chart Rendering Issues**
- Check Chart.js version compatibility
- Verify data format for charts
- Check for missing dependencies

### 🔍 **Debugging Tools:**

#### 1. **Browser DevTools**
- Console for errors
- Network tab for API calls
- Elements tab for DOM issues

#### 2. **API Testing**
```bash
# Test API endpoint
curl -X GET http://localhost:3000/api/nepse

# Test with verbose output
curl -v http://localhost:3000/api/nepse
```

#### 3. **Component Testing**
- Use React DevTools
- Check component state
- Verify props passing

### 🆘 **Still Having Issues?**

#### 1. **Check Logs**
```bash
# Check Next.js logs
npm run dev

# Check browser console
# Check Network tab
```

#### 2. **Verify Dependencies**
```bash
# Reinstall dependencies
npm install

# Check for version conflicts
npm ls
```

#### 3. **Reset and Restart**
```bash
# Clear cache
rm -rf .next
npm run dev
```

### 📞 **Support Resources:**

- **GitHub Repository**: https://github.com/Pratikshya-Bhattarai/sagarmatha-investments
- **Next.js Docs**: https://nextjs.org/docs
- **Chart.js Docs**: https://www.chartjs.org/docs
- **React Docs**: https://react.dev

### ✅ **Working Examples:**

1. **Simple Data Display**: `/nepse-simple`
2. **Test Page**: `/nepse-test`
3. **Full Implementation**: `/nepse-live`

Your NEPSE data should now be working! If you're still having issues, check the test pages first to isolate the problem. 🎊
