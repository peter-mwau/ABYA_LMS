from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from dj_rest_auth.registration.views import RegisterView
from dj_rest_auth.views import LoginView, LogoutView
from .serializers import UserCreateSerializer, ProfileSerializer

# class RegisterUserView(APIView):
#     def get(self, request):
#         # Replace this with your own logic
#         return Response({"message": "GET request received"})

#     def post(self, request):
#         serializer = UserCreateSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({"user": UserCreateSerializer(user).data})
#         return Response(serializer.errors, status=400)
class CustomRegisterView(RegisterView):
    serializer_class = UserCreateSerializer  
class CustomLoginView(LoginView):
    pass

class CustomLogoutView(LogoutView):
    permission_classes = (IsAuthenticated,)


