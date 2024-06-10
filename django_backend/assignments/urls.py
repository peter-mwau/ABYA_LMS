from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AsssignmentViewSet, QuestionViewSet, SubmitQuizViewSet, SubmitAssignmentViewSet, QuizViewSet

app_name = 'assignment'

router = DefaultRouter()

router.register(
    r'assignment', AsssignmentViewSet, basename='assignment'
)
router.register(r'questions', QuestionViewSet, basename='question')
router.register(r'quiz-submit', SubmitQuizViewSet)
router.register(r'assignment-submit', SubmitAssignmentViewSet)
router.register(r'quiz', QuizViewSet)

urlpatterns = [

]+router.urls
