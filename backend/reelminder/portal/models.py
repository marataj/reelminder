from django.db import models

class Feedback(models.Model):
    """
    Model representation of the user feedbacks.

    """
    email = models.EmailField()
    content = models.CharField(max_length=2000)

    def __str__(self):
        return f"{self.email} {self.content}"

class News(models.Model):
    """
    Model represents single information for the users.

    """
    date = models.DateField(auto_now=True)
    title = models.CharField(max_length=200)
    content = models.CharField(max_length=2000)

    def __str__(self):
        return f"{self.date}: {self.title}"
