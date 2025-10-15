"""
Simplified Services for NEPSE data handling and processing (without pandas)
"""
import os
import requests
from datetime import datetime, timedelta
from django.utils import timezone
from django.conf import settings
from django.core.cache import cache
from .models import NEPSEIndex, NEPSEStock, NEPSEIndices, DataUpdateLog
import logging
import random

logger = logging.getLogger(__name__)


class NEPSEDataService:
    """Service for fetching and processing NEPSE data"""
    
    def __init__(self):
        self.kaggle_username = getattr(settings, 'KAGGLE_USERNAME', '')
        self.kaggle_key = getattr(settings, 'KAGGLE_KEY', '')
    
    def fetch_live_data(self):
        """Fetch live data from NEPSE (placeholder implementation)"""
        try:
            # This would be replaced with actual NEPSE API calls
            logger.info("Fetching live NEPSE data...")
            return self._generate_sample_data()
        except Exception as e:
            logger.error(f"Error fetching live data: {e}")
            return None
    
    def fetch_kaggle_data(self):
        """Fetch data from Kaggle (placeholder implementation)"""
        try:
            if not self.kaggle_username or not self.kaggle_key:
                logger.warning("Kaggle credentials not configured")
                return None
            
            logger.info("Fetching Kaggle data...")
            return self._generate_sample_data()
        except Exception as e:
            logger.error(f"Error fetching Kaggle data: {e}")
            return None
    
    def _generate_sample_data(self):
        """Generate sample data for development"""
        return {
            'index_data': self._generate_index_data(),
            'stocks_data': self._generate_stocks_data(),
            'indices_data': self._generate_indices_data()
        }
    
    def _generate_index_data(self):
        """Generate sample index data"""
        base_price = 2800 + random.uniform(-100, 100)
        return {
            'date': timezone.now().date(),
            'open': base_price - random.uniform(10, 30),
            'high': base_price + random.uniform(10, 30),
            'low': base_price - random.uniform(20, 40),
            'close': base_price,
            'volume': random.randint(1000000, 5000000),
            'turnover': random.randint(5000000000, 15000000000)
        }
    
    def _generate_stocks_data(self):
        """Generate sample stocks data"""
        stocks = []
        symbols = ['NICL', 'NABIL', 'SCB', 'NBL', 'ADBL', 'CBL', 'GBL', 'HBL']
        
        for symbol in symbols:
            base_price = random.uniform(200, 600)
            change = random.uniform(-50, 50)
            stocks.append({
                'symbol': symbol,
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
                'last_trade_time': timezone.now()
            })
        
        return stocks
    
    def _generate_indices_data(self):
        """Generate sample indices data"""
        indices = []
        index_names = ['NEPSE Index', 'Banking Index', 'Hydropower Index', 'Finance Index']
        
        for name in index_names:
            base_value = random.uniform(2000, 4000)
            change = random.uniform(-100, 100)
            indices.append({
                'name': name,
                'symbol': name.replace(' ', '_').upper(),
                'current_value': base_value,
                'change': change,
                'change_percent': (change / base_value) * 100,
                'high_52w': base_value + random.uniform(200, 500),
                'low_52w': base_value - random.uniform(200, 500),
                'date': timezone.now().date()
            })
        
        return indices
    
    def update_database(self, data_source='sample'):
        """Update database with fetched data"""
        try:
            if data_source == 'live':
                data = self.fetch_live_data()
            elif data_source == 'kaggle':
                data = self.fetch_kaggle_data()
            else:
                data = self._generate_sample_data()
            
            if not data:
                return False
            
            # Update index data
            if 'index_data' in data:
                self._update_index_data(data['index_data'])
            
            # Update stocks data
            if 'stocks_data' in data:
                self._update_stocks_data(data['stocks_data'])
            
            # Update indices data
            if 'indices_data' in data:
                self._update_indices_data(data['indices_data'])
            
            # Log the update
            DataUpdateLog.objects.create(
                update_type='full_update',
                status='success',
                message=f'Updated data from {data_source} source',
                records_updated=len(data.get('stocks_data', [])) + len(data.get('indices_data', []))
            )
            
            return True
            
        except Exception as e:
            logger.error(f"Error updating database: {e}")
            DataUpdateLog.objects.create(
                update_type='full_update',
                status='error',
                message=f'Error updating database: {str(e)}'
            )
            return False
    
    def _update_index_data(self, index_data):
        """Update index data in database"""
        NEPSEIndex.objects.update_or_create(
            date=index_data['date'],
            defaults={
                'open': index_data['open'],
                'high': index_data['high'],
                'low': index_data['low'],
                'close': index_data['close'],
                'volume': index_data['volume'],
                'turnover': index_data['turnover']
            }
        )
    
    def _update_stocks_data(self, stocks_data):
        """Update stocks data in database"""
        for stock_data in stocks_data:
            NEPSEStock.objects.update_or_create(
                symbol=stock_data['symbol'],
                defaults={
                    'company_name': stock_data['company_name'],
                    'sector': stock_data['sector'],
                    'current_price': stock_data['current_price'],
                    'change': stock_data['change'],
                    'change_percent': stock_data['change_percent'],
                    'volume': stock_data['volume'],
                    'turnover': stock_data['turnover'],
                    'high_52w': stock_data['high_52w'],
                    'low_52w': stock_data['low_52w'],
                    'market_cap': stock_data['market_cap'],
                    'pe_ratio': stock_data['pe_ratio'],
                    'last_trade_time': stock_data['last_trade_time']
                }
            )
    
    def _update_indices_data(self, indices_data):
        """Update indices data in database"""
        for index_data in indices_data:
            NEPSEIndices.objects.update_or_create(
                name=index_data['name'],
                date=index_data['date'],
                defaults={
                    'symbol': index_data['symbol'],
                    'current_value': index_data['current_value'],
                    'change': index_data['change'],
                    'change_percent': index_data['change_percent'],
                    'high_52w': index_data['high_52w'],
                    'low_52w': index_data['low_52w']
                }
            )


class ChartDataService:
    """Service for generating chart data"""
    
    def get_index_chart_data(self, days=30):
        """Get chart data for NEPSE index"""
        try:
            end_date = timezone.now().date()
            start_date = end_date - timedelta(days=days)
            
            index_data = NEPSEIndex.objects.filter(
                date__range=[start_date, end_date]
            ).order_by('date')
            
            if not index_data.exists():
                return self._generate_sample_chart_data()
            
            labels = [str(data.date) for data in index_data]
            datasets = [{
                'label': 'NEPSE Index',
                'data': [float(data.close) for data in index_data],
                'borderColor': 'rgb(75, 192, 192)',
                'backgroundColor': 'rgba(75, 192, 192, 0.2)',
                'tension': 0.1
            }]
            
            return {
                'labels': labels,
                'datasets': datasets
            }
            
        except Exception as e:
            logger.error(f"Error getting chart data: {e}")
            return self._generate_sample_chart_data()
    
    def _generate_sample_chart_data(self):
        """Generate sample chart data"""
        labels = []
        data = []
        base_price = 2800
        
        for i in range(30):
            date = timezone.now().date() - timedelta(days=29-i)
            labels.append(str(date))
            base_price += random.uniform(-20, 20)
            data.append(round(base_price, 2))
        
        return {
            'labels': labels,
            'datasets': [{
                'label': 'NEPSE Index',
                'data': data,
                'borderColor': 'rgb(75, 192, 192)',
                'backgroundColor': 'rgba(75, 192, 192, 0.2)',
                'tension': 0.1
            }]
        }
