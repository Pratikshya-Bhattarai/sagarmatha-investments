"use client"

import Link from "next/link"
import { ChartComponent, generatePortfolioData, generateAssetAllocationData } from "@/components/charts/chart-component"
import { TradingViewMiniChart } from "@/components/charts/tradingview-widget"
import { NEPSERealData } from "@/components/charts/nepse-real-data"

export function ChartsSection() {
  return (
    <section id="charts" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Investment Analytics
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-8">
            Real-time portfolio performance and market insights to guide your investment decisions
          </p>
          <Link 
            href="/charts"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            View Full Analytics
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Portfolio Performance Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Portfolio Performance</h3>
            <ChartComponent
              type="line"
              data={generatePortfolioData()}
              className="h-64"
            />
          </div>

          {/* Asset Allocation Chart */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-slate-900 mb-4">Asset Allocation</h3>
            <ChartComponent
              type="doughnut"
              data={generateAssetAllocationData()}
              className="h-64"
            />
          </div>
        </div>

        {/* NEPSE Live Data Preview */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-slate-900">NEPSE Live Data</h3>
            <Link 
              href="/charts"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              View Full Data →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-sm text-slate-600 mb-1">NEPSE Index</div>
              <div className="text-2xl font-bold text-slate-900">2,847.23</div>
              <div className="text-sm text-green-600">+45.67 (+1.63%)</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-sm text-slate-600 mb-1">Sensitive Index</div>
              <div className="text-2xl font-bold text-slate-900">567.89</div>
              <div className="text-sm text-green-600">+12.34 (+2.22%)</div>
            </div>
            <div className="bg-slate-50 rounded-lg p-4">
              <div className="text-sm text-slate-600 mb-1">Float Index</div>
              <div className="text-2xl font-bold text-slate-900">198.45</div>
              <div className="text-sm text-red-600">-2.11 (-1.05%)</div>
            </div>
          </div>
        </div>

        {/* International Market Data */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-slate-900 mb-6">International Markets</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="text-lg font-medium text-slate-700 mb-3">Apple Inc. (AAPL)</h4>
              <TradingViewMiniChart symbol="AAPL" />
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-slate-700 mb-3">Microsoft Corp. (MSFT)</h4>
              <TradingViewMiniChart symbol="MSFT" />
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-slate-700 mb-3">Google (GOOGL)</h4>
              <TradingViewMiniChart symbol="GOOGL" />
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-green-600">+12.5%</div>
            <div className="text-sm text-slate-600">YTD Return</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">$140K</div>
            <div className="text-sm text-slate-600">Portfolio Value</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">8.2</div>
            <div className="text-sm text-slate-600">Sharpe Ratio</div>
          </div>
          
          <div className="bg-white rounded-lg shadow p-4 text-center">
            <div className="text-2xl font-bold text-orange-600">15.3%</div>
            <div className="text-sm text-slate-600">Volatility</div>
          </div>
        </div>
      </div>
    </section>
  )
}
