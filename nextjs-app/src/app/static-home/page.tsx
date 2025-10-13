"use client"

import React from 'react'

export default function StaticHomePage() {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-slate-900">Sagarmatha Investments</h1>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a href="#about" className="text-slate-600 hover:text-slate-900">About</a>
              <a href="#services" className="text-slate-600 hover:text-slate-900">Services</a>
              <a href="#charts" className="text-slate-600 hover:text-slate-900">Charts</a>
              <a href="#contact" className="text-slate-600 hover:text-slate-900">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Climb Higher with NEPSE Data
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Real-time Nepal Stock Exchange data and investment analytics
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-yellow-500 text-slate-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors">
              View Live Data
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-slate-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* NEPSE Data Section */}
      <section id="charts" className="py-16 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              NEPSE Live Market Data
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Real-time Nepal Stock Exchange data with comprehensive market insights
            </p>
          </div>

          {/* Market Indices */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Market Indices</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-slate-900">NEPSE Index</h4>
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

              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-slate-900">Sensitive Index</h4>
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

              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-slate-900">Float Index</h4>
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
            <h3 className="text-2xl font-bold text-slate-900 mb-6">Top Performing Stocks</h3>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-slate-200">
                    <th className="text-left py-4 px-2 font-semibold text-slate-900">Symbol</th>
                    <th className="text-left py-4 px-2 font-semibold text-slate-900">Company</th>
                    <th className="text-right py-4 px-2 font-semibold text-slate-900">Price</th>
                    <th className="text-right py-4 px-2 font-semibold text-slate-900">Change</th>
                    <th className="text-right py-4 px-2 font-semibold text-slate-900">Volume</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-2">
                      <span className="font-bold text-slate-900 text-lg">NICL</span>
                    </td>
                    <td className="py-4 px-2 text-slate-700">Nepal Investment Bank Limited</td>
                    <td className="py-4 px-2 text-right font-bold text-slate-900">
                      Rs. 450.50
                    </td>
                    <td className="py-4 px-2 text-right font-bold text-green-600">
                      +2.8%
                    </td>
                    <td className="py-4 px-2 text-right text-slate-600">
                      150,000
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-2">
                      <span className="font-bold text-slate-900 text-lg">NABIL</span>
                    </td>
                    <td className="py-4 px-2 text-slate-700">Nabil Bank Limited</td>
                    <td className="py-4 px-2 text-right font-bold text-slate-900">
                      Rs. 520.75
                    </td>
                    <td className="py-4 px-2 text-right font-bold text-red-600">
                      -1.6%
                    </td>
                    <td className="py-4 px-2 text-right text-slate-600">
                      120,000
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="py-4 px-2">
                      <span className="font-bold text-slate-900 text-lg">SCB</span>
                    </td>
                    <td className="py-4 px-2 text-slate-700">Standard Chartered Bank Nepal Limited</td>
                    <td className="py-4 px-2 text-right font-bold text-slate-900">
                      Rs. 380.25
                    </td>
                    <td className="py-4 px-2 text-right font-bold text-green-600">
                      +1.5%
                    </td>
                    <td className="py-4 px-2 text-right text-slate-600">
                      95,000
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Market Summary */}
          <div className="bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-xl p-6">
            <h3 className="text-xl font-bold text-slate-900 mb-4">Market Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
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
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">Sagarmatha Investments</h3>
            <p className="text-slate-400 mb-4">Your trusted partner in financial growth</p>
            <p className="text-sm text-slate-500">
              Data updated: {new Date().toLocaleString()}
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
