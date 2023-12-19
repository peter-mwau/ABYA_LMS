from django.contrib import admin
from .models import Assignment, Question, Choice, Quiz, CompletedQuiz, QuizSubmission
# Register your models here.

admin.site.register(Assignment)
admin.site.register(Quiz)
admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(CompletedQuiz)
admin.site.register(QuizSubmission)
