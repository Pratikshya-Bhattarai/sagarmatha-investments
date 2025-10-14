'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface NEPSEData {
  indices: any[];
  stocks: any[];
  historical: any[];
  last_updated: string;
  source: string;
  message: string;
}

export default function MarketOverview() {
  const [data, setData] = useState<NEPSEData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/nepse');
      if (response.ok) {
        const result = await response.json();
        setData(result);
      }
    } catch (err) {
      console.error('Error fetching NEPSE data:', err);
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-NP').format(num);
  };

  const formatPercent = (num: number) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
            <p className="mt-4 text-white">Loading market data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4">
            Live NEPSE Market Data
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Real-time stock market insights from Nepal Stock Exchange
          </p>
        </div>

        {/* Market Indices */}
        {data?.indices && data.indices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {data.indices.map((index, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center">
                <h3 className="text-lg font-semibold text-white mb-2">{index.name}</h3>
                <div className="text-3xl font-bold text-white mb-2">
                  {formatNumber(index.current)}
                </div>
                <div className={`text-lg font-semibold ${
                  index.change_percent >= 0 ? 'text-green-300' : 'text-red-300'
                }`}>
                  {formatPercent(index.change_percent)}
                </div>
                <div className="text-sm text-blue-100 mt-1">
                  {index.change >= 0 ? '+' : ''}{formatNumber(index.change)}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Top Stocks Preview */}
        {data?.stocks && data.stocks.length > 0 && (
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
            <h3 className="text-xl font-semibold text-white mb-4">Top Performing Stocks</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {data.stocks.slice(0, 6).map((stock, idx) => (
                <div key={idx} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white">{stock.symbol}</div>
                      <div className="text-sm text-blue-100">{stock.company_name}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        Rs. {stock.current_price.toFixed(2)}
                      </div>
                      <div className={`text-sm ${
                        stock.change_percent >= 0 ? 'text-green-300' : 'text-red-300'
                      }`}>
                        {formatPercent(stock.change_percent)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center">
          <Link
            href="/charts"
            className="inline-flex items-center px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
          >
            View Detailed Analytics
            <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </Link>
        </div>

        {/* Data Source Info */}
        <div className="mt-8 text-center text-sm text-blue-100">
          <p>Data Source: {data?.source || 'NEPSE'} | Last Updated: {data?.last_updated ? new Date(data.last_updated).toLocaleString() : 'N/A'}</p>
        </div>
      </div>
    </section>
  );
}
