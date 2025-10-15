'use client';

import { useState } from 'react';
import { apiClient } from '@/lib/api';

interface StockPriceData {
  symbol: string;
  company_name: string;
  current_price: number;
  change: number;
  change_percent: number;
  volume: number;
  last_trade_time: string;
  sector: string;
  high_52w: number;
  low_52w: number;
  market_cap: string;
  pe_ratio: number | null;
}

export default function StockSearch() {
  const [symbol, setSymbol] = useState('');
  const [stockData, setStockData] = useState<StockPriceData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!symbol.trim()) return;

    setLoading(true);
    setError(null);
    setStockData(null);

    try {
      const response = await apiClient.request<StockPriceData>(`/stocks/latest_price/?symbol=${symbol.toUpperCase()}`);
      setStockData(response.data);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch stock data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Stock Price Lookup</h2>
      
      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex space-x-4">
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            placeholder="Enter stock symbol (e.g., NICL, NABIL)"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Searching...' : 'Search'}
          </button>
        </div>
      </form>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      {stockData && (
        <div className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">{stockData.symbol}</h3>
              <p className="text-gray-600">{stockData.company_name}</p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold text-blue-600">
                ₹{stockData.current_price.toFixed(2)}
              </p>
              <div className={`flex items-center space-x-2 ${stockData.change_percent >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                <span className="text-lg font-semibold">
                  {stockData.change_percent >= 0 ? '+' : ''}{stockData.change.toFixed(2)}
                </span>
                <span className="text-lg font-semibold">
                  ({stockData.change_percent >= 0 ? '+' : ''}{stockData.change_percent.toFixed(2)}%)
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-500">Sector</p>
              <p className="font-semibold text-gray-900">{stockData.sector}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Volume</p>
              <p className="font-semibold text-gray-900">{stockData.volume.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">52W High</p>
              <p className="font-semibold text-green-600">₹{stockData.high_52w.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">52W Low</p>
              <p className="font-semibold text-red-600">₹{stockData.low_52w.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Market Cap</p>
              <p className="font-semibold text-gray-900">{stockData.market_cap}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">P/E Ratio</p>
              <p className="font-semibold text-gray-900">
                {stockData.pe_ratio ? stockData.pe_ratio.toFixed(2) : 'N/A'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Last Trade</p>
              <p className="font-semibold text-gray-900">
                {new Date(stockData.last_trade_time).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
