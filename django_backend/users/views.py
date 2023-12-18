from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from .serializers import UserCreateSerializer
from .serializers import PasswordResetConfirmSerializer
from rest_framework import status
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.template.loader import render_to_string
from django.core.mail import send_mail
from django.contrib.sites.shortcuts import get_current_site
from django.utils.encoding import force_bytes
from django.contrib.auth import get_user_model
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
    
# For confirming the password reset, i.e., it's the endpoint where the user sends the new password along with the uidb64 and token
class PasswordResetConfirmView(APIView):
    serializer_class = PasswordResetConfirmSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "Password has been reset with the new password."}, status=status.HTTP_200_OK)
    
    
# Used to send the password reset email, takes the user's email as input, generate the uidb64 and token, and send the email with the password reset link.
class PasswordResetView(APIView):
    def post(self, request):
        email = request.data.get('email')
        if email:
            try:
                user = get_user_model().objects.get(email=email)
            except get_user_model().DoesNotExist:
                return Response({"error": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

            token = default_token_generator.make_token(user)
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))

            current_site = get_current_site(request)
            mail_subject = 'Reset your password'
            message = render_to_string('Reset_Password.js', {
                'user': user,
                'domain': current_site.domain,
                'uid': uidb64,
                'token': token,
            })

            send_mail(mail_subject, message, 'info@mywebsite.com', [email])

            return Response({"message": "Password reset email has been sent."}, status=status.HTTP_200_OK)

        return Response({"error": "Email is required."}, status=status.HTTP_400_BAD_REQUEST)


class CustomRegisterView(RegisterView):
    serializer_class = UserCreateSerializer  

    def perform_create(self, serializer):
        user = serializer.save()
        return user
    
class CustomLoginView(LoginView):
    pass

class CustomLogoutView(LogoutView):
    permission_classes = (IsAuthenticated,)


