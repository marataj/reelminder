from django.db import models

# Create your models here.


class Label(models.Model):
    """
    Model representation of the course labels.

    """
    title = models.CharField(max_length=20)
    color = models.CharField(max_length=20)


class Course(models.Model):
    """
    Model representation of a course.

    """
    # id is added automatically by django
    title = models.CharField(max_length=50)
    description = models.CharField(max_length=200)
    movie_id = models.CharField(max_length=50)
    creation_date = models.DateTimeField()
    labels = models.ManyToManyField(Label, blank=True)
    is_public = models.BooleanField()
    author = models.CharField(max_length=50)
    progress_sec = models.IntegerField()


