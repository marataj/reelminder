from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from course import views

urlpatterns = [
    path('course/', views.CourseCreate.as_view()),
    path('course/<int:pk>/', views.CourseDetails.as_view()),
    path('label/', views.Label.as_view()),
    path('note/<int:course_id>/', views.NoteView.as_view())
]

urlpatterns = format_suffix_patterns(urlpatterns)