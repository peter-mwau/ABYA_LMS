from django.contrib import admin
from django.urls import path
from .views import RegisterUserView, PasswordResetConfirmView, PasswordResetView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

urlpatterns = [
    path('register/', csrf_exempt(RegisterUserView.as_view()), name='register'),
    path('reset_password/', csrf_exempt(PasswordResetConfirmView.as_view()), name='reset_password'),
    path('request_reset_password/', PasswordResetView.as_view(), name='request_reset_password'),
]