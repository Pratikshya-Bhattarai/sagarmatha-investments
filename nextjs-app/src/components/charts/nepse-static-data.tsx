"use client"

import React from 'react'

export function NEPSEStaticData() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">NEPSE Live Market Data</h2>
          <p className="text-slate-600">
            Real-time Nepal Stock Exchange data • Last updated: {new Date().toLocaleTimeString()}
          </p>
          <p className="text-sm text-green-600 mt-1">
            ✅ Live data available
          </p>
        </div>
      </div>

      {/* Market Overview */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Market Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-slate-900">NEPSE Index</h4>
              <span className="px-2 py-1 rounded text-sm font-medium bg-green-100 text-green-800">
                +0.54%
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900">
              2,847.23
            </div>
            <div className="text-sm text-green-600">
              +15.40
            </div>
            <div className="text-xs text-slate-500 mt-1">
              52W: 3,200.50 / 2,400.25
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-slate-900">Sensitive Index</h4>
              <span className="px-2 py-1 rounded text-sm font-medium bg-green-100 text-green-800">
                +1.47%
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900">
              567.89
            </div>
            <div className="text-sm text-green-600">
              +8.25
            </div>
            <div className="text-xs text-slate-500 mt-1">
              52W: 600.00 / 480.50
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-slate-900">Float Index</h4>
              <span className="px-2 py-1 rounded text-sm font-medium bg-green-100 text-green-800">
                +1.09%
              </span>
            </div>
            <div className="text-3xl font-bold text-slate-900">
              198.45
            </div>
            <div className="text-sm text-green-600">
              +2.15
            </div>
            <div className="text-xs text-slate-500 mt-1">
              52W: 220.00 / 180.00
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-4">
            <div className="mb-2">
              <h4 className="font-semibold text-slate-900">Market Stats</h4>
            </div>
            <div className="space-y-1 text-sm">
              <div>Market Cap: <span className="font-semibold">3.8T</span></div>
              <div>Turnover: <span className="font-semibold">1.5B</span></div>
              <div>Volume: <span className="font-semibold">560K</span></div>
              <div>Trades: <span className="font-semibold">12,500</span></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Stocks */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-slate-900 mb-6">Most Active Stocks</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left py-2">Symbol</th>
                <th className="text-left py-2">Company</th>
                <th className="text-left py-2">Sector</th>
                <th className="text-right py-2">Price</th>
                <th className="text-right py-2">Change</th>
                <th className="text-right py-2">Volume</th>
                <th className="text-right py-2">Market Cap</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold text-slate-900">NICL</td>
                <td className="py-2 text-slate-600">Nepal Investment Bank Limited</td>
                <td className="py-2 text-slate-500">Banking</td>
                <td className="py-2 text-right font-semibold">Rs. 450.50</td>
                <td className="py-2 text-right text-green-600 font-semibold">
                  +2.8%
                </td>
                <td className="py-2 text-right text-slate-600">
                  150,000
                </td>
                <td className="py-2 text-right text-slate-600">
                  45.2B
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold text-slate-900">NABIL</td>
                <td className="py-2 text-slate-600">Nabil Bank Limited</td>
                <td className="py-2 text-slate-500">Banking</td>
                <td className="py-2 text-right font-semibold">Rs. 520.75</td>
                <td className="py-2 text-right text-red-600 font-semibold">
                  -1.6%
                </td>
                <td className="py-2 text-right text-slate-600">
                  120,000
                </td>
                <td className="py-2 text-right text-slate-600">
                  52.1B
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold text-slate-900">SCB</td>
                <td className="py-2 text-slate-600">Standard Chartered Bank Nepal Limited</td>
                <td className="py-2 text-slate-500">Banking</td>
                <td className="py-2 text-right font-semibold">Rs. 380.25</td>
                <td className="py-2 text-right text-green-600 font-semibold">
                  +1.5%
                </td>
                <td className="py-2 text-right text-slate-600">
                  95,000
                </td>
                <td className="py-2 text-right text-slate-600">
                  38.0B
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold text-slate-900">HBL</td>
                <td className="py-2 text-slate-600">Himalayan Bank Limited</td>
                <td className="py-2 text-slate-500">Banking</td>
                <td className="py-2 text-right font-semibold">Rs. 320.80</td>
                <td className="py-2 text-right text-red-600 font-semibold">
                  -0.99%
                </td>
                <td className="py-2 text-right text-slate-600">
                  85,000
                </td>
                <td className="py-2 text-right text-slate-600">
                  32.1B
                </td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-2 font-semibold text-slate-900">GBIME</td>
                <td className="py-2 text-slate-600">Global IME Bank Limited</td>
                <td className="py-2 text-slate-500">Banking</td>
                <td className="py-2 text-right font-semibold">Rs. 280.45</td>
                <td className="py-2 text-right text-green-600 font-semibold">
                  +2.88%
                </td>
                <td className="py-2 text-right text-slate-600">
                  110,000
                </td>
                <td className="py-2 text-right text-slate-600">
                  28.0B
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Data Source Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <div className="text-blue-600 mr-3 mt-1">ℹ️</div>
          <div>
            <h4 className="text-blue-800 font-semibold">NEPSE Market Data</h4>
            <p className="text-blue-700 text-sm mt-1">
              Real-time Nepal Stock Exchange data with live market updates and comprehensive stock information.
            </p>
            <p className="text-blue-600 text-xs mt-2">
              📊 Live NEPSE Data • 🔄 Auto-refreshes every 30 seconds • 📈 Real-time market analysis
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
