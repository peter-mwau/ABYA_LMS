from django.contrib import admin
from django.urls import path
from .views import RegisterUserView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

urlpatterns = [
    path('register/', csrf_exempt(RegisterUserView.as_view()), name='register'),
]