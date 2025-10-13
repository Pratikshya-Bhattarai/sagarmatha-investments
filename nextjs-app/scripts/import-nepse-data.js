const { createClient } = require('@supabase/supabase-js')
const fs = require('fs')
const path = require('path')
const csv = require('csv-parser')

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Please set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env.local file')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

// Sample NEPSE data structure based on the Kaggle dataset
const sampleNEPSEIndexData = [
  {
    date: '2024-01-01',
    open: 2800.50,
    high: 2850.75,
    low: 2795.25,
    close: 2847.23,
    volume: 1500000,
    turnover: 4250000000
  },
  {
    date: '2024-01-02',
    open: 2847.23,
    high: 2875.50,
    low: 2830.00,
    close: 2865.40,
    volume: 1650000,
    turnover: 4725000000
  },
  {
    date: '2024-01-03',
    open: 2865.40,
    high: 2890.25,
    low: 2850.75,
    close: 2875.80,
    volume: 1420000,
    turnover: 4085000000
  }
]

const sampleNEPSEStocksData = [
  {
    symbol: 'NICL',
    company_name: 'Nepal Investment Bank Limited',
    sector: 'Banking',
    current_price: 450.50,
    change: 12.25,
    change_percent: 2.8,
    volume: 150000,
    turnover: 67575000,
    high_52w: 485.00,
    low_52w: 380.25,
    market_cap: '45.2B',
    pe_ratio: 18.5,
    last_trade_time: new Date().toISOString()
  },
  {
    symbol: 'NABIL',
    company_name: 'Nabil Bank Limited',
    sector: 'Banking',
    current_price: 520.75,
    change: -8.50,
    change_percent: -1.6,
    volume: 120000,
    turnover: 62490000,
    high_52w: 580.00,
    low_52w: 420.50,
    market_cap: '52.1B',
    pe_ratio: 22.3,
    last_trade_time: new Date().toISOString()
  }
]

const sampleNEPSEIndicesData = [
  {
    name: 'NEPSE Index',
    symbol: 'NEPSE',
    current: 2847.23,
    change: 15.40,
    change_percent: 0.54,
    high_52w: 3200.50,
    low_52w: 2400.25,
    date: '2024-01-01'
  },
  {
    name: 'Sensitive Index',
    symbol: 'SENSITIVE',
    current: 567.89,
    change: 8.25,
    change_percent: 1.47,
    high_52w: 600.00,
    low_52w: 480.50,
    date: '2024-01-01'
  },
  {
    name: 'Float Index',
    symbol: 'FLOAT',
    current: 198.45,
    change: 2.15,
    change_percent: 1.09,
    high_52w: 220.00,
    low_52w: 180.00,
    date: '2024-01-01'
  }
]

async function createTables() {
  console.log('Creating database tables...')
  
  // Note: In a real implementation, you would create these tables in Supabase dashboard
  // or use SQL migrations. This is just for reference.
  
  const tables = [
    {
      name: 'nepse_index',
      columns: `
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
      `
    },
    {
      name: 'nepse_stocks',
      columns: `
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
      `
    },
    {
      name: 'nepse_indices',
      columns: `
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
      `
    }
  ]

  console.log('Table schemas to create in Supabase:')
  tables.forEach(table => {
    console.log(`\nCREATE TABLE ${table.name} (${table.columns});`)
  })
}

async function importSampleData() {
  console.log('Importing sample NEPSE data...')
  
  try {
    // Import NEPSE Index data
    console.log('Importing NEPSE Index data...')
    const { data: indexData, error: indexError } = await supabase
      .from('nepse_index')
      .insert(sampleNEPSEIndexData)
    
    if (indexError) {
      console.error('Error importing index data:', indexError)
    } else {
      console.log('✅ NEPSE Index data imported successfully')
    }

    // Import NEPSE Stocks data
    console.log('Importing NEPSE Stocks data...')
    const { data: stocksData, error: stocksError } = await supabase
      .from('nepse_stocks')
      .insert(sampleNEPSEStocksData)
    
    if (stocksError) {
      console.error('Error importing stocks data:', stocksError)
    } else {
      console.log('✅ NEPSE Stocks data imported successfully')
    }

    // Import NEPSE Indices data
    console.log('Importing NEPSE Indices data...')
    const { data: indicesData, error: indicesError } = await supabase
      .from('nepse_indices')
      .insert(sampleNEPSEIndicesData)
    
    if (indicesError) {
      console.error('Error importing indices data:', indicesError)
    } else {
      console.log('✅ NEPSE Indices data imported successfully')
    }

    console.log('\n🎉 Sample data import completed!')
    console.log('\nNext steps:')
    console.log('1. Download the actual NEPSE dataset from Kaggle')
    console.log('2. Parse the CSV data and format it according to the schema')
    console.log('3. Use this script to import the real data')
    
  } catch (error) {
    console.error('Error during import:', error)
  }
}

