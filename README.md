# 🏔️ Sagarmatha Investments - NEPSE Market Analytics

A comprehensive NEPSE (Nepal Stock Exchange) market analytics application built with Django REST API backend and Next.js React frontend, featuring real-time data, candlestick charts, and stock search functionality.

## 🚀 Live Demo

- **Frontend**: [Deployed on Vercel](https://your-app.vercel.app)
- **Backend API**: [Deployed on PythonAnywhere](https://pratikshyab.pythonanywhere.com/api/v1/)
- **Database**: Supabase PostgreSQL

## 📊 Features

### 🎯 Core Features
- **Real-time NEPSE Index** display with historical data
- **Interactive Candlestick Charts** (30-day trends)
- **Stock Search** by symbol (e.g., NICL, NABIL, SCB)
- **Market Indices** overview (Banking, Hydropower, Finance, etc.)
- **Top Stocks** with price changes and volume
- **Mobile Responsive** design for all devices

### 🔧 Technical Features
- **REST API** with Django REST Framework
- **PostgreSQL Database** on Supabase
- **Real-time Data** updates
- **CORS** configured for frontend
- **Admin Panel** for data management
- **API Documentation** with all endpoints

## 🛠️ Tech Stack

### Backend
- **Django 5.0.8** - Web framework
- **Django REST Framework** - API development
- **PostgreSQL** - Database (Supabase)
- **Python 3.10+** - Programming language

### Frontend
- **Next.js 15.5.4** - React framework
- **React 19.1.0** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Chart.js** - Data visualization

### Database & Hosting
- **Supabase** - PostgreSQL database
- **PythonAnywhere** - Backend hosting
- **Vercel** - Frontend hosting

## 📁 Project Structure

```
sagarmatha-investments/
├── django-backend/                 # Django REST API
│   ├── nepse/                     # NEPSE app
│   │   ├── models.py              # Database models
│   │   ├── views.py               # API views
│   │   ├── serializers.py         # Data serializers
│   │   └── services_simple.py     # Business logic
│   ├── sagarmatha_backend/        # Django settings
│   ├── requirements.txt           # Python dependencies
│   └── manage.py                  # Django management
├── nextjs-app/                    # Next.js frontend
│   ├── src/
│   │   ├── app/                   # App router pages
│   │   ├── components/            # React components
│   │   │   ├── charts/            # Chart components
│   │   │   └── ui/                # UI components
│   │   └── lib/                   # Utilities
│   ├── package.json               # Node dependencies
│   └── next.config.ts             # Next.js config
├── SUPABASE_DATABASE_SCHEMA.sql   # Database schema
├── COMPLETE_DEPLOYMENT_GUIDE.md   # Deployment guide
└── README.md                      # This file
```

## 🚀 Quick Start

### Prerequisites
- Python 3.10+
- Node.js 18+
- Git
- Supabase account

### 1. Clone Repository
```bash
git clone https://github.com/your-username/sagarmatha-investments.git
cd sagarmatha-investments
```

### 2. Set Up Supabase Database
1. Create a new project at [supabase.com](https://supabase.com)
2. Run the SQL script from `SUPABASE_DATABASE_SCHEMA.sql`
3. Get your database credentials

### 3. Start Backend (Django)
```bash
cd django-backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate  # macOS/Linux

pip install -r requirements-minimal.txt
python manage.py migrate
python manage.py generate_sample_data --days 30
python manage.py runserver
```

### 4. Start Frontend (Next.js)
```bash
cd nextjs-app
npm install
npm run dev
```

### 5. Access Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000/api/v1/
- **Admin Panel**: http://localhost:8000/admin/

## 📡 API Endpoints

### Base URL: `http://localhost:8000/api/v1/`

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/` | GET | API root with available endpoints |
| `/index/` | GET | NEPSE index data |
| `/index/latest/` | GET | Latest NEPSE index |
| `/index/chart_data/` | GET | Chart data for visualization |
| `/stocks/` | GET | All stocks data |
| `/stocks/latest_price/?symbol=NICL` | GET | Latest price by symbol |
| `/stocks/top_gainers/` | GET | Top gaining stocks |
| `/stocks/top_losers/` | GET | Top losing stocks |
| `/stocks/most_active/` | GET | Most active stocks |
| `/indices/` | GET | Market indices |
| `/logs/` | GET | Data update logs |

### Example API Calls

```bash
# Get latest price for NICL
curl "http://localhost:8000/api/v1/stocks/latest_price/?symbol=NICL"

# Get 30-day chart data
curl "http://localhost:8000/api/v1/index/chart_data/?days=30"

# Get top gainers
curl "http://localhost:8000/api/v1/stocks/top_gainers/?limit=5"
```

## 🗄️ Database Schema

### Tables
- **nepse_index** - Daily NEPSE index data
- **nepse_stocks** - Individual stock information
- **nepse_indices** - Market indices data
- **data_update_logs** - Update operation logs

### Sample Data
The application includes sample data for:
- 30 days of NEPSE index history
- 10+ stocks from banking and insurance sectors
- 6 market indices (NEPSE, Banking, Hydropower, etc.)

## 🚀 Deployment

### Backend (PythonAnywhere)
1. Follow `COMPLETE_DEPLOYMENT_GUIDE.md`
2. Configure Supabase database
3. Deploy to PythonAnywhere
4. Set up scheduled tasks for data updates

### Frontend (Vercel)
1. Connect GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push

### Database (Supabase)
1. Create new project
2. Run database schema
3. Configure connection settings
4. Set up Row Level Security (RLS)

## 📱 Features in Detail

### 🎯 Stock Search
- Search stocks by symbol (NICL, NABIL, SCB, etc.)
- Real-time price information
- 52-week high/low data
- P/E ratio and market cap
- Volume and turnover data

### 📊 Candlestick Charts
- 30-day historical data
- Interactive charts with Chart.js
- OHLC (Open, High, Low, Close) data
- Color-coded for gains/losses

### 📈 Market Overview
- Current NEPSE index
- Market indices (Banking, Hydropower, etc.)
- Top gainers and losers
- Most active stocks
- Real-time updates

## 🔧 Development

### Backend Development
```bash
cd django-backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend Development
```bash
cd nextjs-app
npm run dev
npm run build
npm run start
```

### Database Management
```bash
# Generate sample data
python manage.py generate_sample_data --days 60

# Import from Kaggle
python manage.py import_kaggle_nepse path/to/data.csv

# Update data
python manage.py update_nepse_data --type all --source sample
```

## 📊 Data Sources

1. **Sample Data** - Generated for development and testing
2. **Kaggle Dataset** - Historical NEPSE data from Kaggle
3. **Real-time API** - NEPSE official API (when available)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Sagarmatha Investments**
- Email: info@sagarmathainvestments.com
- Website: [sagarmatha-investments.vercel.app](https://sagarmatha-investments.vercel.app)
- GitHub: [github.com/your-username/sagarmatha-investments](https://github.com/your-username/sagarmatha-investments)

## 🙏 Acknowledgments

- NEPSE (Nepal Stock Exchange) for market data
- Supabase for database hosting
- PythonAnywhere for backend hosting
- Vercel for frontend hosting
- Chart.js for data visualization
- Django and Next.js communities

---

**Built with ❤️ for the Nepalese stock market community** 🇳🇵