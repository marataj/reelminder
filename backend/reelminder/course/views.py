from rest_framework import generics

from .serializers import CourseSerializer, LabelSerializer
from.models import Course, Label
# Create your views here.

class CourseCreate(generics.ListCreateAPIView):
    """
    Endpoint for freating new courses.

    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class CourseDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    Endpoint for retrieving, updating and deleting courses.

    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class Label(generics.ListCreateAPIView):
    """
    Endpoint responsible for label model handling.

    """

    queryset = Label.objects.all()
    serializer_class = LabelSerializer

    
