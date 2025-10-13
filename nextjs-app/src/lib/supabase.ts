import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types for NEPSE data
export interface NEPSEIndexData {
  id?: number
  date: string
  open: number
  high: number
  low: number
  close: number
  volume: number
  turnover: number
  created_at?: string
  updated_at?: string
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
  created_at?: string
  updated_at?: string
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
  created_at?: string
  updated_at?: string
}
