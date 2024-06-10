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
from assignments.serializers import AssignmentSerializer, QuestionSerializer, QuizSerializer, QuizSubmissionSerializer, SubmitAssignmentSerializer, ChoiceSerializer
from rest_framework import permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from rest_framework.renderers import TemplateHTMLRenderer


# Create your views here.    
# class CreateAssignment(LoginRequiredMixin, generic.CreateView):
#     form_class = CreateAssignmentForm
#     template_name = 'assignments/create_assignment_form.html'

    # def get_form_kwargs(self):
    #     kwargs = super().get_form_kwargs()
    #     kwargs['user'] = self.request.user
    #     return kwargs



#--------MODIFICATION INTO VIEWSET STAND-ALONE APIS (PETER MBUGUA)---------
# Assignment viewset for CRUD operations

class AsssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    
    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs()
        kwargs['user'] = self.request.user
        return kwargs
    @action(methods=['delete'], detail=True)
    def delete_assignment(self):
        return reverse_lazy('courses:list')
    

ChoiceFormSet = modelformset_factory(Choice, fields=('text', 'is_correct'), extra=4, max_num=4)

    
 
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def create(self, request, *args, **kwargs):
        # Custom creation logic for questions with choices
        question_form = QuestionForm(request.data)
        if question_form.is_valid():
            question = question_form.save(commit=False)
            quiz_id = request.data.get('quiz_id')
            question.quiz = get_object_or_404(Quiz, pk=quiz_id)
            question.save()

            choice_formset = ChoiceFormSet(request.data, queryset=Choice.objects.none())
            if choice_formset.is_valid():
                choices = choice_formset.save(commit=False)
                for choice in choices:
                    choice.question = question
                    choice.save()
                return Response({'status': 'question created'}, status=status.HTTP_201_CREATED)
            else:
                return Response(choice_formset.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            return Response(question_form.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'])
    def create_quiz(self, request):
        # Custom action to create a quiz
        quiz_form = QuizForm(request.data, user=request.user)
        if quiz_form.is_valid():
            quiz = quiz_form.save(commit=False)
            quiz.teacher = request.user
            quiz.save()
            return Response({'quiz_id': quiz.id}, status=status.HTTP_201_CREATED)
        else:
            return Response(quiz_form.errors, status=status.HTTP_400_BAD_REQUEST)


class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    
    

class SubmitAssignmentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SubmitAssignment.objects.all()
    serializer_class = SubmitAssignmentSerializer

    def create(self, request, *args, **kwargs):
        assignment_id = request.session.get('assignment')
        assignment = get_object_or_404(Assignment, pk=assignment_id)
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            serializer.save(
                submitter=request.user,
                assignment=assignment,
                submitted_time=timezone.now()
            )
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    @action(detail=True, methods=['post', 'put', 'patch'])
    def perform_create(self, serializer):
        assignment_id = self.request.session.get('assignment')
        assignment = get_object_or_404(Assignment, pk=assignment_id)
        serializer.save(submitter=self.request.user, assignment=assignment)
    
class SubmitQuizViewSet(viewsets.ModelViewSet):
    queryset = QuizSubmission.objects.all()
    serializer_class = QuizSubmissionSerializer
    
    
    # def get_form_kwargs(self):
    #     kwargs = super().get_form_kwargs()
    #     kwargs['user'] = self.request.user
    #     kwargs['quiz'] = Quiz.objects.get(id=self.kwargs['quiz_id'])
    #     return kwargs
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['quiz'] = Quiz.objects.get(id=self.kwargs['quiz_id'])
        return context
    
    @action(detail=True, methods=['post', 'put', 'patch'])
    def form_valid(self, form):
        quiz = Quiz.objects.get(id=self.kwargs['quiz_id'])
        self.object = form.save(commit=False)
        self.object.quiz = quiz
        self.object.student = self.request.user
        
        score = 0
        for question in quiz.question_set.all():
            selected_choices = form.cleaned_data[f'question_{question.id}']
            correct_choices = question.choice_set.filter(is_correct=True)
            if set(selected_choices) == set(correct_choices):
                score += 1
        self.object.score = score
        self.object.save()
        
        return redirect('quiz_results', submission_id=self.object.id) 

    def create(self, request, *args, **kwargs):
        quiz_id = request.data.get('quiz_id')
        quiz = get_object_or_404(Quiz, pk=quiz_id)
        answers = request.data.get('answers')  # Assuming answers are provided in the request

        # Calculate score based on provided answers
        score = self.calculate_score(quiz, answers)

        # Create or update the quiz submission
        submission, created = QuizSubmission.objects.update_or_create(
            student=request.user,
            quiz=quiz,
            defaults={'score': score}
        )

        # Check if the user passed the quiz and handle attempts
        self.handle_attempts(request, quiz, score)

        # Serialize the submission instance and return the response
        serializer = self.get_serializer(submission)
        return Response(serializer.data, status=status.HTTP_201_CREATED if created else status.HTTP_200_OK)

    @action(detail=True, methods=['get', 'post', 'put', 'patch'])
    def calculate_score(self, quiz, answers):
        score = 0
        for question_id, value in answers.items():
            question = get_object_or_404(Question, pk=question_id)
            correct_choices = question.choice_set.filter(is_correct=True).values_list('id', flat=True)
            if str(value) in map(str, correct_choices):
                score += 1
        return score

    @action(detail=True, methods=['post', 'put', 'patch'])
    def handle_attempts(self, request, quiz, score):
        # Define the key for storing quiz attempts in the session
        quiz_session_key = f"quiz_attempts_{request.user.id}_{quiz.id}"

        # Initialize attempts for the quiz if not already set
        if quiz_session_key not in request.session:
            request.session[quiz_session_key] = {
                'attempts_left': 3,  # Total number of attempts allowed
                'last_attempt_time': timezone.now().timestamp()  # Timestamp of the last attempt
            }

        # Retrieve the quiz attempt data from the session
        quiz_attempts_data = request.session[quiz_session_key]

        # Calculate the time passed since the last attempt
        last_attempt_time = timezone.datetime.fromtimestamp(quiz_attempts_data['last_attempt_time'], tz=timezone.get_current_timezone())
        time_since_last_attempt = timezone.now() - last_attempt_time

        # Define the cooldown period
        cooldown_period = timedelta(hours=24)

        # Check if the cooldown period has passed since the last attempt
        if time_since_last_attempt < cooldown_period:
            # If within cooldown period, check if there are attempts left
            if quiz_attempts_data['attempts_left'] > 0:
                # Decrement the attempts left
                quiz_attempts_data['attempts_left'] -= 1
                # Update the last attempt time
                quiz_attempts_data['last_attempt_time'] = timezone.now().timestamp()
                # Save the updated data back to the session
                request.session[quiz_session_key] = quiz_attempts_data
            else:
                # No attempts left, return an error message
                messages.warning(request, "You have used all your attempts for this quiz. Please try again after the cooldown period.")
                # You may want to raise an exception or return an appropriate response
        else:
            # Cooldown period has passed, reset the attempts
            quiz_attempts_data['attempts_left'] = 3
            quiz_attempts_data['last_attempt_time'] = timezone.now().timestamp()
            # Save the reset data back to the session
            request.session[quiz_session_key] = quiz_attempts_data

        # Always save the session after modifying it
        request.session.save()
        
        @action(detail=True, methods=['post'])
        def grade_assignment(request, pk):
            submission = get_object_or_404(SubmitAssignment, pk=pk)
            if request.method=="POST":
                form=GradeAssignmentForm(request.POST)
                if form.is_valid():
                    data = form.cleaned_data.get('grade')
                    submission.grade_assignment(data)
                    return redirect('assignments:submit_detail', pk=pk)
            else:
                form = GradeAssignmentForm()
            return render(request, 'assignments/grade_form.html', {'pk':pk, 'form':form, 'submissions':submission})










# -------------------OLD CODE-----------------------------
# class CreateQuestionView(LoginRequiredMixin, generic.CreateView):
#     template_name = 'assignments/create_question.html'
#     form_class = QuestionForm
#     model = Question
    
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['choice_formset'] = ChoiceFormSet(queryset=Choice.objects.none())
#         context['quiz_id'] = self.kwargs['quiz_id']
#         return context
    
#     def form_valid(self, form):
#         quiz_id = self.kwargs['quiz_id']
#         question = form.save(commit=False)
#         question.quiz = Quiz.objects.get(id=quiz_id)
#         question.save()
        
#         choice_formset = ChoiceFormSet(self.request.POST, queryset=Choice.objects.none())
#         if choice_formset.is_valid():
#             for form in choice_formset.forms:
#                 choice = form.save(commit=False)
#                 choice.question = question
#                 choice.save()
                
#         # Check if the "Finish Creating" button was clicked
#         if 'finish' in self.request.POST:
#             # Redirect to a different view
#             return redirect('courses:list')

#         return super().form_valid(form)
#     def get_success_url(self):
#         return reverse('assignments:create_question', kwargs={'quiz_id': self.kwargs['quiz_id']})


# class CreateQuestionViewWithoutId(LoginRequiredMixin, generic.CreateView):
#     template_name = 'assignments/create_question.html'
#     form_class = QuestionForm
#     model = Question
    
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         context['choice_formset'] = ChoiceFormSet(queryset=Choice.objects.none())
#         return context
    
#     def form_valid(self, form):
#         question = form.save(commit=False)
#         question.quiz = Quiz.objects.get(quiz_title=question.quiz_title)
#         question.save()
        
#         choice_formset = ChoiceFormSet(self.request.POST, queryset=Choice.objects.none())
#         if choice_formset.is_valid():
#             for form in choice_formset.forms:
#                 choice = form.save(commit=False)
#                 choice.question = question
#                 choice.save()
                
#         # Check if the "Finish Creating" button was clicked
#         if 'finish' in self.request.POST:
#             # Redirect to a different view
#             return redirect('courses:list')

#         return super().form_valid(form)
#     def get_success_url(self):
#         return reverse('assignments:create_question_without_id')
    
# def create_quiz(request):
#     if request.method == 'POST':
#         quiz_form = QuizForm(request.POST, user=request.user)
#         if quiz_form.is_valid():
#             quiz = quiz_form.save(commit = False)
#             quiz.teacher = request.user
#             #get quiz_id value from form
#             quiz_id = quiz_form.cleaned_data.get('id')
#             quiz.save()
#             if quiz_id:
#                 quiz = Quiz.objects.get(id=quiz_id)
#                 print(quiz)
#             else:
#                 print("no quiz")
#             return redirect(reverse('assignments:create_question', kwargs={'quiz_id': quiz.id}))
    # else:
    #     quiz_form = QuizForm(user=request.user)
    # return render(request, 'assignments/create_quiz.html', {'quiz_form': quiz_form})

# class UpdateAssignment(LoginRequiredMixin, generic.UpdateView):
#     model = Assignment
#     form_class = CreateAssignmentForm
#     template_name = 'assignments/create_assignment_form.html'

#     def get_form_kwargs(self):
#         kwargs = super().get_form_kwargs()
#         kwargs['user'] = self.request.user
#         return kwargs

# class DeleteAssignment(LoginRequiredMixin, generic.DeleteView):
#     model = Assignment
#     success_url = reverse_lazy('courses:list')



# class SubmitAssignmentView(LoginRequiredMixin, generic.CreateView):
#     form_class = SubmitAssignmentForm
#     template_name = 'assignments/submitassignment_form.html'
#     select_related = ('author', 'assignment_ques')
#     # success_url = reverse('assignments:submit_detail')

#     def get_context_data(self, **kwargs):
#         assignments = Assignment.objects.filter(pk=self.request.session.get('assignment'))
#         assignment_object = get_object_or_404(assignments)
#         context = super(SubmitAssignmentView, self).get_context_data(**kwargs)
#         context['duedate'] = assignment_object.due_date
#         context['time'] = timezone.now()
#         return context

#     def get_form_kwargs(self):
#         kwargs = super().get_form_kwargs()
#         kwargs['assignment_id'] = self.request.session.get('assignment')
#         kwargs['user'] = self.request.user
#         return kwargs
    
# class SubmitQuizView(LoginRequiredMixin, generic.CreateView):
#     form_class = SubmitQuizForm
#     template_name = 'assignments/submitquiz_form.html'
#     select_related = ('student', 'quiz')
    
    # def get_form_kwargs(self):
    #     kwargs = super().get_form_kwargs()
    #     kwargs['user'] = self.request.user
    #     kwargs['quiz'] = Quiz.objects.get(id=self.kwargs['quiz_id'])
    #     return kwargs
    
    # def get_context_data(self, **kwargs):
    #     context = super().get_context_data(**kwargs)
    #     context['quiz'] = Quiz.objects.get(id=self.kwargs['quiz_id'])
    #     return context
    
    # def form_valid(self, form):
    #     quiz = Quiz.objects.get(id=self.kwargs['quiz_id'])
    #     self.object = form.save(commit=False)
    #     self.object.quiz = quiz
    #     self.object.student = self.request.user
        
    #     score = 0
    #     for question in quiz.question_set.all():
    #         selected_choices = form.cleaned_data[f'question_{question.id}']
    #         correct_choices = question.choice_set.filter(is_correct=True)
    #         if set(selected_choices) == set(correct_choices):
    #             score += 1
    #     self.object.score = score
    #     self.object.save()
        
    #     return redirect('quiz_results', submission_id=self.object.id)

# class QuizResultsView(LoginRequiredMixin, generic.TemplateView):
#     model = QuizSubmission
#     form_class = None  # i'm not using a form for this view
#     template_name = 'assignments/quiz_results.html'
    
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         submission_id = self.kwargs['submission_id']
#         submission = get_object_or_404(QuizSubmission, id=submission_id)
#         context['submission'] = submission
#         return context

# class SubmitAssignmentDetail(LoginRequiredMixin, generic.DetailView):
#     model = SubmitAssignment
#     template_name = 'assignments/submitassignment_detail.html'

#     def get_context_data(self, **kwargs):
#         submissions = SubmitAssignment.objects.filter(pk=self.kwargs['pk'])
#         submissions_object = get_object_or_404(submissions)
#         context = super(SubmitAssignmentDetail, self).get_context_data(**kwargs)
#         context['submissions'] = submissions_object
#         return context


# class AssignmentDetail(LoginRequiredMixin, generic.DetailView):
#     model = Assignment

#     def get_context_data(self, **kwargs):
#         course_obj = Course.objects.filter(students=self.request.user.id)
#         context = super(AssignmentDetail, self).get_context_data(**kwargs)
#         context['course'] = course_obj
#         assignment = Assignment.objects.filter(pk=self.kwargs['pk'])
#         assignment_object = get_object_or_404(assignment)
#         context['duedate'] = assignment_object.due_date
#         context['time'] = timezone.now()
#         submitassignment = SubmitAssignment.objects.filter(assignment_ques=self.kwargs['pk'])
#         context['submitted'] = submitassignment
#         self.request.session['assignment'] = self.kwargs['pk']
#         # print(self.request.session['assignment'])
#         return context

# class QuizAnswerView(LoginRequiredMixin, FormView):
#     template_name = 'assignments/quiz_answer.html'
#     form_class = QuizAnswerForm

#     def get_form_kwargs(self):
#         kwargs = super().get_form_kwargs()
#         kwargs['quiz_id'] = self.kwargs['quiz_id']
#         return kwargs
    
#     def get_quiz(self):
#         return get_object_or_404(Quiz, pk=self.kwargs['quiz_id'])
    
#     def get_course_id(self):
#         quiz = self.get_quiz()
#         chapter = quiz.chapter  
#         course = chapter.course  
#         return course.pk

#     def calculate_score(self, form):
#         score = 0
#         for name, value in form.cleaned_data.items():
#             if name.startswith('question_') and value is not None:
#                 question_id = int(name.split('_')[1])
#                 question = Question.objects.get(pk=question_id)
#                 correct_choices = question.choice.filter(is_correct=True).values_list('id', flat=True)
#                 if str(value) in map(str, correct_choices):
#                     score += 1
#         return score

#     def form_valid(self, form):
#         quiz = self.get_quiz()
#         session_key = self.request.session.session_key
#         quiz_session_key = f"quiz_attempts_{self.request.user.id}_{quiz.id}"
#         if not session_key:
#             self.request.session.save()
#             session_key = self.request.session.session_key


#         if quiz_session_key not in self.request.session:
#             self.request.session[quiz_session_key] = 3  # Initialize attempts for the quiz


#         # Check if the user has a quiz attempt session variable
#         if 'quiz_attempts' not in self.request.session:
#             self.request.session['quiz_attempts'] = 3
#             self.request.session['quiz_last_attempt'] = int(timezone.now().timestamp())
#             print("Stored last attempt time:", self.request.session['quiz_last_attempt'])



#         if 'quiz_attempts' not in self.request.session or 'quiz_last_attempt' not in self.request.session:
#             # Handle session expiration or start a new session
#             messages.warning(self.request, "Your session has expired. Please log in again.")
#             return super().form_invalid(form)
#         else:
#             last_attempt_time = timezone.datetime.fromtimestamp(self.request.session['quiz_last_attempt'])
#             remaining_time_seconds = max(0, (last_attempt_time.astimezone(timezone.get_current_timezone()) + timedelta(hours=24) - timezone.now()).total_seconds())
#         # context["remaining_time_seconds"] = remaining_time_seconds


#         # Check if the user has attempts remaining
#         remaining_attempts = self.request.session.get(quiz_session_key, 0)
#         # When retrieving the last_attempt_time
#         last_attempt_time = timezone.datetime.fromtimestamp(self.request.session['quiz_last_attempt'])
#         print("Retrieved last attempt time:", last_attempt_time)

#         cooldown_time = last_attempt_time + timedelta(hours=24)

#         if remaining_attempts <= 0 and timezone.now() < cooldown_time.replace(tzinfo=timezone.get_current_timezone()):
#             messages.warning(self.request, "You have used all your attempts for this quiz. Please try again after 24 hours.")
#             return super().form_invalid(form)

#         # Process the quiz submission
#         score = self.calculate_score(form)


        
#         try:
#             # Try to create a new QuizSubmission instance
#             with transaction.atomic():
#                 submission = quiz.quizsubmission_set.create(
#                     student=self.request.user,
#                     score=score
#                 )
#         except IntegrityError:
#             # If IntegrityError occurs, it means the combination (user, quiz) already exists
#             # Retrieve the existing instance and update the score
#             submission = QuizSubmission.objects.get(student=self.request.user, quiz=quiz)
#             submission.score = score
#             submission.save()

#          # Update the user's quiz attempts in the session
#         self.request.session[quiz_session_key] -= 1
#         self.request.session['quiz_last_attempt'] = timezone.now().timestamp()


#         quiz_id = self.kwargs.get('quiz_id')

#         # Get the completed quiz for the current user and quiz, if it exists
#         completed_quiz_instance = CompletedQuiz.objects.filter(user=self.request.user, quiz_id=quiz_id).first()




#         # Calculate the percentage score
#         total_questions = quiz.question_set.count()
#         percentage_score = round((score / total_questions) * 100)

#         # Check if the score is >= 75%
#         total_questions = quiz.question_set.count()
#         if percentage_score >= 75:
#             # If score is >= 75%, add the quiz ID to completed quizzes
#             # If the user has not completed this quiz, add it to completed quizzes
#             if completed_quiz_instance is None:
#                 CompletedQuiz.objects.create(user=self.request.user, quiz_id=quiz_id)
#                 messages.success(self.request, f"Your score is {percentage_score}%. You have passed this quiz.")
#                 print("Completed Quizzes:", CompletedQuiz.objects.filter(user=self.request.user).values_list('quiz_id', flat=True))
#             else:
#                 messages.warning(self.request, "You have already completed this quiz.")
#         else:
#             messages.warning(self.request, f"Your score is {percentage_score}%. You have failed this quiz.")

        
#         # Check if user has attempts remaining
#         remaining_attempts = self.request.session.get(quiz_session_key, 0)

#         if remaining_attempts <= 0 and timezone.now() < cooldown_time.replace(tzinfo=timezone.get_current_timezone()):
#             messages.warning(self.request, "You have used all your attempts for this quiz. Please try again after 24 hours.")
#         else:
#             messages.info(self.request, f"You have {remaining_attempts} attempt(s) remaining for this quiz.")

        
#         self.kwargs['submission_id'] = submission.id
#         # remaining attempts context
#         print("Remaining attempts1:", remaining_attempts)
#         # Include quiz_id in the context when calling get_context_data
#         # return super().form_valid(form, quiz_id=self.kwargs['quiz_id'])
#         quiz_id = self.kwargs.get('quiz_id')
#         print("Percentage score:", percentage_score)
#         percentage_score = round((score / total_questions) * 100)
#         print("Percentage score:", percentage_score)
#         print("Quiz ID:", quiz_id)
#         print("course ID:", self.get_course_id())
#         return super().form_valid(form)

#     def get_success_url(self):
#         # Access submission_id and quiz_id from self.kwargs
#         submission_id = self.kwargs.get('submission_id')
#         quiz_id = self.kwargs.get('quiz_id')

#         # Use reverse to generate the URL
#         return reverse('assignments:quiz_results', args=[submission_id, quiz_id])

    
#     def get_context_data(self, **kwargs):
#         context = super().get_context_data(**kwargs)
#         # Access quiz_id directly from self.kwargs
#         quiz_id = self.kwargs.get('quiz_id')
#         context["quiz_id"] = quiz_id
#         quiz = self.get_quiz()
#         context["quiz_title"] = quiz.quiz_title
#         questions = Question.objects.filter(quiz_title=quiz)
#         context["questions"] = questions
#         # print("Quiz object:", quiz.__dict__)
#         context["course_id"] = self.get_course_id()
#         # Check if 'quiz_last_attempt' is present in the session
#         if 'quiz_last_attempt' in self.request.session:
#             last_attempt_time = timezone.datetime.fromtimestamp(self.request.session['quiz_last_attempt'])
#             remaining_time_seconds = max(0, (last_attempt_time.astimezone(timezone.get_current_timezone()) + timedelta(hours=24) - timezone.now()).total_seconds())
#             context["remaining_time_seconds"] = remaining_time_seconds
#         return context


# @login_required
# def delete_view(request, pk):
#     obj = get_object_or_404(SubmitAssignment, pk=pk)
#     context = {'submission': obj}
#     if request.method == "POST":
#         obj.delete()
#         return HttpResponseRedirect(reverse("courses:list"))
#     return render(request, "assignments/submission_confirm_delete.html", context)

