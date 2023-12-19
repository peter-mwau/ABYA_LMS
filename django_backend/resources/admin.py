from django.contrib import admin
from .models import VideoLesson, VideoProgress, Resource
# Register your models here.

admin.site.register(Resource)
admin.site.register(VideoLesson)
admin.site.register(VideoProgress)

