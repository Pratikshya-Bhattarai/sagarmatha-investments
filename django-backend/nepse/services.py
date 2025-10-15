"""
Services for NEPSE data handling and processing
"""
import os
import pandas as pd
import requests
from datetime import datetime, timedelta
from django.utils import timezone
from django.conf import settings
from django.core.cache import cache
from .models import NEPSEIndex, NEPSEStock, NEPSEIndices, DataUpdateLog
import logging

logger = logging.getLogger(__name__)


class NEPSEDataService:
    """Service for fetching and processing NEPSE data"""
    
    def __init__(self):
        self.kaggle_username = settings.KAGGLE_USERNAME
        self.kaggle_key = settings.KAGGLE_KEY
        self.cache_timeout = settings.NEPSE_DATA_CACHE_TIMEOUT
    
    def fetch_kaggle_data(self):
        """Fetch data from Kaggle dataset"""
        try:
            # Set up Kaggle credentials
            os.environ['KAGGLE_USERNAME'] = self.kaggle_username
            os.environ['KAGGLE_KEY'] = self.kaggle_key
            
            from kaggle.api.kaggle_api_extended import KaggleApi
            api = KaggleApi()
            api.authenticate()
            
            # Download the dataset
            api.dataset_download_files(
                'dimanjung/nepse-index-historical-data',
                path='./data',
                unzip=True
            )
            
            return True
        except Exception as e:
            logger.error(f"Error fetching Kaggle data: {str(e)}")
            return False
    
    def process_historical_data(self):
        """Process historical data from CSV files"""
        try:
            data_dir = './data'
            csv_files = [f for f in os.listdir(data_dir) if f.endswith('.csv')]
            
            for csv_file in csv_files:
                file_path = os.path.join(data_dir, csv_file)
                df = pd.read_csv(file_path)
                
                # Process based on file name or content
                if 'index' in csv_file.lower():
                    self._process_index_data(df)
                elif 'stock' in csv_file.lower():
                    self._process_stock_data(df)
                elif 'indices' in csv_file.lower():
                    self._process_indices_data(df)
            
            return True
        except Exception as e:
            logger.error(f"Error processing historical data: {str(e)}")
            return False
    
    def _process_index_data(self, df):
        """Process NEPSE index data"""
        for _, row in df.iterrows():
            NEPSEIndex.objects.update_or_create(
                date=pd.to_datetime(row['Date']).date(),
                defaults={
                    'open_price': float(row.get('Open', 0)),
                    'high_price': float(row.get('High', 0)),
                    'low_price': float(row.get('Low', 0)),
                    'close_price': float(row.get('Close', 0)),
                    'volume': int(row.get('Volume', 0)),
                    'turnover': int(row.get('Turnover', 0)),
                }
            )
    
    def _process_stock_data(self, df):
        """Process stock data"""
        for _, row in df.iterrows():
            NEPSEStock.objects.update_or_create(
                symbol=row['Symbol'],
                defaults={
                    'company_name': row.get('Company Name', ''),
                    'sector': row.get('Sector', ''),
                    'current_price': float(row.get('Current Price', 0)),
                    'change': float(row.get('Change', 0)),
                    'change_percent': float(row.get('Change %', 0)),
                    'volume': int(row.get('Volume', 0)),
                    'turnover': int(row.get('Turnover', 0)),
                    'high_52w': float(row.get('52W High', 0)),
                    'low_52w': float(row.get('52W Low', 0)),
                    'market_cap': str(row.get('Market Cap', '')),
                    'pe_ratio': float(row.get('P/E Ratio', 0)) if pd.notna(row.get('P/E Ratio')) else None,
                    'last_trade_time': timezone.now(),
                }
            )
    
    def _process_indices_data(self, df):
        """Process indices data"""
        for _, row in df.iterrows():
            NEPSEIndices.objects.update_or_create(
                name=row['Name'],
                date=pd.to_datetime(row['Date']).date(),
                defaults={
                    'symbol': row.get('Symbol', ''),
                    'current': float(row.get('Current', 0)),
                    'change': float(row.get('Change', 0)),
                    'change_percent': float(row.get('Change %', 0)),
                    'high_52w': float(row.get('52W High', 0)),
                    'low_52w': float(row.get('52W Low', 0)),
                }
            )
    
    def fetch_live_data(self):
        """Fetch live data from NEPSE API (if available)"""
        try:
            # This would be implemented based on actual NEPSE API
            # For now, we'll use sample data
            return self._generate_sample_live_data()
        except Exception as e:
            logger.error(f"Error fetching live data: {str(e)}")
            return False
    
    def _generate_sample_live_data(self):
        """Generate sample live data for demonstration"""
        import random
        
        # Generate sample index data
        base_price = 2800 + random.uniform(-100, 100)
        NEPSEIndex.objects.create(
            date=timezone.now().date(),
            open_price=base_price - random.uniform(10, 50),
            high_price=base_price + random.uniform(10, 50),
            low_price=base_price - random.uniform(20, 80),
            close_price=base_price,
            volume=random.randint(1000000, 2000000),
            turnover=random.randint(3000000000, 5000000000),
        )
        
        # Generate sample stock data
        stocks = ['NICL', 'NABIL', 'SCB', 'NBL', 'ADBL']
        for symbol in stocks:
            base_price = random.uniform(200, 600)
            change = random.uniform(-50, 50)
            NEPSEStock.objects.update_or_create(
                symbol=symbol,
                defaults={
                    'company_name': f"{symbol} Bank Limited",
                    'sector': 'Banking',
                    'current_price': base_price,
                    'change': change,
                    'change_percent': (change / base_price) * 100,
                    'volume': random.randint(50000, 200000),
                    'turnover': random.randint(10000000, 100000000),
                    'high_52w': base_price + random.uniform(50, 100),
                    'low_52w': base_price - random.uniform(50, 100),
                    'market_cap': f"{random.randint(20, 100)}B",
                    'pe_ratio': random.uniform(10, 30),
                    'last_trade_time': timezone.now(),
                }
            )
        
        return True
    
    def update_data(self, update_type='all'):
        """Update NEPSE data"""
        start_time = timezone.now()
        
        try:
            if update_type in ['index', 'all']:
                self.fetch_live_data()
            
            # Log the update
            DataUpdateLog.objects.create(
                update_type=update_type,
                status='success',
                records_updated=1,
                started_at=start_time,
                completed_at=timezone.now(),
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Error updating data: {str(e)}")
            DataUpdateLog.objects.create(
                update_type=update_type,
                status='failed',
                error_message=str(e),
                started_at=start_time,
                completed_at=timezone.now(),
            )
            return False


class ChartDataService:
    """Service for generating chart data"""
    
    def get_index_chart_data(self, days=30):
        """Get chart data for NEPSE index"""
        end_date = timezone.now().date()
        start_date = end_date - timedelta(days=days)
        
        indices = NEPSEIndex.objects.filter(
            date__gte=start_date,
            date__lte=end_date
        ).order_by('date')
        
        labels = [index.date.strftime('%Y-%m-%d') for index in indices]
        close_prices = [float(index.close_price) for index in indices]
        volumes = [index.volume for index in indices]
        
        return {
            'labels': labels,
            'datasets': [
                {
                    'label': 'NEPSE Index',
                    'data': close_prices,
                    'borderColor': 'rgb(75, 192, 192)',
                    'backgroundColor': 'rgba(75, 192, 192, 0.2)',
                    'tension': 0.1
                },
                {
                    'label': 'Volume',
                    'data': volumes,
                    'borderColor': 'rgb(255, 99, 132)',
                    'backgroundColor': 'rgba(255, 99, 132, 0.2)',
                    'yAxisID': 'y1'
                }
            ]
        }
    
    def get_stocks_chart_data(self, days=30):
        """Get chart data for stocks"""
        stocks = NEPSEStock.objects.all()[:10]  # Top 10 stocks
        
        labels = [stock.symbol for stock in stocks]
        prices = [float(stock.current_price) for stock in stocks]
        changes = [float(stock.change_percent) for stock in stocks]
        
        return {
            'labels': labels,
            'datasets': [
                {
                    'label': 'Current Price',
                    'data': prices,
                    'borderColor': 'rgb(54, 162, 235)',
                    'backgroundColor': 'rgba(54, 162, 235, 0.2)',
                },
                {
                    'label': 'Change %',
                    'data': changes,
                    'borderColor': 'rgb(255, 205, 86)',
                    'backgroundColor': 'rgba(255, 205, 86, 0.2)',
                    'yAxisID': 'y1'
                }
            ]
        }
    
    def get_sectors_chart_data(self, days=30):
        """Get chart data for sectors"""
        from django.db.models import Avg
        
        sectors = NEPSEStock.objects.values('sector').annotate(
            avg_price=Avg('current_price'),
            avg_change=Avg('change_percent')
        ).order_by('-avg_price')[:10]
        
        labels = [sector['sector'] for sector in sectors]
        prices = [float(sector['avg_price']) for sector in sectors]
        changes = [float(sector['avg_change']) for sector in sectors]
        
        return {
            'labels': labels,
            'datasets': [
                {
                    'label': 'Average Price',
                    'data': prices,
                    'borderColor': 'rgb(153, 102, 255)',
                    'backgroundColor': 'rgba(153, 102, 255, 0.2)',
                },
                {
                    'label': 'Average Change %',
                    'data': changes,
                    'borderColor': 'rgb(255, 159, 64)',
                    'backgroundColor': 'rgba(255, 159, 64, 0.2)',
                    'yAxisID': 'y1'
                }
            ]
        }
