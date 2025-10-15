'use client';

import { useState, useEffect } from 'react';
import { apiClient, NEPSEIndexData, NEPSEStockData, NEPSEIndicesData } from '@/lib/api';
import CandlestickChart from '@/components/charts/CandlestickChart';
import StockCard from '@/components/ui/StockCard';
import IndexCard from '@/components/ui/IndexCard';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import StockSearch from '@/components/StockSearch';

export default function HomePage() {
  const [nepseIndex, setNepseIndex] = useState<NEPSEIndexData | null>(null);
  const [stocks, setStocks] = useState<NEPSEStockData[]>([]);
  const [indices, setIndices] = useState<NEPSEIndicesData[]>([]);
  const [chartData, setChartData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [indexResponse, stocksResponse, indicesResponse, chartResponse] = await Promise.all([
        apiClient.getLatestNEPSEIndex(),
        apiClient.getNEPSEStocks({ page_size: 10 }),
        apiClient.getNEPSEIndices({ page_size: 6 }),
        apiClient.getNEPSEIndexChartData(30)
      ]);

      setNepseIndex(indexResponse.data);
      setStocks(stocksResponse.data.results || stocksResponse.data);
      setIndices(indicesResponse.data.results || indicesResponse.data);
      setChartData(chartResponse.data);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load NEPSE data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Data</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchData}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sagarmatha Investments</h1>
              <p className="text-gray-600">NEPSE Market Analytics</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Last Updated</p>
              <p className="text-sm font-medium text-gray-900">
                {nepseIndex ? new Date(nepseIndex.updated_at).toLocaleString() : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* NEPSE Index Overview */}
        {nepseIndex && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">NEPSE Index</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-500">Current</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {nepseIndex.close_price?.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Open</p>
                  <p className="text-2xl font-semibold text-gray-900">
                    {nepseIndex.open_price?.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">High</p>
                  <p className="text-2xl font-semibold text-green-600">
                    {nepseIndex.high_price?.toFixed(2)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-500">Low</p>
                  <p className="text-2xl font-semibold text-red-600">
                    {nepseIndex.low_price?.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Candlestick Chart */}
        {chartData && (
          <div className="mb-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">NEPSE Index Chart (30 Days)</h2>
              <div className="h-96">
                <CandlestickChart data={chartData} />
              </div>
            </div>
          </div>
        )}

        {/* Market Indices */}
        {indices.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Market Indices</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {indices.map((index) => (
                <IndexCard key={index.id} index={index} />
              ))}
            </div>
          </div>
        )}

        {/* Stock Search */}
        <div className="mb-8">
          <StockSearch />
        </div>

        {/* Top Stocks */}
        {stocks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Top Stocks</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stocks.map((stock) => (
                <StockCard key={stock.id} stock={stock} />
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}