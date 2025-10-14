from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.filters import SearchFilter, OrderingFilter
from django.utils import timezone
from django.db.models import Q
from .models import NEPSEIndex, NEPSEStock, NEPSEIndices, DataUpdateLog
from .serializers import (
    NEPSEIndexSerializer, NEPSEStockSerializer, NEPSEIndicesSerializer,
    DataUpdateLogSerializer, ChartDataSerializer, MarketOverviewSerializer
)
from .services import NEPSEDataService, ChartDataService
import logging

logger = logging.getLogger(__name__)


class NEPSEIndexViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for NEPSE Index data"""
    queryset = NEPSEIndex.objects.all()
    serializer_class = NEPSEIndexSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['date']
    search_fields = []
    ordering_fields = ['date', 'close_price', 'volume']
    ordering = ['-date']

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest NEPSE index data"""
        latest_index = self.get_queryset().first()
        if latest_index:
            serializer = self.get_serializer(latest_index)
            return Response(serializer.data)
        return Response({'message': 'No data available'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=False, methods=['get'])
    def chart_data(self, request):
        """Get chart data for NEPSE index"""
        days = int(request.query_params.get('days', 30))
        chart_service = ChartDataService()
        data = chart_service.get_index_chart_data(days)
        serializer = ChartDataSerializer(data)
        return Response(serializer.data)


class NEPSEStockViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for NEPSE Stock data"""
    queryset = NEPSEStock.objects.all()
    serializer_class = NEPSEStockSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['sector', 'symbol']
    search_fields = ['symbol', 'company_name', 'sector']
    ordering_fields = ['current_price', 'change_percent', 'volume', 'turnover']
    ordering = ['-current_price']

    @action(detail=False, methods=['get'])
    def top_gainers(self, request):
        """Get top gaining stocks"""
        limit = int(request.query_params.get('limit', 10))
        top_gainers = self.get_queryset().filter(change_percent__gt=0).order_by('-change_percent')[:limit]
        serializer = self.get_serializer(top_gainers, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def top_losers(self, request):
        """Get top losing stocks"""
        limit = int(request.query_params.get('limit', 10))
        top_losers = self.get_queryset().filter(change_percent__lt=0).order_by('change_percent')[:limit]
        serializer = self.get_serializer(top_losers, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def most_active(self, request):
        """Get most active stocks by volume"""
        limit = int(request.query_params.get('limit', 10))
        most_active = self.get_queryset().order_by('-volume')[:limit]
        serializer = self.get_serializer(most_active, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def by_sector(self, request):
        """Get stocks grouped by sector"""
        sector = request.query_params.get('sector')
        if sector:
            stocks = self.get_queryset().filter(sector__icontains=sector)
        else:
            stocks = self.get_queryset()
        serializer = self.get_serializer(stocks, many=True)
        return Response(serializer.data)


class NEPSEIndicesViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for NEPSE Indices data"""
    queryset = NEPSEIndices.objects.all()
    serializer_class = NEPSEIndicesSerializer
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['name', 'symbol', 'date']
    search_fields = ['name', 'symbol']
    ordering_fields = ['current', 'change_percent', 'date']
    ordering = ['-date', 'name']

    @action(detail=False, methods=['get'])
    def latest(self, request):
        """Get the latest indices data"""
        latest_date = self.get_queryset().values_list('date', flat=True).first()
        if latest_date:
            latest_indices = self.get_queryset().filter(date=latest_date)
            serializer = self.get_serializer(latest_indices, many=True)
            return Response(serializer.data)
        return Response({'message': 'No data available'}, status=status.HTTP_404_NOT_FOUND)


class DataUpdateLogViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for data update logs"""
    queryset = DataUpdateLog.objects.all()
    serializer_class = DataUpdateLogSerializer
    filter_backends = [DjangoFilterBackend, OrderingFilter]
    filterset_fields = ['update_type', 'status']
    ordering_fields = ['created_at', 'started_at']
    ordering = ['-created_at']


class MarketOverviewViewSet(viewsets.ViewSet):
    """ViewSet for market overview data"""
    
    @action(detail=False, methods=['get'])
    def overview(self, request):
        """Get comprehensive market overview"""
        try:
            # Get latest NEPSE index
            latest_index = NEPSEIndex.objects.first()
            
            # Get top gainers and losers
            top_gainers = NEPSEStock.objects.filter(change_percent__gt=0).order_by('-change_percent')[:5]
            top_losers = NEPSEStock.objects.filter(change_percent__lt=0).order_by('change_percent')[:5]
            
            # Get most active stocks
            most_active = NEPSEStock.objects.order_by('-volume')[:5]
            
            # Get latest indices
            latest_date = NEPSEIndices.objects.values_list('date', flat=True).first()
            indices = NEPSEIndices.objects.filter(date=latest_date) if latest_date else NEPSEIndices.objects.none()
            
            overview_data = {
                'nepse_index': latest_index,
                'top_gainers': top_gainers,
                'top_losers': top_losers,
                'most_active': most_active,
                'indices': indices,
                'last_updated': timezone.now()
            }
            
            serializer = MarketOverviewSerializer(overview_data)
            return Response(serializer.data)
            
        except Exception as e:
            logger.error(f"Error in market overview: {str(e)}")
            return Response(
                {'error': 'Failed to fetch market overview'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=False, methods=['get'])
    def chart_data(self, request):
        """Get comprehensive chart data"""
        chart_type = request.query_params.get('type', 'index')
        days = int(request.query_params.get('days', 30))
        
        chart_service = ChartDataService()
        
        if chart_type == 'index':
            data = chart_service.get_index_chart_data(days)
        elif chart_type == 'stocks':
            data = chart_service.get_stocks_chart_data(days)
        elif chart_type == 'sectors':
            data = chart_service.get_sectors_chart_data(days)
        else:
            data = chart_service.get_index_chart_data(days)
        
        serializer = ChartDataSerializer(data)
        return Response(serializer.data)
