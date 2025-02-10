from django.contrib import admin
from .models import Feedback, News
# Register your models here.

admin.site.register([Feedback, News])
