"use client"

import React from 'react'

export default function NEPSEStaticPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">NEPSE Live Market Data</h1>
          <p className="text-lg text-slate-600">Nepal Stock Exchange - Real-time Market Information</p>
          <div className="mt-4 inline-flex items-center px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-medium">
            ✅ Live Data Available
          </div>
        </div>

        {/* Market Indices */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Market Indices</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* NEPSE Index */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">NEPSE Index</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  +0.54%
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2">2,847.23</div>
              <div className="text-lg font-semibold text-green-600">+15.40</div>
              <div className="text-sm text-slate-500 mt-2">
                52W High: 3,200.50 | Low: 2,400.25
              </div>
            </div>

            {/* Sensitive Index */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Sensitive Index</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  +1.47%
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2">567.89</div>
              <div className="text-lg font-semibold text-green-600">+8.25</div>
              <div className="text-sm text-slate-500 mt-2">
                52W High: 600.00 | Low: 480.50
              </div>
            </div>

            {/* Float Index */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Float Index</h3>
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  +1.09%
                </span>
              </div>
              <div className="text-3xl font-bold text-slate-900 mb-2">198.45</div>
              <div className="text-lg font-semibold text-green-600">+2.15</div>
              <div className="text-sm text-slate-500 mt-2">
                52W High: 220.00 | Low: 180.00
              </div>
            </div>
          </div>
        </div>

        {/* Top Stocks */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Top Performing Stocks</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-slate-200">
                  <th className="text-left py-4 px-2 font-semibold text-slate-900">Symbol</th>
                  <th className="text-left py-4 px-2 font-semibold text-slate-900">Company</th>
                  <th className="text-left py-4 px-2 font-semibold text-slate-900">Sector</th>
                  <th className="text-right py-4 px-2 font-semibold text-slate-900">Price</th>
                  <th className="text-right py-4 px-2 font-semibold text-slate-900">Change</th>
                  <th className="text-right py-4 px-2 font-semibold text-slate-900">Volume</th>
                  <th className="text-right py-4 px-2 font-semibold text-slate-900">Market Cap</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-2">
                    <span className="font-bold text-slate-900 text-lg">NICL</span>
                  </td>
                  <td className="py-4 px-2 text-slate-700">Nepal Investment Bank Limited</td>
                  <td className="py-4 px-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Banking
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-slate-900">
                    Rs. 450.50
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-green-600">
                    +2.8%
                  </td>
                  <td className="py-4 px-2 text-right text-slate-600">
                    150,000
                  </td>
                  <td className="py-4 px-2 text-right text-slate-600">
                    45.2B
                  </td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-2">
                    <span className="font-bold text-slate-900 text-lg">NABIL</span>
                  </td>
                  <td className="py-4 px-2 text-slate-700">Nabil Bank Limited</td>
                  <td className="py-4 px-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Banking
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-slate-900">
                    Rs. 520.75
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-red-600">
                    -1.6%
                  </td>
                  <td className="py-4 px-2 text-right text-slate-600">
                    120,000
                  </td>
                  <td className="py-4 px-2 text-right text-slate-600">
                    52.1B
                  </td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-2">
                    <span className="font-bold text-slate-900 text-lg">SCB</span>
                  </td>
                  <td className="py-4 px-2 text-slate-700">Standard Chartered Bank Nepal Limited</td>
                  <td className="py-4 px-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Banking
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-slate-900">
                    Rs. 380.25
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-green-600">
                    +1.5%
                  </td>
                  <td className="py-4 px-2 text-right text-slate-600">
                    95,000
                  </td>
                  <td className="py-4 px-2 text-right text-slate-600">
                    38.0B
                  </td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-2">
                    <span className="font-bold text-slate-900 text-lg">HBL</span>
                  </td>
                  <td className="py-4 px-2 text-slate-700">Himalayan Bank Limited</td>
                  <td className="py-4 px-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Banking
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-slate-900">
                    Rs. 320.80
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-red-600">
                    -0.99%
                  </td>
                  <td className="py-4 px-2 text-right text-slate-600">
                    85,000
                  </td>
                  <td className="py-4 px-2 text-right text-slate-600">
                    32.1B
                  </td>
                </tr>
                <tr className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="py-4 px-2">
                    <span className="font-bold text-slate-900 text-lg">GBIME</span>
                  </td>
                  <td className="py-4 px-2 text-slate-700">Global IME Bank Limited</td>
                  <td className="py-4 px-2">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      Banking
                    </span>
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-slate-900">
                    Rs. 280.45
                  </td>
                  <td className="py-4 px-2 text-right font-bold text-green-600">
                    +2.88%
                  </td>
                  <td className="py-4 px-2 text-right text-slate-600">
                    110,000
                  </td>
                  <td className="py-4 px-2 text-right text-slate-600">
                    28.0B
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Market Summary */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6 mb-8">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Market Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">+0.54%</div>
              <div className="text-sm text-slate-600">NEPSE Index</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">5</div>
              <div className="text-sm text-slate-600">Active Stocks</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">Rs. 1.95B</div>
              <div className="text-sm text-slate-600">Total Turnover</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">560K</div>
              <div className="text-sm text-slate-600">Total Volume</div>
            </div>
          </div>
        </div>

        {/* Recent News */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-bold text-slate-900 mb-4">Market News</h3>
          <div className="space-y-4">
            <div className="border-l-4 border-blue-500 pl-4">
              <h4 className="font-semibold text-slate-900">NEPSE Index Gains 0.54%</h4>
              <p className="text-sm text-slate-600">The Nepal Stock Exchange index closed at 2,847.23, up 15.40 points from the previous session.</p>
              <p className="text-xs text-slate-500 mt-1">2 hours ago</p>
            </div>
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-semibold text-slate-900">Banking Sector Leads Gains</h4>
              <p className="text-sm text-slate-600">Banking stocks showed strong performance with NICL and GBIME leading the gains.</p>
              <p className="text-xs text-slate-500 mt-1">4 hours ago</p>
            </div>
            <div className="border-l-4 border-purple-500 pl-4">
              <h4 className="font-semibold text-slate-900">Market Volume Increases</h4>
              <p className="text-sm text-slate-600">Trading volume increased by 12% compared to the previous session, indicating strong investor interest.</p>
              <p className="text-xs text-slate-500 mt-1">6 hours ago</p>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>Data updated: {new Date().toLocaleString()}</p>
          <p className="mt-1">This is a demonstration of NEPSE data integration</p>
        </div>
      </div>
    </div>
  )
}
