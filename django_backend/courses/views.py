from typing import Any, Dict
from django.shortcuts import render, redirect, HttpResponseRedirect
import datetime
from django.contrib.auth.mixins import (LoginRequiredMixin,
                                        PermissionRequiredMixin)
from django.utils.decorators import method_decorator
from django.views.decorators.cache import cache_page
from django.urls import reverse
from django.contrib import messages
from django.views import generic
from django.shortcuts import get_object_or_404
from users.models import User
from courses.models import Course, Enrollment, Lesson, Chapter, CompletedCourse, Certificate
from assignments.models import Assignment, Quiz
from resources.models import Resource, VideoLesson, VideoProgress
from .models import CompletedLesson
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.db import transaction
import datetime
import calendar
from .cert_request import send_certificate_request, verify_certificate
import json
from django.views import View
from django.http import JsonResponse
from .models import CompletedLesson, Course
from .forms import CreateChapterForm, CreateLessonForm, UpdateChapterForm, UpdateLessonForm, UpdateCourseForm
import mammoth
from django.views.decorators.csrf import csrf_protect
from django.core.exceptions import ObjectDoesNotExist
from django.core.files.base import ContentFile
import io
from django.db import IntegrityError
from django.http import Http404
from assignments import models
from assignments.models import QuizSubmission, CompletedQuiz
from django.db.models import Count
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from .serializers import CourseSerializer, ChapterSerializer, LessonSerializer, CompletedLessonSerializer, \
    CompletedCourseSerializer, EnrollmentSerializer
from resources.serializers import VideoLessonSerializer, VideoProgressSerializer, ResourceSerializer
from assignments.serializers import AssignmentSerializer, QuizSerializer
from .permissions import IsTeacherOfCourse, IsTeacherOfChapterCourse, IsTeacherOfLessonChapterCourse
from django.contrib.auth.decorators import login_required
from django.db.models import Q


# API Endpoints for accessing data.

