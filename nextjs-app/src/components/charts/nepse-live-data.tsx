"use client"

import React, { useState, useEffect } from 'react'

interface NEPSEStock {
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

interface NEPSEIndex {
  name: string
  symbol: string
  current: number
  change: number
  change_percent: number
  high_52w: number
  low_52w: number
}

interface NEPSEMarketData {
  indices: NEPSEIndex[]
  top_gainers: NEPSEStock[]
  top_losers: NEPSEStock[]
  most_traded: NEPSEStock[]
  last_updated: string
}

export function NEPSELiveData() {
  const [marketData, setMarketData] = useState<NEPSEMarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  // Mock data generator for demonstration
  const generateMockNEPSEData = (): NEPSEMarketData => {
    const sectors = ['Banking', 'Insurance', 'Development Bank', 'Finance', 'Hotel', 'Trading', 'Manufacturing']
    const companies = [
      { symbol: 'NICL', name: 'Nepal Investment Bank Limited' },
      { symbol: 'NABIL', name: 'Nabil Bank Limited' },
      { symbol: 'SCB', name: 'Standard Chartered Bank Nepal Limited' },
      { symbol: 'HBL', name: 'Himalayan Bank Limited' },
      { symbol: 'GBIME', name: 'Global IME Bank Limited' },
      { symbol: 'NMB', name: 'NMB Bank Limited' },
      { symbol: 'PRVU', name: 'Prabhu Bank Limited' },
      { symbol: 'SBL', name: 'Siddhartha Bank Limited' },
      { symbol: 'CBL', name: 'Citizens Bank International Limited' },
      { symbol: 'KBL', name: 'Kumari Bank Limited' },
      { symbol: 'LBL', name: 'Laxmi Bank Limited' },
      { symbol: 'MBL', name: 'Machhapuchhre Bank Limited' },
      { symbol: 'NBB', name: 'Nepal Bangladesh Bank Limited' },
      { symbol: 'NCCB', name: 'Nepal Credit and Commerce Bank Limited' },
      { symbol: 'NIB', name: 'Nepal Investment Bank Limited' }
    ]

    const generateStock = (company: typeof companies[0], isGainer: boolean = false, isLoser: boolean = false): NEPSEStock => {
      const basePrice = Math.random() * 1000 + 100
      let change = (Math.random() - 0.5) * 20
      
      if (isGainer) change = Math.abs(change) + Math.random() * 10
      if (isLoser) change = -(Math.abs(change) + Math.random() * 10)
      
      const currentPrice = basePrice + change
      const changePercent = (change / basePrice) * 100
      
      return {
        symbol: company.symbol,
        company_name: company.name,
        sector: sectors[Math.floor(Math.random() * sectors.length)],
        current_price: Math.round(currentPrice * 100) / 100,
        change: Math.round(change * 100) / 100,
        change_percent: Math.round(changePercent * 100) / 100,
        volume: Math.floor(Math.random() * 100000) + 10000,
        turnover: Math.floor(Math.random() * 50000000) + 1000000,
        high_52w: Math.round((basePrice + Math.random() * 200) * 100) / 100,
        low_52w: Math.round((basePrice - Math.random() * 100) * 100) / 100,
        market_cap: `${(Math.random() * 50 + 5).toFixed(1)}B`,
        pe_ratio: Math.round((Math.random() * 30 + 5) * 100) / 100,
        last_trade_time: new Date().toISOString()
      }
    }

    const indices: NEPSEIndex[] = [
      {
        name: 'NEPSE Index',
        symbol: 'NEPSE',
        current: 2847.23 + (Math.random() - 0.5) * 100,
        change: (Math.random() - 0.5) * 50,
        change_percent: (Math.random() - 0.5) * 3,
        high_52w: 3200.50,
        low_52w: 2400.25
      },
      {
        name: 'Sensitive Index',
        symbol: 'SENSITIVE',
        current: 567.89 + (Math.random() - 0.5) * 20,
        change: (Math.random() - 0.5) * 15,
        change_percent: (Math.random() - 0.5) * 2,
        high_52w: 600.00,
        low_52w: 480.50
      },
      {
        name: 'Float Index',
        symbol: 'FLOAT',
        current: 198.45 + (Math.random() - 0.5) * 10,
        change: (Math.random() - 0.5) * 8,
        change_percent: (Math.random() - 0.5) * 2,
        high_52w: 220.00,
        low_52w: 180.00
      }
    ]

    const topGainers = companies.slice(0, 5).map(company => generateStock(company, true, false))
    const topLosers = companies.slice(5, 10).map(company => generateStock(company, false, true))
    const mostTraded = companies.slice(10, 15).map(company => generateStock(company))

    return {
      indices,
      top_gainers: topGainers.sort((a, b) => b.change_percent - a.change_percent),
      top_losers: topLosers.sort((a, b) => a.change_percent - b.change_percent),
      most_traded: mostTraded.sort((a, b) => b.volume - a.volume),
      last_updated: new Date().toISOString()
    }
  }

  const fetchNEPSEData = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Fetch from Supabase API
      const response = await fetch('/api/nepse?type=overview')
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      // Transform the data to match the expected format
      const transformedData: NEPSEMarketData = {
        indices: data.indices || [],
        top_gainers: data.stocks?.filter((stock: any) => stock.change_percent > 0).sort((a: any, b: any) => b.change_percent - a.change_percent).slice(0, 5) || [],
        top_losers: data.stocks?.filter((stock: any) => stock.change_percent < 0).sort((a: any, b: any) => a.change_percent - b.change_percent).slice(0, 5) || [],
        most_traded: data.stocks?.sort((a: any, b: any) => b.volume - a.volume).slice(0, 5) || [],
        last_updated: data.last_updated || new Date().toISOString()
      }
      
      setMarketData(transformedData)
      setLastUpdate(new Date())
    } catch (err) {
      console.error('Error fetching NEPSE data:', err)
      // Fallback to mock data if API fails
      const mockData = generateMockNEPSEData()
      setMarketData(mockData)
      setLastUpdate(new Date())
      setError('Using mock data - API connection failed')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNEPSEData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchNEPSEData, 30000)
    
