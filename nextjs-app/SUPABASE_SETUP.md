# Supabase Setup Guide for NEPSE Data

This guide will help you set up Supabase database and import NEPSE historical data from Kaggle.

## Prerequisites

1. **Supabase Account**: Create a free account at [supabase.com](https://supabase.com)
2. **Kaggle Account**: Create a free account at [kaggle.com](https://kaggle.com)
3. **Node.js**: Ensure you have Node.js installed

## Step 1: Set up Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - Name: `sagarmatha-nepse-data`
   - Database Password: (generate a strong password)
   - Region: Choose closest to your location
5. Click "Create new project"
6. Wait for the project to be created (2-3 minutes)

## Step 2: Get Supabase Credentials

1. In your Supabase project dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (starts with `https://`)
   - **anon public** key
   - **service_role** key (keep this secret!)

## Step 3: Configure Environment Variables

Update your `.env.local` file with the actual Supabase credentials:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# NEPSE Data API (if available)
NEPSE_API_URL=https://api.nepse.com
NEPSE_API_KEY=your_nepse_api_key
```

## Step 4: Create Database Tables

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

## Step 5: Download NEPSE Data from Kaggle

1. Go to the [NEPSE Index Historical Data](https://www.kaggle.com/datasets/dimanjung/nepse-index-historical-data) dataset
2. Click "Download" (you may need to accept terms and conditions)
3. Extract the downloaded ZIP file
4. Look for CSV files containing the historical data

## Step 6: Import Data to Supabase

### Option A: Using the Import Script

1. Install dependencies:
```bash
npm install csv-parser
```

2. Update the import script with your data file path:
```javascript
// In scripts/import-nepse-data.js
const csv = require('csv-parser')
const fs = require('fs')

// Function to parse CSV and import data
async function importFromCSV(filePath) {
  const results = []
  
  fs.createReadStream(filePath)
    .pipe(csv())
    .on('data', (data) => results.push(data))
    .on('end', async () => {
      // Transform and insert data
      const transformedData = results.map(row => ({
        date: row.Date,
        open: parseFloat(row.Open),
        high: parseFloat(row.High),
        low: parseFloat(row.Low),
        close: parseFloat(row.Close),
        volume: parseInt(row.Volume),
        turnover: parseInt(row.Turnover)
      }))
      
      const { data, error } = await supabase
        .from('nepse_index')
        .insert(transformedData)
      
      if (error) {
        console.error('Error importing data:', error)
      } else {
        console.log('✅ Data imported successfully')
      }
    })
}
```

3. Run the import script:
```bash
node scripts/import-nepse-data.js
```

### Option B: Manual Import via Supabase Dashboard

1. Go to your Supabase project dashboard
2. Navigate to **Table Editor**
3. Select the `nepse_index` table
4. Click "Insert" → "Insert row"
5. Add your data manually or use the CSV import feature

## Step 7: Test the Integration

1. Start your development server:
```bash
npm run dev
```

2. Navigate to `/charts` or `/nepse` pages
3. Check if the data is loading from Supabase
4. Check the browser console for any errors

## Step 8: Set up Real-time Data Updates

For live data updates, you can:

1. **Set up a cron job** to fetch data from NEPSE APIs
2. **Use Supabase Edge Functions** for scheduled data updates
3. **Implement webhook endpoints** for real-time data feeds

### Example: Scheduled Data Update Function

```javascript
// supabase/functions/update-nepse-data/index.ts
import { createClient } from '@supabase/supabase-js'

export default async function handler(req: Request) {
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )
  
  // Fetch latest NEPSE data
  const response = await fetch('https://api.nepse.com/latest')
  const data = await response.json()
  
  // Update database
  await supabase
    .from('nepse_index')
    .insert([{
      date: new Date().toISOString().split('T')[0],
      open: data.open,
      high: data.high,
      low: data.low,
      close: data.close,
      volume: data.volume,
      turnover: data.turnover
    }])
  
  return new Response('Data updated successfully')
}
```

## Troubleshooting

### Common Issues:

1. **Environment variables not loading**: Restart your development server
2. **Database connection errors**: Check your Supabase URL and keys
3. **Permission errors**: Ensure your service role key has the correct permissions
4. **Data format errors**: Check that your CSV data matches the expected schema

### Debug Steps:

1. Check browser console for errors
2. Verify Supabase connection in the dashboard
3. Test API endpoints directly: `http://localhost:3000/api/nepse?type=overview`
4. Check Supabase logs for database errors

## Next Steps

1. **Set up automated data fetching** from NEPSE APIs
2. **Implement real-time updates** using Supabase subscriptions
3. **Add data validation** and error handling
4. **Set up monitoring** for data quality and API health
5. **Implement caching** for better performance

## Support

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)
- [NEPSE Official Website](https://www.nepse.com.np)
