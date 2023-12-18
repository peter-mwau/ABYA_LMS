from django.contrib import admin
from django.urls import path
from .views import CustomRegisterView, CustomLoginView, CustomLogoutView, UserProfileView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator

urlpatterns = [
    path('register/', CustomRegisterView.as_view(), name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', CustomLogoutView.as_view(), name='logout'),
  


]