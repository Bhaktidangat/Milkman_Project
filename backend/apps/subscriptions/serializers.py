from rest_framework import serializers
from .models import Subscription
from apps.products.serializers import ProductSerializer

class SubscriptionSerializer(serializers.ModelSerializer):
    product_details = ProductSerializer(source='product', read_only=True)
    user_username = serializers.ReadOnlyField(source='user.username')
    
    class Meta:
        model = Subscription
        fields = ('id', 'user', 'user_username', 'product', 'product_details', 'start_date', 'end_date', 'frequency', 'is_active', 'created_at')
        read_only_fields = ('user', 'is_active')
