from rest_framework.views import APIView
from rest_framework_jwt.utils import jwt_encode_handler
from .serializers import UserSerializer
from rest_framework.authtoken.models import Token
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth import authenticate, login
from rest_framework_jwt.serializers import jwt_encode_handler, jwt_payload_handler

@api_view(['POST'])
def obtain_jwt_token_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return Response({'token': token})
    else:
        return Response({'error': 'Invalid credentials'}, status=400)




class UserRegister(APIView):
    @csrf_exempt
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User created'}, status=201)
        return Response(serializer.errors, status=400)


class UserLogin(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid credentials'}, status=400)
