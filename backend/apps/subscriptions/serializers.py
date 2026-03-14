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

    def validate(self, attrs):
        request = self.context.get('request')
        user = request.user if request else None
        product = attrs.get('product')
        start_date = attrs.get('start_date')
        end_date = attrs.get('end_date')
        if user and product and Subscription.objects.filter(user=user, product=product, is_active=True).exists():
            raise serializers.ValidationError('Active subscription already exists for this product.')
        if start_date and end_date and end_date < start_date:
            raise serializers.ValidationError('end_date must be after start_date')
        return attrs
