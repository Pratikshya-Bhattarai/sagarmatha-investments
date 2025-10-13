import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

interface SyncResult {
  success: boolean
  dataType: string
  recordsProcessed: number
  error?: string
  timestamp: string
}

async function syncNEPSEIndices(): Promise<SyncResult> {
  try {
    // Fetch latest data from external API
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/nepse/fetch?type=indices&store=false`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch indices data: ${response.statusText}`)
    }
    
    const result = await response.json()
    
    if (!result.data?.indices) {
      throw new Error('No indices data received')
    }
    
    // Transform and store data
    const indicesData = Array.isArray(result.data.indices) ? result.data.indices : [result.data.indices]
    
    const transformedData = indicesData.map((index: any) => ({
      name: index.name || index.Name || 'NEPSE Index',
      symbol: index.symbol || index.Symbol || 'NEPSE',
      current: parseFloat(index.current || index.Current || index.value || 0),
      change: parseFloat(index.change || index.Change || 0),
      change_percent: parseFloat(index.change_percent || index.Change_Percent || 0),
      high_52w: parseFloat(index.high_52w || index.High_52W || 0),
      low_52w: parseFloat(index.low_52w || index.Low_52W || 0),
      date: new Date().toISOString().split('T')[0]
    }))
    
    // Store in database
    const { data, error } = await supabase
      .from('nepse_indices')
      .upsert(transformedData, { 
        onConflict: 'symbol,date',
        ignoreDuplicates: false 
      })
      .select()
    
    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }
    
    return {
      success: true,
      dataType: 'indices',
      recordsProcessed: transformedData.length,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error syncing NEPSE indices:', error)
    return {
      success: false,
      dataType: 'indices',
      recordsProcessed: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}

async function syncNEPSEStocks(): Promise<SyncResult> {
  try {
    // Fetch latest data from external API
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/nepse/fetch?type=stocks&store=false`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch stocks data: ${response.statusText}`)
    }
    
    const result = await response.json()
    
    if (!result.data?.stocks) {
      throw new Error('No stocks data received')
    }
    
    // Transform and store data
    const stocksData = Array.isArray(result.data.stocks) ? result.data.stocks : [result.data.stocks]
    
    const transformedData = stocksData.map((stock: any) => ({
      symbol: stock.symbol || stock.Symbol || stock.ticker,
      company_name: stock.company_name || stock.Company_Name || stock.name || stock.Name,
      sector: stock.sector || stock.Sector || 'Unknown',
      current_price: parseFloat(stock.current_price || stock.Current_Price || stock.price || stock.Price || 0),
      change: parseFloat(stock.change || stock.Change || 0),
      change_percent: parseFloat(stock.change_percent || stock.Change_Percent || 0),
      volume: parseInt(stock.volume || stock.Volume || 0),
      turnover: parseInt(stock.turnover || stock.Turnover || 0),
      high_52w: parseFloat(stock.high_52w || stock.High_52W || 0),
      low_52w: parseFloat(stock.low_52w || stock.Low_52W || 0),
      market_cap: stock.market_cap || stock.Market_Cap || '0B',
      pe_ratio: parseFloat(stock.pe_ratio || stock.PE_Ratio || 0),
      last_trade_time: new Date().toISOString()
    }))
    
    // Store in database
    const { data, error } = await supabase
      .from('nepse_stocks')
      .upsert(transformedData, { 
        onConflict: 'symbol',
        ignoreDuplicates: false 
      })
      .select()
    
    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }
    
    return {
      success: true,
      dataType: 'stocks',
      recordsProcessed: transformedData.length,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error syncing NEPSE stocks:', error)
    return {
      success: false,
      dataType: 'stocks',
      recordsProcessed: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}

async function syncNEPSEHistorical(): Promise<SyncResult> {
  try {
    // Fetch latest data from external API
    const response = await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/nepse/fetch?type=historical&store=false`)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch historical data: ${response.statusText}`)
    }
    
    const result = await response.json()
    
    if (!result.data?.historical) {
      throw new Error('No historical data received')
    }
    
    // Transform and store data
    const historicalData = Array.isArray(result.data.historical) ? result.data.historical : [result.data.historical]
    
    const transformedData = historicalData.map((day: any) => ({
      date: day.date || day.Date || new Date().toISOString().split('T')[0],
      open: parseFloat(day.open || day.Open || 0),
      high: parseFloat(day.high || day.High || 0),
      low: parseFloat(day.low || day.Low || 0),
      close: parseFloat(day.close || day.Close || 0),
      volume: parseInt(day.volume || day.Volume || 0),
      turnover: parseInt(day.turnover || day.Turnover || 0)
    }))
    
    // Store in database
    const { data, error } = await supabase
      .from('nepse_index')
      .upsert(transformedData, { 
        onConflict: 'date',
        ignoreDuplicates: false 
      })
      .select()
    
    if (error) {
      throw new Error(`Database error: ${error.message}`)
    }
    
    return {
      success: true,
      dataType: 'historical',
      recordsProcessed: transformedData.length,
      timestamp: new Date().toISOString()
    }
  } catch (error) {
    console.error('Error syncing NEPSE historical data:', error)
    return {
      success: false,
      dataType: 'historical',
      recordsProcessed: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'all'
    const force = searchParams.get('force') === 'true'
    
    console.log(`Starting NEPSE data sync - Type: ${type}, Force: ${force}`)
    
    const results: SyncResult[] = []
    
    // Sync indices data
    if (type === 'all' || type === 'indices') {
      console.log('Syncing NEPSE indices...')
      const indicesResult = await syncNEPSEIndices()
      results.push(indicesResult)
    }
    
    // Sync stocks data
    if (type === 'all' || type === 'stocks') {
      console.log('Syncing NEPSE stocks...')
      const stocksResult = await syncNEPSEStocks()
      results.push(stocksResult)
    }
    
    // Sync historical data
    if (type === 'all' || type === 'historical') {
      console.log('Syncing NEPSE historical data...')
      const historicalResult = await syncNEPSEHistorical()
      results.push(historicalResult)
    }
    
    const successCount = results.filter(r => r.success).length
    const totalRecords = results.reduce((sum, r) => sum + r.recordsProcessed, 0)
    
    return NextResponse.json({
      success: successCount > 0,
      message: `Sync completed: ${successCount}/${results.length} data types successful`,
      results,
      summary: {
        totalDataTypes: results.length,
        successfulDataTypes: successCount,
        totalRecordsProcessed: totalRecords,
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Error in NEPSE sync API:', error)
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
    
    let result: SyncResult
    
    switch (type) {
      case 'indices':
        result = await syncNEPSEIndices()
        break
      case 'stocks':
        result = await syncNEPSEStocks()
        break
      case 'historical':
        result = await syncNEPSEHistorical()
        break
      default:
        return NextResponse.json(
          { error: 'Invalid type. Must be indices, stocks, or historical' },
          { status: 400 }
        )
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error in NEPSE sync POST API:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
