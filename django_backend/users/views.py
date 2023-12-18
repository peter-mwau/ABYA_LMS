from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserCreateSerializer


class RegisterUserView(APIView):
    def get(self, request):
        # Replace this with your own logic
        return Response({"message": "GET request received"})

    def post(self, request):
        serializer = UserCreateSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({"user": UserCreateSerializer(user).data})
        return Response(serializer.errors, status=400)
    
    