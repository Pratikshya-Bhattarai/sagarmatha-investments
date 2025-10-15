"""
Management command to import NEPSE data from Kaggle dataset
"""
import csv
import os
from datetime import datetime
from django.core.management.base import BaseCommand, CommandError
from django.utils.dateparse import parse_date
from nepse.models import NEPSEIndex, NEPSEStock, NEPSEIndices, DataUpdateLog
from django.utils import timezone


class Command(BaseCommand):
    help = 'Import NEPSE data from Kaggle dataset CSV file'

    def add_arguments(self, parser):
        parser.add_argument(
            'csv_file',
            type=str,
            help='Path to the CSV file containing NEPSE data'
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Clear existing data before importing'
        )

    def handle(self, *args, **options):
        csv_file = options['csv_file']
        clear_data = options['clear']

        if not os.path.exists(csv_file):
            raise CommandError(f'CSV file not found: {csv_file}')

        if clear_data:
            self.stdout.write('Clearing existing NEPSE data...')
            NEPSEIndex.objects.all().delete()
            NEPSEStock.objects.all().delete()
            NEPSEIndices.objects.all().delete()

        try:
            self.import_nepse_data(csv_file)
            self.stdout.write(
                self.style.SUCCESS('Successfully imported NEPSE data from Kaggle dataset')
            )
        except Exception as e:
            # Log the error
            DataUpdateLog.objects.create(
                update_type='kaggle_import',
                status='failed',
                message=f'Error importing Kaggle data: {str(e)}',
                started_at=timezone.now(),
                completed_at=timezone.now()
            )
            raise CommandError(f'Error importing data: {str(e)}')

    def import_nepse_data(self, csv_file):
        """Import NEPSE data from CSV file"""
        imported_count = 0
        
        with open(csv_file, 'r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            
            for row in reader:
                try:
                    # Parse the date
                    date_str = row.get('date', '')
                    if not date_str:
                        continue
                    
                    # Try different date formats
                    date_obj = None
                    for date_format in ['%Y-%m-%d', '%d/%m/%Y', '%m/%d/%Y', '%Y-%m-%d %H:%M:%S']:
                        try:
                            date_obj = datetime.strptime(date_str, date_format).date()
                            break
                        except ValueError:
                            continue
                    
                    if not date_obj:
                        self.stdout.write(f'Skipping row with invalid date: {date_str}')
                        continue

                    # Create or update NEPSE Index record
                    index_data, created = NEPSEIndex.objects.update_or_create(
                        date=date_obj,
                        defaults={
                            'open_price': float(row.get('open', 0)),
                            'high_price': float(row.get('high', 0)),
                            'low_price': float(row.get('low', 0)),
                            'close_price': float(row.get('close', 0)),
                            'volume': int(float(row.get('volume', 0))),
                            'turnover': int(float(row.get('turnover', 0))),
                        }
                    )
                    
                    if created:
                        imported_count += 1
                    
                except (ValueError, KeyError) as e:
                    self.stdout.write(f'Skipping row due to error: {str(e)}')
                    continue

        # Log the successful import
        DataUpdateLog.objects.create(
            update_type='kaggle_import',
            status='success',
            message=f'Imported {imported_count} records from Kaggle dataset',
            records_updated=imported_count,
            started_at=timezone.now(),
            completed_at=timezone.now()
        )

        self.stdout.write(f'Imported {imported_count} NEPSE index records')
