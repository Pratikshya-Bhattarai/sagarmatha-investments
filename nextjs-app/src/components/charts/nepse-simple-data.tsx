'use client';

import React, { useState, useEffect } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface NEPSEData {
  indices: any[];
  stocks: any[];
  historical: any[];
  last_updated: string;
  source: string;
  message: string;
}

interface NEPSESimpleDataProps {
  className?: string;
}

export default function NEPSESimpleData({ className = '' }: NEPSESimpleDataProps) {
  const [data, setData] = useState<NEPSEData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData();
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('Fetching NEPSE data...');
      const response = await fetch('/api/nepse');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      console.log('NEPSE data received:', result);
      setData(result);
    } catch (err) {
      console.error('Error fetching NEPSE data:', err);
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-NP').format(num);
  };

  const formatCurrency = (num: number) => {
    return new Intl.NumberFormat('en-NP', {
      style: 'currency',
      currency: 'NPR',
      minimumFractionDigits: 2,
    }).format(num);
  };

  const formatPercent = (num: number) => {
    return `${num >= 0 ? '+' : ''}${num.toFixed(2)}%`;
  };

  if (loading) {
    return (
      <div className={`flex items-center justify-center h-96 ${className}`}>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex items-center justify-center h-96 ${className}`}>
        <div className="text-center">
          <div className="text-red-600 text-xl mb-4">⚠️</div>
          <p className="text-red-600">{error}</p>
          <button
            onClick={fetchData}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`flex items-center justify-center h-96 ${className}`}>
        <p className="text-gray-600">No data available</p>
      </div>
    );
  }

  // Prepare chart data from historical data
  const chartData = {
    labels: data.historical.map(item => item.date),
    datasets: [
      {
        label: 'NEPSE Index',
        data: data.historical.map(item => item.close),
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1,
        fill: true,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'NEPSE Index Historical Data',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Index Value',
        },
      },
    },
  };

  // Get top gainers and losers
  const topGainers = data.stocks
    .filter(stock => stock.change_percent > 0)
    .sort((a, b) => b.change_percent - a.change_percent)
    .slice(0, 5);

  const topLosers = data.stocks
    .filter(stock => stock.change_percent < 0)
    .sort((a, b) => a.change_percent - b.change_percent)
    .slice(0, 5);

  const mostActive = data.stocks
    .sort((a, b) => b.volume - a.volume)
    .slice(0, 5);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">NEPSE Market Data</h2>
        <div className="text-sm text-gray-600">
          Source: {data.source} | Last updated: {new Date(data.last_updated).toLocaleString()}
        </div>
      </div>

      {/* Current Index Display */}
      {data.indices.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Current Indices</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.indices.map((index, idx) => (
              <div key={idx} className="text-center p-4 border rounded-lg">
                <p className="text-sm text-gray-600">{index.name}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatNumber(index.current)}
                </p>
                <p className={`text-lg ${
                  index.change_percent >= 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {formatPercent(index.change_percent)}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Chart */}
      {data.historical.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="h-96">
            <Line data={chartData} options={chartOptions} />
          </div>
        </div>
      )}

      {/* Market Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top Gainers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-green-600 mb-4">Top Gainers</h3>
          <div className="space-y-3">
            {topGainers.map((stock, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{stock.symbol}</p>
                  <p className="text-sm text-gray-600">{stock.company_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600">
                    {formatPercent(stock.change_percent)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(stock.current_price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Losers */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-red-600 mb-4">Top Losers</h3>
          <div className="space-y-3">
            {topLosers.map((stock, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{stock.symbol}</p>
                  <p className="text-sm text-gray-600">{stock.company_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600">
                    {formatPercent(stock.change_percent)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(stock.current_price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Most Active */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-blue-600 mb-4">Most Active</h3>
          <div className="space-y-3">
            {mostActive.map((stock, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{stock.symbol}</p>
                  <p className="text-sm text-gray-600">{stock.company_name}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-blue-600">
                    {formatNumber(stock.volume)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {formatCurrency(stock.current_price)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Refresh Button */}
      <div className="text-center">
        <button
          onClick={fetchData}
          disabled={loading}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>
    </div>
  );
}
