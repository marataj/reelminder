from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import FeedbackView, NewsView

urlpatterns = [
    path('feedback/', FeedbackView.as_view()),
    path('news/', NewsView.as_view())    
]

urlpatterns = format_suffix_patterns(urlpatterns)