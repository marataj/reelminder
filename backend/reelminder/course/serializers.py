from rest_framework import serializers
from .models import Label, Course, Note, Group


class CourseSerializer(serializers.ModelSerializer):
    group = serializers.PrimaryKeyRelatedField(read_only=False, queryset = Group.objects.all(), allow_null=True)
    class Meta:
        model = Course
        exclude = ('author',)


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    course = serializers.PrimaryKeyRelatedField(read_only=False, queryset = Course.objects.all())
    class Meta:
        model = Note
        exclude = ('author',)

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        exclude = ('author',)

