from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Order, OrderItem
from .serializers import OrderSerializer, OrderItemSerializer
from apps.products.models import Product

class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if self.request.user.role == 'admin':
            return self.queryset
        return self.queryset.filter(user=self.request.user)

    @action(detail=False, methods=['post'])
    def checkout(self, request):
        """
        Expects data in format:
        {
            "items": [{"id": 1, "quantity": 2}, {"id": 2, "quantity": 1}],
            "payment_method": "upi" // for simulation
        }
        """
        items_data = request.data.get('items', [])
        if not items_data:
            return Response({"error": "No items in cart"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            total_price = 0
            # Create the order first (simulate successful payment for now)
            order = Order.objects.create(user=request.user, payment_status=Order.COMPLETED)
            
            for item in items_data:
                product = Product.objects.get(id=item['id'])
                quantity = item.get('quantity', 1)
                price = product.price * quantity
                OrderItem.objects.create(
                    order=order, 
                    product=product, 
                    quantity=quantity, 
                    price=product.price
                )
                total_price += price
            
            order.total_price = total_price
            order.save()
            
            return Response(OrderSerializer(order).data, status=status.HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response({"error": "One or more products not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
