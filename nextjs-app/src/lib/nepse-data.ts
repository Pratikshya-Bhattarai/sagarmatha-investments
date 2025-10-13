// Fallback NEPSE data service for when Supabase is not configured
export interface NEPSEIndexData {
  id?: number
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  turnover: number
}

export interface NEPSEStockData {
  id?: number
  symbol: string
  company_name: string
  sector: string
  current_price: number
  change: number
  change_percent: number
  volume: number
  turnover: number
  high_52w: number
  low_52w: number
  market_cap: string
  pe_ratio: number
  last_trade_time: string
}

export interface NEPSEIndicesData {
  id?: number
  name: string
  symbol: string
  current: number
  change: number
  change_percent: number
  high_52w: number
  low_52w: number
  date: string
}

// Sample NEPSE data for fallback
export const sampleNEPSEIndexData: NEPSEIndexData[] = [
  {
    date: '2024-01-15',
    open: 2800.50,
    high: 2850.75,
    low: 2795.25,
    close: 2847.23,
    volume: 1500000,
    turnover: 4250000000
  },
  {
    date: '2024-01-14',
    open: 2785.30,
    high: 2810.45,
    low: 2770.20,
    close: 2800.50,
    volume: 1420000,
    turnover: 3980000000
  },
  {
    date: '2024-01-13',
    open: 2765.80,
    high: 2790.25,
    low: 2750.15,
    close: 2785.30,
    volume: 1380000,
    turnover: 3840000000
  }
]

export const sampleNEPSEStocksData: NEPSEStockData[] = [
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
  },
  {
    symbol: 'SCB',
    company_name: 'Standard Chartered Bank Nepal Limited',
    sector: 'Banking',
    current_price: 380.25,
    change: 5.75,
    change_percent: 1.5,
    volume: 95000,
    turnover: 36123750,
    high_52w: 420.00,
    low_52w: 320.50,
    market_cap: '38.0B',
    pe_ratio: 15.8,
    last_trade_time: new Date().toISOString()
  }
]

export const sampleNEPSEIndicesData: NEPSEIndicesData[] = [
  {
    name: 'NEPSE Index',
    symbol: 'NEPSE',
    current: 2847.23,
    change: 15.40,
    change_percent: 0.54,
    high_52w: 3200.50,
    low_52w: 2400.25,
    date: '2024-01-15'
  },
  {
    name: 'Sensitive Index',
    symbol: 'SENSITIVE',
    current: 567.89,
    change: 8.25,
    change_percent: 1.47,
    high_52w: 600.00,
    low_52w: 480.50,
    date: '2024-01-15'
  },
  {
    name: 'Float Index',
    symbol: 'FLOAT',
    current: 198.45,
    change: 2.15,
    change_percent: 1.09,
    high_52w: 220.00,
    low_52w: 180.00,
    date: '2024-01-15'
  }
]

// Function to generate realistic NEPSE data
export function generateRealisticNEPSEData() {
  const baseIndex = 2847.23
  const variation = (Math.random() - 0.5) * 100
  
  return {
    nepse_index: {
      current: Math.round((baseIndex + variation) * 100) / 100,
      change: Math.round(variation * 100) / 100,
      change_percent: Math.round((variation / baseIndex) * 10000) / 100,
      high_52w: 3200.50,
      low_52w: 2400.25
    },
    sensitive_index: {
      current: Math.round((567.89 + variation * 0.2) * 100) / 100,
      change: Math.round(variation * 0.2 * 100) / 100,
      change_percent: Math.round((variation * 0.2 / 567.89) * 10000) / 100
    },
    float_index: {
      current: Math.round((198.45 + variation * 0.1) * 100) / 100,
      change: Math.round(variation * 0.1 * 100) / 100,
      change_percent: Math.round((variation * 0.1 / 198.45) * 10000) / 100
    }
  }
}

// Function to check if Supabase is configured
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  )
}

// Function to get fallback data
export function getFallbackNEPSEData() {
  return {
    indices: sampleNEPSEIndicesData,
    stocks: sampleNEPSEStocksData,
    historical: sampleNEPSEIndexData,
    last_updated: new Date().toISOString(),
    source: 'fallback',
    message: 'Using sample data - Supabase not configured'
  }
}
