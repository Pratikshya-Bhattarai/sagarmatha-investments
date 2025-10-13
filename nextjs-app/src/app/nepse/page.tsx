"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ScrollToTop } from "@/components/ui/scroll-to-top"
import { NEPSERealData } from "@/components/charts/nepse-real-data"

export default function NEPSEPage() {
  return (
    <div className="min-h-screen bg-background text-text">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      
      <Navbar />
      
      <main id="main" className="relative pt-16">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-green-600 via-blue-600 to-indigo-800 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                NEPSE Market Data
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Real-time Nepal Stock Exchange data with historical analysis and market insights
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-sm text-blue-200">Live Market Data</div>
                  <div className="text-lg font-semibold">Real-time Updates</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-sm text-blue-200">Historical Analysis</div>
                  <div className="text-lg font-semibold">30-Day Trends</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2">
                  <div className="text-sm text-blue-200">Market Insights</div>
                  <div className="text-lg font-semibold">Top Performers</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* NEPSE Data Section */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <NEPSERealData />
          </div>
        </section>

        {/* Market Information */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                About NEPSE
              </h2>
              <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                The Nepal Stock Exchange (NEPSE) is the primary stock exchange of Nepal, 
                facilitating trading of securities and providing market infrastructure.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="text-3xl mb-4">📈</div>
                <h3 className="text-xl font-semibold mb-2">Market Indices</h3>
                <p className="text-slate-600">
                  Track NEPSE Index, Sensitive Index, and Float Index performance with real-time updates.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="text-3xl mb-4">🏦</div>
                <h3 className="text-xl font-semibold mb-2">Banking Sector</h3>
                <p className="text-slate-600">
                  Monitor major banks including NICL, NABIL, SCB, HBL, and other leading financial institutions.
                </p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Historical Data</h3>
                <p className="text-slate-600">
                  Access 30-day historical data with OHLC prices, volume, and turnover information.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trading Hours */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">NEPSE Trading Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Trading Hours</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Market Open:</span>
                      <span className="font-semibold">11:00 AM NPT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Market Close:</span>
                      <span className="font-semibold">3:00 PM NPT</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Trading Days:</span>
                      <span className="font-semibold">Sunday - Thursday</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-4">Market Statistics</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-600">Total Listed Companies:</span>
                      <span className="font-semibold">250+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Market Capitalization:</span>
                      <span className="font-semibold">4.2T NPR</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-600">Daily Turnover:</span>
                      <span className="font-semibold">2.1B NPR</span>
                    </div>
                  </div>
                </div>
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
