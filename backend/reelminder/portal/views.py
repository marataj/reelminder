from django.shortcuts import render
from rest_framework import generics
from .models import Feedback
from .serializers import FeedbackSerializer
from rest_framework.decorators import permission_classes
from rest_framework.permissions import AllowAny

@permission_classes([AllowAny])
class FeedbackView(generics.CreateAPIView):
    """
    Endpoint responsible for creating feedback records.

    """

    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer