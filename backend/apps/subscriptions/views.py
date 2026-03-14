from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Subscription
from .serializers import SubscriptionSerializer

class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        if getattr(self.request.user, 'role', None) == 'admin' or getattr(self.request.user, 'is_staff', False) or getattr(self.request.user, 'is_superuser', False):
            return self.queryset
        return self.queryset.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=True, methods=['post'])
    def cancel(self, request, pk=None):
        subscription = self.get_object()
        if subscription.user != request.user and not (getattr(request.user, 'role', None) == 'admin' or getattr(request.user, 'is_staff', False) or getattr(request.user, 'is_superuser', False)):
            return Response({'detail': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
        subscription.is_active = False
        subscription.save()
        return Response({'status': 'cancelled'}, status=status.HTTP_200_OK)
