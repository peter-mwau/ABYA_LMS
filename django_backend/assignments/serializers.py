from rest_framework import serializers
from .models import Quiz, Question, Assignment, SubmitAssignment, QuizSubmission, Choice, CompletedQuiz
from django.contrib.auth import get_user_model


class QuizSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quiz
        fields = '__all__'

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'
        
class QuestionSerializer(serializers.ModelSerializer):
    choices = serializers.SerializerMethodField()

    class Meta:
        model = Question
        fields = ['id', 'question_text', 'choices']

    def get_choices(self, obj):
        choices = Choice.objects.filter(question=obj)
        return ChoiceSerializer(choices, many=True).data
class DetailedQuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True,source='question_set')
    choices = ChoiceSerializer(many=True, read_only=True)
    class Meta:
        model = Quiz
        fields = ['id', 'quiz_title', 'quiz_description', 'questions', 'choices']

        def get_questions(self, obj):
            questions = Question.objects.filter(quiz_title=obj)
            return QuestionSerializer(questions, many=True).data

class AssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Assignment
        fields = '__all__'

class SubmitAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubmitAssignment
        fields = '__all__'

class QuizSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizSubmission
        fields = '__all__'

