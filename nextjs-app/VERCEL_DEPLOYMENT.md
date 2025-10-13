# Vercel Deployment Guide for NEPSE Data Platform

This guide will help you deploy the NEPSE data platform to Vercel and configure it properly.

## 🚀 Quick Deployment (Without Supabase)

If you want to see the app working immediately with sample data:

1. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel --prod
   ```

2. **The app will work with sample data** - no additional configuration needed!

## 🔧 Full Setup with Supabase

### Step 1: Set up Supabase Database

1. **Create Supabase Project**:
   - Go to [supabase.com](https://supabase.com)
   - Create a new project
   - Note down your project URL and API keys

2. **Create Database Tables**:
   Run this SQL in your Supabase SQL Editor:

   ```sql
   -- Create NEPSE Index table
   CREATE TABLE nepse_index (
     id SERIAL PRIMARY KEY,
     date DATE NOT NULL,
     open DECIMAL(10,2) NOT NULL,
     high DECIMAL(10,2) NOT NULL,
     low DECIMAL(10,2) NOT NULL,
     close DECIMAL(10,2) NOT NULL,
     volume BIGINT NOT NULL,
     turnover BIGINT NOT NULL,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Create NEPSE Stocks table
   CREATE TABLE nepse_stocks (
     id SERIAL PRIMARY KEY,
     symbol VARCHAR(10) NOT NULL,
     company_name VARCHAR(255) NOT NULL,
     sector VARCHAR(100) NOT NULL,
     current_price DECIMAL(10,2) NOT NULL,
     change DECIMAL(10,2) NOT NULL,
     change_percent DECIMAL(5,2) NOT NULL,
     volume BIGINT NOT NULL,
     turnover BIGINT NOT NULL,
     high_52w DECIMAL(10,2) NOT NULL,
     low_52w DECIMAL(10,2) NOT NULL,
     market_cap VARCHAR(20) NOT NULL,
     pe_ratio DECIMAL(5,2) NOT NULL,
     last_trade_time TIMESTAMP NOT NULL,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Create NEPSE Indices table
   CREATE TABLE nepse_indices (
     id SERIAL PRIMARY KEY,
     name VARCHAR(100) NOT NULL,
     symbol VARCHAR(20) NOT NULL,
     current DECIMAL(10,2) NOT NULL,
     change DECIMAL(10,2) NOT NULL,
     change_percent DECIMAL(5,2) NOT NULL,
     high_52w DECIMAL(10,2) NOT NULL,
     low_52w DECIMAL(10,2) NOT NULL,
     date DATE NOT NULL,
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- Create indexes for better performance
   CREATE INDEX idx_nepse_index_date ON nepse_index(date);
   CREATE INDEX idx_nepse_stocks_symbol ON nepse_stocks(symbol);
   CREATE INDEX idx_nepse_stocks_volume ON nepse_stocks(volume);
   CREATE INDEX idx_nepse_indices_date ON nepse_indices(date);
   ```

### Step 2: Configure Vercel Environment Variables

1. **Go to your Vercel Dashboard**:
   - Navigate to your project
   - Go to Settings → Environment Variables

2. **Add these environment variables**:

   ```env
   # Supabase Configuration
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here
   
   # App Configuration
   NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
   CRON_SECRET=your_random_secret_key
   ```

3. **Redeploy** after adding environment variables:
   ```bash
   vercel --prod
   ```

### Step 3: Import Sample Data

1. **Use the API to import sample data**:
   ```bash
   # Test the debug endpoint
   curl https://your-app.vercel.app/api/debug
   
   # Import sample data
   curl -X GET "https://your-app.vercel.app/api/nepse/fetch?type=all&store=true"
   ```

2. **Or use the import script locally**:
   ```bash
   # Set up environment variables locally
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase credentials
   
   # Run import
   npm run import-nepse
   ```

## 🔍 Troubleshooting

### Check if Supabase is configured:
Visit: `https://your-app.vercel.app/api/debug`

You should see:
```json
{
  "supabase": {
    "url": "✅ Set",
    "anonKey": "✅ Set", 
    "serviceKey": "✅ Set"
  }
}
```

### Common Issues:

1. **"Supabase not configured" message**:
   - Check environment variables in Vercel dashboard
   - Make sure you've redeployed after adding env vars

2. **Database connection errors**:
   - Verify Supabase URL and keys are correct
   - Check if tables exist in Supabase dashboard

3. **No data showing**:
   - Import sample data using the API
   - Check browser console for errors
   - Verify API endpoints are working

### Debug Steps:

1. **Test API endpoints**:
   ```bash
   # Test overview
   curl https://your-app.vercel.app/api/nepse?type=overview
   
   # Test debug
   curl https://your-app.vercel.app/api/debug
   ```

2. **Check Vercel logs**:
   - Go to Vercel dashboard → Functions → View Function Logs

3. **Check Supabase logs**:
   - Go to Supabase dashboard → Logs

## 🚀 Production Optimization

### Enable GitHub Actions for automated data sync:

1. **Set up GitHub Secrets**:
   - Go to your GitHub repository
   - Settings → Secrets and variables → Actions
   - Add the same environment variables

2. **Enable GitHub Actions**:
   - The workflow is already configured
   - It will run automatically on schedule

### Set up custom domain:
1. Go to Vercel dashboard → Domains
2. Add your custom domain
3. Update `NEXT_PUBLIC_APP_URL` environment variable

## 📊 Monitoring

### Check data sync status:
- Visit: `https://your-app.vercel.app/api/nepse/sync?type=all`
- Check Vercel function logs for sync status

### Monitor API health:
- Visit: `https://your-app.vercel.app/api/debug`
- Check all environment variables are set

## 🎯 Next Steps

1. **Set up real NEPSE data sources**:
   - Configure external API endpoints
   - Set up automated data fetching

2. **Optimize performance**:
   - Enable caching
   - Set up CDN

3. **Add monitoring**:
   - Set up alerts for data sync failures
   - Monitor API performance

---

**Need help?** Check the main README.md or create an issue in the GitHub repository.
