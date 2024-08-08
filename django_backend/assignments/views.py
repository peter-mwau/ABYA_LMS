from typing import Any, Dict
from django.forms.models import BaseModelForm
from typing import Any, Dict
from django.shortcuts import render, redirect
from django.http import Http404, HttpResponse, HttpResponseRedirect
from django.contrib.auth.mixins import (LoginRequiredMixin,
                                        PermissionRequiredMixin)
from django.views.generic.edit import FormMixin
from django.urls import reverse, reverse_lazy
from django.contrib.auth.decorators import login_required

from django.utils import timezone
import os
from django.conf import settings
from django.forms import modelformset_factory
from django.db import transaction, IntegrityError

# from django.contrib import messages
from django.views import generic
from django.shortcuts import get_object_or_404
from users.models import User
from assignments.models import Assignment, SubmitAssignment, Quiz, Question, Choice, QuizSubmission
from assignments.forms import GradeAssignmentForm, CreateAssignmentForm, SubmitAssignmentForm, QuizForm, QuizAnswerForm, QuestionForm, ChoiceForm, SubmitQuizForm
from courses.models import Course
from django.contrib import messages
from django.views.generic.edit import FormView
from django.urls import resolve
from .models import QuizSubmission, CompletedQuiz
from django.urls import reverse
from django.contrib.sessions.models import Session
import requests
from datetime import datetime, timedelta
from django.contrib.sessions.models import Session
from django.utils import timezone
from rest_framework import viewsets
from assignments.serializers import AssignmentSerializer, QuestionSerializer, QuizSerializer, QuizSubmissionSerializer, SubmitAssignmentSerializer, ChoiceSerializer, DetailedQuizSerializer
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.views import APIView


