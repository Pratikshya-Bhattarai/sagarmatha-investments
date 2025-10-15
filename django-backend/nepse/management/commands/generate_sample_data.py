"""
Management command to generate sample NEPSE data for testing
"""
import random
from datetime import datetime, timedelta
from django.core.management.base import BaseCommand
from django.utils import timezone
from nepse.models import NEPSEIndex, NEPSEStock, NEPSEIndices, DataUpdateLog


class Command(BaseCommand):
    help = 'Generate sample NEPSE data for testing'

    def add_arguments(self, parser):
        parser.add_argument(
            '--days',
            type=int,
            default=30,
            help='Number of days of data to generate (default: 30)'
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before generating'
        )

    def handle(self, *args, **options):
        days = options['days']
        clear_data = options['clear']

        if clear_data:
            self.stdout.write('Clearing existing data...')
            NEPSEIndex.objects.all().delete()
            NEPSEStock.objects.all().delete()
            NEPSEIndices.objects.all().delete()

        # Generate index data
        self.generate_index_data(days)
        
        # Generate stocks data
        self.generate_stocks_data()
        
        # Generate indices data
        self.generate_indices_data()

        self.stdout.write(
            self.style.SUCCESS(f'Successfully generated sample data for {days} days')
        )

    def generate_index_data(self, days):
        """Generate sample NEPSE index data"""
        base_price = 2800
        current_date = timezone.now().date() - timedelta(days=days)
        
        for i in range(days):
            # Simulate realistic price movement
            change = random.uniform(-50, 50)
            base_price += change
            base_price = max(2500, min(3200, base_price))  # Keep within reasonable range
            
            open_price = base_price - random.uniform(10, 30)
            high_price = base_price + random.uniform(20, 50)
            low_price = base_price - random.uniform(20, 50)
            close_price = base_price
            
            volume = random.randint(1000000, 5000000)
            turnover = random.randint(5000000000, 15000000000)
            
            NEPSEIndex.objects.create(
                date=current_date,
                open_price=round(open_price, 2),
                high_price=round(high_price, 2),
                low_price=round(low_price, 2),
                close_price=round(close_price, 2),
                volume=volume,
                turnover=turnover
            )
            
            current_date += timedelta(days=1)

    def generate_stocks_data(self):
        """Generate sample stocks data"""
        stocks_data = [
            {'symbol': 'NICL', 'name': 'Nepal Investment Bank Limited', 'sector': 'Banking'},
            {'symbol': 'NABIL', 'name': 'Nabil Bank Limited', 'sector': 'Banking'},
            {'symbol': 'SCB', 'name': 'Standard Chartered Bank Nepal Limited', 'sector': 'Banking'},
            {'symbol': 'NBL', 'name': 'Nepal Bank Limited', 'sector': 'Banking'},
            {'symbol': 'ADBL', 'name': 'Agriculture Development Bank Limited', 'sector': 'Banking'},
            {'symbol': 'CBL', 'name': 'Citizens Bank International Limited', 'sector': 'Banking'},
            {'symbol': 'GBL', 'name': 'Global IME Bank Limited', 'sector': 'Banking'},
            {'symbol': 'HBL', 'name': 'Himalayan Bank Limited', 'sector': 'Banking'},
            {'symbol': 'NLIC', 'name': 'National Life Insurance Company Limited', 'sector': 'Insurance'},
            {'symbol': 'NLICL', 'name': 'Nepal Life Insurance Company Limited', 'sector': 'Insurance'},
        ]
        
        for stock in stocks_data:
            base_price = random.uniform(200, 800)
            change = random.uniform(-50, 50)
            change_percent = (change / base_price) * 100
            
            NEPSEStock.objects.update_or_create(
                symbol=stock['symbol'],
                defaults={
                    'company_name': stock['name'],
                    'sector': stock['sector'],
                    'current_price': round(base_price, 2),
                    'change': round(change, 2),
                    'change_percent': round(change_percent, 2),
                    'volume': random.randint(50000, 200000),
                    'turnover': random.randint(10000000, 100000000),
                    'high_52w': round(base_price + random.uniform(50, 150), 2),
                    'low_52w': round(base_price - random.uniform(50, 150), 2),
                    'market_cap': f"{random.randint(20, 100)}B",
                    'pe_ratio': round(random.uniform(10, 30), 2),
                    'last_trade_time': timezone.now(),
                }
            )

    def generate_indices_data(self):
        """Generate sample indices data"""
        indices_data = [
            {'name': 'NEPSE Index', 'symbol': 'NEPSE'},
            {'name': 'Banking Index', 'symbol': 'BANKING'},
            {'name': 'Hydropower Index', 'symbol': 'HYDRO'},
            {'name': 'Finance Index', 'symbol': 'FINANCE'},
            {'name': 'Insurance Index', 'symbol': 'INSURANCE'},
            {'name': 'Trading Index', 'symbol': 'TRADING'},
        ]
        
        current_date = timezone.now().date()
        
        for index in indices_data:
            base_value = random.uniform(2000, 4000)
            change = random.uniform(-100, 100)
            change_percent = (change / base_value) * 100
            
            NEPSEIndices.objects.update_or_create(
                name=index['name'],
                date=current_date,
                defaults={
                    'symbol': index['symbol'],
                    'current': round(base_value, 2),
                    'change': round(change, 2),
                    'change_percent': round(change_percent, 2),
                    'high_52w': round(base_value + random.uniform(200, 500), 2),
                    'low_52w': round(base_value - random.uniform(200, 500), 2),
                }
            )
