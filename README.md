# 🏔️ Sagarmatha Investments - NEPSE Analytics Platform

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat&logo=vercel)](https://sagarmatha-investments.vercel.app)
[![Python](https://img.shields.io/badge/Backend-Django%20REST%20API-092E20?style=flat&logo=django)](https://pythonanywhere.com)
[![Next.js](https://img.shields.io/badge/Frontend-Next.js%2015-000000?style=flat&logo=next.js)](https://nextjs.org)
[![Analytics](https://img.shields.io/badge/Analytics-Vercel%20Analytics-000000?style=flat&logo=vercel)](https://vercel.com/analytics)

A comprehensive investment analytics platform for Nepal's stock market (NEPSE) featuring real-time data, interactive charts, and advanced analytics tracking.

## 🚀 Live Demo

- **Frontend**: [https://sagarmatha-investments.vercel.app](https://sagarmatha-investments.vercel.app)
- **API Documentation**: [https://sagarmatha-investments.vercel.app/api-docs](https://sagarmatha-investments.vercel.app/api-docs)
- **NEPSE Analytics**: [https://sagarmatha-investments.vercel.app/charts](https://sagarmatha-investments.vercel.app/charts)

## 📊 NEPSE Data Charts

### Interactive Visualizations
- **📈 NEPSE Index Trend** - Historical performance line charts
- **📊 Trading Volume** - Daily volume bar charts  
- **🥧 Sector Distribution** - Market sector breakdown
- **📋 Top Stocks Table** - Performance metrics with sorting
- **📱 Market Indices Cards** - Key index displays

### Real-time Features
- **⚡ Live Data Updates** - Auto-refresh every 5 minutes
- **⏱️ Timeframe Selection** - 7D, 30D, 90D, 1Y views
- **📱 Responsive Design** - Mobile and desktop optimized
- **🔄 Error Handling** - Graceful data loading states

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Chart.js** - Interactive data visualization
- **Vercel Analytics** - Privacy-focused tracking

### Backend
- **Django 5.0** - Python web framework
- **Django REST Framework** - API development
- **MySQL** - Production database
- **Redis** - Caching and sessions
- **Celery** - Background tasks

### Analytics
- **Vercel Analytics** - User behavior tracking
- **Vercel Speed Insights** - Performance monitoring
- **Google Analytics** - Detailed user insights
- **Custom Tracking** - NEPSE-specific metrics

## 🏗️ Project Structure

```
sagarmatha-investments/
├── nextjs-app/                 # Next.js frontend
│   ├── src/
│   │   ├── app/                # App router pages
│   │   │   ├── charts/         # NEPSE analytics page
│   │   │   ├── nepse-live/     # Live market data
│   │   │   └── api-docs/       # API documentation
│   │   ├── components/         # React components
│   │   │   ├── charts/         # Chart components
│   │   │   └── sections/       # Page sections
│   │   ├── lib/               # Utilities and analytics
│   │   └── hooks/             # Custom React hooks
│   └── public/                # Static assets
├── django-backend/            # Django API backend
│   ├── sagarmatha_backend/    # Django project settings
│   ├── nepse/                 # NEPSE data models & APIs
│   └── requirements.txt       # Python dependencies
└── docs/                      # Documentation
```

## 🚀 Quick Start

### Frontend Development
```bash
cd nextjs-app
npm install
npm run dev
# Visit http://localhost:3000
```

### Backend Development
```bash
cd django-backend
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
# API available at http://localhost:8000
```

## 📊 NEPSE Analytics Features

### Market Data Visualization
- **Real-time NEPSE Index** - Live market performance
- **Historical Trends** - Interactive line charts
- **Volume Analysis** - Trading volume patterns
- **Sector Breakdown** - Market distribution analysis
- **Stock Performance** - Top gainers and losers

### Interactive Charts
- **Line Charts** - Price trends over time
- **Bar Charts** - Volume and performance metrics
- **Doughnut Charts** - Sector distribution
- **Data Tables** - Sortable stock listings
- **Responsive Cards** - Market index displays

### Data Features
- **Auto-refresh** - Real-time data updates
- **Timeframe Selection** - Multiple time periods
- **Error Handling** - Graceful data loading
- **Mobile Optimized** - Responsive design
- **Performance Tracking** - Analytics integration

## 🔧 API Endpoints

### NEPSE Data APIs
```bash
GET /api/nepse/                    # Market overview
GET /api/nepse/fetch               # Fetch latest data
GET /api/nepse/sync                # Sync with NEPSE
GET /api/nepse/charts              # Chart data
```

### Analytics APIs
```bash
GET /api/analytics/market-summary   # Market summary
GET /api/analytics/portfolio       # Portfolio analysis
GET /api/reports/daily             # Daily reports
GET /api/reports/weekly            # Weekly summaries
```

## 📈 Analytics Integration

### User Tracking
- **Page Views** - Navigation patterns
- **NEPSE Interactions** - Data usage analytics
- **Investment Actions** - User behavior tracking
- **Chart Interactions** - Visualization usage
- **Performance Metrics** - Core Web Vitals

### Business Insights
- **User Engagement** - Session duration and pages
- **Feature Adoption** - Most used functionality
- **Conversion Tracking** - User journey analysis
- **Error Monitoring** - Technical issue tracking

## 🚀 Deployment

### Frontend (Vercel)
- **Automatic Deployments** - GitHub integration
- **Environment Variables** - Secure configuration
- **Analytics Enabled** - Vercel Analytics + Speed Insights
- **Custom Domain** - Professional branding

### Backend (PythonAnywhere)
- **Production Database** - MySQL configuration
- **Redis Caching** - Performance optimization
- **Background Tasks** - Celery integration
- **Monitoring** - Error tracking and logging

## 📊 Screenshots

### NEPSE Analytics Dashboard
![NEPSE Charts](https://via.placeholder.com/800x400/1e40af/ffffff?text=NEPSE+Analytics+Dashboard)

### Market Data Visualization
![Market Charts](https://via.placeholder.com/800x400/059669/ffffff?text=Interactive+Market+Charts)

### Real-time Data
![Live Data](https://via.placeholder.com/800x400/dc2626/ffffff?text=Real-time+NEPSE+Data)

## 🎯 Key Features

### ✅ **Real-time NEPSE Data**
- Live market updates
- Historical data analysis
- Sector performance tracking
- Stock price monitoring

### ✅ **Interactive Charts**
- Multiple chart types
- Timeframe selection
- Responsive design
- Mobile optimization

### ✅ **Analytics Integration**
- User behavior tracking
- Performance monitoring
- Business insights
- Error tracking

### ✅ **Production Ready**
- Scalable architecture
- Security best practices
- Performance optimization
- Monitoring and logging

## 📚 Documentation

- **[Frontend Setup](nextjs-app/README.md)** - Next.js development guide
- **[Backend Setup](django-backend/README.md)** - Django API guide
- **[Analytics Setup](nextjs-app/ANALYTICS_SETUP.md)** - Analytics configuration
- **[Deployment Guide](GITHUB_SETUP_GUIDE.md)** - Production deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🏔️ About Sagarmatha Investments

Sagarmatha Investments is a modern brokerage and investment advisory platform for Nepal's stock market. We provide:

- **Stock Trading** - NEPSE market access
- **Portfolio Management** - Professional PMS services
- **Research & Analysis** - Market insights and reports
- **Investment Advisory** - Personalized financial guidance

## 📞 Contact

- **Website**: [https://sagarmatha-investments.vercel.app](https://sagarmatha-investments.vercel.app)
- **Email**: info@sagarmathainvestments.com
- **Phone**: +977-9876543211

---

**Built with ❤️ for Nepal's Investment Community** 🏔️

*This platform demonstrates modern web development practices with real-time data visualization, comprehensive analytics, and production-ready deployment.*