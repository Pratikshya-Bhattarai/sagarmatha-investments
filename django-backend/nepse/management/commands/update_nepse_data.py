from django.core.management.base import BaseCommand
from nepse.services import NEPSEDataService


class Command(BaseCommand):
    help = 'Update NEPSE data from various sources'

    def add_arguments(self, parser):
        parser.add_argument(
            '--type',
            type=str,
            default='all',
            choices=['index', 'stocks', 'indices', 'all'],
            help='Type of data to update'
        )
        parser.add_argument(
            '--source',
            type=str,
            default='live',
            choices=['live', 'kaggle', 'both'],
            help='Data source to use'
        )

    def handle(self, *args, **options):
        update_type = options['type']
        source = options['source']
        
        self.stdout.write(f'Updating NEPSE data: {update_type} from {source}')
        
        service = NEPSEDataService()
        
        if source in ['kaggle', 'both']:
            self.stdout.write('Fetching data from Kaggle...')
            if service.fetch_kaggle_data():
                self.stdout.write('Processing Kaggle data...')
                service.process_historical_data()
                self.stdout.write(
                    self.style.SUCCESS('Successfully processed Kaggle data')
                )
            else:
                self.stdout.write(
                    self.style.ERROR('Failed to fetch Kaggle data')
                )
        
        if source in ['live', 'both']:
            self.stdout.write('Fetching live data...')
            if service.fetch_live_data():
                self.stdout.write(
                    self.style.SUCCESS('Successfully updated live data')
                )
            else:
                self.stdout.write(
                    self.style.ERROR('Failed to fetch live data')
                )
        
        self.stdout.write(
            self.style.SUCCESS(f'Data update completed for {update_type}')
        )