    return () => clearInterval(interval)
  }, [])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 2
    }).format(num)
  }

  if (loading && !marketData) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span className="ml-3 text-slate-600">Loading NEPSE data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center">
          <div className="text-red-600 mr-3">⚠️</div>
          <div>
            <h3 className="text-red-800 font-semibold">Error Loading Data</h3>
            <p className="text-red-600">{error}</p>
            <button 
              onClick={fetchNEPSEData}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (!marketData) return null

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">NEPSE Live Data</h2>
          <p className="text-slate-600">
            Last updated: {lastUpdate?.toLocaleTimeString()}
          </p>
        </div>
        <button
          onClick={fetchNEPSEData}
          disabled={loading}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
        >
          {loading ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>

      {/* Market Indices */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Market Indices</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {marketData.indices.map((index) => (
            <div key={index.symbol} className="bg-slate-50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-slate-900">{index.name}</h4>
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  index.change >= 0 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {index.change >= 0 ? '+' : ''}{index.change_percent.toFixed(2)}%
                </span>
              </div>
              <div className="text-2xl font-bold text-slate-900">
                {index.current.toFixed(2)}
              </div>
              <div className={`text-sm ${
                index.change >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {index.change >= 0 ? '+' : ''}{index.change.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Gainers */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Top Gainers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2">Symbol</th>
                <th className="text-left py-2">Company</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Change</th>
                <th className="text-right py-2">Volume</th>
              </tr>
            </thead>
            <tbody>
              {marketData.top_gainers.map((stock) => (
                <tr key={stock.symbol} className="border-b border-slate-100">
                  <td className="py-2 font-semibold text-slate-900">{stock.symbol}</td>
                  <td className="py-2 text-slate-600">{stock.company_name}</td>
                  <td className="py-2 text-right font-semibold">Rs. {stock.current_price}</td>
                  <td className="py-2 text-right text-green-600 font-semibold">
                    +{stock.change_percent.toFixed(2)}%
                  </td>
                  <td className="py-2 text-right text-slate-600">
                    {formatNumber(stock.volume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Losers */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Top Losers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2">Symbol</th>
                <th className="text-left py-2">Company</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Change</th>
                <th className="text-right py-2">Volume</th>
              </tr>
            </thead>
            <tbody>
              {marketData.top_losers.map((stock) => (
                <tr key={stock.symbol} className="border-b border-slate-100">
                  <td className="py-2 font-semibold text-slate-900">{stock.symbol}</td>
                  <td className="py-2 text-slate-600">{stock.company_name}</td>
                  <td className="py-2 text-right font-semibold">Rs. {stock.current_price}</td>
                  <td className="py-2 text-right text-red-600 font-semibold">
                    {stock.change_percent.toFixed(2)}%
                  </td>
                  <td className="py-2 text-right text-slate-600">
                    {formatNumber(stock.volume)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Most Traded */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-4">Most Traded</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2">Symbol</th>
                <th className="text-left py-2">Company</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Volume</th>
                <th className="text-right py-2">Turnover</th>
              </tr>
            </thead>
            <tbody>
              {marketData.most_traded.map((stock) => (
                <tr key={stock.symbol} className="border-b border-slate-100">
                  <td className="py-2 font-semibold text-slate-900">{stock.symbol}</td>
                  <td className="py-2 text-slate-600">{stock.company_name}</td>
                  <td className="py-2 text-right font-semibold">Rs. {stock.current_price}</td>
                  <td className="py-2 text-right text-slate-600">
                    {formatNumber(stock.volume)}
                  </td>
                  <td className="py-2 text-right text-slate-600">
                    Rs. {formatNumber(stock.turnover)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

