from django.db import models
from django.utils import timezone


class NEPSEIndex(models.Model):
    """Model for NEPSE Index data"""
    date = models.DateField()
    open_price = models.DecimalField(max_digits=10, decimal_places=2)
    high_price = models.DecimalField(max_digits=10, decimal_places=2)
    low_price = models.DecimalField(max_digits=10, decimal_places=2)
    close_price = models.DecimalField(max_digits=10, decimal_places=2)
    volume = models.BigIntegerField()
    turnover = models.BigIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date']
        unique_together = ['date']

    def __str__(self):
        return f"NEPSE Index - {self.date}"


class NEPSEStock(models.Model):
    """Model for individual stock data"""
    symbol = models.CharField(max_length=10, unique=True)
    company_name = models.CharField(max_length=200)
    sector = models.CharField(max_length=100)
    current_price = models.DecimalField(max_digits=10, decimal_places=2)
    change = models.DecimalField(max_digits=10, decimal_places=2)
    change_percent = models.DecimalField(max_digits=5, decimal_places=2)
    volume = models.BigIntegerField()
    turnover = models.BigIntegerField()
    high_52w = models.DecimalField(max_digits=10, decimal_places=2)
    low_52w = models.DecimalField(max_digits=10, decimal_places=2)
    market_cap = models.CharField(max_length=20)
    pe_ratio = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    last_trade_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-current_price']

    def __str__(self):
        return f"{self.symbol} - {self.company_name}"


class NEPSEIndices(models.Model):
    """Model for various NEPSE indices"""
    name = models.CharField(max_length=100)
    symbol = models.CharField(max_length=20)
    current = models.DecimalField(max_digits=10, decimal_places=2)
    change = models.DecimalField(max_digits=10, decimal_places=2)
    change_percent = models.DecimalField(max_digits=5, decimal_places=2)
    high_52w = models.DecimalField(max_digits=10, decimal_places=2)
    low_52w = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-date', 'name']
        unique_together = ['name', 'date']

    def __str__(self):
        return f"{self.name} - {self.date}"


class DataUpdateLog(models.Model):
    """Model to track data update logs"""
    update_type = models.CharField(max_length=50, choices=[
        ('index', 'Index Data'),
        ('stocks', 'Stock Data'),
        ('indices', 'Indices Data'),
        ('all', 'All Data'),
    ])
    status = models.CharField(max_length=20, choices=[
        ('success', 'Success'),
        ('failed', 'Failed'),
        ('partial', 'Partial'),
    ])
    records_updated = models.IntegerField(default=0)
    error_message = models.TextField(blank=True, null=True)
    started_at = models.DateTimeField()
    completed_at = models.DateTimeField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.update_type} - {self.status} - {self.created_at}"
