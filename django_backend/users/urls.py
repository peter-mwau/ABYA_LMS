from django.contrib import admin
from django.urls import path
from .views import  PasswordResetConfirmView, PasswordResetView
from .views import CustomRegisterView, CustomLoginView, LogoutAPIView, UserDataView
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # path('register/', csrf_exempt(RegisterUserView.as_view()), name='register'),
    path('reset_password/', csrf_exempt(PasswordResetConfirmView.as_view()), name='reset_password'),
    path('request_reset_password/', PasswordResetView.as_view(), name='request_reset_password'),
    path('register/', CustomRegisterView.as_view(), name='register'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    path('profile/', UserDataView.as_view(), name='profile'),

] 

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)