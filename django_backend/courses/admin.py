from django.contrib import admin
from .models import Course, Chapter, Lesson, Enrollment, CompletedLesson, CompletedCourse, Certificate
# Register your models here.
admin.site.register(Course)
admin.site.register(Chapter)
admin.site.register(Lesson)
admin.site.register(Enrollment)
admin.site.register(CompletedLesson)
admin.site.register(CompletedCourse)
admin.site.register(Certificate)
