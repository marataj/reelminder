from django.contrib import admin
from .models import Course, Group, Note
# Register your models here.

admin.site.register([Course, Group, Note])