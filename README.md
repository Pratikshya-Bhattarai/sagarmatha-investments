# Sagarmatha Investments - NEPSE Data Platform

A comprehensive financial technology platform for Sagarmatha Investments, featuring real-time NEPSE (Nepal Stock Exchange) data integration, modern web applications, and investment advisory services.

## 🏔️ What is Sagarmatha Investments?

**Sagarmatha Investments** is a professional stock brokerage and investment advisory firm in Nepal, inspired by the strength and stability of Mount Everest (Sagarmatha). The platform provides:

- **Stock Trading Services** - Equity delivery & intraday trading on NEPSE
- **Investment Advisory** - Expert guidance for wealth creation
- **Portfolio Management** - Tailored investment strategies
- **Real-time Market Data** - Live NEPSE data and analytics
- **Research & Insights** - Data-driven investment recommendations

## 🏗️ Project Architecture

This repository contains **two main applications**:

### 1. Static Website (`/` root directory)
- **Purpose**: Marketing website and company information
- **Technology**: Pure HTML/CSS/JavaScript
- **Features**: 
  - Responsive design with dark/light themes
  - Service information and pricing
  - Contact forms and company details
  - PWA capabilities with service worker
  - SEO optimized with structured data

### 2. Next.js Application (`/nextjs-app/` directory)
- **Purpose**: NEPSE data platform and trading tools
- **Technology**: Next.js 15, React 19, TypeScript, Supabase
- **Features**:
  - Real-time NEPSE market data
  - Interactive charts and analytics
  - Database integration with Supabase
  - Automated data synchronization
  - API endpoints for data access

## 📊 NEPSE Data Integration

The platform integrates with multiple data sources to provide comprehensive market information:

### Data Sources
1. **Official NEPSE APIs** - Direct integration with Nepal Stock Exchange
2. **Alternative Data Providers** - Third-party financial data services
3. **Historical Datasets** - Kaggle datasets for historical analysis
4. **Real-time Feeds** - Live market data updates

### Database Schema
- **nepse_index** - Historical index data (OHLCV)
- **nepse_stocks** - Individual stock information
- **nepse_indices** - Market indices (NEPSE, Sensitive, Float)

### Data Flow
```
External APIs → Data Fetching → Supabase Database → Next.js API → React Components → User Interface
```

## 🚀 Key Features

### For Investors
- **Live Market Data**: Real-time NEPSE index and stock prices
- **Interactive Charts**: Technical analysis with Chart.js
- **Portfolio Tracking**: Monitor investments and performance
- **Market Insights**: Daily reports and research
- **Trading Tools**: Advanced trading platform features

### For Developers
- **Modern Tech Stack**: Next.js 15, React 19, TypeScript
- **Database Integration**: Supabase with PostgreSQL
- **API-First Design**: Comprehensive REST API
- **Automated Sync**: Scheduled data updates
- **PWA Support**: Progressive Web App capabilities

## 🛠️ Technology Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - Latest React features
- **TypeScript** - Type safety and better DX
- **Tailwind CSS 4** - Utility-first styling
- **Chart.js** - Interactive data visualization

### Backend
- **Supabase** - PostgreSQL database with real-time features
- **Next.js API Routes** - Serverless API endpoints
- **Vercel** - Deployment and hosting platform

### Data & Analytics
- **Real-time Updates** - Live market data synchronization
- **Historical Analysis** - Backtesting and trend analysis
- **Automated Sync** - GitHub Actions and Vercel Cron
- **Fallback Data** - Sample data for development

## 📁 Project Structure

```
sagarmatha-investments/
├── 📄 index.html                 # Static marketing website
├── 🖼️ images/                   # Static assets
├── 📱 manifest.webmanifest       # PWA configuration
├── 🔧 sw.js                      # Service worker
├── 📊 sitemap.xml               # SEO sitemap
│
└── 📁 nextjs-app/               # Next.js application
    ├── 📁 src/
    │   ├── 📁 app/              # Next.js App Router
    │   │   ├── 📁 api/          # API endpoints
    │   │   │   ├── 📁 nepse/    # NEPSE data APIs
    │   │   │   └── 📁 cron/     # Scheduled tasks
    │   │   ├── 📄 charts/       # Charts page
    │   │   ├── 📄 nepse/        # NEPSE data page
    │   │   └── 📄 ...           # Other pages
    │   ├── 📁 components/        # React components
    │   │   ├── 📁 charts/       # Chart components
    │   │   ├── 📁 layout/       # Layout components
    │   │   └── 📁 ui/           # UI components
    │   └── 📁 lib/              # Utilities
    │       ├── 📄 supabase.ts   # Database client
    │       └── 📄 nepse-data.ts # Data utilities
    ├── 📁 scripts/              # Utility scripts
    ├── 📁 data/                 # Data files
    ├── 📄 package.json          # Dependencies
    └── 📄 README.md             # Next.js app documentation
```

