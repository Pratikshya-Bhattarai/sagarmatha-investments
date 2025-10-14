# 🗄️ Complete Supabase Setup Guide

## Setting Up Supabase for NEPSE Data Storage

### 📋 **Prerequisites**
- Supabase account (free tier available)
- Your project repository
- Environment variables configured

---

## 🚀 **Step 1: Create Supabase Project**

### **1.1 Sign Up for Supabase**
1. Go to [supabase.com](https://supabase.com)
2. Click "Start your project"
3. Sign up with GitHub/Google/Email
4. Verify your email

### **1.2 Create New Project**
1. Click "New Project"
2. **Organization**: Create new or use existing
3. **Project Name**: `sagarmatha-nepse`
4. **Database Password**: Generate strong password
5. **Region**: Choose closest to your users
6. Click "Create new project"

---

## 🗄️ **Step 2: Database Schema Setup**

### **2.1 Access SQL Editor**
1. Go to your Supabase dashboard
2. Click "SQL Editor" in left sidebar
3. Click "New query"

### **2.2 Create NEPSE Tables**
Run this SQL to create all necessary tables:

```sql
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- NEPSE Index table
CREATE TABLE nepse_index (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    open_price DECIMAL(10,2) NOT NULL,
    high_price DECIMAL(10,2) NOT NULL,
    low_price DECIMAL(10,2) NOT NULL,
    close_price DECIMAL(10,2) NOT NULL,
    volume BIGINT NOT NULL,
    turnover BIGINT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(date)
);

-- NEPSE Stocks table
CREATE TABLE nepse_stocks (
    id SERIAL PRIMARY KEY,
    symbol VARCHAR(10) UNIQUE NOT NULL,
    company_name VARCHAR(200) NOT NULL,
    sector VARCHAR(100) NOT NULL,
    current_price DECIMAL(10,2) NOT NULL,
    change DECIMAL(10,2) NOT NULL,
    change_percent DECIMAL(5,2) NOT NULL,
    volume BIGINT NOT NULL,
    turnover BIGINT NOT NULL,
    high_52w DECIMAL(10,2) NOT NULL,
    low_52w DECIMAL(10,2) NOT NULL,
    market_cap VARCHAR(20) NOT NULL,
    pe_ratio DECIMAL(5,2),
    last_trade_time TIMESTAMP WITH TIME ZONE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- NEPSE Indices table
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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(name, date)
);

-- Data update logs table
CREATE TABLE data_update_logs (
    id SERIAL PRIMARY KEY,
    update_type VARCHAR(50) NOT NULL,
    status VARCHAR(20) NOT NULL,
    records_updated INTEGER DEFAULT 0,
    error_message TEXT,
    started_at TIMESTAMP WITH TIME ZONE NOT NULL,
    completed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_nepse_index_date ON nepse_index(date DESC);
CREATE INDEX idx_nepse_stocks_symbol ON nepse_stocks(symbol);
CREATE INDEX idx_nepse_stocks_sector ON nepse_stocks(sector);
CREATE INDEX idx_nepse_indices_date ON nepse_indices(date DESC);
CREATE INDEX idx_data_logs_created ON data_update_logs(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE nepse_index ENABLE ROW LEVEL SECURITY;
ALTER TABLE nepse_stocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE nepse_indices ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_update_logs ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Allow public read access" ON nepse_index FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON nepse_stocks FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON nepse_indices FOR SELECT USING (true);
CREATE POLICY "Allow public read access" ON data_update_logs FOR SELECT USING (true);
```

---

## 🔧 **Step 3: Configure Environment Variables**

### **3.1 Get Supabase Credentials**
1. Go to your Supabase project dashboard
2. Click "Settings" → "API"
3. Copy the following:
   - **Project URL**
   - **Anon/Public Key**
   - **Service Role Key** (for server-side operations)

### **3.2 Update Environment Variables**
Create/update `.env.local`:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api/v1

# Optional: Kaggle API for data import
KAGGLE_USERNAME=your_kaggle_username
KAGGLE_KEY=your_kaggle_api_key
```

---

## 📊 **Step 4: Update Frontend for Supabase**

### **4.1 Update API Routes**
The existing API routes will automatically use Supabase when configured.

### **4.2 Test Supabase Connection**
```bash
# Test the connection
curl http://localhost:3000/api/nepse
```

---

## 🗃️ **Step 5: Data Migration**

### **5.1 Import Sample Data**
Create a script to populate Supabase with sample data:

```javascript
// scripts/import-sample-data.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function importSampleData() {
  // Import NEPSE index data
  const indexData = [
    {
      date: '2024-01-15',
      open_price: 2800.50,
      high_price: 2850.75,
      low_price: 2795.25,
      close_price: 2847.23,
      volume: 1500000,
      turnover: 4250000000
    }
    // Add more sample data...
  ];

  const { data, error } = await supabase
    .from('nepse_index')
    .insert(indexData);

  if (error) {
    console.error('Error importing data:', error);
  } else {
    console.log('Data imported successfully');
  }
}

importSampleData();
```

### **5.2 Run Data Import**
```bash
node scripts/import-sample-data.js
```

---

## 🔄 **Step 6: Real-time Data Updates**

### **6.1 Set Up Data Sync**
Create a script to sync data from external sources:

```javascript
// scripts/sync-nepse-data.js
const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function syncNEPSEData() {
  try {
    // Fetch data from external API or Kaggle
    const response = await fetch('https://api.nepse.com/data');
    const data = await response.json();

    // Update Supabase
    const { error } = await supabase
      .from('nepse_index')
      .upsert(data.index, { onConflict: 'date' });

    if (error) {
      console.error('Sync error:', error);
    } else {
      console.log('Data synced successfully');
    }
  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Run every 5 minutes
setInterval(syncNEPSEData, 5 * 60 * 1000);
```

---

## 🧪 **Step 7: Testing**

### **7.1 Test Database Connection**
```bash
# Test API endpoint
curl http://localhost:3000/api/nepse

# Check Supabase dashboard for data
```

### **7.2 Test Real-time Updates**
1. Visit your application
2. Check if data loads from Supabase
3. Verify charts display correctly
4. Test auto-refresh functionality

---

## 📈 **Step 8: Production Deployment**

### **8.1 Update Production Environment**
```env
# Production environment variables
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_production_anon_key
```

### **8.2 Deploy to Vercel**
```bash
# Deploy to Vercel
vercel --prod

# Set environment variables in Vercel dashboard
```

---

## 🎉 **Success!**

Your NEPSE application now uses Supabase for data storage with:

- ✅ **Real-time Database**: PostgreSQL with real-time subscriptions
- ✅ **Automatic Backups**: Built-in backup and recovery
- ✅ **Scalable**: Handles growth automatically
- ✅ **Secure**: Row-level security enabled
- ✅ **Fast**: Optimized for performance

### **Benefits:**
- **No Database Management**: Supabase handles everything
- **Real-time Updates**: Live data synchronization
- **Automatic Scaling**: Grows with your application
- **Built-in Security**: Authentication and authorization
- **Global CDN**: Fast data access worldwide

Your NEPSE data is now stored securely in Supabase! 🚀
