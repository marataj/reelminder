from rest_framework import serializers
from .models import Label, Course, Note


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'


class LabelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Label
        fields = '__all__'

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = '__all__'