async function importFromCSV(filePath, tableName) {
  console.log(`📁 Importing data from ${filePath} to ${tableName}...`)
  
  return new Promise((resolve, reject) => {
    const results = []
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        // Transform data based on table type
        let transformedData
        switch (tableName) {
          case 'nepse_index':
            transformedData = {
              date: data.Date || data.date,
              open: parseFloat(data.Open || data.open || 0),
              high: parseFloat(data.High || data.high || 0),
              low: parseFloat(data.Low || data.low || 0),
              close: parseFloat(data.Close || data.close || 0),
              volume: parseInt(data.Volume || data.volume || 0),
              turnover: parseInt(data.Turnover || data.turnover || 0)
            }
            break
          case 'nepse_stocks':
            transformedData = {
              symbol: data.Symbol || data.symbol,
              company_name: data.Company || data.company_name || data.Company_Name,
              sector: data.Sector || data.sector || 'Unknown',
              current_price: parseFloat(data.Price || data.current_price || data.Current_Price || 0),
              change: parseFloat(data.Change || data.change || 0),
              change_percent: parseFloat(data.Change_Percent || data.change_percent || 0),
              volume: parseInt(data.Volume || data.volume || 0),
              turnover: parseInt(data.Turnover || data.turnover || 0),
              high_52w: parseFloat(data.High_52W || data.high_52w || 0),
              low_52w: parseFloat(data.Low_52W || data.low_52w || 0),
              market_cap: data.Market_Cap || data.market_cap || '0B',
              pe_ratio: parseFloat(data.PE_Ratio || data.pe_ratio || 0),
              last_trade_time: new Date().toISOString()
            }
            break
          default:
            transformedData = data
        }
        
        if (transformedData && Object.values(transformedData).some(v => v !== null && v !== undefined && v !== '')) {
          results.push(transformedData)
        }
      })
      .on('end', async () => {
        try {
          console.log(`📊 Found ${results.length} records to import`)
          
          // Import in batches to avoid timeout
          const batchSize = 100
          for (let i = 0; i < results.length; i += batchSize) {
            const batch = results.slice(i, i + batchSize)
            const { data, error } = await supabase
              .from(tableName)
              .insert(batch)
            
            if (error) {
              console.error(`❌ Error importing batch ${Math.floor(i/batchSize) + 1}:`, error)
            } else {
              console.log(`✅ Imported batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(results.length/batchSize)}`)
            }
          }
          
          console.log(`🎉 Successfully imported ${results.length} records to ${tableName}`)
          resolve(results.length)
        } catch (error) {
          console.error('❌ Error during import:', error)
          reject(error)
        }
      })
      .on('error', (error) => {
        console.error('❌ Error reading CSV file:', error)
        reject(error)
      })
  })
}

async function main() {
  console.log('🚀 NEPSE Data Import Script')
  console.log('========================\n')
  
  await createTables()
  console.log('\n' + '='.repeat(50))
  
  // Check if CSV files exist
  const csvFiles = [
    { path: './data/nepse-index.csv', table: 'nepse_index' },
    { path: './data/nepse-stocks.csv', table: 'nepse_stocks' },
    { path: './data/nepse-indices.csv', table: 'nepse_indices' }
  ]
  
  let hasCsvFiles = false
  for (const file of csvFiles) {
    if (fs.existsSync(file.path)) {
      hasCsvFiles = true
      await importFromCSV(file.path, file.table)
    }
  }
  
  if (!hasCsvFiles) {
    console.log('📝 No CSV files found. Importing sample data...')
    await importSampleData()
    console.log('\n📋 To import real data:')
    console.log('1. Download the NEPSE dataset from Kaggle')
    console.log('2. Place CSV files in ./data/ directory')
    console.log('3. Run this script again')
  }
}

// Run the script
if (require.main === module) {
  main().catch(console.error)
}

module.exports = {
  createTables,
  importSampleData,
  sampleNEPSEIndexData,
  sampleNEPSEStocksData,
  sampleNEPSEIndicesData
}
