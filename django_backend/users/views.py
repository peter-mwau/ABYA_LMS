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
from rest_framework.authtoken.models import Token
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from .serializers import ProfileSerializer
from .models import Profile
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.contrib.auth import login, authenticate, logout
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.views import View
from django.utils.decorators import method_decorator
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser





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
                user = get_object_or_404(get_user_model(), email=email)
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
        try:
            user = serializer.save()
            return user
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # return user
    
class CustomLoginView(LoginView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        token = Token.objects.get(user=request.user)
        print(token.key)
        return response

@method_decorator(csrf_exempt, name='dispatch')
class LogoutAPIView(View):
    def post(self, request, *args, **kwargs):
        # Invalidate the session or token
        logout(request)
        # Return a success response
        return JsonResponse({'detail': 'Logged out successfully'}, status=200)


# class UserProfileView(generics.RetrieveAPIView):
#     queryset = Profile.objects.all()
#     serializer_class = ProfileSerializer
#     permission_classes = [IsAuthenticated]

#     def get_object(self):
#         print(self.request.user.profile)
#         return self.request.user.profile
    

class CurrentUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = get_user_model().objects.get(id=request.user.id)
        print('uSER: ', user)
        return Response({
            'username': user.username,
            # Include any other user fields you need here
        })
    

class UserDataView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [TokenAuthentication]

    def get(self, request, *args, **kwargs):
        user = request.user
        user_type = request.user.user_type
        user_type_str = "Student" if user_type == 1 else "Teacher" if user_type == 2 else "Unknown"
        print(user)
        profile = Profile.objects.filter(user=user).first()
        if not profile:
            return Response({'error': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        data = {
            'username': user.username,
            'firstname': user.first_name,
            'lastname': user.last_name,
            'email': user.email,
            'issuperuser': user.is_superuser,
            'isstaff': user.is_staff,
            'datejoined': user.date_joined.strftime('%Y-%m-%d %H:%M:%S'),
            'lastlogin': user.last_login.strftime('%Y-%m-%d %H:%M:%S') if user.last_login else None,
            'isactive': user.is_active,
            'phone': profile.phone,
            'bio': profile.bio,
            'avatar': profile.avatar.url if profile.avatar else None,
            'user_type': user_type_str,

        }
        # print(data)
        return Response(data)
    parser_classes = (MultiPartParser, FormParser)

    def put(self, request, *args, **kwargs):
        user = request.user
        if user.is_anonymous:
            return Response({'error': 'Not authenticated.'}, status=status.HTTP_401_UNAUTHORIZED)
        profile = Profile.objects.filter(user=user).first()
        if not profile:
            return Response({'error': 'Profile not found.'}, status=status.HTTP_404_NOT_FOUND)

        # Update user and profile fields from request data
        user.username = request.data.get('username', user.username)
        user.first_name = request.data.get('firstname', user.first_name)
        user.last_name = request.data.get('lastname', user.last_name)
        user.email = request.data.get('email', user.email)
        profile.phone = request.data.get('phone', profile.phone)
        profile.bio = request.data.get('bio', profile.bio)
        avatar = request.FILES.get('avatar')
        if avatar:
            profile.avatar = avatar

        # Save updated user and profile
        user.save()
        profile.save()

        return Response({'status': 'User data updated.'})