## 🔌 API Endpoints

### NEPSE Data APIs
- `GET /api/nepse` - Get NEPSE data from database
- `GET /api/nepse/fetch` - Fetch live data from external sources
- `GET /api/nepse/sync` - Sync data to database
- `GET /api/cron/nepse-sync` - Scheduled sync endpoint
- `GET /api/debug` - Configuration status

### Query Parameters
- `type`: `overview` | `historical` | `stocks` | `indices` | `all`
- `limit`: Number of records to return
- `store`: `true` | `false` - Whether to store fetched data

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Supabase account
- Git

### Quick Start (Static Website)
1. **View the static website**:
   ```bash
   # Open index.html in your browser
   open index.html
   ```

### Full Setup (Next.js App)
1. **Clone and navigate**:
   ```bash
   git clone <repository-url>
   cd sagarmatha-investments/nextjs-app
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

4. **Set up Supabase database**:
   - Follow the guide in `nextjs-app/SUPABASE_SETUP.md`
   - Create tables and import data

5. **Start development server**:
   ```bash
   npm run dev
   ```

## 📊 Data Management

### Automated Data Sync
- **GitHub Actions**: Runs every 30 minutes during market hours
- **Vercel Cron**: Alternative scheduling option
- **Manual Sync**: Available via API endpoints

### Data Sources
1. **Primary**: Official NEPSE APIs
2. **Secondary**: Alternative financial data providers
3. **Fallback**: Mock data for development
4. **Historical**: Kaggle datasets

### Data Flow
```
External APIs → Fetch Scripts → Supabase Database → API Routes → React Components
```

## 🚀 Deployment

### Static Website
- Deploy `index.html` and assets to any static hosting
- CDN-friendly with optimized assets
- PWA capabilities included

### Next.js Application
- **Vercel** (Recommended): `vercel --prod`
- **Netlify**: Compatible with static export
- **Railway**: Full-stack deployment
- **AWS**: Custom deployment options

## 🔧 Development

### Available Scripts
```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking

# Data Management
npm run import-nepse # Import NEPSE data
npm run sync-nepse   # Sync live data
npm run test-api     # Test API endpoints
```

### Environment Variables
```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# App Configuration
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app
CRON_SECRET=your_random_secret_key
```

## 📚 Documentation

- [Next.js App README](nextjs-app/README.md) - Detailed app documentation
- [Supabase Setup Guide](nextjs-app/SUPABASE_SETUP.md) - Database setup
- [Vercel Deployment Guide](nextjs-app/VERCEL_DEPLOYMENT.md) - Deployment instructions
- [API Documentation](nextjs-app/docs/api.md) - API reference

## 🎯 Business Model

### Services Offered
1. **Stock Brokerage** - Commission-based trading services
2. **Portfolio Management** - Fee-based investment management
3. **Investment Advisory** - Research and recommendations
4. **Educational Services** - Investor training and workshops

### Revenue Streams
- **Trading Commissions** - 0.27% - 0.40% based on volume
- **Portfolio Management Fees** - Annual management fees
- **Advisory Services** - Premium research packages
- **Educational Programs** - Training and workshop fees

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/sagarmatha-investments/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/sagarmatha-investments/discussions)
- **Email**: info@sagarmathainvestments.com

## 🙏 Acknowledgments

- **NEPSE** - Nepal Stock Exchange for market data
- **Supabase** - Database platform and real-time features
- **Vercel** - Hosting and deployment platform
- **Open Source Community** - Amazing tools and libraries

---

**Sagarmatha Investments** - Empowering financial success in Nepal 🇳🇵

*Climb higher with a trusted partner in brokerage, PMS, and research.*
