from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'index', views.NEPSEIndexViewSet, basename='nepse-index')
router.register(r'stocks', views.NEPSEStockViewSet, basename='nepse-stocks')
router.register(r'indices', views.NEPSEIndicesViewSet, basename='nepse-indices')
router.register(r'logs', views.DataUpdateLogViewSet, basename='data-logs')
router.register(r'overview', views.MarketOverviewViewSet, basename='market-overview')

urlpatterns = [
    path('', include(router.urls)),
]
