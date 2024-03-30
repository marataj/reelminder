from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from course import views

urlpatterns = [
    path('course/', views.CourseCreate.as_view()),
    path('course/<int:pk>/', views.CourseDetails.as_view()),
    path('courses-by-group/<int:group_id>/', views.CourseByGroup.as_view()),
    path('label/', views.Label.as_view()),
    path('note/list/<int:course_id>/', views.NoteList.as_view()),
    path('note/', views.NoteView.as_view()),
    path('note/<int:pk>/', views.NoteView.as_view()),
    path('group/', views.GroupCreate.as_view()),
    path('group-list/', views.GroupList.as_view()),
    path('group/<int:pk>/', views.GroupDetails.as_view()),
    path('group/<int:pk>/update/', views.GroupUpdate.as_view()),
    path('yt-vid-metadata/<str:id>', views.get_yt_video_meta)
    
]

urlpatterns = format_suffix_patterns(urlpatterns)