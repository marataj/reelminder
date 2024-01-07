from rest_framework import generics, views, status
from rest_framework.response import Response
from .serializers import CourseSerializer, LabelSerializer, NoteSerializer
from.models import Course, Label, Note
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

class NoteView(views.APIView):

    def get(self, request, course_id, format=None):
        queryset = Note.objects.filter(course__id=course_id)
        serializer = NoteSerializer(queryset, many=True)
        return Response(serializer.data)
    
    def post(self, request, course_id, format=None):
        serializer = NoteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        

    
