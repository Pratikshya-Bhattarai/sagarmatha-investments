# 📊 Analytics Setup for Sagarmatha Investments

## Overview

This project now includes comprehensive analytics tracking with:
- **Google Analytics** - For detailed user behavior tracking
- **Vercel Analytics** - For privacy-focused analytics and performance insights
- **Vercel Speed Insights** - For Core Web Vitals and performance monitoring
- **Custom Analytics** - For Sagarmatha-specific investment tracking

## 🚀 What's Been Added

### 1. Vercel Analytics Integration
- `@vercel/analytics` - Privacy-focused analytics
- `@vercel/speed-insights` - Performance monitoring
- Automatic page view tracking
- Custom event tracking

### 2. Enhanced Analytics Component
- Combined Google Analytics and Vercel Analytics
- Performance monitoring
- Error tracking
- Development vs production configurations

### 3. Custom Analytics Library
- `src/lib/analytics.ts` - Core analytics configuration
- `src/hooks/useAnalytics.ts` - React hook for easy usage
- Sagarmatha-specific tracking functions

### 4. Analytics Features
- **NEPSE Data Tracking** - Stock interactions and data fetching
- **Investment Actions** - Buy, sell, watchlist tracking
- **Chart Interactions** - Zoom, pan, and chart interactions
- **Performance Monitoring** - Page load times and API response times
- **Error Tracking** - JavaScript errors and API failures
- **User Engagement** - Button clicks and user interactions

## 📦 Dependencies Added

```json
{
  "@vercel/analytics": "^1.5.0",
  "@vercel/speed-insights": "^1.2.0"
}
```

## 🔧 Configuration

### Environment Variables
Add these to your `.env.local` file:

```env
# Google Analytics (existing)
NEXT_PUBLIC_GA_MEASUREMENT_ID=your-ga-measurement-id

# Vercel Analytics (automatic in production)
# No additional configuration needed for Vercel Analytics
```

### Analytics Component
The analytics are automatically included in your app layout:

```tsx
// src/app/layout.tsx
import { Analytics } from "@/components/analytics"

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

## 📊 Usage Examples

### Basic Analytics Usage
```tsx
import { useAnalytics } from '@/hooks/useAnalytics'

function MyComponent() {
  const analytics = useAnalytics()

  const handleClick = () => {
    analytics.trackEngagement('button_click', { button: 'submit' })
  }

  return <button onClick={handleClick}>Submit</button>
}
```

### NEPSE Data Tracking
```tsx
const handleStockDataFetch = async () => {
  const startTime = performance.now()
  
  try {
    const data = await fetchStockData()
    const responseTime = performance.now() - startTime
    
    analytics.trackAPICall('/api/nepse', 'success', responseTime)
    analytics.trackNEPSEInteraction('data_fetch', { symbol: 'NIC' })
  } catch (error) {
    analytics.trackAPIError('/api/nepse', error)
  }
}
```

### Investment Action Tracking
```tsx
const handleBuyStock = (symbol: string) => {
  analytics.trackInvestmentAction('buy', symbol)
  analytics.trackEngagement('investment_action', { 
    action: 'buy', 
    symbol 
  })
}
```

### Chart Interaction Tracking
```tsx
const handleChartZoom = () => {
  analytics.trackChartInteraction('candlestick', 'zoom_in')
}
```

### Performance Tracking
```tsx
useEffect(() => {
  const startTime = performance.now()
  
  // Component logic here
  
  const endTime = performance.now()
  analytics.trackComponentRender('StockChart', endTime - startTime)
}, [])
```

## 🎯 Sagarmatha-Specific Tracking

### Investment Analytics
- **Stock Interactions**: Buy, sell, watchlist actions
- **Portfolio Tracking**: Portfolio changes and performance
- **Research Usage**: Research report views and downloads
- **Client Engagement**: Contact form submissions and inquiries

### Market Data Analytics
- **NEPSE Data Access**: Real-time data fetching patterns
- **Chart Usage**: Most popular chart types and interactions
- **Search Behavior**: Stock search queries and results
- **API Performance**: Response times and error rates

### User Journey Tracking
- **Page Views**: Which pages are most visited
- **Session Duration**: Time spent on investment pages
- **Conversion Funnels**: From visitor to client
- **Feature Adoption**: Which features are most used

## 📈 Analytics Dashboard

### Google Analytics
- **Real-time Reports**: Live user activity
- **Audience Insights**: User demographics and behavior
- **Acquisition Reports**: Traffic sources and campaigns
- **Behavior Reports**: Page views and user flow
- **Conversion Reports**: Goals and e-commerce tracking

### Vercel Analytics
- **Page Views**: Automatic page view tracking
- **Custom Events**: Tracked via `analytics.track()` calls
- **Performance**: Core Web Vitals and speed metrics
- **Geographic Data**: User location insights

### Vercel Speed Insights
- **Core Web Vitals**: LCP, FID, CLS metrics
- **Performance Scores**: Real user monitoring
- **Speed Analysis**: Page load performance
- **Optimization Suggestions**: Performance improvements

## 🔍 Debugging Analytics

### Development Mode
```tsx
// Analytics events are logged to console in development
console.log('Analytics Event:', eventName, parameters)
```

### Production Monitoring
- Check Google Analytics dashboard for user behavior
- Monitor Vercel Analytics for performance insights
- Use browser dev tools to verify tracking

### Common Issues
1. **Analytics not tracking**: Check environment variables
2. **Events not appearing**: Verify event names and parameters
3. **Performance issues**: Check for excessive tracking calls

## 🚀 Deployment

### Vercel Deployment
Analytics work automatically on Vercel:
- Vercel Analytics: Enabled by default
- Speed Insights: Automatic performance monitoring
- Google Analytics: Requires GA_MEASUREMENT_ID

### Other Platforms
For non-Vercel deployments:
- Vercel Analytics: Still works but with limited features
- Speed Insights: May have reduced functionality
- Google Analytics: Works on all platforms

## 📊 Analytics Events Reference

### Core Events
- `page_view` - Page navigation
- `user_engagement` - User interactions
- `api_call` - API requests
- `form_submission` - Form submissions
- `search` - Search queries

### Sagarmatha Events
- `nepse_interaction` - NEPSE data interactions
- `investment_action` - Investment decisions
- `chart_interaction` - Chart usage
- `portfolio_tracking` - Portfolio changes

### Performance Events
- `page_load_time` - Page performance
- `api_response_time` - API performance
- `component_render_time` - Component performance

### Error Events
- `javascript_error` - JavaScript errors
- `api_error` - API failures
- `user_feedback` - User feedback and bugs

## 🎯 Best Practices

### 1. Privacy Compliance
- Analytics respect user privacy
- No personal data is tracked
- GDPR and CCPA compliant

### 2. Performance
- Analytics don't impact app performance
- Lazy loading of analytics scripts
- Minimal bundle size impact

### 3. Development
- Analytics work in development mode
- Console logging for debugging
- Easy to test and verify

### 4. Production
- Automatic tracking in production
- Real-time monitoring
- Performance insights

## 📞 Support

For analytics issues:
1. Check the console for error messages
2. Verify environment variables
3. Test in development mode first
4. Check Vercel Analytics dashboard
5. Review Google Analytics reports

---

**Your Sagarmatha Investments app now has comprehensive analytics tracking! 📊**

The analytics will help you understand user behavior, optimize performance, and make data-driven decisions for your investment platform.
