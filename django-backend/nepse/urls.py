from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from . import views_extended

router = DefaultRouter()
router.register(r'index', views.NEPSEIndexViewSet, basename='nepse-index')
router.register(r'stocks', views.NEPSEStockViewSet, basename='nepse-stocks')
router.register(r'indices', views.NEPSEIndicesViewSet, basename='nepse-indices')
router.register(r'logs', views.DataUpdateLogViewSet, basename='data-logs')
router.register(r'overview', views.MarketOverviewViewSet, basename='market-overview')

# Sagarmatha specific endpoints
router.register(r'analytics', views_extended.SagarmathaAnalyticsViewSet, basename='sagarmatha-analytics')
router.register(r'reports', views_extended.SagarmathaReportsViewSet, basename='sagarmatha-reports')
router.register(r'data', views_extended.SagarmathaDataViewSet, basename='sagarmatha-data')

urlpatterns = [
    path('', include(router.urls)),
]
