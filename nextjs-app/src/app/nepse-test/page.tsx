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

export default function NEPSETestPage() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [data, setData] = useState<any>(null)
  const [apiStatus, setApiStatus] = useState<string>('Checking...')

  // Sample NEPSE data that will always work
  const sampleData = {
    indices: [
      {
        name: 'NEPSE Index',
        symbol: 'NEPSE',
        current: 2847.23,
        change: 15.40,
        change_percent: 0.54,
        high_52w: 3200.50,
        low_52w: 2400.25
      },
      {
        name: 'Sensitive Index',
        symbol: 'SENSITIVE',
        current: 567.89,
        change: 8.25,
        change_percent: 1.47,
        high_52w: 600.00,
        low_52w: 480.50
      },
      {
        name: 'Float Index',
        symbol: 'FLOAT',
        current: 198.45,
        change: 2.15,
        change_percent: 1.09,
        high_52w: 220.00,
        low_52w: 180.00
      }
    ],
    stocks: [
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
    ],
    last_updated: new Date().toISOString(),
    source: 'sample'
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        // Test API first
        const testResponse = await fetch('/api/test')
        if (testResponse.ok) {
          setApiStatus('✅ API is working')
        } else {
          setApiStatus('❌ API test failed')
        }

        // Try to fetch NEPSE data
        const response = await fetch('/api/nepse?type=overview')
        
        if (response.ok) {
          const apiData = await response.json()
          setData(apiData)
        } else {
          throw new Error(`API returned ${response.status}`)
        }
      } catch (err) {
        console.error('Error fetching data:', err)
        setError('API failed, using sample data')
        setData(sampleData)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-slate-600">Loading NEPSE data...</p>
          <p className="text-sm text-slate-500">{apiStatus}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900">NEPSE Data Test</h1>
          <p className="text-slate-600 mt-2">
            API Status: {apiStatus}
          </p>
          {error && (
            <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-yellow-800">⚠️ {error}</p>
            </div>
          )}
        </div>

        {/* Market Indices */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Market Indices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.indices?.map((index: NEPSEIndex) => (
              <div key={index.symbol} className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-slate-900">{index.name}</h3>
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
                <div className="text-xs text-slate-500 mt-1">
                  52W: {index.high_52w.toFixed(2)} / {index.low_52w.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stocks */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Stocks</h2>
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
                {data?.stocks?.map((stock: NEPSEStock) => (
                  <tr key={stock.symbol} className="border-b border-slate-100">
                    <td className="py-2 font-semibold text-slate-900">{stock.symbol}</td>
                    <td className="py-2 text-slate-600">{stock.company_name}</td>
                    <td className="py-2 text-right font-semibold">Rs. {stock.current_price}</td>
                    <td className={`py-2 text-right font-semibold ${
                      stock.change >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {stock.change >= 0 ? '+' : ''}{stock.change_percent.toFixed(2)}%
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

        {/* Debug Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="text-blue-800 font-semibold mb-2">Debug Information</h3>
          <div className="text-sm text-blue-700 space-y-1">
            <p>Data Source: {data?.source || 'Unknown'}</p>
            <p>Last Updated: {data?.last_updated || 'Unknown'}</p>
            <p>Records: {data?.stocks?.length || 0} stocks, {data?.indices?.length || 0} indices</p>
          </div>
        </div>
      </div>
    </div>
  )
}
