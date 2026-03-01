from rest_framework import serializers
from .models import Order, OrderItem
from apps.products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.ReadOnlyField(source='product.name')
    
    class Meta:
        model = OrderItem
        fields = ('id', 'product', 'product_name', 'quantity', 'price')

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)
    user_username = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = Order
        fields = ('id', 'user', 'user_username', 'items', 'total_price', 'payment_status', 'created_at')
        read_only_fields = ('user', 'total_price', 'payment_status')
