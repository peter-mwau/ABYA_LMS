from .models import Course, Chapter, Lesson, Enrollment, CompletedLesson, CompletedCourse, Certificate
from rest_framework import serializers
from django.contrib.auth import get_user_model

# Models serializers
# 1. Course model data serializer 
class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'

# 2. Chapter model data serializer
class ChapterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chapter
        fields = '__all__'

# 3. Lesson model data serializer
class LessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lesson
        fields = '__all__'

# 4. Enrollment model data serializer
class EnrollmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Enrollment
        fields = '__all__'

# 5. Completed lesson model data serializer
class CompletedLessonSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedLesson
        fields = '__all__'

# 6. Completed course model data serializer
class CompletedCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompletedCourse
        fields = ['user', 'course', 'completed_at']
