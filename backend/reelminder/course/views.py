from rest_framework import generics, views, status
from rest_framework.response import Response
from .serializers import CourseSerializer, LabelSerializer, NoteSerializer, GroupSerializer
from .utils import retrieve_yt_meta
from.models import Course, Label, Note, Group
from rest_framework.decorators import api_view
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated
import json
# Create your views here.

@permission_classes([IsAuthenticated])
class CourseCreate(generics.ListCreateAPIView):
    """
    Endpoint for creating new courses.

    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

#  TODO: check how to edit generics to achieve this
@permission_classes([IsAuthenticated])
class CourseByGroup(views.APIView):
    """
    Endpoint for retrieving a list of courses.

    """
    def get(self, request, group_id, format=None):
        queryset = Course.objects.filter(group__id=group_id)
        
        serializer = CourseSerializer(queryset, many=True)
        return Response(serializer.data)

@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
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
@permission_classes([IsAuthenticated])
class NoteHandler(generics.DestroyAPIView, generics.UpdateAPIView):
    queryset = Note.objects.all()
    serializer_class = NoteSerializer

@permission_classes([IsAuthenticated])
class GroupCreate(views.APIView):
    """
    Endpoint for creating new courses.

    """
    def post(self, request, format=None):
        serializer = GroupSerializer(data=request.data["group"])
        if serializer.is_valid():
            obj=serializer.save()

            Course.objects.filter(id__in=request.data["picked_courses"]).update(group=obj.id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
class GroupUpdate(views.APIView):
    """
    Endpoint for updating existing groups.

    """
    def patch(self, request, pk,  format=None):
        instance = Group.objects.filter(pk=pk).first()
        serializer = GroupSerializer(instance, data=request.data["group"])
        if serializer.is_valid():
            serializer.save()
            Course.objects.filter(group=pk).update(group=None)
            Course.objects.filter(id__in=request.data["picked_courses"]).update(group=pk)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@permission_classes([IsAuthenticated])
class GroupList(generics.ListAPIView):
    """
    Endpoint for creating new courses.

    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

#  TODO: check docstrings
@permission_classes([IsAuthenticated])
class GroupDetails(generics.RetrieveDestroyAPIView):
    """
    Endpoint for retrieving, updating and deleting courses.

    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer
        
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_yt_video_meta(request, id):
    """
    Returns youtube video metadata.

    """
    if request.method == 'GET':
        try:
            meta = retrieve_yt_meta(id)
        except (AttributeError, ConnectionError, TypeError):
             return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        return Response(json.dumps(meta), status=status.HTTP_200_OK)
