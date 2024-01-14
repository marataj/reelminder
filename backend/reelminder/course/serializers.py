from rest_framework import serializers
from .models import Label, Course, Note, Group


class CourseSerializer(serializers.ModelSerializer):
    group = serializers.PrimaryKeyRelatedField(read_only=False, queryset = Group.objects.all(), allow_null=True)
    class Meta:
        model = Course
        fields = '__all__'


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(read_only=False, queryset = Course.objects.all())
    class Meta:
        model = Note
        fields = '__all__'

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = '__all__'

