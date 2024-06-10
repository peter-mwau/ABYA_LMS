# from django.conf.urls import url
from django.urls import re_path, path, include
from courses import views

from django.conf import settings
from django.conf.urls.static import static
from django.views.decorators.cache import cache_page
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'courses', views.CourseViewSet)
router.register(r'chapters', views.ChapterViewSet)
router.register(r'lessons', views.LessonViewSet)

app_name = "courses"

urlpatterns = [
    path('',include(router.urls)),
    # re_path(r'^new/$', views.CreateCourse.as_view(), name="create"),
    # re_path(r'^detail/(?P<pk>[-\w]+)/$', views.CourseDetail.as_view(), name='detail'),
    # path("detail/<int:pk>/", views.CourseDetail.as_view(), name="detail"),
    path('course/<int:pk>/', views.CourseDetailAPI.as_view(), name='course_detail_api'),
    # path('all/', views.ListCourse.as_view(), name="list"),
    # path('all/', views.ListCourseAPI.as_view(), name="list"),
    # path('course_info/<int:pk>/', views.CourseInfoView.as_view(), name='course_info'),
    path('course_info/<int:pk>/', views.CourseInfoAPI.as_view(), name='course_info'),
    # re_path(r'^enroll/(?P<pk>[-\w]+)/$', views.EnrollCourse.as_view(), name='enroll'),
    # re_path(r'^unenroll/(?P<pk>[-\w]+)/$', views.UnenrollCourse.as_view(), name='unenroll'),
    path('enroll-course/<int:pk>/', views.EnrollCourseAPI.as_view(), name='enroll-course-api'),
    path('unenroll-course/<int:pk>/', views.UnenrollCourseAPI.as_view(), name='unenroll-course-api'),
    # path('create_chapter/', views.CreateChapterView.as_view(), name='create_chapter'),
    # path('create_lesson/', views.CreateLessonView.as_view(), name='create_lesson'),
    
    # path('completed_lessons_count/<int:course_id>/', views.get_completed_lessons_count, name='completed_lesson_count'),
    # path('completed_lesson_count/<int:pk>/', views.CourseDetail.as_view(), name='completed_lesson_count'),
    
    # path('mark_lesson_as_complete/', views.MarkLessonAsCompleteAPI.as_view(), name='mark_lesson_as_complete'),
    # path('mark_lesson_as_complete/', views.mark_lesson_as_complete, name='mark_lesson_as_complete'),
    path('certificate/<int:course_id>/', views.certificate_view, name='certificate'),
    # path('update_video_progress/', views.update_video_progress, name='update_video_progress'),
    path('video/progress/', views.UpdateVideoProgressAPI.as_view(), name='update_video_progress'),
    path('achievements/', views.AchievementsAPI.as_view(), name='achievements_api'),

    path('verify_certificate/', views.verify_certificate, name='verify_certificate'),
    path('achievements/', views.achievements, name='achievements'),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)