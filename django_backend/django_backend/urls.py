from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('users.urls')),
    path('accounts/', include('allauth.urls')),
    path('courses/', include('courses.urls')),
    path('assignments/', include('assignments.urls')),
    
]
