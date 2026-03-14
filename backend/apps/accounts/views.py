from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView
from .serializers import UserSerializer, UserRegistrationSerializer
from .models import User

class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserRegistrationSerializer
    permission_classes = [permissions.AllowAny]

class UserProfileView(RetrieveUpdateAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class UsersListView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if not request.user.is_authenticated or not (getattr(request.user, 'role', None) == 'admin' or getattr(request.user, 'is_staff', False) or getattr(request.user, 'is_superuser', False)):
            return Response({'detail': 'Forbidden'}, status=status.HTTP_403_FORBIDDEN)
        users = User.objects.all().order_by('-date_joined')
        data = UserSerializer(users, many=True).data
        return Response(data)
