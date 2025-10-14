from django.contrib import admin
from .models import NEPSEIndex, NEPSEStock, NEPSEIndices, DataUpdateLog


@admin.register(NEPSEIndex)
class NEPSEIndexAdmin(admin.ModelAdmin):
    list_display = ['date', 'close_price', 'change', 'volume', 'turnover']
    list_filter = ['date']
    search_fields = ['date']
    ordering = ['-date']


@admin.register(NEPSEStock)
class NEPSEStockAdmin(admin.ModelAdmin):
    list_display = ['symbol', 'company_name', 'sector', 'current_price', 'change_percent', 'volume']
    list_filter = ['sector', 'updated_at']
    search_fields = ['symbol', 'company_name', 'sector']
    ordering = ['-current_price']


@admin.register(NEPSEIndices)
class NEPSEIndicesAdmin(admin.ModelAdmin):
    list_display = ['name', 'symbol', 'current', 'change_percent', 'date']
    list_filter = ['name', 'date']
    search_fields = ['name', 'symbol']
    ordering = ['-date', 'name']


@admin.register(DataUpdateLog)
class DataUpdateLogAdmin(admin.ModelAdmin):
    list_display = ['update_type', 'status', 'records_updated', 'started_at', 'completed_at']
    list_filter = ['update_type', 'status', 'started_at']
    search_fields = ['update_type', 'status']
    ordering = ['-created_at']
