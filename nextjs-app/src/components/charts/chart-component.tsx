"use client"

import React from 'react'
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
  ArcElement,
  Filler,
} from 'chart.js'
import { Line, Bar, Doughnut } from 'react-chartjs-2'

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
  ArcElement,
  Filler
)

interface ChartProps {
  type: 'line' | 'bar' | 'doughnut'
  data: any
  options?: any
  title?: string
  className?: string
}

export function ChartComponent({ type, data, options, title, className = "" }: ChartProps) {
  const defaultOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: '#64748b',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: !!title,
        text: title,
        color: '#1e293b',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
    },
    scales: type !== 'doughnut' ? {
      x: {
        grid: {
          color: '#e2e8f0',
        },
        ticks: {
          color: '#64748b',
        }
      },
      y: {
        grid: {
          color: '#e2e8f0',
        },
        ticks: {
          color: '#64748b',
        }
      }
    } : undefined,
    ...options
  }

  const renderChart = () => {
    switch (type) {
      case 'line':
        return <Line data={data} options={defaultOptions} />
      case 'bar':
        return <Bar data={data} options={defaultOptions} />
      case 'doughnut':
        return <Doughnut data={data} options={defaultOptions} />
      default:
        return <Line data={data} options={defaultOptions} />
    }
  }

  return (
    <div className={`w-full h-80 ${className}`}>
      {renderChart()}
    </div>
  )
}

// Sample data generators
export const generatePortfolioData = () => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Portfolio Value',
      data: [100000, 105000, 110000, 108000, 115000, 120000, 118000, 125000, 130000, 128000, 135000, 140000],
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      fill: true,
      tension: 0.4,
    },
    {
      label: 'S&P 500',
      data: [95000, 98000, 102000, 100000, 105000, 108000, 106000, 110000, 112000, 110000, 115000, 118000],
      borderColor: 'rgb(16, 185, 129)',
      backgroundColor: 'rgba(16, 185, 129, 0.1)',
      fill: true,
      tension: 0.4,
    }
  ]
})

export const generateAssetAllocationData = () => ({
  labels: ['Stocks', 'Bonds', 'Real Estate', 'Commodities', 'Cash'],
  datasets: [
    {
      data: [45, 25, 15, 10, 5],
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(139, 92, 246, 0.8)',
      ],
      borderColor: [
        'rgba(59, 130, 246, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(245, 158, 11, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(139, 92, 246, 1)',
      ],
      borderWidth: 2,
    }
  ]
})

export const generateMonthlyReturnsData = () => ({
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Monthly Returns (%)',
      data: [2.5, 4.8, -1.8, 6.5, 4.2, 0.0, -2.1, 5.9, 3.8, -1.5, 5.5, 3.2],
      backgroundColor: [
        'rgba(16, 185, 129, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(156, 163, 175, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(239, 68, 68, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(16, 185, 129, 0.8)',
      ],
      borderColor: [
        'rgba(16, 185, 129, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(156, 163, 175, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(239, 68, 68, 1)',
        'rgba(16, 185, 129, 1)',
        'rgba(16, 185, 129, 1)',
      ],
      borderWidth: 1,
    }
  ]
})
