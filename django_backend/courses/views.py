from typing import Any, Dict
from django.shortcuts import render, redirect,HttpResponseRedirect
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
from .serializers import CourseSerializer, ChapterSerializer, LessonSerializer, CompletedLessonSerializer, CompletedCourseSerializer 
from resources.serializers import VideoLessonSerializer, VideoProgressSerializer, ResourceSerializer
from assignments.serializers import AssignmentSerializer, QuizSerializer
from .permissions import IsTeacherOfCourse, IsTeacherOfChapterCourse, IsTeacherOfLessonChapterCourse
from django.contrib.auth.decorators import login_required
from django.db.models import Q


# Create your views here.


# class CreateCourse(LoginRequiredMixin, generic.CreateView):
#     fields = ('course_name', 'course_description')
#     model = Course

#     def get(self, request,*args, **kwargs):
#         self.object = None
#         context_dict = self.get_context_data()
#         context_dict.update(user_type=self.request.user.user_type)
#         return self.render_to_response(context_dict)
    
#     def form_valid(self, form):
#         form.instance.teacher = self.request.user
#         return super(CreateCourse, self).form_valid(form)

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_user(self):
        return User.objects.get(id=self.request.user.id)

    @action(detail=False, methods=['post'], url_path='create-course')
    def create_course(self, request):
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
            print("User: ",user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'], url_path='list-courses')
    def list_courses(self, request):
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

    @action(detail=False, methods=['post'])
    def mark_lesson_as_complete(self, request):
        if request.method != 'POST':
            return Response({'message': 'Invalid request method.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            data = json.loads(request.body.decode('utf-8'))
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

        # Check if the lesson is already marked as complete for the user
        if CompletedLesson.objects.filter(user=user, lesson=lesson).exists():
            return Response({'message': 'Lesson is already marked as complete.'}, status=status.HTTP_200_OK)

        # Mark the lesson as complete for the user
        completed_lesson = CompletedLesson(user=user, lesson=lesson)
        completed_lesson.save()

        # Calculate the completion percentage for the course
        course = lesson.chapter.course
        total_lessons = Lesson.objects.filter(chapter__course=course).count()
        total_quizzes = course.total_quizzes()
        completed_lessons = user.completed_lessons.filter(lesson__chapter__course=course).count()
        completed_quizzes = user.completed_quizzes(course)
        completion_percentage = round(((completed_lessons + completed_quizzes) / (total_lessons + total_quizzes)) * 100)

        return Response({
            'message': 'Lesson marked as complete successfully.',
            'completed_lessons_count': completed_lessons,
            'completion_percentage': completion_percentage
        }, status=status.HTTP_200_OK)
# class CreateChapterView(LoginRequiredMixin, generic.CreateView):
#     model = Chapter
#     form_class = CreateChapterForm
#     template_name = 'courses/create_chapter.html'
    
#     def get_form_kwargs(self):
#         kwargs = super().get_form_kwargs()
#         kwargs.update({'user': self.request.user})
#         return kwargs
    
    
#     def form_valid(self, form):
#         user_object = get_object_or_404(User, username=self.request.user.username)
#         form.instance.teacher = user_object
#         return super().form_valid(form)
#     def get_success_url(self):
#         url = reverse('courses:list')
#         return url
class ChapterViewSet(viewsets.ModelViewSet):
    queryset = Chapter.objects.all()
    serializer_class = ChapterSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='create-chapter')
    def create_chapter(self, request):
        serializer = ChapterSerializer(data=request.data)
        if serializer.is_valid():
            chapter = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=True, methods=['put'], permission_classes=[IsTeacherOfChapterCourse])
    def update_chapter(self, request, pk=None):
        chapter = self.get_object()
        serializer = ChapterSerializer(chapter, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class CreateLessonView(LoginRequiredMixin, generic.CreateView):
#     form_class = CreateLessonForm
#     template_name = 'courses/create_lesson.html'
  
    
#     def get_from_kwargs(self):
#         kwargs = super().get_form_kwargs()
#         kwargs['user'] = self.request.user
#         return kwargs
#     def form_valid(self, form):
#         user_object = get_object_or_404(User, username=self.request.user.username)
#         form.instance.teacher = user_object
#         word_file = form.cleaned_data['word_file']

#         if word_file:
#             if hasattr(word_file, 'read'):
#                 # File is in memory, read its content
#                 content = word_file.read()
#                 # Perform the Word to Markdown conversion
#                 result = mammoth.convert_to_markdown(io.BytesIO(content))
#                 form.instance.lesson_content = result.value
#             else:
#                 # File is on disk, perform conversion as before
#                 with open(word_file.path, 'rb') as docx_file:
#                     result = mammoth.convert_to_markdown(docx_file)
#                     form.instance.lesson_content = result.value

#         return super().form_valid(form)
#     def get_success_url(self) -> str:
#         return reverse('courses:list')
class LessonViewSet(viewsets.ModelViewSet):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='create-lesson')
    def create_lesson(self, request):
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
        lesson = self.get_object()
        serializer = LessonSerializer(lesson, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# class CourseDetail(generic.DetailView):
#     model = Course
    
    
#     def get_context_data(self, **kwargs):
#          # Initialize user_profile
#         user_profile = None
#         try:
#             user_id = self.request.user.id
#             # Attempt to get user_profile
#             # user_profile = UserProfile.objects.get(user=self.request.user)
#             course = get_object_or_404(Course, pk=self.kwargs['pk'])
#         except Http404:
#             # Handle the case where UserProfile does not exist
#             pass
#             # Handle the case where the course does not exist
#             messages.error(self.request, 'Course not found.')
#             return HttpResponseRedirect(reverse('courses:list')) 
        
#         completed_lesson_ids = []
        
#         # Get chapters related to the course
#         chapters = Chapter.objects.filter(course=course)

#         # chapters_with_lessons = {}
        
#         # Create a dictionary to store chapters and their related lessons
#         chapters_with_lessons = []
#         chapters_with_lessons_and_quizzes = {}

#         # Initialize chapters_with_completion as an empty list
#         chapters_with_completion = []

#         # Initialize completed_chapter_ids as an empty list
#         completed_chapter_ids = []

        
#         for chapter in chapters:
#             # Get lessons related to the chapter
#             lessons = Lesson.objects.filter(chapter=chapter)
#             # get the count of lessons that exist in each chapter
#             lesson_count = lessons.count()
#             chapters_with_lessons.append((chapter, lessons))
            
#             quizzes = Quiz.objects.filter(chapter=chapter)
#             chapters_with_lessons_and_quizzes[chapter] = {
#                 'lessons': lessons,
#                 'quizzes': quizzes,
#                 'lesson_count': lesson_count,
#             }

#             print("Lesson Count: ", lesson_count)
            

            
#         assignments = Assignment.objects.filter(course=self.kwargs['pk'])
#         resources = Resource.objects.filter(course=self.kwargs['pk'])

#         # Get the total number of lessons for the course
#         total_lessons = Lesson.objects.filter(chapter__course=course).count()
#         total_quizzes = course.total_quizzes()
#         completed_quizzes_count = 0
#         lesson_count = 0
#         completion_status = False
#         completed_courses = 0
#         # Handle the case where total_lessons is zero
#         if total_lessons > 0:
#             # Get the total number of completed lessons for the user in that course
#             if self.request.user.is_authenticated:
#                 user_id = self.request.user.id
#                 completed_lessons = CompletedLesson.objects.filter(user=user_id, lesson__chapter__course=course).count()

#                 completed_lessons = CompletedLesson.objects.filter(user=user_id, lesson__chapter__course=course).aggregate(count=Count('id'))['count']



#                 completion_percentage = round((completed_lessons / total_lessons) * 100)
#                 print("Completed Lessons:", completed_lessons)

#                 # Access and print the lesson IDs directly
#                 completed_lessons1 = CompletedLesson.objects.filter(user=user_id, lesson__chapter__course=course)
#                 completed_lesson_ids = [completed_lesson.lesson.id for completed_lesson in completed_lessons1]
#                 print("Lesson IDs completed:", completed_lesson_ids)

#                 # can i get the chapter ids
#                 completed_chapter_ids = [completed_lesson.lesson.chapter.id for completed_lesson in completed_lessons1]
#                 print("Chapter IDs completed:", completed_chapter_ids)

#                 # Create a list to store chapter information including completion status
#                 chapters_with_completion = []

#             # create a list of completed courses
#             completed_courses = []

#             completed_quizzes = []
            

#             # Check if the chapter ID occurs in completed chapter IDs and the count matches the lesson count
#             for chapter in chapters:
#                 lessons = Lesson.objects.filter(chapter=chapter)
#                 # Get quizzes related to the chapter
#                 quizzes = Quiz.objects.filter(chapter=chapter)
#                 # get the count of lessons and quizzes that exist in each chapter
#                 lesson_count = lessons.count()
#                 quiz_count = quizzes.count()
#                 # Get the completed quiz IDs from the completedquiz model
#                 completed_quizzes = CompletedQuiz.objects.filter(user=user_id, quiz__chapter__course=course).values_list('quiz_id', flat=True)
                
#                 completed_quizzes_ids = set(completed_quizzes)

#                 # Check if all lessons and quizzes in the chapter are completed
#                 is_completed = all(
#                     ((chapter.id in completed_chapter_ids and completed_chapter_ids.count(chapter.id) == lesson_count) and
#                     (quiz.id in completed_quizzes_ids and len(completed_quizzes_ids.intersection([quiz.id])) == 1))
#                     for quiz in quizzes
#                 )





#                 chapter_info = {
#                     'chapter_id': chapter.id,
#                     'lessons': lessons,
#                     'quizzes': quizzes,
#                     'is_completed': is_completed,
#                 }

#                 if is_completed:
#                     chapters_with_completion.append(chapter_info)

#             # Check if the total number of chapters equals the number of completed chapters for each course
#             total_chapters = Chapter.objects.filter(course=course).count()

#             completed_chapters_count = sum(1 for chapter_info in chapters_with_completion if chapter_info['is_completed'])
#             print(f"Course: {course}, Total Chapters: {total_chapters}, Completed Chapters: {completed_chapters_count}")

#             if total_chapters == completed_chapters_count:
#                 completed_courses.append(course)

#             print("Completed Courses:", completed_courses)
                   

#             print("Chapters with completion:", chapters_with_completion)
                
            
 
#             # get the total number of quizzes for the course
#             total_quizzes = course.total_quizzes()
#             print("Total Quizzes:", total_quizzes)

#             # get the completed quizzes
#             completed_quizzes = CompletedQuiz.objects.filter(user=user_id, quiz__chapter__course=course)

#             # Get the completed quiz IDs from the UserProfile
#             # completed_quizzes = user_profile.completed_quizzes.values_list('id', flat=True)
#             # completed_quizzes_ids = list(completed_quizzes)
#             # print("Completed Quizzeddds:", completed_quizzes_ids)

#             completed_quizzes_count = len(completed_quizzes) if completed_quizzes else 0
#             completed_lessons = CompletedLesson.objects.filter(user=user_id, lesson__chapter__course=course).count()

#             # calculate if a course is complete or not if the total_lessons + total_quizes == the sum of completed lessons + completed quizes          
#             if total_lessons + total_quizzes == completed_lessons + completed_quizzes_count:
#                 completion_status = True
#             else:
#                 completion_status = False
#             print("Completion Status:", completion_status)
             
#             completion_percentage = round(((completed_lessons + completed_quizzes_count) / (total_lessons + total_quizzes)) * 100)
#             print("Completed Quizees Count:", completed_quizzes_count)
#             print("Completion Percentage:", completion_percentage)
#         else:
#             completed_lessons = 0
#             completed_quizzes = 0
#             completion_percentage = 0
        
#         if completion_percentage >= 100:
#             #this is how i choose to update to the db that a user has completed a course
#             # popup a congratulations window with instructions to generate/get your certificate
#             # Check if the user has already completed the course
#             if not CompletedCourse.objects.filter(user_id=user_id, course=course).exists():
#                 # Create a new CompletedCourse instance only if it doesn't exist
#                 try:
#                     completedcourse = CompletedCourse(user_id, course=course)
#                     completedcourse.save()
#                 except IntegrityError:
#                     # Handle the case where the user has already completed the course
#                     messages.warning(self.request, 'You have already completed this course.')
            

#         context = super(CourseDetail, self).get_context_data(**kwargs)
#         context['assignments'] = assignments
#         context['resources'] = resources
#         context['chapters_with_lessons'] = chapters_with_lessons 
#         # return chapter name and lesson name
#         context['chapters_with_lessons_and_quizzes'] = chapters_with_lessons_and_quizzes
#         context['total_lessons'] = total_lessons
#         context['completed_lessons'] = completed_lessons
#         context['course.pk'] = course
#         context['course_id'] = course.pk
#         # context['course_id'] = course.pk
#         context['completed_lesson_ids'] = completed_lesson_ids
#         # context['completed_lesson_ids_json'] = json.dumps(completed_lesson_ids)
#         context['completed_quizzes'] = completed_quizzes
#         context['completed_quizzes_count'] = completed_quizzes_count
#         context['completion_percentage'] = completion_percentage
#         context['completed_chapter_ids'] = completed_chapter_ids
#             # lesson_count
#         context['lesson_count'] = lesson_count
#         context['chapters_with_completion'] = chapters_with_completion
#         context['completion_status'] = completion_status
#         context['completed_courses'] = completed_courses
#         context['user_profile'] = user_profile
#         return context


class CourseDetailAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            course = get_object_or_404(Course, pk=pk)
            course_name = course.course_name
            course_description = course.course_description
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
                completed_quizzes = CompletedQuiz.objects.filter(user=user, quiz__chapter__course=course).values_list('quiz_id', flat=True)
                completed_quizzes_ids = set(completed_quizzes)

                is_completed = all(
                    ((chapter.id in completed_chapter_ids and completed_chapter_ids.count(chapter.id) == lesson_count) and
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
            completed_chapters_count = sum(1 for chapter_info in chapters_with_completion if chapter_info['is_completed'])

            if total_chapters == completed_chapters_count:
                completed_courses.append(course)

            completed_quizzes_count = len(completed_quizzes) if completed_quizzes else 0
            completed_lessons = CompletedLesson.objects.filter(user=user, lesson__chapter__course=course).count()

            if total_lessons + total_quizzes == completed_lessons + completed_quizzes_count:
                completion_status = True
            else:
                completion_status = False

            completion_percentage = round(((completed_lessons + completed_quizzes_count) / (total_lessons + total_quizzes)) * 100)
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
        }

        return Response(context, status=status.HTTP_200_OK)

# class ListCourse(generic.ListView):
#     model = Course
#     # template_name = 'courses/course_list.html'

#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         course_list = Course.objects.all()

#         if not course_list:
#             messages.info(self.request, 'No courses available at the moment.')

#         return context
# @login_required
# class ListCourseAPI(ListAPIView):
#     queryset = Course.objects.all()
#     serializer_class = CourseSerializer
#     permission_classes = [permissions.IsAuthenticated]

# class CourseInfoView(generic.DetailView):
#     model = Course
#     template_name = 'courses/course_info.html'
#     context_object_name = 'course'

#     def get_context_data(self, **kwargs):
#         try:
#             course = get_object_or_404(Course, pk=self.kwargs['pk'])
#         except Http404:
#             # Handle the case where the course does not exist
#             messages.error(self.request, 'Course not found.')
#             return HttpResponseRedirect(reverse('courses:list'))
#         context = super().get_context_data(**kwargs)
#         chapter = Chapter.objects.filter(course=course)
       

#         context['chapters'] = self.object.chapters.all()
#         context['course'] = course
#         return context

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



# class EnrollCourse(LoginRequiredMixin, generic.RedirectView):

#     def get_redirect_url(self, *args, **kwargs):
#         return reverse('courses:detail', kwargs={'pk':self.kwargs.get('pk')})
    
#     def get(self, *args, **kwargs):
#         course = get_object_or_404(Course, pk=self.kwargs.get('pk'))

#         try:
#             Enrollment.objects.create(student=self.request.user, course=course)
#         except:
#             messages.warning(self.request, 'You are already enrolled in the course.')
#         else:
#             messages.success(self.request, 'You are now enrolled in the course.')
#         return super().get(self.request, *args, **kwargs)

# class UnenrollCourse(LoginRequiredMixin, generic.RedirectView):

#     def get_redirect_url(self, *args, **kwargs):
#         return reverse('courses:detail', kwargs={'pk':self.kwargs.get('pk')})

#     def get(self, *args, **kwargs):

#         try:
#             enrollment = Enrollment.objects.filter(
#                 student=self.request.user,
#                 course__pk=self.kwargs.get('pk')
#             ).get()
#         except Enrollment.DoesNotExist:
#             messages.warning(self.request, 'You are not enrolled in this course.')
#         else:
#             enrollment.delete()
#             messages.success(self.request, 'You have unenrolled from the course.')
#         return super().get(self.request, *args, **kwargs)
    
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

   
def certificate_view(request, course_id):
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
            certificate_data = send_certificate_request(certificate_response["name"], certificate_response["issuer"], certificate_response["issuer_date"])

            # Store the certificate in the database
            new_certificate = Certificate(user=user, course=course, name=certificate_data['name'], issuer=certificate_data["issuer"], issued_at=certificate_data["issue_date"], certificate_id=certificate_data["certificate_id"])
            new_certificate.save()
            
            return render(request, 'courses/certificate.html', {'context': certificate_data})
        else:
            return render(request, 'courses/certificate.html')

def verify_certificate(request):
    certificate_id = request.POST.get('certificate_id')

    if certificate_id:
        certificate_response = verify_certificate(certificate_id)
        return certificate_response
    else:
        return JsonResponse({"error": "Invalid request. Certificate ID is missing."}, status=400)
    
def get_completed_lessons_count(request, course_id):
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

        

def mark_lesson_as_complete(request):
    if request.method != 'POST':
        return JsonResponse({'message': 'Invalid request method.'}, status=400)

    try:
        data = json.loads(request.body.decode('utf-8'))
        lesson_id = data.get('lesson_id')
    except json.JSONDecodeError:
        return JsonResponse({'message': 'Invalid JSON data.'}, status=400)

    if not lesson_id:
        return JsonResponse({'message': 'Missing lesson ID.'}, status=400)

    try:
        lesson = Lesson.objects.get(pk=lesson_id)
    except Lesson.DoesNotExist:
        return JsonResponse({'message': 'Lesson not found.'}, status=404)

    user = request.user

    # Check if the lesson is already marked as complete for the user
    if CompletedLesson.objects.filter(user=user, lesson=lesson).exists():
        return JsonResponse({'message': 'Lesson is already marked as complete.'}, status=200)

    # Mark the lesson as complete for the user
    completed_lesson = CompletedLesson(user=user, lesson=lesson)
    completed_lesson.save()

    # Calculate the completion percentage for the course
    course = lesson.chapter.course
    total_lessons = Lesson.objects.filter(chapter__course=course).count()
    total_quizzes = course.total_quizzes()
    completed_lessons = user.completed_lessons.filter(lesson__chapter__course=course).count()
    completed_quizzes = user.completed_quizzes(course)
    completion_percentage = round(((completed_lessons + completed_quizzes) / (total_lessons + total_quizzes)) * 100)
    print("completed quizes: ", completed_quizzes)

    # Update the progress bar or any other elements as needed

    return JsonResponse({'message': 'Lesson marked as complete successfully.', 'completed_lessons_count': completed_lessons, 'completion_percentage': completion_percentage}, status=200)

# class MarkLessonAsCompleteAPI(APIView):
#     def post(self, request, format=None):
#         lesson_id = request.data.get('lesson_id')
#         if not lesson_id:
#             return Response({'message': 'Missing lesson ID.'}, status=status.HTTP_400_BAD_REQUEST)

#         lesson = get_object_or_404(Lesson, pk=lesson_id)

#         if CompletedLesson.objects.filter(user=request.user, lesson=lesson).exists():
#             return Response({'message': 'Lesson is already marked as complete.'}, status=status.HTTP_200_OK)

#         CompletedLesson.objects.create(user=request.user, lesson=lesson)

#         # Calculate the completion percentage for the course
#         course = lesson.chapter.course
#         total_lessons = Lesson.objects.filter(chapter__course=course).count()
#         total_quizzes = course.total_quizzes()
#         completed_lessons = request.user.completed_lessons.filter(lesson__chapter__course=course).count()
#         completed_quizzes = request.user.completed_quizzes(course)

#         completion_percentage = (completed_lessons + completed_quizzes/ (total_lessons + total_quizzes)) * 100

#         return Response({
#             'message': 'Lesson marked as complete successfully.',
#             'completion_percentage': completion_percentage,
#         }, status=status.HTTP_200_OK)
@csrf_protect
def update_video_progress(request):
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

class UpdateVideoProgressAPI(APIView):
    def post(self, request):
        serializer = VideoProgressSerializer(data=request.data)
        if serializer.is_valid():
            video_id = serializer.validated_data.get('video_id')
            progress = serializer.validated_data.get('progress')

            try:
                video_lesson = VideoLesson.objects.get(video_lesson_id=video_id)
                video_progress, created = VideoProgress.objects.get_or_create(video_lesson=video_lesson, user=request.user)

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

def achievements(request):
    completed_courses = CompletedCourse.objects.filter(user=request.user)
    print(completed_courses)
    return render(request, 'courses/achievements.html', {'completed_courses': completed_courses})

class AchievementsAPI(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        completed_courses = CompletedCourse.objects.filter(user=request.user)
        serializer = CompletedCourseSerializer(completed_courses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)