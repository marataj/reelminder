from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.decorators import api_view, permission_classes

from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import MyTokenObtainPairSerializer, RegisterSerializer, UserSerializer
from rest_framework import generics
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth.models import User

# Create your views here.

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def chanegPassword(request):
    old_password = request.data.pop("old")
    new_password = request.data.pop("new")
    new_password2 = request.data.pop("new2")
    if new_password != new_password2:
        return Response(status=status.HTTP_400_BAD_REQUEST)
    user: User = request.user
    if not user.check_password(old_password):
        return Response(status=status.HTTP_400_BAD_REQUEST)
    user.set_password(new_password)
    user.save()
    return Response(status=status.HTTP_202_ACCEPTED)
