from django.shortcuts import render
from rest_framework import generics
from .models import Feedback
from .serializers import FeedbackSerializer
from rest_framework.permissions import AllowAny

class FeedbackView(generics.CreateAPIView):
    """
    Endpoint responsible for creating feedback records.

    """
    authentication_classes = []
    permission_classes = [AllowAny]
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer