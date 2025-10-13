"use client"

import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ScrollToTop } from "@/components/ui/scroll-to-top"

export default function APIDocs() {
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
                NEPSE API Documentation
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
                Real-time Nepal Stock Exchange data integration for your applications
              </p>
            </div>
          </div>
        </section>

        {/* API Overview */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
                API Overview
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                Access live NEPSE market data through our RESTful API endpoints
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="text-3xl mb-4">📊</div>
                <h3 className="text-xl font-semibold mb-2">Real-time Data</h3>
                <p className="text-slate-600">Get live stock prices, indices, and market statistics</p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="text-3xl mb-4">🔒</div>
                <h3 className="text-xl font-semibold mb-2">Secure Access</h3>
                <p className="text-slate-600">API key authentication with rate limiting</p>
              </div>
              
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="text-3xl mb-4">⚡</div>
                <h3 className="text-xl font-semibold mb-2">Fast Response</h3>
                <p className="text-slate-600">Optimized endpoints with sub-second response times</p>
              </div>
            </div>
          </div>
        </section>

        {/* Authentication */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Authentication</h2>
            
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">API Key</h3>
              <p className="text-slate-600 mb-4">Include your API key in the request header:</p>
              <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                <div>Authorization: Bearer YOUR_API_KEY</div>
                <div>Content-Type: application/json</div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-semibold mb-4">Rate Limits</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Free Tier</h4>
                  <ul className="text-slate-600 space-y-1">
                    <li>• 100 requests/hour</li>
                    <li>• Basic market data</li>
                    <li>• 15-minute delay</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Premium Tier</h4>
                  <ul className="text-slate-600 space-y-1">
                    <li>• 1000 requests/hour</li>
                    <li>• Real-time data</li>
                    <li>• Historical data access</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* API Endpoints */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">API Endpoints</h2>

            {/* Market Overview */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">GET</span>
                <code className="text-lg font-mono bg-slate-100 px-3 py-1 rounded">/api/v1/market/overview</code>
              </div>
              <p className="text-slate-600 mb-4">Get overall market statistics and indices</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Response Example:</h4>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "status": "success",
  "data": {
    "nepse_index": {
      "current": 2847.23,
      "change": 45.67,
      "change_percent": 1.63
    },
    "sensitive_index": {
      "current": 567.89,
      "change": 12.34,
      "change_percent": 2.22
    },
    "float_index": {
      "current": 198.45,
      "change": -2.11,
      "change_percent": -1.05
    },
    "market_cap": "4.2T",
    "total_turnover": "2.1B",
    "total_volume": 1250000,
    "total_trades": 15420,
    "last_updated": "2024-01-15T15:30:00Z"
  }
}`}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Stock List */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">GET</span>
                <code className="text-lg font-mono bg-slate-100 px-3 py-1 rounded">/api/v1/stocks</code>
              </div>
              <p className="text-slate-600 mb-4">Get list of all traded stocks with current prices</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Query Parameters:</h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li><code className="bg-slate-200 px-2 py-1 rounded">limit</code> - Number of results (default: 50, max: 100)</li>
                      <li><code className="bg-slate-200 px-2 py-1 rounded">offset</code> - Offset for pagination (default: 0)</li>
                      <li><code className="bg-slate-200 px-2 py-1 rounded">sector</code> - Filter by sector (banking, insurance, etc.)</li>
                      <li><code className="bg-slate-200 px-2 py-1 rounded">sort</code> - Sort by field (price, change, volume)</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Response Example:</h4>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "status": "success",
  "data": {
    "stocks": [
      {
        "symbol": "NICL",
        "company_name": "Nepal Investment Bank Limited",
        "sector": "Banking",
        "current_price": 425.50,
        "change": 5.25,
        "change_percent": 1.25,
        "volume": 12500,
        "turnover": 5318750,
        "high_52w": 450.00,
        "low_52w": 380.00,
        "market_cap": "12.5B",
        "pe_ratio": 15.2,
        "last_trade_time": "2024-01-15T15:25:00Z"
      }
    ],
    "pagination": {
      "total": 250,
      "limit": 50,
      "offset": 0,
      "has_next": true
    }
  }
}`}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Individual Stock */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">GET</span>
                <code className="text-lg font-mono bg-slate-100 px-3 py-1 rounded">/api/v1/stocks/&#123;symbol&#125;</code>
              </div>
              <p className="text-slate-600 mb-4">Get detailed information for a specific stock</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Path Parameters:</h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li><code className="bg-slate-200 px-2 py-1 rounded">symbol</code> - Stock symbol (e.g., NICL, NABIL, SCB)</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Response Example:</h4>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "status": "success",
  "data": {
    "symbol": "NICL",
    "company_name": "Nepal Investment Bank Limited",
    "sector": "Banking",
    "current_price": 425.50,
    "open": 420.25,
    "high": 430.00,
    "low": 418.50,
    "close": 425.50,
    "change": 5.25,
    "change_percent": 1.25,
    "volume": 12500,
    "turnover": 5318750,
    "high_52w": 450.00,
    "low_52w": 380.00,
    "market_cap": "12.5B",
    "pe_ratio": 15.2,
    "dividend_yield": 2.5,
    "book_value": 285.75,
    "eps": 28.00,
    "last_trade_time": "2024-01-15T15:25:00Z",
    "technical_indicators": {
      "rsi": 65.4,
      "macd": 2.15,
      "sma_20": 415.20,
      "sma_50": 405.80
    }
  }
}`}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Historical Data */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">GET</span>
                <code className="text-lg font-mono bg-slate-100 px-3 py-1 rounded">/api/v1/stocks/&#123;symbol&#125;/history</code>
              </div>
              <p className="text-slate-600 mb-4">Get historical price data for a stock</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Query Parameters:</h4>
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <ul className="space-y-2 text-sm">
                      <li><code className="bg-slate-200 px-2 py-1 rounded">from</code> - Start date (YYYY-MM-DD)</li>
                      <li><code className="bg-slate-200 px-2 py-1 rounded">to</code> - End date (YYYY-MM-DD)</li>
                      <li><code className="bg-slate-200 px-2 py-1 rounded">interval</code> - Data interval (1d, 1w, 1m)</li>
                    </ul>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Response Example:</h4>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "status": "success",
  "data": {
    "symbol": "NICL",
    "history": [
      {
        "date": "2024-01-15",
        "open": 420.25,
        "high": 430.00,
        "low": 418.50,
        "close": 425.50,
        "volume": 12500,
        "turnover": 5318750
      },
      {
        "date": "2024-01-14",
        "open": 415.00,
        "high": 425.00,
        "low": 412.50,
        "close": 420.25,
        "volume": 11200,
        "turnover": 4706800
      }
    ]
  }
}`}</pre>
                  </div>
                </div>
              </div>
            </div>

            {/* Market Indices */}
            <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">GET</span>
                <code className="text-lg font-mono bg-slate-100 px-3 py-1 rounded">/api/v1/indices</code>
              </div>
              <p className="text-slate-600 mb-4">Get all market indices and their performance</p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-2">Response Example:</h4>
                  <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <pre>{`{
  "status": "success",
  "data": {
    "indices": [
      {
        "name": "NEPSE Index",
        "symbol": "NEPSE",
        "current": 2847.23,
        "change": 45.67,
        "change_percent": 1.63,
        "high_52w": 3200.50,
        "low_52w": 2400.25
      },
      {
        "name": "Sensitive Index",
        "symbol": "SENSITIVE",
        "current": 567.89,
        "change": 12.34,
        "change_percent": 2.22,
        "high_52w": 600.00,
        "low_52w": 480.50
      }
    ]
  }
}`}</pre>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Examples */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Integration Examples</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* JavaScript/Node.js */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">JavaScript/Node.js</h3>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`const axios = require('axios');