#--------MODIFICATION INTO VIEWSET STAND-ALONE APIS (PETER MBUGUA)---------
# Assignment viewset for CRUD operations

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    @action(detail=False, methods=['post'], url_path='create-assignment')
    def create_assignment(self, request):
        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(teacher=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

ChoiceFormSet = modelformset_factory(Choice, fields=('text', 'is_correct'), extra=4, max_num=4)

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=False, methods=['post'], url_path='create-question/(?P<quiz_id>[^/.]+)')
    def create_question(self, request, quiz_id=None):
        quiz = get_object_or_404(Quiz, id=quiz_id)
        print("Quiz: ",quiz)
        question_data = request.data.copy()
        # question_data['quiz_title'] = quiz.quiz_title
        question_data['quiz_title'] = quiz_id
        print('quiz data', quiz_id)
        print('question data', question_data)
        

        question_serializer = QuestionSerializer(data=question_data)
        if question_serializer.is_valid():
            question = question_serializer.save()

            choice_data = request.data.getlist('choices', [])
            print("Choice data", len(choice_data))
            for i in range(4):# Assuming there are always 4 choices
                choice_text = request.data.get(f'choices[{i}].text')
                is_correct = request.data.get(f'choices[{i}].is_correct', 'false').lower() == 'true'

                choice = {'question': question.id, 'text': choice_text, 'is_correct': is_correct}
                choice_serializer = ChoiceSerializer(data=choice)
                if choice_serializer.is_valid():
                    choice_serializer.save()
                else:
                    return Response(choice_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(question_serializer.data, status=status.HTTP_201_CREATED)
        return Response(question_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], url_path='create-question-without-id')
    def create_question_without_id(self, request):
        question_data = request.data
        quiz = get_object_or_404(Quiz, quiz_title=question_data.get('quiz_title'))
        question_data['quiz'] = quiz.id
        
        question_serializer = QuestionSerializer(data=question_data)
        if question_serializer.is_valid():
            question = question_serializer.save()
            
            choice_data = request.data.get('choices', [])
            for i in range(4):# Assuming there are always 4 choices
                choice_text = request.data.get(f'choices[{i}].text')
                is_correct = request.data.get(f'choices[{i}].is_correct', 'false').lower() == 'true'

                choice = {'question': question.id, 'text': choice_text, 'is_correct': is_correct}
                choice_serializer = ChoiceSerializer(data=choice)
                if choice_serializer.is_valid():
                    choice_serializer.save()
                else:
                    return Response(choice_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            return Response(question_serializer.data, status=status.HTTP_201_CREATED)
        return Response(question_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SubmitAssignmentViewSet(viewsets.ModelViewSet):
    queryset = SubmitAssignment.objects.all()
    serializer_class = SubmitAssignmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_context_data(self, request, assignment_id):
        assignment = get_object_or_404(Assignment, pk=assignment_id)
        context = {
            'duedate': assignment.due_date,
            'time': timezone.now(),
        }
        return context

    @action(detail=False, methods=['post'], url_path='submit-assignment')
    def submit_assignment(self, request):
        assignment_id = request.session.get('assignment')
        if not assignment_id:
            return Response({'error': 'Assignment ID is missing in the session.'}, status=status.HTTP_400_BAD_REQUEST)

        context = self.get_context_data(request, assignment_id)
        data = request.data.copy()
        data['assignment_ques'] = assignment_id
        data['author'] = request.user.id
        
        serializer = SubmitAssignmentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class QuizSubmissionViewSet(viewsets.ModelViewSet):
    queryset = QuizSubmission.objects.all()
    serializer_class = QuizSubmissionSerializer
    permission_classes = [permissions.IsAuthenticated]

    @action(detail=True, methods=['get'], url_path='results')
    def get_results(self, request, pk=None):
        submission = get_object_or_404(QuizSubmission, id=pk)
        serializer = QuizSubmissionSerializer(submission)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_user(self):
        return User.objects.get(id=self.request.user.id)

    @action(methods=['post'], detail=False ,url_path='create-quiz')
    def create_quiz(self, request):
        # Get the user object
        user = self.get_user()
        data = request.data.copy()
        data['teacher'] = request.user.id
        print('user', user)
        print('id', request.user.id)
        print("Quiz Data: ", data)

        serializer = QuizSerializer(data=data)
        if serializer.is_valid():
            serializer.save(teacher=request.user)
            print("teacher: ", request.user)
            print("data: ", data)
            print("user: ", user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=True, methods=['post'], url_path='submit')
    def submit_quiz(self, request, pk=None):
        quiz = get_object_or_404(Quiz, pk=pk)
        user = request.user
        data = request.data.get('answers', {})

        # Calculate score based on provided answers
        score = self.calculate_score(quiz, data)

        # Handle submission and attempts
        submission, created = self.create_or_update_submission(user, quiz, score)
        self.handle_attempts(request, quiz, score)

        # Check if the user passed the quiz
        total_questions = quiz.question_set.count()
        percentage_score = round((score / total_questions) * 100)
        if percentage_score >= 75:
            CompletedQuiz.objects.get_or_create(user=user, quiz=quiz)

        return Response(QuizSubmissionSerializer(submission).data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    @action(detail=True, methods=['get'], url_path='questions')
    def list_questions(self, request, pk=None):
        quiz = get_object_or_404(Quiz, pk=pk)
        questions = quiz.question_set.all()
        serializer = QuestionSerializer(questions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def calculate_score(self, quiz, answers):
        score = 0
        for question_id, choice_id in answers.items():
            try:
                question = Question.objects.get(id=question_id, quiz=quiz)
                choice = Choice.objects.get(id=choice_id, question=question)
                if choice.is_correct:
                    score += 1
            except (Question.DoesNotExist, Choice.DoesNotExist):
                continue
        return score

    def create_or_update_submission(self, user, quiz, score):
        try:
            with transaction.atomic():
                submission, created = QuizSubmission.objects.get_or_create(
                    student=user,
                    quiz=quiz,
                    defaults={'score': score}
                )
                if not created:
                    submission.score = score
                    submission.save()
        except IntegrityError:
            raise ValueError("Error saving submission.")
        return submission, created

    def handle_attempts(self, request, quiz, score):
        quiz_session_key = f"quiz_attempts_{request.user.id}_{quiz.id}"

        if quiz_session_key not in request.session:
            request.session[quiz_session_key] = {
                'attempts_left': 3,
                'last_attempt_time': timezone.now().timestamp()
            }

        quiz_attempts_data = request.session[quiz_session_key]
        last_attempt_time = timezone.datetime.fromtimestamp(quiz_attempts_data['last_attempt_time'], tz=timezone.get_current_timezone())
        time_since_last_attempt = timezone.now() - last_attempt_time
        cooldown_period = timedelta(hours=24)

        if time_since_last_attempt < cooldown_period:
            if quiz_attempts_data['attempts_left'] > 0:
                quiz_attempts_data['attempts_left'] -= 1
                quiz_attempts_data['last_attempt_time'] = timezone.now().timestamp()
                request.session[quiz_session_key] = quiz_attempts_data
            else:
                raise PermissionError("No attempts left. Please try again after the cooldown period.")
        else:
            quiz_attempts_data['attempts_left'] = 3
            quiz_attempts_data['last_attempt_time'] = timezone.now().timestamp()
            request.session[quiz_session_key] = quiz_attempts_data

        request.session.save()

class FetchQuizDataView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, pk):
        quiz = get_object_or_404(Quiz, pk=pk)
        serializer = DetailedQuizSerializer(quiz)
        print(serializer.data)
        return Response(serializer.data)        


