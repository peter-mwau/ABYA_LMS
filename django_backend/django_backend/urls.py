from django.contrib import admin
from django.urls import path, include


# urlpatterns = [
#     path('admin/', admin.site.urls),
#     path('users/', include('users.urls')),
#     path('accounts/', include('allauth.urls')),
#     path('courses/', include('courses.urls')),
#     path('assignments/', include('assignments.urls')),
#
# ]

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('users/', include('users.urls')),
        path('courses/', include('courses.urls')),
        path('assignments/', include('assignments.urls')),
    ])),
    path('accounts/', include('allauth.urls')),  # Keep this outside if it's not part of your API
]