# 1. Course endpoint
class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_user(self):
        return User.objects.get(id=self.request.user.id)

    @action(detail=False, methods=['post'], url_path='create-course')
    def create_course(self, request):
        """
        Handling creation of a course
        """
        # Get the user object
        user = self.get_user()
        # Update request data to include the teacher field
        data = request.data.copy()
        data['teacher'] = request.user.id
        data['teacher_name'] = f"{user.first_name} {user.last_name}"
        serializer = CourseSerializer(data=data)
        if serializer.is_valid():
            serializer.save(teacher=request.user)
            print("teacher: ", request.user)
            print("request: ", request.user.id)
            print("data details: ", data)
            print("User: ", user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=False, methods=['get'], url_path='list-courses')
    def list_courses(self, request):
        """
        Handling listing of a course available in the site
        """
        user = self.get_user()
        teacher_name = f"{user.first_name} {user.last_name}"
        if user.user_type == 2:
            queryset = self.get_queryset().filter(Q(teacher_name=teacher_name) & Q(teacher=user))
        else:
            queryset = self.get_queryset()
        serializer = CourseSerializer(queryset, many=True)
        if not queryset:
            return Response({'message': 'No courses available at the moment.'}, status=204)
        return Response(serializer.data, status=200)


    @action(detail=True, methods=['put'], permission_classes=[IsTeacherOfCourse], url_path='update-course')
    def update_course(self, request, pk=None):
        """
        Handling modification of a course that already exists
        """
        course = self.get_object()
        serializer = CourseSerializer(course, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['get'])
    def completed_lessons_count(self, request, pk=None):
        if request.user.is_authenticated:
            course = self.get_object()
            completed_lessons_count = request.user.completed_lessons.filter(
                lesson__chapter__course=course
            ).count()
            completed_lessons = CompletedLesson.objects.filter(user=request.user, lesson__chapter__course=course)
            completed_lesson_ids = [completed_lesson.lesson.id for completed_lesson in completed_lessons]
            context = {
                'completed_lessons_count': completed_lessons_count,
                'completed_lesson_ids': completed_lesson_ids,
            }
            return Response(context)
        else:
            return Response({'message': 'Invalid request method.'}, status=400)


    @action(detail=False, methods=['post'], url_path='mark-lesson-as-complete')
    def mark_lesson_as_complete(self, request):
        """
        Handling completion of a lesson
        """
        if request.method != 'POST':
            return Response({'message': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            data = json.loads(request.body.decode('utf-8'))
            print("data: ", data)
            lesson_id = data.get('lesson_id')
        except json.JSONDecodeError:
            return Response({'message': 'Invalid JSON data.'}, status=status.HTTP_400_BAD_REQUEST)

        if not lesson_id:
            return Response({'message': 'Missing lesson ID.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            lesson = Lesson.objects.get(pk=lesson_id)
        except Lesson.DoesNotExist:
            return Response({'message': 'Lesson not found.'}, status=status.HTTP_404_NOT_FOUND)
            

        user = request.user
        enrollment = Enrollment.objects.filter(student=user, course=lesson.chapter.course).first()
        if not enrollment:
            return Response({'message': 'Enrollment does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        # Check if the lesson is already marked as complete for the user
        if CompletedLesson.objects.filter(user=user, lesson=lesson).exists():
            return Response({'message': 'Lesson is already marked as complete.'}, status=status.HTTP_200_OK)

        # Mark the lesson as complete for the user
        completed_lesson = CompletedLesson(user=user, lesson=lesson, enrollment=enrollment)
        completed_lesson.save()

        # Calculate the completion percentage for the course
        course = lesson.chapter.course
        total_lessons = Lesson.objects.filter(chapter__course=course).count()
        total_quizzes = course.total_quizzes()
        completed_lessons = user.completed_lessons.filter(lesson__chapter__course=course).count()
        # completed_quizzes = user.completed_quizzes(course)
        # completion_percentage = round(((completed_lessons + completed_quizzes) / (total_lessons + total_quizzes)) * 100)
        completion_percentage = round(((completed_lessons ) / (total_lessons)) * 100)

        context = {
            'completed_lessons_count': completed_lessons,
            'completion_percentage': completion_percentage
        }

        return Response(context, status=status.HTTP_200_OK)


# 2. Endpoint for accessing chapter data
class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='create-chapter')
    def create_chapter(self, request):
        """
        Handling creation of a chapter
        """
        serializer = ChapterSerializer(data=request.data)
        if serializer.is_valid():
            chapter = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['put'], permission_classes=[IsTeacherOfChapterCourse])
    def update_chapter(self, request, pk=None):
        """
        Handling modifications on a chapter
        """
        chapter = self.get_object()
        serializer = ChapterSerializer(chapter, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 3. Lesson endpoint
class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='create-lesson')
    def create_lesson(self, request):
        """
        Handling creation of a lesson
        """
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            user_object = get_object_or_404(User, username=request.user.username)
            word_file = request.data.get('word_file')

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

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['put'], permission_classes=[IsTeacherOfLessonChapterCourse])
    def update_lesson(self, request, pk=None):
        """
        Handling modification of a lesson
        """
        lesson = self.get_object()
        serializer = LessonSerializer(lesson, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# 4. Endpoint dedicated to show a course detail page
class CourseDetailAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        """
        Handling listing and access of a course component to the user
        """
        try:
            course = get_object_or_404(Course, pk=pk)
            course_name = course.course_name
            course_description = course.course_description
            course_creator = course.teacher_name
            enrollments = Enrollment.objects.filter(course=course).values('student_id', 'course_id')
        except Course.DoesNotExist:
            return Response({'message': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)

        user = request.user

        completed_lesson_ids = []
        chapters = Chapter.objects.filter(course=course)

        chapters_with_lessons = []
        chapters_with_lessons_and_quizzes = {}
        chapters_with_completion = []
        completed_chapter_ids = []

        for chapter in chapters:
            lessons = Lesson.objects.filter(chapter=chapter)
            lesson_count = lessons.count()
            chapters_with_lessons.append((chapter, lessons))
            quizzes = Quiz.objects.filter(chapter=chapter)
            chapters_with_lessons_and_quizzes[chapter] = {
                'lessons': lessons,
                'quizzes': quizzes,
                'lesson_count': lesson_count,
            }

        assignments = Assignment.objects.filter(course=pk)
        resources = Resource.objects.filter(course=pk)

        total_lessons = Lesson.objects.filter(chapter__course=course).count()
        total_quizzes = course.total_quizzes()
        completed_quizzes_count = 0
        lesson_count = 0
        completion_status = False
        completed_courses = []

        if total_lessons > 0 and request.user.is_authenticated:
            completed_lessons = CompletedLesson.objects.filter(user=user, lesson__chapter__course=course).count()
            completed_lessons1 = CompletedLesson.objects.filter(user=user, lesson__chapter__course=course)
            completed_lesson_ids = [completed_lesson.lesson.id for completed_lesson in completed_lessons1]
            completed_chapter_ids = [completed_lesson.lesson.chapter.id for completed_lesson in completed_lessons1]

            for chapter in chapters:
                lessons = Lesson.objects.filter(chapter=chapter)
                quizzes = Quiz.objects.filter(chapter=chapter)
                lesson_count = lessons.count()
                quiz_count = quizzes.count()
                completed_quizzes = CompletedQuiz.objects.filter(user=user, quiz__chapter__course=course).values_list(
                    'quiz_id', flat=True)
                completed_quizzes_ids = set(completed_quizzes)

                is_completed = all(
                    ((chapter.id in completed_chapter_ids and completed_chapter_ids.count(
                        chapter.id) == lesson_count) and
                     (quiz.id in completed_quizzes_ids and len(completed_quizzes_ids.intersection([quiz.id])) == 1))
                    for quiz in quizzes
                )

                chapter_info = {
                    'chapter_id': chapter.id,
                    'lessons': lessons,
                    'quizzes': quizzes,
                    'is_completed': is_completed,
                }

                if is_completed:
                    chapters_with_completion.append(chapter_info)

            total_chapters = Chapter.objects.filter(course=course).count()
            completed_chapters_count = sum(
                1 for chapter_info in chapters_with_completion if chapter_info['is_completed'])

            if total_chapters == completed_chapters_count:
                completed_courses.append(course)

            completed_quizzes_count = len(completed_quizzes) if completed_quizzes else 0
            completed_lessons = CompletedLesson.objects.filter(user=user, lesson__chapter__course=course).count()

            if total_lessons  == completed_lessons:
                completion_status = True
            else:
                completion_status = False

            completion_percentage = round(
                ((completed_lessons) / (total_lessons)) * 100)

            # if total_lessons + total_quizzes == completed_lessons + completed_quizzes_count:
            #     completion_status = True
            # else:
            #     completion_status = False

            # completion_percentage = round(
            #     ((completed_lessons + completed_quizzes_count) / (total_lessons + total_quizzes)) * 100)
        else:
            completed_lessons = 0
            completed_quizzes = 0
            completion_percentage = 0

        if completion_percentage >= 100 and not CompletedCourse.objects.filter(user=user, course=course).exists():
            try:
                completedcourse = CompletedCourse(user=user, course=course)
                completedcourse.save()
            except IntegrityError:
                pass

        context = {
            'assignments': AssignmentSerializer(assignments, many=True).data,
            'resources': ResourceSerializer(resources, many=True).data,
            'chapters_with_lessons': [{
                'chapter': ChapterSerializer(chapter).data,
                'lessons': LessonSerializer(lessons, many=True).data
            } for chapter, lessons in chapters_with_lessons],
            'chapters_with_lessons_and_quizzes': [{
                'chapter': ChapterSerializer(chapter).data,
                'lessons': LessonSerializer(data['lessons'], many=True).data,
                'quizzes': QuizSerializer(data['quizzes'], many=True).data,
                'lesson_count': data['lesson_count']
            } for chapter, data in chapters_with_lessons_and_quizzes.items()],
            'total_lessons': total_lessons,
            'completed_lessons': completed_lessons,
            'course_id': course.pk,
            'completed_lesson_ids': completed_lesson_ids,
            'completed_quizzes': completed_quizzes,
            'completed_quizzes_count': completed_quizzes_count,
            'completion_percentage': completion_percentage,
            'completed_chapter_ids': completed_chapter_ids,
            'lesson_count': lesson_count,
            'chapters_with_completion': chapters_with_completion,
            'completion_status': completion_status,
            'completed_courses': completed_courses,
            'course_name': course_name,
            'course_description': course_description,
            'course_creator': course_creator,
            'enrollments': list(enrollments),
        }

        return Response(context, status=status.HTTP_200_OK)


# 5. Endpoint dediate to show details and overview (preview) of a course
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


# 6. Endpoint for handling enrolling of a course
class EnrollCourseAPI(APIView):
    def post(self, request, pk, format=None):
        course = get_object_or_404(Course, pk=pk)
        enrollment, created = Enrollment.objects.get_or_create(student=request.user, course=course)
        if created:
            return Response({'detail': 'You are now enrolled in the course.'}, status=status.HTTP_201_CREATED)
        else:
            return Response({'detail': 'You are already enrolled in the course.'},
                            status=status.HTTP_208_ALREADY_REPORTED)


# 7. Endpoint for handling unenrolling of a course
class UnenrollCourseAPI(APIView):
    def post(self, request, pk, format=None):
        """
        Handling unenrolling a course
        """
        try:
            enrollment = Enrollment.objects.get(student=request.user, course__pk=pk)
        except Enrollment.DoesNotExist:
            return Response({'detail': 'You are not enrolled in this course.'}, status=status.HTTP_404_NOT_FOUND)
        else:
            with transaction.atomic():
                enrollment.delete()
            return Response({'detail': 'You have unenrolled from the course.'}, status=status.HTTP_204_NO_CONTENT)


# View that handles the certificate access and retrieval
def certificate_view(request, course_id):
    """
        Handling certificate data access
        """
    user = request.user
    course = get_object_or_404(Course, pk=course_id)

    try:
        existing_certificate = Certificate.objects.get(user=user, course=course)
        name = existing_certificate.name
        issuer_date = existing_certificate.issued_at
        issuer = existing_certificate.issuer
        certificate_id = existing_certificate.certificate_id
        context = {
            "name": name,
            "issuer_date": issuer_date,
            "course": course,
            "issuer": issuer,
            "certificate_id": certificate_id
        }
        return render(request, 'courses/certificate.html', {'context': context})
    except ObjectDoesNotExist:
        first_name = user.first_name
        last_name = user.last_name
        full_name = first_name + ' ' + last_name
        course_name = course.course_name
        issuer = "ABYA Africa"
        now = datetime.datetime.now()
        unixtime = calendar.timegm(now.utctimetuple())
        certificate_response = {
            "name": full_name,
            "course": course_name,
            "issuer": issuer,
            "issuer_date": unixtime
        }

        if all(value is not None for value in certificate_response.values()):
            certificate_data = send_certificate_request(certificate_response["name"], certificate_response["issuer"],
                                                        certificate_response["issuer_date"])

            # Store the certificate in the database
            new_certificate = Certificate(user=user, course=course, name=certificate_data['name'],
                                          issuer=certificate_data["issuer"], issued_at=certificate_data["issue_date"],
                                          certificate_id=certificate_data["certificate_id"])
            new_certificate.save()

            return render(request, 'courses/certificate.html', {'context': certificate_data})
        else:
            return render(request, 'courses/certificate.html')


# A view for handling verification of a certificate
def verify_certificate(request):
    """
        Handling certificate verifications
        """
    certificate_id = request.POST.get('certificate_id')

    if certificate_id:
        certificate_response = verify_certificate(certificate_id)
        return certificate_response
    else:
        return JsonResponse({"error": "Invalid request. Certificate ID is missing."}, status=400)


def get_completed_lessons_count(request, course_id):
    """
        Handling completed lessons data access and retrieval
        """
    if request.user.is_authenticated:
        course = get_object_or_404(Course, pk=course_id)
        completed_lessons_count = request.user.completed_lessons.filter(
            lesson__chapter__course=course
        ).count()
        # Access and print the lesson IDs directly
        completed_lessons1 = CompletedLesson.objects.filter(user=request.user, lesson__chapter__course=course)
        completed_lesson_ids = [completed_lesson.lesson.id for completed_lesson in completed_lessons1]
        print("Lesson IDss completed:", completed_lesson_ids)
        for i in completed_lesson_ids:
            # count
            print("Lesson: ", i)
        print(completed_lessons1.count())
        completed_lesson_count = completed_lessons1.count()
        context = {
            'completed_lessons_count': completed_lesson_count,
            'completed_lesson_ids': completed_lesson_ids,
        }
        print("completed_lessons_count:", completed_lesson_count)
        return JsonResponse(context)
    else:
        return JsonResponse({'message': 'Invalid request method.'}, status=400)


# def mark_lesson_as_complete(request):
#     """
#         Handling marking lesson completion indicator implementations
#     """
#     if request.method != 'POST':
#         return JsonResponse({'message': 'Invalid request method.'}, status=400)

#     try:
#         data = json.loads(request.body.decode('utf-8'))
#         lesson_id = data.get('lesson_id')
#     except json.JSONDecodeError:
#         return JsonResponse({'message': 'Invalid JSON data.'}, status=400)

#     if not lesson_id:
#         return JsonResponse({'message': 'Missing lesson ID.'}, status=400)

#     try:
#         lesson = Lesson.objects.get(pk=lesson_id)
#     except Lesson.DoesNotExist:
#         return JsonResponse({'message': 'Lesson not found.'}, status=404)

#     user = request.user

#     # Check if the lesson is already marked as complete for the user
#     if CompletedLesson.objects.filter(user=user, lesson=lesson).exists():
#         return JsonResponse({'message': 'Lesson is already marked as complete.'}, status=200)

#     # Mark the lesson as complete for the user
#     completed_lesson = CompletedLesson(user=user, lesson=lesson)
#     completed_lesson.save()

#     # Calculate the completion percentage for the course
#     course = lesson.chapter.course
#     total_lessons = Lesson.objects.filter(chapter__course=course).count()
#     total_quizzes = course.total_quizzes()
#     completed_lessons = user.completed_lessons.filter(lesson__chapter__course=course).count()
#     completed_quizzes = user.completed_quizzes(course)
#     completion_percentage = round(((completed_lessons + completed_quizzes) / (total_lessons + total_quizzes)) * 100)
#     print("completed quizes: ", completed_quizzes)

#     # Update the progress bar or any other elements as needed

#     return JsonResponse(
#         {'message': 'Lesson marked as complete successfully.', 'completed_lessons_count': completed_lessons,
#          'completion_percentage': completion_percentage}, status=200)


@csrf_protect
def update_video_progress(request):
    """
        Handling videos belonging to a lesson progress marker, indicator, or update
        """
    if request.method == 'POST':
        try:
            data = json.loads(request.body.decode('utf-8'))
            video_id = data.get('video_id')
            progress = data.get('progress')

            # Find the VideoLesson object for the specified video_id
            video_lesson = VideoLesson.objects.get(video_lesson_id=video_id)

            # Find the VideoProgress object for the specified video_lesson and user
            video_progress, created = VideoProgress.objects.get_or_create(video_lesson=video_lesson, user=request.user)

            # Check if the progress is 75% and update the status only if it's not already True
            if float(progress) > 75 and not video_progress.status:
                video_progress.status = True

                # Update the progress only if the status was not already True
                video_progress.progress = progress

                # Save the VideoProgress object
                video_progress.save()

                # Include the status in the response
                response_data = {
                    'message': 'Video progress updated successfully.',
                    'status': video_progress.status,
                }

                return JsonResponse(response_data)
            else:
                # Progress is less than 75% or status is already True, no update needed
                response_data = {
                    'message': 'Video progress not updated.',
                    'status': video_progress.status,
                }

                return JsonResponse(response_data)

        except json.JSONDecodeError:
            return JsonResponse({'message': 'Invalid JSON data.'}, status=400)
        except VideoLesson.DoesNotExist:
            return JsonResponse({'message': 'Video lesson not found.'}, status=404)

    return JsonResponse({'message': 'Invalid request method.'}, status=400)


# Endpoint for video progress marker
class UpdateVideoProgressAPI(APIView):
    def post(self, request):
        """
        Handling videos belonging to a lesson progress marker, indicator, or update
        """
        serializer = VideoProgressSerializer(data=request.data)
        if serializer.is_valid():
            video_id = serializer.validated_data.get('video_id')
            progress = serializer.validated_data.get('progress')

            try:
                video_lesson = VideoLesson.objects.get(video_lesson_id=video_id)
                video_progress, created = VideoProgress.objects.get_or_create(video_lesson=video_lesson,
                                                                              user=request.user)

                if float(progress) > 75 and not video_progress.status:
                    video_progress.status = True
                    video_progress.progress = progress
                    video_progress.save()

                    response_data = {
                        'message': 'Video progress updated successfully.',
                        'status': video_progress.status,
                    }

                    return Response(response_data, status=status.HTTP_200_OK)
                else:
                    response_data = {
                        'message': 'Video progress not updated.',
                        'status': video_progress.status,
                    }

                    return Response(response_data, status=status.HTTP_200_OK)

            except VideoLesson.DoesNotExist:
                return Response({'message': 'Video lesson not found.'}, status=status.HTTP_404_NOT_FOUND)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# Views for accessing achievements of students/users
def achievements(request):
    """
    Handling completed courses and other milestones achieved
    """
    completed_courses = CompletedCourse.objects.filter(user=request.user)
    print(completed_courses)
    return render(request, 'courses/achievements.html', {'completed_courses': completed_courses})


# Endpoint for accessing achievements of students/users
class AchievementsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        """
        Handling completed courses and other milestones achieved
        """
        completed_courses = CompletedCourse.objects.filter(user=request.user)
        serializer = CompletedCourseSerializer(completed_courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
