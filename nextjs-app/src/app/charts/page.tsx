"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { ChartComponent, generatePortfolioData, generateAssetAllocationData, generateMonthlyReturnsData } from "@/components/charts/chart-component"
import { TradingViewWidget, TradingViewMiniChart, TradingViewMarketOverview } from "@/components/charts/tradingview-widget"
import { NEPSERealData } from "@/components/charts/nepse-real-data"

export default function Charts() {
  return (
    <div className="min-h-screen bg-background text-text">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      
      <Navbar />
      
      <main id="main" className="relative pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Investment Analytics
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Real-time market data, portfolio performance, and comprehensive investment insights
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Performance Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Portfolio Performance
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Track your investment growth with detailed performance analytics
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <ChartComponent
                  type="line"
                  data={generatePortfolioData()}
                  title="Portfolio vs Market Performance"
                  className="h-80"
                />
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <ChartComponent
                  type="doughnut"
                  data={generateAssetAllocationData()}
                  title="Asset Allocation"
                  className="h-80"
                />
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <ChartComponent
                type="bar"
                data={generateMonthlyReturnsData()}
                title="Monthly Returns (%)"
                className="h-80"
              />
            </div>
          </div>
        </section>

        {/* NEPSE Real Data Section */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <NEPSERealData />
          </div>
        </section>

        {/* Live Market Data Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                International Market Data
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Real-time market analysis with TradingView integration
              </p>
            </div>

            {/* TradingView Advanced Chart */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Advanced Chart Analysis</h3>
              <div className="h-96">
                <TradingViewWidget 
                  symbol="AAPL"
                  interval="D"
                  theme="light"
                  height={400}
                />
              </div>
            </div>

            {/* Mini Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Apple Inc. (AAPL)</h4>
                <TradingViewMiniChart symbol="AAPL" />
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Microsoft Corp. (MSFT)</h4>
                <TradingViewMiniChart symbol="MSFT" />
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h4 className="text-lg font-semibold text-slate-900 mb-4">Google (GOOGL)</h4>
                <TradingViewMiniChart symbol="GOOGL" />
              </div>
            </div>

            {/* Market Overview */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Global Market Overview</h3>
              <TradingViewMarketOverview theme="light" />
            </div>
          </div>
        </section>

        {/* Investment Insights Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                Investment Insights
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Data-driven insights to help you make informed investment decisions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">+12.5%</div>
                <div className="text-slate-600">YTD Return</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">$140K</div>
                <div className="text-slate-600">Portfolio Value</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-purple-600 mb-2">8.2%</div>
                <div className="text-slate-600">Sharpe Ratio</div>
              </div>
              
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-2">15.3%</div>
                <div className="text-slate-600">Volatility</div>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}
