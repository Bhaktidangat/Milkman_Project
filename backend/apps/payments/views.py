from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

class PaymentView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        return Response({'status': 'success'}, status=status.HTTP_201_CREATED)
