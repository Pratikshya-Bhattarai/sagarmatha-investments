/**
 * Analytics configuration and utilities for Sagarmatha Investments
 * Supports Google Analytics, Vercel Analytics, and custom event tracking
 */

// Google Analytics configuration
export const GA_CONFIG = {
  measurementId: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  anonymizeIp: true,
  cookieExpires: 63072000, // 2 years
  cookieDomain: process.env.NODE_ENV === 'production' ? 'sagarmathainvestments.com' : 'localhost',
}

// Vercel Analytics configuration
export const VERCEL_ANALYTICS_CONFIG = {
  enabled: process.env.NODE_ENV === 'production',
  debug: process.env.NODE_ENV === 'development',
}

// Custom event tracking for Sagarmatha Investments
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  // Google Analytics event tracking
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      event_category: 'Sagarmatha Investments',
      event_label: parameters?.label || '',
      value: parameters?.value || 0,
      ...parameters,
    })
  }

  // Console logging for development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', eventName, parameters)
  }
}

// Specific tracking functions for Sagarmatha Investments
export const analytics = {
  // Track page views
  trackPageView: (pageName: string, pagePath: string) => {
    trackEvent('page_view', {
      page_title: pageName,
      page_location: pagePath,
    })
  },

  // Track NEPSE data interactions
  trackNEPSEInteraction: (action: string, data?: any) => {
    trackEvent('nepse_interaction', {
      action,
      data_type: data?.type || 'unknown',
      symbol: data?.symbol || '',
    })
  },

  // Track chart interactions
  trackChartInteraction: (chartType: string, action: string) => {
    trackEvent('chart_interaction', {
      chart_type: chartType,
      action,
    })
  },

  // Track user engagement
  trackEngagement: (engagementType: string, details?: any) => {
    trackEvent('user_engagement', {
      engagement_type: engagementType,
      details,
    })
  },

  // Track investment-related actions
  trackInvestmentAction: (action: string, stockSymbol?: string) => {
    trackEvent('investment_action', {
      action,
      stock_symbol: stockSymbol,
    })
  },

  // Track API calls
  trackAPICall: (endpoint: string, status: 'success' | 'error', responseTime?: number) => {
    trackEvent('api_call', {
      endpoint,
      status,
      response_time: responseTime,
    })
  },

  // Track form submissions
  trackFormSubmission: (formName: string, success: boolean) => {
    trackEvent('form_submission', {
      form_name: formName,
      success,
    })
  },

  // Track search queries
  trackSearch: (query: string, resultsCount: number) => {
    trackEvent('search', {
      search_term: query,
      results_count: resultsCount,
    })
  },
}

// Performance tracking utilities
export const performanceTracking = {
  // Track page load time
  trackPageLoad: (pageName: string, loadTime: number) => {
    trackEvent('page_load_time', {
      page_name: pageName,
      load_time: loadTime,
    })
  },

  // Track API response time
  trackAPIResponseTime: (endpoint: string, responseTime: number) => {
    trackEvent('api_response_time', {
      endpoint,
      response_time: responseTime,
    })
  },

  // Track component render time
  trackComponentRender: (componentName: string, renderTime: number) => {
    trackEvent('component_render_time', {
      component_name: componentName,
      render_time: renderTime,
    })
  },
}

// Error tracking utilities
export const errorTracking = {
  // Track JavaScript errors
  trackError: (error: Error, context?: string) => {
    trackEvent('javascript_error', {
      error_message: error.message,
      error_stack: error.stack,
      context,
    })
  },

  // Track API errors
  trackAPIError: (endpoint: string, error: any) => {
    trackEvent('api_error', {
      endpoint,
      error_message: error.message || 'Unknown error',
      error_code: error.code || 'unknown',
    })
  },

  // Track user feedback
  trackFeedback: (feedbackType: 'bug' | 'feature' | 'general', message: string) => {
    trackEvent('user_feedback', {
      feedback_type: feedbackType,
      message,
    })
  },
}

// Initialize analytics
export const initializeAnalytics = () => {
  // Set up error tracking
  if (typeof window !== 'undefined') {
    window.addEventListener('error', (event) => {
      errorTracking.trackError(event.error, 'global_error_handler')
    })

    window.addEventListener('unhandledrejection', (event) => {
      errorTracking.trackError(
        new Error(event.reason?.message || 'Unhandled promise rejection'),
        'unhandled_promise_rejection'
      )
    })
  }
}

// Export all analytics utilities
export default {
  trackEvent,
  analytics,
  performanceTracking,
  errorTracking,
  initializeAnalytics,
}
