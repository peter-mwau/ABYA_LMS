from django.contrib import admin
from .models import Assignment, Question, Choice, Quiz, CompletedQuiz, QuizSubmission

class AssignmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'assignment_name', 'assignment_description', 'start_date', 'due_date', 'course')
    ordering = ('id',)  

class QuizAdmin(admin.ModelAdmin):
    list_display = ('id', 'quiz_title','course', 'chapter', 'quiz_description', 'teacher') 
    ordering = ('id',) 

class QuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'question_text', 'quiz_title')
    ordering = ('id',)

class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('id', 'question', 'text', 'is_correct')
    ordering = ('id',)

class CompletedQuizAdmin(admin.ModelAdmin):
    list_display = ('id', 'quiz', 'user', 'completed_at')
    ordering = ('completed_at',)

class QuizSubmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'student', 'score', 'submitted_on')
    ordering = ('submitted_on',)

# Register your models here.
admin.site.register(Assignment, AssignmentAdmin)
admin.site.register(Quiz, QuizAdmin)
admin.site.register(Question, QuestionAdmin)
admin.site.register(Choice, ChoiceAdmin)
admin.site.register(CompletedQuiz, CompletedQuizAdmin)
admin.site.register(QuizSubmission, QuizSubmissionAdmin)