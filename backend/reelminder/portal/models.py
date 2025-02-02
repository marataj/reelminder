from django.db import models

class Feedback(models.Model):
    """
    Model representation of the user feedbacks.

    """
    email = models.EmailField()
    content = models.CharField(max_length=2000)
