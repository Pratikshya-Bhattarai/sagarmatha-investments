# 🏔️ Sagarmatha Investments Backend

A comprehensive Django REST API backend for NEPSE (Nepal Stock Exchange) investment analysis and portfolio management.

## 🚀 Features

### Core API Endpoints
- **Market Data**: Real-time NEPSE index, stock prices, and market indices
- **Analytics**: Advanced market analysis and portfolio analytics
- **Reports**: Daily and weekly market reports
- **Data Management**: Health checks and data update triggers

### Sagarmatha Specific Features
- **Investment Recommendations**: AI-powered stock recommendations
- **Portfolio Analysis**: Comprehensive portfolio performance analysis
- **Market Summary**: Real-time market overview and statistics
- **Sector Analysis**: Detailed sector-wise performance metrics

## 📊 API Endpoints

### Market Data
- `GET /api/v1/index/` - NEPSE index data
- `GET /api/v1/stocks/` - Stock data with filtering
- `GET /api/v1/indices/` - Market indices
- `GET /api/v1/overview/overview/` - Market overview

### Sagarmatha Analytics
- `GET /api/v1/analytics/market_summary/` - Comprehensive market summary
- `GET /api/v1/analytics/portfolio_analysis/` - Portfolio analysis
- `GET /api/v1/analytics/investment_recommendations/` - Investment recommendations

### Reports
- `GET /api/v1/reports/daily_report/` - Daily market report
- `GET /api/v1/reports/weekly_summary/` - Weekly market summary

### Data Management
- `GET /api/v1/data/data_health/` - Data health check
- `POST /api/v1/data/trigger_update/` - Trigger data update

## 🛠️ Technology Stack

- **Backend**: Django 5.0.8 + Django REST Framework
- **Database**: MySQL (Production) / SQLite (Development)
- **Caching**: Redis
- **Background Tasks**: Celery
- **Data Processing**: Pandas, NumPy
- **API Documentation**: DRF Spectacular
- **Monitoring**: Sentry (Optional)

## 📁 Project Structure

```
django-backend/
├── sagarmatha_backend/          # Django project settings
│   ├── settings.py              # Development settings
│   ├── settings_production.py   # Production settings
│   ├── urls.py                  # URL configuration
│   └── wsgi.py                  # WSGI configuration
├── nepse/                       # Main app
│   ├── models.py                # Data models
│   ├── views.py                 # Basic views
│   ├── views_extended.py        # Sagarmatha specific views
│   ├── serializers.py           # API serializers
│   ├── urls.py                  # App URLs
│   └── services.py              # Business logic
├── requirements.txt             # Development dependencies
├── requirements_production.txt  # Production dependencies
├── wsgi_production.py           # Production WSGI
├── deploy_sagarmatha.sh         # Deployment script
└── SAGARMATHA_DEPLOYMENT_GUIDE.md
```

## 🚀 Quick Start

### Local Development

1. **Clone and Setup**
   ```bash
   cd django-backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```

2. **Environment Configuration**
   ```bash
   cp env.template .env
   # Edit .env with your configuration
   ```

3. **Database Setup**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   python manage.py createsuperuser
   ```

4. **Import Sample Data**
   ```bash
   python manage.py update_nepse_data --type all --source sample
   ```

5. **Run Development Server**
   ```bash
   python manage.py runserver
   ```

### Production Deployment (PythonAnywhere)

1. **Upload to PythonAnywhere**
   - Upload the entire `django-backend` directory
   - Set up MySQL database
   - Configure environment variables

2. **Run Deployment Script**
   ```bash
   chmod +x deploy_sagarmatha.sh
   ./deploy_sagarmatha.sh
   ```

3. **Configure Web App**
   - Set WSGI file: `wsgi_production.py`
   - Set working directory to project root
   - Configure static files

## 📚 API Documentation

### Authentication
Currently open access. For production, implement JWT authentication.

### Rate Limiting
- **Anonymous**: 100 requests/hour
- **Authenticated**: 1000 requests/hour

### Response Format
```json
{
  "data": [...],
  "count": 100,
  "next": "http://api.example.com/endpoint/?page=2",
  "previous": null
}
```

### Error Handling
```json
{
  "error": "Error message",
  "details": "Detailed error information"
}
```

## 🔧 Configuration

### Environment Variables
- `SECRET_KEY`: Django secret key
- `DEBUG`: Debug mode (False for production)
- `ALLOWED_HOSTS`: Allowed hostnames
- `DB_*`: Database configuration
- `REDIS_URL`: Redis connection string
- `EMAIL_*`: Email configuration

### Database Models
- **NEPSEIndex**: Market index data
- **NEPSEStock**: Individual stock data
- **NEPSEIndices**: Various market indices
- **DataUpdateLog**: Data update tracking

## 📊 Data Sources

- **NEPSE Official**: Real-time market data
- **Kaggle**: Historical data (optional)
- **Sample Data**: For development and testing

## 🔍 Monitoring

### Health Checks
- Database connectivity
- Redis connectivity
- Data freshness
- API response times

### Logging
- Application logs: `logs/django.log`
- Error logs: `logs/django_error.log`
- Production logs: `logs/django_production.log`

## 🚀 Deployment

### PythonAnywhere
1. Follow `SAGARMATHA_DEPLOYMENT_GUIDE.md`
2. Use `deploy_sagarmatha.sh` script
3. Configure web app settings

### Other Platforms
- **Heroku**: Use `Procfile` and `runtime.txt`
- **DigitalOcean**: Use Docker configuration
- **AWS**: Use Elastic Beanstalk

## 📈 Performance

### Caching
- Redis for session and data caching
- Database query optimization
- Static file compression

### Background Tasks
- Celery for data updates
- Scheduled data imports
- Report generation

## 🔒 Security

### Production Security
- HTTPS enforcement
- CORS configuration
- Rate limiting
- Input validation
- SQL injection prevention

## 📞 Support

- **Documentation**: See `SAGARMATHA_API_DOCUMENTATION.md`
- **Deployment**: See `SAGARMATHA_DEPLOYMENT_GUIDE.md`
- **Issues**: Check logs and error messages

## 🎯 Next Steps

1. **Deploy to PythonAnywhere**
2. **Set up monitoring**
3. **Configure backups**
4. **Connect frontend**
5. **Set up CI/CD**

---

**Built with ❤️ for Sagarmatha Investments** 🏔️
