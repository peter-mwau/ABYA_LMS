from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import AssignmentViewSet, QuestionViewSet, SubmitAssignmentViewSet, QuizViewSet, QuizSubmissionViewSet, FetchQuizDataView

app_name = 'assignment'

router = DefaultRouter()

router.register(r'assignment', AssignmentViewSet, basename='assignment')
router.register(r'questions', QuestionViewSet, basename='question')
router.register(r'submit-assignments', SubmitAssignmentViewSet)
router.register(r'quiz', QuizViewSet)
router.register(r'quiz-submission', QuizSubmissionViewSet)



urlpatterns = [
    path('', include(router.urls)),
    path('assignments/create-assignment/', AssignmentViewSet.as_view({'post': 'create_assignment'}), name='create-assignment'),
    path('quiz/create-quiz/', QuizViewSet.as_view({'post': 'create_quiz'}), name='create-quiz'),
    path('questions/create-question/<int:quiz_id>/', QuestionViewSet.as_view({'post': 'create_question'}), name='create-question'),
    path('questions/create-question-without-id/', QuestionViewSet.as_view({'post': 'create_question_without_id'}), name='create-question-without-id'),
    path('quiz/<int:pk>/submit/', QuizViewSet.as_view({'post': 'submit_quiz'}), name='submit-quiz'),
    path('quiz/<int:pk>/questions/', QuizViewSet.as_view({'get': 'list_questions'}), name='list-questions'),
    path('fetch-quiz-data/<int:pk>/', FetchQuizDataView.as_view(), name='fetch-quiz-data'),
    path('quiz-submissions/<int:pk>/results/', QuizSubmissionViewSet.as_view({'get': 'get_results'}), name='quiz-results'),
    path('quiz-submissions/submit/', QuizSubmissionViewSet.as_view({'post': 'submit'}), name='submit-quiz-submission'),
    path('submit-assignments/submit-assignment/', SubmitAssignmentViewSet.as_view({'post': 'submit_assignment'}), name='submit-assignment'),
]
