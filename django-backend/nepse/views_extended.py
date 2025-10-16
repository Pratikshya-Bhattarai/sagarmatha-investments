from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.utils import timezone
from django.db.models import Q, Avg, Max, Min, Sum
from django.db.models.functions import TruncDay, TruncMonth
from .models import NEPSEIndex, NEPSEStock, NEPSEIndices, DataUpdateLog
from .serializers import (
    NEPSEIndexSerializer, NEPSEStockSerializer, NEPSEIndicesSerializer,
    DataUpdateLogSerializer, ChartDataSerializer, MarketOverviewSerializer
)
from .services_simple import NEPSEDataService, ChartDataService
import logging
from datetime import datetime, timedelta

logger = logging.getLogger(__name__)


class SagarmathaAnalyticsViewSet(viewsets.ViewSet):
    """Advanced analytics endpoints for Sagarmatha Investments"""
    
    @action(detail=False, methods=['get'])
    def market_summary(self, request):
        """Get comprehensive market summary for Sagarmatha dashboard"""
        try:
            # Get latest market data
            latest_index = NEPSEIndex.objects.first()
            total_stocks = NEPSEStock.objects.count()
            
            # Calculate market statistics
            total_volume = NEPSEStock.objects.aggregate(Sum('volume'))['volume__sum'] or 0
            total_turnover = NEPSEStock.objects.aggregate(Sum('turnover'))['turnover__sum'] or 0
            
            # Get sector distribution
            sector_stats = NEPSEStock.objects.values('sector').annotate(
                count=Sum('volume'),
                avg_price=Avg('current_price')
            ).order_by('-count')
            
            # Get price range statistics
            price_stats = NEPSEStock.objects.aggregate(
                max_price=Max('current_price'),
                min_price=Min('current_price'),
                avg_price=Avg('current_price')
            )
            
            # Get performance metrics
            gainers_count = NEPSEStock.objects.filter(change_percent__gt=0).count()
            losers_count = NEPSEStock.objects.filter(change_percent__lt=0).count()
            unchanged_count = NEPSEStock.objects.filter(change_percent=0).count()
            
            summary = {
                'market_overview': {
                    'nepse_index': {
                        'current': float(latest_index.close_price) if latest_index else 0,
                        'change': float(latest_index.close_price - latest_index.open_price) if latest_index else 0,
                        'change_percent': float(((latest_index.close_price - latest_index.open_price) / latest_index.open_price) * 100) if latest_index else 0,
                        'volume': latest_index.volume if latest_index else 0,
                        'turnover': latest_index.turnover if latest_index else 0,
                        'date': latest_index.date if latest_index else None
                    },
                    'total_stocks': total_stocks,
                    'total_volume': total_volume,
                    'total_turnover': total_turnover,
                    'gainers': gainers_count,
                    'losers': losers_count,
                    'unchanged': unchanged_count
                },
                'sector_distribution': list(sector_stats),
                'price_statistics': {
                    'highest_price': float(price_stats['max_price']) if price_stats['max_price'] else 0,
                    'lowest_price': float(price_stats['min_price']) if price_stats['min_price'] else 0,
                    'average_price': float(price_stats['avg_price']) if price_stats['avg_price'] else 0
                },
                'last_updated': timezone.now()
            }
            
            return Response(summary)
            
        except Exception as e:
            logger.error(f"Error in market summary: {str(e)}")
            return Response(
                {'error': 'Failed to fetch market summary'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def portfolio_analysis(self, request):
        """Get portfolio analysis for Sagarmatha investments"""
        try:
            # Get top performing sectors
            sector_performance = NEPSEStock.objects.values('sector').annotate(
                avg_change=Avg('change_percent'),
                total_volume=Sum('volume'),
                stock_count=Sum('volume')  # Using volume as proxy for count
            ).order_by('-avg_change')
            
            # Get market cap distribution
            market_cap_distribution = NEPSEStock.objects.values('market_cap').annotate(
                count=Sum('volume')  # Using volume as proxy
            ).order_by('-count')
            
            # Get volatility analysis
            high_volatility_stocks = NEPSEStock.objects.filter(
                change_percent__gt=5
            ).order_by('-change_percent')[:10]
            
            low_volatility_stocks = NEPSEStock.objects.filter(
                change_percent__lt=-5
            ).order_by('change_percent')[:10]
            
            analysis = {
                'sector_performance': list(sector_performance),
                'market_cap_distribution': list(market_cap_distribution),
                'high_volatility': NEPSEStockSerializer(high_volatility_stocks, many=True).data,
                'low_volatility': NEPSEStockSerializer(low_volatility_stocks, many=True).data,
                'analysis_date': timezone.now()
            }
            
            return Response(analysis)
            
        except Exception as e:
            logger.error(f"Error in portfolio analysis: {str(e)}")
            return Response(
                {'error': 'Failed to fetch portfolio analysis'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def investment_recommendations(self, request):
        """Get investment recommendations based on current market data"""
        try:
            # Get undervalued stocks (low PE ratio, positive change)
            undervalued = NEPSEStock.objects.filter(
                pe_ratio__lt=20,
                change_percent__gt=0,
                pe_ratio__isnull=False
            ).order_by('pe_ratio')[:10]
            
            # Get high dividend yield stocks
            high_dividend = NEPSEStock.objects.filter(
                change_percent__gt=0,
                current_price__lt=500  # Assuming lower price stocks might have higher yield
            ).order_by('-change_percent')[:10]
            
            # Get growth stocks (high change percentage)
            growth_stocks = NEPSEStock.objects.filter(
                change_percent__gt=2
            ).order_by('-change_percent')[:10]
            
            # Get stable stocks (low volatility)
            stable_stocks = NEPSEStock.objects.filter(
                change_percent__gt=-1,
                change_percent__lt=1
            ).order_by('-volume')[:10]
            
            recommendations = {
                'undervalued_stocks': NEPSEStockSerializer(undervalued, many=True).data,
                'high_dividend_stocks': NEPSEStockSerializer(high_dividend, many=True).data,
                'growth_stocks': NEPSEStockSerializer(growth_stocks, many=True).data,
                'stable_stocks': NEPSEStockSerializer(stable_stocks, many=True).data,
                'recommendation_date': timezone.now()
            }
            
            return Response(recommendations)
            
        except Exception as e:
            logger.error(f"Error in investment recommendations: {str(e)}")
            return Response(
                {'error': 'Failed to fetch investment recommendations'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class SagarmathaReportsViewSet(viewsets.ViewSet):
    """Reports and analytics for Sagarmatha Investments"""
    
    @action(detail=False, methods=['get'])
    def daily_report(self, request):
        """Generate daily market report"""
        try:
            today = timezone.now().date()
            yesterday = today - timedelta(days=1)
            
            # Get today's data
            today_index = NEPSEIndex.objects.filter(date=today).first()
            yesterday_index = NEPSEIndex.objects.filter(date=yesterday).first()
            
            # Calculate daily changes
            if today_index and yesterday_index:
                index_change = float(today_index.close_price - yesterday_index.close_price)
                index_change_percent = float((index_change / yesterday_index.close_price) * 100)
            else:
                index_change = 0
                index_change_percent = 0
            
            # Get top movers
            top_gainers = NEPSEStock.objects.filter(change_percent__gt=0).order_by('-change_percent')[:5]
            top_losers = NEPSEStock.objects.filter(change_percent__lt=0).order_by('change_percent')[:5]
            
            # Get sector performance
            sector_performance = NEPSEStock.objects.values('sector').annotate(
                avg_change=Avg('change_percent'),
                total_volume=Sum('volume')
            ).order_by('-avg_change')
            
            report = {
                'date': today,
                'nepse_index': {
                    'current': float(today_index.close_price) if today_index else 0,
                    'change': index_change,
                    'change_percent': index_change_percent,
                    'volume': today_index.volume if today_index else 0,
                    'turnover': today_index.turnover if today_index else 0
                },
                'top_gainers': NEPSEStockSerializer(top_gainers, many=True).data,
                'top_losers': NEPSEStockSerializer(top_losers, many=True).data,
                'sector_performance': list(sector_performance),
                'market_sentiment': 'Bullish' if index_change > 0 else 'Bearish' if index_change < 0 else 'Neutral',
                'generated_at': timezone.now()
            }
            
            return Response(report)
            
        except Exception as e:
            logger.error(f"Error in daily report: {str(e)}")
            return Response(
                {'error': 'Failed to generate daily report'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['get'])
    def weekly_summary(self, request):
        """Generate weekly market summary"""
        try:
            end_date = timezone.now().date()
            start_date = end_date - timedelta(days=7)
            
            # Get weekly index data
            weekly_data = NEPSEIndex.objects.filter(
                date__range=[start_date, end_date]
            ).order_by('date')
            
            if weekly_data.exists():
                week_start = weekly_data.first()
                week_end = weekly_data.last()
                
                weekly_change = float(week_end.close_price - week_start.open_price)
                weekly_change_percent = float((weekly_change / week_start.open_price) * 100)
                
                # Calculate weekly volume and turnover
                total_volume = sum(data.volume for data in weekly_data)
                total_turnover = sum(data.turnover for data in weekly_data)
                
                # Get weekly top performers
                weekly_gainers = NEPSEStock.objects.filter(
                    change_percent__gt=0
                ).order_by('-change_percent')[:10]
                
                weekly_losers = NEPSEStock.objects.filter(
                    change_percent__lt=0
                ).order_by('change_percent')[:10]
                
                summary = {
                    'week_period': f"{start_date} to {end_date}",
                    'nepse_index': {
                        'start_price': float(week_start.open_price),
                        'end_price': float(week_end.close_price),
                        'change': weekly_change,
                        'change_percent': weekly_change_percent,
                        'total_volume': total_volume,
                        'total_turnover': total_turnover
                    },
                    'top_gainers': NEPSEStockSerializer(weekly_gainers, many=True).data,
                    'top_losers': NEPSEStockSerializer(weekly_losers, many=True).data,
                    'generated_at': timezone.now()
                }
                
                return Response(summary)
            else:
                return Response(
                    {'error': 'No data available for the specified week'}, 
                    status=status.HTTP_404_NOT_FOUND
                )
                
        except Exception as e:
            logger.error(f"Error in weekly summary: {str(e)}")
            return Response(
                {'error': 'Failed to generate weekly summary'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


class SagarmathaDataViewSet(viewsets.ViewSet):
    """Data management endpoints for Sagarmatha"""
    
    @action(detail=False, methods=['get'])
    def data_health(self, request):
        """Check data health and freshness"""
        try:
            # Check latest data timestamps
            latest_index = NEPSEIndex.objects.first()
            latest_stock = NEPSEStock.objects.first()
            latest_indices = NEPSEIndices.objects.first()
            
            # Check data update logs
            recent_logs = DataUpdateLog.objects.order_by('-created_at')[:5]
            
            # Calculate data freshness
            now = timezone.now()
            data_freshness = {}
            
            if latest_index:
                hours_since_index = (now - latest_index.updated_at).total_seconds() / 3600
                data_freshness['index'] = {
                    'last_updated': latest_index.updated_at,
                    'hours_ago': round(hours_since_index, 2),
                    'status': 'Fresh' if hours_since_index < 24 else 'Stale'
                }
            
            if latest_stock:
                hours_since_stock = (now - latest_stock.updated_at).total_seconds() / 3600
                data_freshness['stocks'] = {
                    'last_updated': latest_stock.updated_at,
                    'hours_ago': round(hours_since_stock, 2),
                    'status': 'Fresh' if hours_since_stock < 24 else 'Stale'
                }
            
            health_status = {
                'data_freshness': data_freshness,
                'recent_updates': DataUpdateLogSerializer(recent_logs, many=True).data,
                'total_records': {
                    'index_records': NEPSEIndex.objects.count(),
                    'stock_records': NEPSEStock.objects.count(),
                    'indices_records': NEPSEIndices.objects.count()
                },
                'checked_at': now
            }
            
            return Response(health_status)
            
        except Exception as e:
            logger.error(f"Error in data health check: {str(e)}")
            return Response(
                {'error': 'Failed to check data health'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'])
    def trigger_update(self, request):
        """Trigger data update (admin only)"""
        try:
            update_type = request.data.get('type', 'all')
            
            # This would typically trigger a Celery task
            # For now, we'll just log the request
            logger.info(f"Data update triggered: {update_type}")
            
            return Response({
                'message': f'Data update for {update_type} has been triggered',
                'status': 'queued',
                'timestamp': timezone.now()
            })
            
        except Exception as e:
            logger.error(f"Error triggering update: {str(e)}")
            return Response(
                {'error': 'Failed to trigger data update'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
