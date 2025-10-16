import React from 'react';
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import NEPSEComprehensiveDashboard from "@/components/charts/nepse-comprehensive-dashboard";
import NEPSELiveDashboard from "@/components/charts/nepse-live-dashboard";
import { ScrollToTop } from "@/components/ui/scroll-to-top";

export default function NEPSEDataPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Complete NEPSE Data Analytics
            </h1>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto">
              Comprehensive NEPSE market analysis with all chart types, real-time data, historical trends, 
              sector analysis, and detailed stock performance metrics for Nepal's stock market.
            </p>
          </div>
        </div>
        
        {/* Live Data Section */}
        <div className="mb-16">
          <div className="container mx-auto px-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Live Market Data</h2>
            <p className="text-lg text-gray-600">
              Real-time NEPSE market data with live updates, auto-refresh, and current market statistics.
            </p>
          </div>
          <NEPSELiveDashboard />
        </div>
        
        {/* Comprehensive Analytics Section */}
        <div className="mb-16">
          <div className="container mx-auto px-4 mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Comprehensive Analytics</h2>
            <p className="text-lg text-gray-600">
              Detailed market analysis with multiple chart types, historical data, sector distribution, 
              and performance metrics for in-depth market insights.
            </p>
          </div>
          <NEPSEComprehensiveDashboard />
        </div>
        
        {/* Chart Types Overview */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Available Chart Types</h2>
            <p className="text-lg text-gray-600">
              Our NEPSE analytics platform includes multiple chart types for comprehensive market analysis.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Line Charts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">📈</div>
                <h3 className="text-xl font-semibold mb-2">Line Charts</h3>
                <p className="text-gray-600 mb-4">
                  NEPSE index trends, price movements, and historical performance over time.
                </p>
                <ul className="text-sm text-gray-500 text-left">
                  <li>• NEPSE Index Trend</li>
                  <li>• Price Movement Analysis</li>
                  <li>• Historical Performance</li>
                  <li>• Multi-timeframe Views</li>
                </ul>
              </div>
            </div>
            
            {/* Bar Charts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Bar Charts</h3>
                <p className="text-gray-600 mb-4">
                  Trading volume, turnover analysis, and performance distribution metrics.
                </p>
                <ul className="text-sm text-gray-500 text-left">
                  <li>• Trading Volume</li>
                  <li>• Turnover Analysis</li>
                  <li>• Performance Distribution</li>
                  <li>• Sector Performance</li>
                </ul>
              </div>
            </div>
            
            {/* Doughnut Charts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🥧</div>
                <h3 className="text-xl font-semibold mb-2">Doughnut Charts</h3>
                <p className="text-gray-600 mb-4">
                  Sector distribution, market cap breakdown, and portfolio composition.
                </p>
                <ul className="text-sm text-gray-500 text-left">
                  <li>• Sector Distribution</li>
                  <li>• Market Cap Analysis</li>
                  <li>• Portfolio Composition</li>
                  <li>• Market Share</li>
                </ul>
              </div>
            </div>
            
            {/* Scatter Charts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🔍</div>
                <h3 className="text-xl font-semibold mb-2">Scatter Charts</h3>
                <p className="text-gray-600 mb-4">
                  Price vs volume analysis, correlation studies, and market relationships.
                </p>
                <ul className="text-sm text-gray-500 text-left">
                  <li>• Price vs Volume</li>
                  <li>• Correlation Analysis</li>
                  <li>• Market Relationships</li>
                  <li>• Risk Assessment</li>
                </ul>
              </div>
            </div>
            
            {/* Pie Charts */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🍰</div>
                <h3 className="text-xl font-semibold mb-2">Pie Charts</h3>
                <p className="text-gray-600 mb-4">
                  Market cap distribution, company size analysis, and market segmentation.
                </p>
                <ul className="text-sm text-gray-500 text-left">
                  <li>• Market Cap Distribution</li>
                  <li>• Company Size Analysis</li>
                  <li>• Market Segmentation</li>
                  <li>• Investment Categories</li>
                </ul>
              </div>
            </div>
            
            {/* Data Tables */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center">
                <div className="text-4xl mb-4">📋</div>
                <h3 className="text-xl font-semibold mb-2">Data Tables</h3>
                <p className="text-gray-600 mb-4">
                  Sortable stock listings, performance metrics, and detailed company information.
                </p>
                <ul className="text-sm text-gray-500 text-left">
                  <li>• Top Performers</li>
                  <li>• Stock Rankings</li>
                  <li>• Performance Metrics</li>
                  <li>• Company Details</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Overview */}
        <div className="container mx-auto px-4 py-16 bg-white">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-lg text-gray-600">
              Advanced features for comprehensive NEPSE market analysis and investment insights.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
              <p className="text-gray-600">
                Live market updates with auto-refresh every 2-5 minutes for current market conditions.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Responsive Design</h3>
              <p className="text-gray-600">
                Mobile-optimized charts and tables that work perfectly on all devices and screen sizes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-semibold mb-2">Interactive Charts</h3>
              <p className="text-gray-600">
                Zoom, pan, and interact with charts for detailed analysis and custom timeframes.
              </p>
            </div>
            
            <div className="text-center">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold mb-2">Multiple Timeframes</h3>
              <p className="text-gray-600">
                Analyze data across different time periods: 7D, 30D, 90D, and 1Y for comprehensive insights.
              </p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  );
}