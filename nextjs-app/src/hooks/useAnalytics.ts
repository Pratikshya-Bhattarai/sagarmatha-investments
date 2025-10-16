/**
 * Custom hook for analytics tracking in Sagarmatha Investments
 * Provides easy access to analytics functions throughout the app
 */

import { useCallback } from 'react'
import { analytics, performanceTracking, errorTracking } from '@/lib/analytics'

export const useAnalytics = () => {
  // Track page views
  const trackPageView = useCallback((pageName: string, pagePath: string) => {
    analytics.trackPageView(pageName, pagePath)
  }, [])

  // Track NEPSE interactions
  const trackNEPSEInteraction = useCallback((action: string, data?: any) => {
    analytics.trackNEPSEInteraction(action, data)
  }, [])

  // Track chart interactions
  const trackChartInteraction = useCallback((chartType: string, action: string) => {
    analytics.trackChartInteraction(chartType, action)
  }, [])

  // Track user engagement
  const trackEngagement = useCallback((engagementType: string, details?: any) => {
    analytics.trackEngagement(engagementType, details)
  }, [])

  // Track investment actions
  const trackInvestmentAction = useCallback((action: string, stockSymbol?: string) => {
    analytics.trackInvestmentAction(action, stockSymbol)
  }, [])

  // Track API calls
  const trackAPICall = useCallback((endpoint: string, status: 'success' | 'error', responseTime?: number) => {
    analytics.trackAPICall(endpoint, status, responseTime)
  }, [])

  // Track form submissions
  const trackFormSubmission = useCallback((formName: string, success: boolean) => {
    analytics.trackFormSubmission(formName, success)
  }, [])

  // Track search queries
  const trackSearch = useCallback((query: string, resultsCount: number) => {
    analytics.trackSearch(query, resultsCount)
  }, [])

  // Performance tracking
  const trackPageLoad = useCallback((pageName: string, loadTime: number) => {
    performanceTracking.trackPageLoad(pageName, loadTime)
  }, [])

  const trackAPIResponseTime = useCallback((endpoint: string, responseTime: number) => {
    performanceTracking.trackAPIResponseTime(endpoint, responseTime)
  }, [])

  const trackComponentRender = useCallback((componentName: string, renderTime: number) => {
    performanceTracking.trackComponentRender(componentName, renderTime)
  }, [])

  // Error tracking
  const trackError = useCallback((error: Error, context?: string) => {
    errorTracking.trackError(error, context)
  }, [])

  const trackAPIError = useCallback((endpoint: string, error: any) => {
    errorTracking.trackAPIError(endpoint, error)
  }, [])

  const trackFeedback = useCallback((feedbackType: 'bug' | 'feature' | 'general', message: string) => {
    errorTracking.trackFeedback(feedbackType, message)
  }, [])

  return {
    // Core analytics
    trackPageView,
    trackNEPSEInteraction,
    trackChartInteraction,
    trackEngagement,
    trackInvestmentAction,
    trackAPICall,
    trackFormSubmission,
    trackSearch,
    
    // Performance tracking
    trackPageLoad,
    trackAPIResponseTime,
    trackComponentRender,
    
    // Error tracking
    trackError,
    trackAPIError,
    trackFeedback,
  }
}

export default useAnalytics
