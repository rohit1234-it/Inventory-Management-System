from rest_framework.viewsets import ModelViewSet
from .models import Product, Supplier, Order,Invoice
from .serializers import ProductSerializer, SupplierSerializer, OrderSerializer,InvoiceSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.viewsets import ModelViewSet
from rest_framework.filters import SearchFilter


class SupplierViewSet(ModelViewSet):
    queryset = Supplier.objects.all()
    serializer_class = SupplierSerializer


class ProductViewSet(ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer



class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer


    # DRF FILTERS
    filter_backends = [DjangoFilterBackend, SearchFilter]

    # exact filters
    filterset_fields = ['product', 'created_at']

    # search filter
    search_fields = ['product__name']


class InvoiceViewSet(ModelViewSet):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer