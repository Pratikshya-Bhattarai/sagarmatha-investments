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
import { apiClient, ChartData, NEPSEIndexData, NEPSEStockData } from '@/lib/api';

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

interface NEPSELiveDataProps {
  className?: string;
}

export default function NEPSELiveData({ className = '' }: NEPSELiveDataProps) {
  const [indexData, setIndexData] = useState<NEPSEIndexData | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [topGainers, setTopGainers] = useState<NEPSEStockData[]>([]);
  const [topLosers, setTopLosers] = useState<NEPSEStockData[]>([]);
  const [mostActive, setMostActive] = useState<NEPSEStockData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<number>(30);

  useEffect(() => {
    fetchData();
    // Set up auto-refresh every 5 minutes
    const interval = setInterval(fetchData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [selectedTimeframe]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch all data in parallel
      const [
        indexResponse,
        chartResponse,
        gainersResponse,
        losersResponse,
        activeResponse,
      ] = await Promise.all([
        apiClient.getLatestNEPSEIndex(),
        apiClient.getNEPSEIndexChartData(selectedTimeframe),
        apiClient.getTopGainers(5),
        apiClient.getTopLosers(5),
        apiClient.getMostActive(5),
      ]);

      setIndexData(indexResponse.data);
      setChartData(chartResponse.data);
      setTopGainers(gainersResponse.data);
      setTopLosers(losersResponse.data);
      setMostActive(activeResponse.data);
    } catch (err) {
      console.error('Error fetching NEPSE data:', err);
      setError('Failed to fetch live data. Please try again later.');
    } finally {
      setLoading(false);
    }
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
        text: `NEPSE Index - Last ${selectedTimeframe} Days`,
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
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Volume',
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    interaction: {
      intersect: false,
      mode: 'index' as const,
    },
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

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Header with timeframe selector */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Live NEPSE Data</h2>
        <div className="flex space-x-2">
          {[7, 30, 90, 365].map((days) => (
            <button
              key={days}
              onClick={() => setSelectedTimeframe(days)}
              className={`px-3 py-1 rounded text-sm ${
                selectedTimeframe === days
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {days === 365 ? '1Y' : `${days}D`}
            </button>
          ))}
        </div>
      </div>

      {/* Current Index Display */}
      {indexData && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <p className="text-sm text-gray-600">Current Index</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatNumber(indexData.close_price)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Change</p>
              <p className={`text-xl font-bold ${
                indexData.close_price > indexData.open_price ? 'text-green-600' : 'text-red-600'
              }`}>
                {formatNumber(indexData.close_price - indexData.open_price)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Volume</p>
              <p className="text-xl font-bold text-gray-800">
                {formatNumber(indexData.volume)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Turnover</p>
              <p className="text-xl font-bold text-gray-800">
                {formatCurrency(indexData.turnover)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Chart */}
      {chartData && (
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
              <div key={stock.id} className="flex justify-between items-center">
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
              <div key={stock.id} className="flex justify-between items-center">
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
              <div key={stock.id} className="flex justify-between items-center">
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