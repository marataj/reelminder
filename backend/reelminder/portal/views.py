from django.shortcuts import render
from rest_framework import generics
from .models import Feedback, News
from .serializers import FeedbackSerializer, NewsSerializer
from rest_framework.permissions import AllowAny

class FeedbackView(generics.CreateAPIView):
    """
    Endpoint responsible for creating feedback records.

    """
    authentication_classes = []
    permission_classes = [AllowAny]
    queryset = Feedback.objects.all()
    serializer_class = FeedbackSerializer


class NewsView(generics.ListAPIView):
    """
    Endpoint responsible for retrieving list of news.

    """
    authentication_classes = []
    permission_classes = [AllowAny]
    queryset = News.objects.all()
    serializer_class = NewsSerializer