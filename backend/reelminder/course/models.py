from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

UserModel = get_user_model()

class Label(models.Model):
    """
    Model representation of the course labels.

    """
    title = models.CharField(max_length=20)
    color = models.CharField(max_length=20)
    
class Group(models.Model):
    """
    Model representation of a course group.

    """
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    is_public = models.BooleanField()
    author = models.CharField(max_length=50)

# TODO: Add percentage progress
class Course(models.Model):
    """
    Model representation of a course.

    """
    # id is added automatically by django
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    movie_id = models.CharField(max_length=50)
    # TODO: make creation_date a self generated field
    creation_date = models.DateTimeField()
    labels = models.ManyToManyField(Label, blank=True)
    is_public = models.BooleanField()
    author = models.ForeignKey(UserModel, on_delete=models.CASCADE)
    progress_sec = models.PositiveIntegerField()
    group = models.ForeignKey(Group, on_delete = models.SET_NULL, blank=True, null=True)

class Note(models.Model):
    """
    Model representation of a single note.

    """
    course = models.ForeignKey(Course, on_delete = models.CASCADE)
    content = models.CharField(max_length=1000)
    time_s = models.PositiveIntegerField()

