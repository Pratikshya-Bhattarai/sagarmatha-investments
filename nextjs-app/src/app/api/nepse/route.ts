import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { getFallbackNEPSEData, isSupabaseConfigured } from '@/lib/nepse-data'

export async function GET(request: NextRequest) {
  try {
    console.log('NEPSE API called')
    
    // Check if Django backend is available
    const djangoApiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'
    
    try {
      // Try to fetch from Django backend
      const response = await fetch(`${djangoApiUrl}/overview/overview/`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        // Add timeout
        signal: AbortSignal.timeout(5000),
      })

      if (response.ok) {
        const data = await response.json()
        console.log('Successfully fetched data from Django backend')
        return NextResponse.json(data)
      }
    } catch (djangoError) {
      console.log('Django backend not available, using fallback data:', djangoError)
    }

    // Fallback to Supabase or sample data
    if (!isSupabaseConfigured()) {
      console.log('Supabase not configured, using fallback data')
      const fallbackData = getFallbackNEPSEData()
      return NextResponse.json(fallbackData)
    }

    // Get query parameters
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') || 'overview'
    const limit = parseInt(searchParams.get('limit') || '50')

    switch (type) {
      case 'overview':
        return await getMarketOverview()
      case 'historical':
        return await getHistoricalData(limit)
      case 'stocks':
        return await getStockData(limit)
      case 'indices':
        return await getIndicesData()
      default:
        return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 })
    }
  } catch (error) {
    console.error('Error fetching NEPSE data:', error)
    // Return fallback data on error
    const fallbackData = getFallbackNEPSEData()
    return NextResponse.json(fallbackData)
  }
}

async function getMarketOverview() {
  try {
    // Get latest indices data
    const { data: indicesData, error: indicesError } = await supabase
      .from('nepse_indices')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)

    if (indicesError) throw indicesError

    // Get latest stock data
    const { data: stocksData, error: stocksError } = await supabase
      .from('nepse_stocks')
      .select('*')
      .order('last_trade_time', { ascending: false })
      .limit(20)

    if (stocksError) throw stocksError

    // Get latest index data
    const { data: indexData, error: indexError } = await supabase
      .from('nepse_index')
      .select('*')
      .order('date', { ascending: false })
      .limit(1)

    if (indexError) throw indexError

    const overview = {
      indices: indicesData || [],
      stocks: stocksData || [],
      index: indexData?.[0] || null,
      last_updated: new Date().toISOString()
    }

    return NextResponse.json(overview)
  } catch (error) {
    console.error('Error getting market overview:', error)
    throw error
  }
}

async function getHistoricalData(limit: number) {
  try {
    const { data, error } = await supabase
      .from('nepse_index')
      .select('*')
      .order('date', { ascending: false })
      .limit(limit)

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error getting historical data:', error)
    throw error
  }
}

async function getStockData(limit: number) {
  try {
    const { data, error } = await supabase
      .from('nepse_stocks')
      .select('*')
      .order('volume', { ascending: false })
      .limit(limit)

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error getting stock data:', error)
    throw error
  }
}

async function getIndicesData() {
  try {
    const { data, error } = await supabase
      .from('nepse_indices')
      .select('*')
      .order('date', { ascending: false })
      .limit(10)

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error('Error getting indices data:', error)
    throw error
  }
}
