from rest_framework import serializers
from .models import Product, Supplier, Order, Invoice


class SupplierSerializer(serializers.ModelSerializer):
    class Meta:
        model = Supplier
        fields = "__all__"

from rest_framework import serializers
from .models import Product


class ProductSerializer(serializers.ModelSerializer):
    supplier_name = serializers.CharField(source="supplier.name", read_only=True)

    class Meta:
        model = Product
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    product_name = serializers.CharField(
        source="product.name",
        read_only=True
    )

    class Meta:
        model = Order
        fields = "__all__"



class InvoiceSerializer(serializers.ModelSerializer):
    order_id = serializers.ReadOnlyField(source='order.id')

    class Meta:
        model = Invoice
        fields = [
            'id',
            'order',
            'order_id',
            'invoice_number',
            'customer_name',
            'total_amount',
            'invoice_date'
        ]