const NEPSE_API_BASE = 'https://api.sagarmathainvestments.com';

async function getMarketOverview() {
  try {
    const response = await axios.get(
      \`\${NEPSE_API_BASE}/api/v1/market/overview\`,
      {
        headers: {
          'Authorization': 'Bearer YOUR_API_KEY',
          'Content-Type': 'application/json'
        }
      }
    );
    
    console.log('Market Overview:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching market data:', error);
  }
}

// Get specific stock data
async function getStockData(symbol) {
  const response = await axios.get(
    \`\${NEPSE_API_BASE}/api/v1/stocks/\${symbol}\`,
    {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY'
      }
    }
  );
  
  return response.data;
}`}</pre>
                </div>
              </div>

              {/* Python */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Python</h3>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`import requests
import json

NEPSE_API_BASE = 'https://api.sagarmathainvestments.com'
API_KEY = 'YOUR_API_KEY'

headers = {
    'Authorization': f'Bearer {API_KEY}',
    'Content-Type': 'application/json'
}

def get_market_overview():
    response = requests.get(
        f'{NEPSE_API_BASE}/api/v1/market/overview',
        headers=headers
    )
    
    if response.status_code == 200:
        return response.json()
    else:
        print(f'Error: {response.status_code}')
        return None

def get_stock_data(symbol):
    response = requests.get(
        f'{NEPSE_API_BASE}/api/v1/stocks/{{symbol}}',
        headers=headers
    )
    
    return response.json()

# Usage
market_data = get_market_overview()
stock_data = get_stock_data('NICL')`}</pre>
                </div>
              </div>

              {/* React/Next.js */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">React/Next.js</h3>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`import { useState, useEffect } from 'react';

const NEPSE_API_BASE = 'https://api.sagarmathainvestments.com';

export function useNEPSEData() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          \`\${NEPSE_API_BASE}/api/v1/market/overview\`,
          {
            headers: {
              'Authorization': 'Bearer YOUR_API_KEY',
              'Content-Type': 'application/json'
            }
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        
        const result = await response.json();
        setData(result.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
}`}</pre>
                </div>
              </div>

              {/* cURL */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-4">cURL</h3>
                <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <pre>{`# Get market overview
curl -X GET \\
  'https://api.sagarmathainvestments.com/api/v1/market/overview' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'

# Get specific stock data
curl -X GET \\
  'https://api.sagarmathainvestments.com/api/v1/stocks/NICL' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'

# Get historical data
curl -X GET \\
  'https://api.sagarmathainvestments.com/api/v1/stocks/NICL/history?from=2024-01-01&to=2024-01-15' \\
  -H 'Authorization: Bearer YOUR_API_KEY' \\
  -H 'Content-Type: application/json'`}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Error Handling */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-slate-900 mb-8">Error Handling</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-red-900 mb-4">Error Response Format</h3>
                <div className="bg-slate-900 text-red-400 p-4 rounded-lg font-mono text-sm">
                  <pre>{`{
  "status": "error",
  "error": {
    "code": "INVALID_SYMBOL",
    "message": "Stock symbol not found",
    "details": "The symbol 'INVALID' does not exist"
  },
  "timestamp": "2024-01-15T15:30:00Z"
}`}</pre>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="text-xl font-semibold text-yellow-900 mb-4">Common Error Codes</h3>
                <div className="space-y-2 text-sm">
                  <div><code className="bg-yellow-200 px-2 py-1 rounded">400</code> - Bad Request</div>
                  <div><code className="bg-yellow-200 px-2 py-1 rounded">401</code> - Unauthorized</div>
                  <div><code className="bg-yellow-200 px-2 py-1 rounded">403</code> - Forbidden</div>
                  <div><code className="bg-yellow-200 px-2 py-1 rounded">404</code> - Not Found</div>
                  <div><code className="bg-yellow-200 px-2 py-1 rounded">429</code> - Rate Limited</div>
                  <div><code className="bg-yellow-200 px-2 py-1 rounded">500</code> - Server Error</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section className="py-16 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Get Started</h2>
            <p className="text-lg text-slate-600 mb-8">
              Ready to integrate NEPSE data into your application?
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/contact" 
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                Request API Access
              </a>
              <a 
                href="mailto:api@sagarmathainvestments.com" 
                className="inline-flex items-center px-6 py-3 border border-slate-300 text-base font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 transition-colors"
              >
                Contact Support
              </a>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      <ScrollToTop />
    </div>
  )
}
