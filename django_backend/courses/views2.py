from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.views import APIView
from .serializers import CourseSerializer, ChapterSerializer, LessonSerializer
from django.contrib.auth.decorators import login_required
from .models import Course, Chapter, Lesson, Enrollment
from django.shortcuts import get_object_or_404
import mammoth

# Create your views here.

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)


class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(teacher=self.request.user)

class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        word_file = serializer.validated_data['word_file']

        if word_file:
            if hasattr(word_file, 'read'):
                # File is in memory, read its content
                content = word_file.read()
                # Perform the Word to Markdown conversion
                result = mammoth.convert_to_markdown(io.BytesIO(content))
                serializer.validated_data['lesson_content'] = result.value
            else:
                # File is on disk, perform conversion as before
                with open(word_file.path, 'rb') as docx_file:
                    result = mammoth.convert_to_markdown(docx_file)
                    serializer.validated_data['lesson_content'] = result.value

        serializer.save(teacher=self.request.user)


@login_required
class ListCourseAPI(ListAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]


class CourseInfoAPI(RetrieveAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        chapters = Chapter.objects.filter(course=instance)
        chapter_serializer = ChapterSerializer(chapters, many=True)

        return Response({
            'course': serializer.data,
            'chapters': chapter_serializer.data,
        })


   
class EnrollCourseAPI(APIView):
    def post(self, request, pk, format=None):
        course = get_object_or_404(Course, pk=pk)
        try:
            Enrollment.objects.create(student=request.user, course=course)
        except:
            return Response({'detail': 'You are already enrolled in the course.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response({'detail': 'You are now enrolled in the course.'}, status=status.HTTP_201_CREATED)
class UnenrollCourseAPI(APIView):
    def post(self, request, pk, format=None):
        try:
            enrollment = Enrollment.objects.filter(student=request.user, course__pk=pk).get()
        except Enrollment.DoesNotExist:
            return Response({'detail': 'You are not enrolled in this course.'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            enrollment.delete()
            return Response({'detail': 'You have unenrolled from the course.'}, status=status.HTTP_204_NO_CONTENT)