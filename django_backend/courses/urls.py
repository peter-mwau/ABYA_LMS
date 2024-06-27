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

# Links to different subpages of the app
urlpatterns = [
    path('',include(router.urls)),
    path('course_detail/<int:pk>/', views.CourseDetailAPI.as_view(), name='course_detail_api'),
    path('course_info/<int:pk>/', views.CourseInfoAPI.as_view(), name='course_info'),
    path('enroll/<int:pk>/', views.EnrollCourseAPI.as_view(), name='enroll'),
    path('unenroll/<int:pk>/', views.UnenrollCourseAPI.as_view(), name='unenroll'),
    path('certificate/<int:course_id>/', views.certificate_view, name='certificate'),
    path('video/progress/', views.UpdateVideoProgressAPI.as_view(), name='update_video_progress'),
    path('achievements/', views.AchievementsAPI.as_view(), name='achievements_api'),
    path('verify_certificate/', views.verify_certificate, name='verify_certificate'),
    path('achievements/', views.achievements, name='achievements'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
