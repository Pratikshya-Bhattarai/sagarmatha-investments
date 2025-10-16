'use client';

import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut, Pie, Scatter } from 'react-chartjs-2';
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
  RadialLinearScale,
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
  Filler,
  RadialLinearScale
);

interface NEPSEData {
  indices: any[];
  stocks: any[];
  historical: any[];
  last_updated: string;
  source: string;
  message: string;
}

export default function NEPSEComprehensiveDashboard() {
  const [data, setData] = useState<NEPSEData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<number>(30);
  const [selectedChart, setSelectedChart] = useState<string>('overview');

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
      
      const response = await fetch('/api/nepse');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const result = await response.json();
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

  // Chart 1: NEPSE Index Trend (Line Chart)
  const getIndexTrendData = () => {
    if (!data?.historical) return null;
    
    const historicalData = data.historical.slice(0, selectedTimeframe).reverse();
    
    return {
      labels: historicalData.map(item => new Date(item.date).toLocaleDateString()),
      datasets: [
        {
          label: 'NEPSE Index',
          data: historicalData.map(item => item.close),
          borderColor: 'rgb(59, 130, 246)',
          backgroundColor: 'rgba(59, 130, 246, 0.1)',
          tension: 0.4,
          fill: true,
        },
        {
          label: 'Volume',
          data: historicalData.map(item => item.volume),
          borderColor: 'rgb(34, 197, 94)',
          backgroundColor: 'rgba(34, 197, 94, 0.1)',
          tension: 0.4,
          fill: false,
          yAxisID: 'y1',
        },
      ],
    };
  };

  // Chart 2: Trading Volume (Bar Chart)
  const getVolumeData = () => {
    if (!data?.historical) return null;
    
    const historicalData = data.historical.slice(0, selectedTimeframe).reverse();
    
    return {
      labels: historicalData.map(item => new Date(item.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Volume',
          data: historicalData.map(item => item.volume),
          backgroundColor: 'rgba(34, 197, 94, 0.8)',
          borderColor: 'rgb(34, 197, 94)',
          borderWidth: 1,
        },
        {
          label: 'Turnover',
          data: historicalData.map(item => item.turnover),
          backgroundColor: 'rgba(251, 191, 36, 0.8)',
          borderColor: 'rgb(251, 191, 36)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Chart 3: Sector Distribution (Doughnut Chart)
  const getSectorDistributionData = () => {
    if (!data?.stocks) return null;
    
    const sectorCounts = data.stocks.reduce((acc, stock) => {
      acc[stock.sector] = (acc[stock.sector] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const sectors = Object.keys(sectorCounts);
    const counts = Object.values(sectorCounts);
    
    return {
      labels: sectors,
      datasets: [
        {
          data: counts,
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(251, 191, 36, 0.8)',
            'rgba(239, 68, 68, 0.8)',
            'rgba(168, 85, 247, 0.8)',
            'rgba(236, 72, 153, 0.8)',
            'rgba(6, 182, 212, 0.8)',
            'rgba(245, 158, 11, 0.8)',
          ],
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    };
  };

  // Chart 4: Market Cap Distribution (Pie Chart)
  const getMarketCapData = () => {
    if (!data?.stocks) return null;
    
    const marketCapRanges = {
      'Large Cap (>10B)': 0,
      'Mid Cap (1B-10B)': 0,
      'Small Cap (<1B)': 0,
    };
    
    data.stocks.forEach(stock => {
      const marketCap = parseFloat(stock.market_cap?.replace(/[^\d.]/g, '') || '0');
      if (marketCap > 10000000000) {
        marketCapRanges['Large Cap (>10B)']++;
      } else if (marketCap > 1000000000) {
        marketCapRanges['Mid Cap (1B-10B)']++;
      } else {
        marketCapRanges['Small Cap (<1B)']++;
      }
    });
    
    return {
      labels: Object.keys(marketCapRanges),
      datasets: [
        {
          data: Object.values(marketCapRanges),
          backgroundColor: [
            'rgba(59, 130, 246, 0.8)',
            'rgba(34, 197, 94, 0.8)',
            'rgba(251, 191, 36, 0.8)',
          ],
          borderWidth: 2,
          borderColor: '#fff',
        },
      ],
    };
  };

  // Chart 5: Price vs Volume Scatter
  const getPriceVolumeData = () => {
    if (!data?.stocks) return null;
    
    return {
      datasets: [
        {
          label: 'Stocks',
          data: data.stocks.map(stock => ({
            x: stock.volume,
            y: stock.current_price,
          })),
          backgroundColor: 'rgba(59, 130, 246, 0.6)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    };
  };

  // Chart 6: Performance Distribution (Bar Chart)
  const getPerformanceData = () => {
    if (!data?.stocks) return null;
    
    const performanceRanges = {
      'Gainers (>5%)': 0,
      'Moderate Gain (0-5%)': 0,
      'Moderate Loss (0-5%)': 0,
      'Losers (>5%)': 0,
    };
    
    data.stocks.forEach(stock => {
      const change = stock.change_percent;
      if (change > 5) {
        performanceRanges['Gainers (>5%)']++;
      } else if (change > 0) {
        performanceRanges['Moderate Gain (0-5%)']++;
      } else if (change > -5) {
        performanceRanges['Moderate Loss (0-5%)']++;
      } else {
        performanceRanges['Losers (>5%)']++;
      }
    });
    
    return {
      labels: Object.keys(performanceRanges),
      datasets: [
        {
          label: 'Number of Stocks',
          data: Object.values(performanceRanges),
          backgroundColor: [
            'rgba(34, 197, 94, 0.8)',
            'rgba(59, 130, 246, 0.8)',
            'rgba(251, 191, 36, 0.8)',
            'rgba(239, 68, 68, 0.8)',
          ],
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

  const scatterOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        title: {
          display: true,
          text: 'Volume',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price (NPR)',
        },
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };

  if (loading) {
    return (
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-lg text-gray-600">Loading comprehensive NEPSE data...</p>
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
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error Loading NEPSE Data</h2>
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
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Comprehensive NEPSE Analytics Dashboard
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Complete market analysis with multiple chart types, real-time data, and detailed insights into Nepal's stock market performance.
          </p>
        </div>

        {/* Timeframe and Chart Type Selector */}
        <div className="flex justify-center mb-8 space-x-4">
          <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-md">
            {[7, 30, 90, 365].map((days) => (
              <button
                key={days}
                onClick={() => setSelectedTimeframe(days)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedTimeframe === days
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {days === 365 ? '1Y' : `${days}D`}
              </button>
            ))}
          </div>
          
          <div className="flex space-x-2 bg-white rounded-lg p-1 shadow-md">
            {['overview', 'volume', 'sectors', 'performance'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedChart(type)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
                  selectedChart === type
                    ? 'bg-green-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Market Overview Cards */}
        {data?.indices && data.indices.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* NEPSE Index Trend */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">NEPSE Index Trend</h3>
            <div className="h-80">
              {getIndexTrendData() && (
                <Line data={getIndexTrendData()!} options={chartOptions} />
              )}
            </div>
          </div>

          {/* Trading Volume */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Trading Volume & Turnover</h3>
            <div className="h-80">
              {getVolumeData() && (
                <Bar data={getVolumeData()!} options={volumeChartOptions} />
              )}
            </div>
          </div>

          {/* Sector Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Sector Distribution</h3>
            <div className="h-80">
              {getSectorDistributionData() && (
                <Doughnut data={getSectorDistributionData()!} options={doughnutOptions} />
              )}
            </div>
          </div>

          {/* Market Cap Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Market Cap Distribution</h3>
            <div className="h-80">
              {getMarketCapData() && (
                <Pie data={getMarketCapData()!} options={doughnutOptions} />
              )}
            </div>
          </div>

          {/* Price vs Volume Scatter */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Price vs Volume Analysis</h3>
            <div className="h-80">
              {getPriceVolumeData() && (
                <Scatter data={getPriceVolumeData()!} options={scatterOptions} />
              )}
            </div>
          </div>

          {/* Performance Distribution */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-4">Stock Performance Distribution</h3>
            <div className="h-80">
              {getPerformanceData() && (
                <Bar data={getPerformanceData()!} options={volumeChartOptions} />
              )}
            </div>
          </div>
        </div>

        {/* Top Stocks Table */}
        {data?.stocks && data.stocks.length > 0 && (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-xl font-semibold">Top Performing Stocks</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Symbol
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sector
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Change
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Volume
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Market Cap
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {data.stocks.slice(0, 20).map((stock, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {stock.symbol}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {stock.company_name}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {stock.sector}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right">
                        {formatCurrency(stock.current_price)}
                      </td>
                      <td className={`px-6 py-4 whitespace-nowrap text-sm text-right font-semibold ${
                        stock.change_percent >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {formatPercent(stock.change_percent)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {formatNumber(stock.volume)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                        {stock.market_cap}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Data Source Info */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Data Source: {data?.source || 'NEPSE'} | Last Updated: {data?.last_updated ? new Date(data.last_updated).toLocaleString() : 'N/A'}</p>
          <button
            onClick={fetchData}
            disabled={loading}
            className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>
    </div>
  );
}
