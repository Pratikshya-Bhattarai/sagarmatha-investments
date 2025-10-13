# Sagarmatha Investments - NEPSE Data Platform

A modern Next.js application for Sagarmatha Investments, featuring real-time NEPSE (Nepal Stock Exchange) data integration with Supabase database.

## 🚀 Features

- **Real-time NEPSE Data**: Live market data from multiple sources
- **Supabase Integration**: Robust database backend with real-time updates
- **Automated Data Sync**: Scheduled data fetching and storage
- **Modern UI**: Beautiful, responsive design with dark/light themes
- **PWA Support**: Progressive Web App capabilities
- **Chart Integration**: Interactive charts for market analysis
- **API-First**: Comprehensive REST API for data access

## 📊 NEPSE Data Sources

The application fetches data from multiple sources:

1. **Official NEPSE APIs** (when available)
2. **Alternative data providers**
3. **Third-party financial APIs**
4. **Kaggle historical datasets**

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS 4
- **Database**: Supabase (PostgreSQL)
- **Charts**: Chart.js, React-ChartJS-2
- **Deployment**: Vercel
- **CI/CD**: GitHub Actions

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/sagarmatha-investments.git
   cd sagarmatha-investments/nextjs-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Update `.env.local` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Set up Supabase database**
   ```bash
   npm run setup-db
   ```
   
   Then run the SQL commands in your Supabase dashboard (see `SUPABASE_SETUP.md`)

5. **Import NEPSE data**
   ```bash
   npm run import-nepse
   ```

6. **Start development server**
   ```bash
   npm run dev
   ```

## 📁 Project Structure

```
nextjs-app/
├── src/
│   ├── app/                    # Next.js app router
│   │   ├── api/               # API routes
│   │   │   ├── nepse/         # NEPSE data APIs
│   │   │   └── cron/          # Scheduled tasks
│   │   ├── charts/            # Charts page
│   │   ├── nepse/             # NEPSE data page
│   │   └── ...                # Other pages
│   ├── components/            # React components
│   │   ├── charts/            # Chart components
│   │   ├── layout/            # Layout components
│   │   └── ui/                # UI components
│   └── lib/                   # Utilities
│       └── supabase.ts        # Supabase client
├── scripts/                   # Utility scripts
│   └── import-nepse-data.js   # Data import script
├── data/                      # Data files
├── .github/workflows/         # GitHub Actions
└── docs/                      # Documentation
```

## 🔌 API Endpoints

### NEPSE Data APIs

- `GET /api/nepse` - Get NEPSE data from database
- `GET /api/nepse/fetch` - Fetch live data from external sources
- `GET /api/nepse/sync` - Sync data to database
- `GET /api/cron/nepse-sync` - Scheduled sync endpoint

### Query Parameters

- `type`: `overview` | `historical` | `stocks` | `indices` | `all`
- `limit`: Number of records to return
- `store`: `true` | `false` - Whether to store fetched data

### Example Usage

```bash
# Get market overview
curl "http://localhost:3000/api/nepse?type=overview"

# Fetch and store live data
curl "http://localhost:3000/api/nepse/fetch?type=all&store=true"

# Sync data to database
curl "http://localhost:3000/api/nepse/sync?type=all"
```

## 📊 Database Schema

### Tables

1. **nepse_index** - Historical index data
2. **nepse_stocks** - Stock information
3. **nepse_indices** - Market indices

See `SUPABASE_SETUP.md` for detailed schema.

## 🔄 Automated Data Sync

### GitHub Actions
- Runs every 30 minutes during market hours
- Configurable sync types
- Automatic retry on failure

### Vercel Cron
- Alternative to GitHub Actions
- Configure in `vercel-cron.json`

### Manual Sync
```bash
# Sync all data
npm run sync-nepse

# Test API endpoints
npm run test-api
```

## 📈 Data Sources

### Primary Sources
1. **NEPSE Official APIs**
2. **Merolagani APIs**
3. **Alternative financial data providers**

### Fallback
- Mock data generation for development
- Historical data from Kaggle datasets

## 🚀 Deployment

### Vercel (Recommended)

1. **Connect to Vercel**
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Set environment variables**
   - Add Supabase credentials
   - Configure cron secrets

3. **Deploy**
   ```bash
   vercel --prod
   ```

### Other Platforms

- **Netlify**: Compatible with static export
- **Railway**: Full-stack deployment
- **AWS**: Custom deployment

## 🔧 Development

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
npm run import-nepse # Import NEPSE data
npm run sync-nepse   # Sync live data
npm run test-api     # Test API endpoints
```

### Code Quality

- **ESLint**: Code linting
- **TypeScript**: Type safety
- **Prettier**: Code formatting (optional)

## 📚 Documentation

- [Supabase Setup Guide](SUPABASE_SETUP.md)
- [API Documentation](docs/api.md)
- [Deployment Guide](docs/deployment.md)
- [Contributing Guide](CONTRIBUTING.md)

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
- **Email**: support@sagarmathainvestments.com

## 🙏 Acknowledgments

- NEPSE for providing market data
- Supabase for the database platform
- Vercel for hosting and deployment
- The open-source community for amazing tools

---

**Sagarmatha Investments** - Empowering financial success in Nepal 🇳🇵