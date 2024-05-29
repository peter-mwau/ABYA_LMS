from django.contrib import admin
from .models import Profile, User
from django.contrib.auth.admin import UserAdmin

# Register your models here.
class CustomUserAdmin(UserAdmin):
    # Add customizations to the UserAdmin class
    list_display = ('username', 'email', 'first_name', 'last_name', 'user_type', 'is_active', 'is_staff', 'is_superuser')
    list_filter = ('user_type', 'is_active', 'is_staff', 'is_superuser')
    search_fields = ('username', 'email', 'first_name', 'last_name')

class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'avatar', 'bio', 'first_name', 'last_name', 'phone')

admin.site.register(Profile, ProfileAdmin)
admin.site.register(User, CustomUserAdmin)
