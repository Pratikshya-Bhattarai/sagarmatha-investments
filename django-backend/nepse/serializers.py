from rest_framework import serializers
from .models import NEPSEIndex, NEPSEStock, NEPSEIndices, DataUpdateLog


class NEPSEIndexSerializer(serializers.ModelSerializer):
    class Meta:
        model = NEPSEIndex
        fields = '__all__'


class NEPSEStockSerializer(serializers.ModelSerializer):
    class Meta:
        model = NEPSEStock
        fields = '__all__'


class NEPSEIndicesSerializer(serializers.ModelSerializer):
    class Meta:
        model = NEPSEIndices
        fields = '__all__'


class DataUpdateLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataUpdateLog
        fields = '__all__'


class ChartDataSerializer(serializers.Serializer):
    """Serializer for chart data"""
    labels = serializers.ListField(child=serializers.CharField())
    datasets = serializers.ListField(child=serializers.DictField())


class MarketOverviewSerializer(serializers.Serializer):
    """Serializer for market overview data"""
    nepse_index = NEPSEIndexSerializer()
    top_gainers = NEPSEStockSerializer(many=True)
    top_losers = NEPSEStockSerializer(many=True)
    most_active = NEPSEStockSerializer(many=True)
    indices = NEPSEIndicesSerializer(many=True)
    last_updated = serializers.DateTimeField()
