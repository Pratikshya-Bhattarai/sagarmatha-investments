import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

// NEPSE data sources and endpoints
const NEPSE_DATA_SOURCES = {
  // Official NEPSE endpoints (if available)
  official: {
    baseUrl: 'https://www.nepse.com.np',
    endpoints: {
      marketSummary: '/api/market-summary',
      liveData: '/api/live-data',
      indices: '/api/indices'
    }
  },
  // Alternative data sources
  alternative: {
    baseUrl: 'https://api.nepse.com',
    endpoints: {
      marketData: '/api/v1/market/overview',
      stockData: '/api/v1/stocks',
      historicalData: '/api/v1/historical'
    }
  },
  // Third-party data providers
  thirdParty: {
    baseUrl: 'https://api.merolagani.com',
    endpoints: {
      nepseData: '/api/v1/nepse',
      stockPrices: '/api/v1/stocks/prices'
    }
  }
}

interface NEPSEApiResponse {
  success: boolean
  data?: any
  error?: string
  source?: string
}

async function fetchFromSource(source: string, endpoint: string): Promise<NEPSEApiResponse> {
  try {
    const response = await fetch(endpoint, {
      method: 'GET',
      headers: {
        'User-Agent': 'Sagarmatha-Investments/1.0',
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      // Add timeout
      signal: AbortSignal.timeout(10000) // 10 second timeout
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      success: true,
      data,
      source
    }
  } catch (error) {
    console.error(`Error fetching from ${source}:`, error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      source
    }
  }
}

async function fetchNEPSEIndices(): Promise<NEPSEApiResponse> {
  const sources = [
    `${NEPSE_DATA_SOURCES.official.baseUrl}${NEPSE_DATA_SOURCES.official.endpoints.indices}`,
    `${NEPSE_DATA_SOURCES.alternative.baseUrl}${NEPSE_DATA_SOURCES.alternative.endpoints.marketData}`,
    `${NEPSE_DATA_SOURCES.thirdParty.baseUrl}${NEPSE_DATA_SOURCES.thirdParty.endpoints.nepseData}`
  ]

  for (const source of sources) {
    const result = await fetchFromSource('indices', source)
    if (result.success) {
      return result
    }
  }

  return {
    success: false,
    error: 'All data sources failed',
    source: 'indices'
  }
}

async function fetchNEPSEStocks(): Promise<NEPSEApiResponse> {
  const sources = [
    `${NEPSE_DATA_SOURCES.official.baseUrl}/api/stocks`,
    `${NEPSE_DATA_SOURCES.alternative.baseUrl}${NEPSE_DATA_SOURCES.alternative.endpoints.stockData}`,
    `${NEPSE_DATA_SOURCES.thirdParty.baseUrl}${NEPSE_DATA_SOURCES.thirdParty.endpoints.stockPrices}`
  ]

  for (const source of sources) {
    const result = await fetchFromSource('stocks', source)
    if (result.success) {
      return result
    }
  }

  return {
    success: false,
    error: 'All data sources failed',
    source: 'stocks'
  }
}

async function fetchNEPSEHistorical(): Promise<NEPSEApiResponse> {
  const sources = [
    `${NEPSE_DATA_SOURCES.official.baseUrl}/api/historical`,
    `${NEPSE_DATA_SOURCES.alternative.baseUrl}${NEPSE_DATA_SOURCES.alternative.endpoints.historicalData}`
  ]

  for (const source of sources) {
    const result = await fetchFromSource('historical', source)
    if (result.success) {
      return result
    }
  }

  return {
    success: false,
    error: 'All data sources failed',
    source: 'historical'
  }
}

async function storeDataInSupabase(data: any, tableName: string) {
  try {
    const { data: result, error } = await supabase
      .from(tableName)
      .insert(data)
      .select()

    if (error) {
      console.error(`Error storing data in ${tableName}:`, error)
      return { success: false, error: error.message }
    }

    return { success: true, data: result }
  } catch (error) {
    console.error(`Error storing data in ${tableName}:`, error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const store = searchParams.get('store') === 'true'

    const results: any = {
      timestamp: new Date().toISOString(),
      type,
      data: {},
      errors: []
    }

    // Fetch indices data
    if (type === 'all' || type === 'indices') {
      console.log('Fetching NEPSE indices...')
      const indicesResult = await fetchNEPSEIndices()
      
      if (indicesResult.success) {
        results.data.indices = indicesResult.data
        
        // Store in database if requested
        if (store && indicesResult.data) {
          const storeResult = await storeDataInSupabase(
            Array.isArray(indicesResult.data) ? indicesResult.data : [indicesResult.data],
            'nepse_indices'
          )
          results.data.indices_stored = storeResult.success
        }
      } else {
        results.errors.push({
          type: 'indices',
          error: indicesResult.error,
          source: indicesResult.source
        })
      }
    }

    // Fetch stocks data
    if (type === 'all' || type === 'stocks') {
      console.log('Fetching NEPSE stocks...')
      const stocksResult = await fetchNEPSEStocks()
      
      if (stocksResult.success) {
        results.data.stocks = stocksResult.data
        
        // Store in database if requested
        if (store && stocksResult.data) {
          const storeResult = await storeDataInSupabase(
            Array.isArray(stocksResult.data) ? stocksResult.data : [stocksResult.data],
            'nepse_stocks'
          )
          results.data.stocks_stored = storeResult.success
        }
      } else {
        results.errors.push({
          type: 'stocks',
          error: stocksResult.error,
          source: stocksResult.source
        })
      }
    }

    // Fetch historical data
    if (type === 'all' || type === 'historical') {
      console.log('Fetching NEPSE historical data...')
      const historicalResult = await fetchNEPSEHistorical()
      
      if (historicalResult.success) {
        results.data.historical = historicalResult.data
        
        // Store in database if requested
        if (store && historicalResult.data) {
          const storeResult = await storeDataInSupabase(
            Array.isArray(historicalResult.data) ? historicalResult.data : [historicalResult.data],
            'nepse_index'
          )
          results.data.historical_stored = storeResult.success
        }
      } else {
        results.errors.push({
          type: 'historical',
          error: historicalResult.error,
          source: historicalResult.source
        })
      }
    }

    // If all sources failed, return mock data
    if (results.errors.length > 0 && Object.keys(results.data).length === 0) {
      console.log('All data sources failed, returning mock data')
      results.data = {
        indices: [
          {
            name: 'NEPSE Index',
            symbol: 'NEPSE',
            current: 2847.23 + (Math.random() - 0.5) * 100,
            change: (Math.random() - 0.5) * 50,
            change_percent: (Math.random() - 0.5) * 3,
            high_52w: 3200.50,
            low_52w: 2400.25,
            date: new Date().toISOString().split('T')[0]
          }
        ],
        stocks: [
          {
            symbol: 'NICL',
            company_name: 'Nepal Investment Bank Limited',
            sector: 'Banking',
            current_price: 450.50 + (Math.random() - 0.5) * 50,
            change: (Math.random() - 0.5) * 20,
            change_percent: (Math.random() - 0.5) * 5,
            volume: Math.floor(Math.random() * 100000) + 10000,
            turnover: Math.floor(Math.random() * 50000000) + 1000000,
            high_52w: 485.00,
            low_52w: 380.25,
            market_cap: '45.2B',
            pe_ratio: 18.5,
            last_trade_time: new Date().toISOString()
          }
        ],
        historical: [
          {
            date: new Date().toISOString().split('T')[0],
            open: 2800.50,
            high: 2850.75,
            low: 2795.25,
            close: 2847.23,
            volume: 1500000,
            turnover: 4250000000
          }
        ]
      }
      results.fallback = true
    }

    return NextResponse.json(results)
  } catch (error) {
    console.error('Error in NEPSE fetch API:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { type, data } = body

    if (!type || !data) {
      return NextResponse.json(
        { error: 'Missing type or data in request body' },
        { status: 400 }
      )
    }

    const storeResult = await storeDataInSupabase(data, type)
    
    return NextResponse.json({
      success: storeResult.success,
      error: storeResult.error,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Error in NEPSE POST API:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
