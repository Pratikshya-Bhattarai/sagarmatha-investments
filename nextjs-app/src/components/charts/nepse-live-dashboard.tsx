'use client';

import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
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
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface NEPSELiveData {
  indices: any[];
  stocks: any[];
  historical: any[];
  last_updated: string;
  source: string;
  message: string;
}

export default function NEPSELiveDashboard() {
  const [data, setData] = useState<NEPSELiveData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());
  const [autoRefresh, setAutoRefresh] = useState(true);

  useEffect(() => {
    fetchData();
    
    // Set up auto-refresh every 2 minutes for live data
    const interval = setInterval(() => {
      if (autoRefresh) {
        fetchData();
      }
    }, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('/api/nepse');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
      setData(result);
      setLastUpdate(new Date());
    } catch (err) {
      console.error('Error fetching live NEPSE data:', err);
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

  // Live Market Overview
  const getLiveMarketData = () => {
    if (!data?.stocks) return null;
    
    const totalStocks = data.stocks.length;
    const gainers = data.stocks.filter(stock => stock.change_percent > 0).length;
    const losers = data.stocks.filter(stock => stock.change_percent < 0).length;
    const unchanged = totalStocks - gainers - losers;
    
    const totalVolume = data.stocks.reduce((sum, stock) => sum + stock.volume, 0);
    const totalTurnover = data.stocks.reduce((sum, stock) => sum + stock.turnover, 0);
    
    return {
      totalStocks,
      gainers,
      losers,
      unchanged,
      totalVolume,
      totalTurnover,
    };
  };

  // Live Price Movement Chart
  const getLivePriceData = () => {
    if (!data?.historical) return null;
    
    const recentData = data.historical.slice(0, 10).reverse();
    
    return {
      labels: recentData.map(item => new Date(item.date).toLocaleDateString()),
      datasets: [
        {
          label: 'NEPSE Index',
          data: recentData.map(item => item.close),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
      ],
    };
  };

  // Live Volume Chart
  const getLiveVolumeData = () => {
    if (!data?.historical) return null;
    
    const recentData = data.historical.slice(0, 10).reverse();
    
    return {
      labels: recentData.map(item => new Date(item.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Volume',
          data: recentData.map(item => item.volume),
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Top Gainers and Losers
  const getTopPerformers = () => {
    if (!data?.stocks) return { gainers: [], losers: [] };
    
    const sortedStocks = [...data.stocks].sort((a, b) => b.change_percent - a.change_percent);
    
    return {
      gainers: sortedStocks.slice(0, 5),
      losers: sortedStocks.slice(-5).reverse(),
    };
  };

  // Sector Performance
  const getSectorPerformance = () => {
    if (!data?.stocks) return null;
    
    const sectorData = data.stocks.reduce((acc, stock) => {
      if (!acc[stock.sector]) {
        acc[stock.sector] = { total: 0, count: 0, avgChange: 0 };
      }
      acc[stock.sector].total += stock.change_percent;
      acc[stock.sector].count += 1;
      acc[stock.sector].avgChange = acc[stock.sector].total / acc[stock.sector].count;
      return acc;
    }, {} as Record<string, any>);
    
    const sectors = Object.keys(sectorData);
    const avgChanges = Object.values(sectorData).map((sector: any) => sector.avgChange);
    
    return {
      labels: sectors,
      datasets: [
        {
          label: 'Average Change %',
          data: avgChanges,
          backgroundColor: avgChanges.map(change => 
            change >= 0 ? 'rgba(34, 197, 94, 0.8)' : 'rgba(239, 68, 68, 0.8)'
          ),
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const volumeChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  const marketData = getLiveMarketData();
  const performers = getTopPerformers();

  if (loading && !data) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading live NEPSE data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="text-red-600 text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading Live Data</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchData}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Header with Live Status */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-2"></div>
            <h1 className="text-4xl font-bold text-gray-900">Live NEPSE Market Data</h1>
          </div>
          <p className="text-lg text-gray-600 mb-4">
            Real-time stock market data from Nepal Stock Exchange
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>Last Updated: {lastUpdate.toLocaleTimeString()}</span>
            <button
              onClick={() => setAutoRefresh(!autoRefresh)}
              className={`px-3 py-1 rounded-full text-xs ${
                autoRefresh 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              {autoRefresh ? 'Auto-refresh ON' : 'Auto-refresh OFF'}
            </button>
            <button
              onClick={fetchData}
              disabled={loading}
              className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs hover:bg-blue-200 disabled:opacity-50"
            >
              {loading ? 'Refreshing...' : 'Refresh Now'}
            </button>
          </div>
        </div>

        {/* Live Market Overview */}
        {marketData && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{marketData.totalStocks}</div>
              <div className="text-sm text-gray-500">Total Stocks</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{marketData.gainers}</div>
              <div className="text-sm text-gray-500">Gainers</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-red-600">{marketData.losers}</div>
              <div className="text-sm text-gray-500">Losers</div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{marketData.unchanged}</div>
              <div className="text-sm text-gray-500">Unchanged</div>
            </div>
          </div>
        )}

        {/* Market Indices */}
        {data?.indices && data.indices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {data.indices.map((index, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md p-6">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-700 mb-2">{index.name}</h3>
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {formatNumber(index.current)}
                  </div>
                  <div className={`text-lg font-semibold ${
                    index.change_percent >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {formatPercent(index.change_percent)}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {index.change >= 0 ? '+' : ''}{formatNumber(index.change)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Live Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Live Price Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Live Price Movement</h3>
            <div className="h-80">
              {getLivePriceData() && (
                <Line data={getLivePriceData()!} options={chartOptions} />
              )}
            </div>
          </div>

          {/* Live Volume Chart */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Live Volume</h3>
            <div className="h-80">
              {getLiveVolumeData() && (
                <Bar data={getLiveVolumeData()!} options={volumeChartOptions} />
              )}
            </div>
          </div>

          {/* Sector Performance */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Sector Performance</h3>
            <div className="h-80">
              {getSectorPerformance() && (
                <Bar data={getSectorPerformance()!} options={volumeChartOptions} />
              )}
            </div>
          </div>

          {/* Market Statistics */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Market Statistics</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Volume:</span>
                <span className="font-semibold">{formatNumber(marketData?.totalVolume || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Total Turnover:</span>
                <span className="font-semibold">{formatCurrency(marketData?.totalTurnover || 0)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Gainers:</span>
                <span className="font-semibold text-green-600">{marketData?.gainers || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Losers:</span>
                <span className="font-semibold text-red-600">{marketData?.losers || 0}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Performers */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Gainers */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-green-50">
              <h3 className="text-xl font-semibold text-green-800">Top Gainers</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {performers.gainers.map((stock, idx) => (
                <div key={idx} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <div className="font-semibold text-gray-900">{stock.symbol}</div>
                    <div className="text-sm text-gray-500">{stock.company_name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-green-600">
                      {formatPercent(stock.change_percent)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(stock.current_price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Losers */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-red-50">
              <h3 className="text-xl font-semibold text-red-800">Top Losers</h3>
            </div>
            <div className="divide-y divide-gray-200">
              {performers.losers.map((stock, idx) => (
                <div key={idx} className="px-6 py-4 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <div className="font-semibold text-gray-900">{stock.symbol}</div>
                    <div className="text-sm text-gray-500">{stock.company_name}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-red-600">
                      {formatPercent(stock.change_percent)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {formatCurrency(stock.current_price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Data Source Info */}
        <div className="text-center text-sm text-gray-500">
          <p>Data Source: {data?.source || 'NEPSE'} | Last Updated: {data?.last_updated ? new Date(data.last_updated).toLocaleString() : 'N/A'}</p>
          <p className="mt-1">Auto-refresh: {autoRefresh ? 'Every 2 minutes' : 'Disabled'}</p>
        </div>
      </div>
    </div>
  );
}
