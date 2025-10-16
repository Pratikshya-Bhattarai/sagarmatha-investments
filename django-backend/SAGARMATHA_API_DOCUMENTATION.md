# 🏔️ Sagarmatha Investments API Documentation

## Overview
This API provides comprehensive financial data and analytics for NEPSE (Nepal Stock Exchange) investments, specifically designed for Sagarmatha Investments.

## Base URL
- **Local Development**: `http://localhost:8000/api/v1/`
- **Production**: `https://your-domain.pythonanywhere.com/api/v1/`

## Authentication
Currently, the API uses open access. For production, consider implementing JWT authentication.

## API Endpoints

### 📊 Market Data Endpoints

#### 1. NEPSE Index Data
- **GET** `/index/` - Get all NEPSE index data
- **GET** `/index/latest/` - Get latest NEPSE index
- **GET** `/index/chart_data/?days=30` - Get chart data for NEPSE index

#### 2. Stock Data
- **GET** `/stocks/` - Get all stock data
- **GET** `/stocks/top_gainers/?limit=10` - Get top gaining stocks
- **GET** `/stocks/top_losers/?limit=10` - Get top losing stocks
- **GET** `/stocks/most_active/?limit=10` - Get most active stocks
- **GET** `/stocks/by_sector/?sector=Banking` - Get stocks by sector
- **GET** `/stocks/latest_price/?symbol=NIC` - Get latest price for specific stock

#### 3. Market Indices
- **GET** `/indices/` - Get all NEPSE indices
- **GET** `/indices/latest/` - Get latest indices data

#### 4. Market Overview
- **GET** `/overview/overview/` - Get comprehensive market overview
- **GET** `/overview/chart_data/?type=index&days=30` - Get chart data

### 🏔️ Sagarmatha Specific Endpoints

#### 1. Analytics (`/analytics/`)
- **GET** `/analytics/market_summary/` - Comprehensive market summary
- **GET** `/analytics/portfolio_analysis/` - Portfolio analysis
- **GET** `/analytics/investment_recommendations/` - Investment recommendations

#### 2. Reports (`/reports/`)
- **GET** `/reports/daily_report/` - Daily market report
- **GET** `/reports/weekly_summary/` - Weekly market summary

#### 3. Data Management (`/data/`)
- **GET** `/data/data_health/` - Check data health and freshness
- **POST** `/data/trigger_update/` - Trigger data update (admin)

### 📈 Data Update Logs
- **GET** `/logs/` - Get data update logs

## Response Examples

### Market Summary Response
```json
{
  "market_overview": {
    "nepse_index": {
      "current": 2850.45,
      "change": 15.30,
      "change_percent": 0.54,
      "volume": 1500000,
      "turnover": 2500000000,
      "date": "2024-01-15"
    },
    "total_stocks": 250,
    "total_volume": 5000000,
    "total_turnover": 8000000000,
    "gainers": 120,
    "losers": 80,
    "unchanged": 50
  },
  "sector_distribution": [
    {
      "sector": "Banking",
      "count": 500000,
      "avg_price": 450.50
    }
  ],
  "price_statistics": {
    "highest_price": 2500.00,
    "lowest_price": 50.00,
    "average_price": 450.75
  },
  "last_updated": "2024-01-15T10:30:00Z"
}
```

### Investment Recommendations Response
```json
{
  "undervalued_stocks": [
    {
      "symbol": "NIC",
      "company_name": "Nepal Investment Bank",
      "current_price": 450.00,
      "change_percent": 2.5,
      "pe_ratio": 15.2,
      "sector": "Banking"
    }
  ],
  "growth_stocks": [
    {
      "symbol": "HIDCL",
      "company_name": "Hydroelectricity Investment",
      "current_price": 850.00,
      "change_percent": 5.2,
      "sector": "Hydropower"
    }
  ],
  "stable_stocks": [
    {
      "symbol": "NTC",
      "company_name": "Nepal Telecom",
      "current_price": 650.00,
      "change_percent": 0.5,
      "volume": 100000
    }
  ]
}
```

## Query Parameters

### Pagination
- `page` - Page number (default: 1)
- `page_size` - Items per page (default: 50)

### Filtering
- `date` - Filter by date (YYYY-MM-DD)
- `sector` - Filter by sector
- `symbol` - Filter by stock symbol

### Search
- `search` - Search in company names and symbols

### Ordering
- `ordering` - Order by field (e.g., `-current_price`, `change_percent`)

## Error Responses

### 400 Bad Request
```json
{
  "error": "Invalid parameters",
  "details": "Symbol parameter is required"
}
```

### 404 Not Found
```json
{
  "error": "Stock with symbol ABC not found"
}
```

### 500 Internal Server Error
```json
{
  "error": "Failed to fetch market data"
}
```

## Rate Limiting
- **Free Tier**: 100 requests per hour
- **Premium**: 1000 requests per hour

## Data Freshness
- **Index Data**: Updated every 15 minutes during market hours
- **Stock Data**: Updated every 5 minutes during market hours
- **Historical Data**: Updated daily

## SDKs and Libraries
- **Python**: `requests` library
- **JavaScript**: `axios` or `fetch`
- **React**: Custom hooks available

## Support
For API support and questions:
- **Email**: support@sagarmathainvestments.com
- **Documentation**: https://docs.sagarmathainvestments.com
- **Status Page**: https://status.sagarmathainvestments.com

## Changelog
- **v1.0.0** (2024-01-15): Initial release with basic endpoints
- **v1.1.0** (2024-01-20): Added Sagarmatha analytics endpoints
- **v1.2.0** (2024-01-25): Added reports and data management endpoints
