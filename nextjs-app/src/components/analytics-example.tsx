/**
 * Example component demonstrating analytics usage in Sagarmatha Investments
 * This shows how to integrate analytics tracking in your components
 */

"use client"

import { useEffect, useState } from 'react'
import { useAnalytics } from '@/hooks/useAnalytics'

interface AnalyticsExampleProps {
  stockSymbol?: string
  chartType?: string
}

export function AnalyticsExample({ stockSymbol = 'NIC', chartType = 'candlestick' }: AnalyticsExampleProps) {
  const analytics = useAnalytics()
  const [isLoading, setIsLoading] = useState(false)

  // Track component mount
  useEffect(() => {
    analytics.trackEngagement('component_mount', {
      component: 'AnalyticsExample',
      stockSymbol,
      chartType,
    })
  }, [analytics, stockSymbol, chartType])

  // Example: Track button clicks
  const handleButtonClick = (action: string) => {
    analytics.trackEngagement('button_click', {
      action,
      component: 'AnalyticsExample',
    })
  }

  // Example: Track NEPSE data interactions
  const handleNEPSEDataFetch = async () => {
    const startTime = performance.now()
    setIsLoading(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const endTime = performance.now()
      const responseTime = endTime - startTime

      // Track successful API call
      analytics.trackAPICall('/api/nepse', 'success', responseTime)
      analytics.trackNEPSEInteraction('data_fetch', {
        symbol: stockSymbol,
        type: 'stock_data',
      })

      console.log('NEPSE data fetched successfully')
    } catch (error) {
      // Track API error
      analytics.trackAPIError('/api/nepse', error)
      console.error('Failed to fetch NEPSE data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Example: Track chart interactions
  const handleChartInteraction = (action: string) => {
    analytics.trackChartInteraction(chartType, action)
  }

  // Example: Track investment actions
  const handleInvestmentAction = (action: string) => {
    analytics.trackInvestmentAction(action, stockSymbol)
  }

  // Example: Track search
  const handleSearch = (query: string) => {
    analytics.trackSearch(query, Math.floor(Math.random() * 50) + 1) // Simulate results count
  }

  // Example: Track form submission
  const handleFormSubmission = (formName: string, success: boolean) => {
    analytics.trackFormSubmission(formName, success)
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Analytics Example Component</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Engagement Tracking</h3>
          <div className="space-x-2">
            <button
              onClick={() => handleButtonClick('view_chart')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              View Chart
            </button>
            <button
              onClick={() => handleButtonClick('view_details')}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              View Details
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">NEPSE Data Tracking</h3>
          <button
            onClick={handleNEPSEDataFetch}
            disabled={isLoading}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
          >
            {isLoading ? 'Fetching...' : 'Fetch NEPSE Data'}
          </button>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Chart Interactions</h3>
          <div className="space-x-2">
            <button
              onClick={() => handleChartInteraction('zoom_in')}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Zoom In
            </button>
            <button
              onClick={() => handleChartInteraction('zoom_out')}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Zoom Out
            </button>
            <button
              onClick={() => handleChartInteraction('pan')}
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
            >
              Pan
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Investment Actions</h3>
          <div className="space-x-2">
            <button
              onClick={() => handleInvestmentAction('buy')}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Buy {stockSymbol}
            </button>
            <button
              onClick={() => handleInvestmentAction('sell')}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Sell {stockSymbol}
            </button>
            <button
              onClick={() => handleInvestmentAction('watchlist')}
              className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700"
            >
              Add to Watchlist
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Search Tracking</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Search stocks..."
              className="px-3 py-2 border rounded"
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleSearch((e.target as HTMLInputElement).value)
                }
              }}
            />
            <button
              onClick={() => handleSearch('NIC')}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Search NIC
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-2">Form Submission</h3>
          <div className="space-x-2">
            <button
              onClick={() => handleFormSubmission('contact_form', true)}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
              Submit Contact Form (Success)
            </button>
            <button
              onClick={() => handleFormSubmission('contact_form', false)}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Submit Contact Form (Error)
            </button>
          </div>
        </div>

        <div className="mt-6 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold mb-2">Analytics Events Being Tracked:</h4>
          <ul className="text-sm space-y-1">
            <li>• Component mount and engagement</li>
            <li>• Button clicks and user interactions</li>
            <li>• NEPSE data fetching and API calls</li>
            <li>• Chart interactions (zoom, pan, etc.)</li>
            <li>• Investment actions (buy, sell, watchlist)</li>
            <li>• Search queries and results</li>
            <li>• Form submissions and outcomes</li>
            <li>• Performance metrics and response times</li>
            <li>• Error tracking and debugging</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AnalyticsExample
