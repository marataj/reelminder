from rest_framework import generics, views, status
from rest_framework.response import Response
from .serializers import CourseSerializer, LabelSerializer, NoteSerializer, GroupSerializer
from.models import Course, Label, Note, Group
# Create your views here.

class CourseCreate(generics.ListCreateAPIView):
    """
    Endpoint for creating new courses.

    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

#  TODO: check how to edit generics to achieve this
class CourseByGroup(views.APIView):
    """
    Endpoint for retrieving a list of courses.

    """
    def get(request, group_id, format=None):
        queryset = Course.objects.filter(group__id=group_id)
        
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)

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

#  TODO: Refactor - remove course-id query param (this info is already in the body of the request!)
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

#  TODO: Refactor above will probably allow reducing this view/ separate url
class NoteHandler(generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

class GroupCreate(generics.ListCreateAPIView):
    """
    Endpoint for creating new courses.

    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

#  TODO: check docstrings
class GroupDetails(generics.RetrieveUpdateDestroyAPIView):
    """
    Endpoint for retrieving, updating and deleting courses.

    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
        

    
