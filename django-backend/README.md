# Sagarmatha Investments - Django Backend

A Django REST API backend for Sagarmatha Investments, providing live NEPSE (Nepal Stock Exchange) data and comprehensive market analytics.

## 🚀 Features

- **Live NEPSE Data**: Real-time stock market data from Nepal Stock Exchange
- **REST API**: Comprehensive REST API with Django REST Framework
- **Chart Data**: Structured data for interactive charts and visualizations
- **Kaggle Integration**: Historical data from Kaggle datasets
- **Caching**: Redis-based caching for improved performance
- **Background Tasks**: Celery for scheduled data updates
- **Admin Interface**: Django admin for data management

## 🛠️ Tech Stack

- **Framework**: Django 5.0.8
- **API**: Django REST Framework 3.15.2
- **Database**: SQLite (development) / PostgreSQL (production)
- **Cache**: Redis
- **Task Queue**: Celery
- **Data Processing**: Pandas, NumPy
- **External Data**: Kaggle API

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd django-backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Fill in the required environment variables:
   ```env
   SECRET_KEY=your-secret-key-here
   DEBUG=True
   KAGGLE_USERNAME=your-kaggle-username
   KAGGLE_KEY=your-kaggle-api-key
   ```

5. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser**
   ```bash
   python manage.py createsuperuser
   ```

7. **Run the development server**
   ```bash
   python manage.py runserver
   ```

## 🔧 Available Commands

```bash
# Update NEPSE data
python manage.py update_nepse_data --type all --source both

# Update only index data
python manage.py update_nepse_data --type index --source live

# Update from Kaggle
python manage.py update_nepse_data --type all --source kaggle

# Run Celery worker
celery -A sagarmatha_backend worker --loglevel=info

# Run Celery beat (scheduler)
celery -A sagarmatha_backend beat --loglevel=info
```

## 📊 API Endpoints

### NEPSE Index Data
- `GET /api/v1/index/` - List all index data
- `GET /api/v1/index/latest/` - Get latest index data
- `GET /api/v1/index/chart_data/` - Get chart data for index

### Stock Data
- `GET /api/v1/stocks/` - List all stocks
- `GET /api/v1/stocks/top_gainers/` - Get top gaining stocks
- `GET /api/v1/stocks/top_losers/` - Get top losing stocks
- `GET /api/v1/stocks/most_active/` - Get most active stocks
- `GET /api/v1/stocks/by_sector/` - Get stocks by sector

### Market Overview
- `GET /api/v1/overview/overview/` - Get comprehensive market overview
- `GET /api/v1/overview/chart_data/` - Get chart data

### Indices Data
- `GET /api/v1/indices/` - List all indices
- `GET /api/v1/indices/latest/` - Get latest indices data

## 📈 Chart Data Structure

The API provides structured data for charts:

```json
{
  "labels": ["2024-01-01", "2024-01-02", "..."],
  "datasets": [
    {
      "label": "NEPSE Index",
      "data": [2800.50, 2850.75, "..."],
      "borderColor": "rgb(75, 192, 192)",
      "backgroundColor": "rgba(75, 192, 192, 0.2)"
    }
  ]
}
```

## 🔄 Data Sources

1. **Kaggle Dataset**: Historical NEPSE data from [Kaggle](https://www.kaggle.com/datasets/dimanjung/nepse-index-historical-data)
2. **Live Data**: Real-time data from NEPSE (when available)
3. **Sample Data**: Generated sample data for development

## 🚀 Deployment

### Heroku
```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create sagarmatha-backend

# Set environment variables
heroku config:set SECRET_KEY=your-secret-key
heroku config:set KAGGLE_USERNAME=your-username
heroku config:set KAGGLE_KEY=your-key

# Deploy
git push heroku main
```

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

## 🔧 Configuration

### Environment Variables
- `SECRET_KEY`: Django secret key
- `DEBUG`: Debug mode (True/False)
- `KAGGLE_USERNAME`: Kaggle username
- `KAGGLE_KEY`: Kaggle API key
- `REDIS_URL`: Redis connection URL
- `DATABASE_URL`: Database connection URL

### CORS Settings
Configure allowed origins in `settings.py`:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "https://your-frontend-domain.com",
]
```

## 📊 Data Models

- **NEPSEIndex**: Daily index data (open, high, low, close, volume, turnover)
- **NEPSEStock**: Individual stock data (price, change, volume, etc.)
- **NEPSEIndices**: Various market indices
- **DataUpdateLog**: Logs of data update operations

## 🔍 Filtering and Search

All endpoints support:
- **Filtering**: By date, sector, symbol, etc.
- **Search**: By company name, symbol, sector
- **Ordering**: By price, change, volume, date
- **Pagination**: Configurable page size

## 📱 Frontend Integration

This backend is designed to work with the Next.js frontend:

```javascript
// Fetch market overview
const response = await fetch('http://localhost:8000/api/v1/overview/overview/');
const data = await response.json();

// Fetch chart data
const chartResponse = await fetch('http://localhost:8000/api/v1/overview/chart_data/?type=index&days=30');
const chartData = await chartResponse.json();
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

**Sagarmatha Investments**
- Website: [sagarmatha-investments.vercel.app](https://sagarmatha-investments.vercel.app)
- Email: info@sagarmathainvestments.com
- Phone: +977-9876543211
