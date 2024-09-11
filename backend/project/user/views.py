from user.models import Worksite, User
from user.serializers import WorksiteSerializer, UserSerializer
from user.permissions import RequestSourcePermission
from rest_framework import generics, permissions, status
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.response import Response
from oauth2_provider.views.generic import ProtectedResourceView


class ListCreateWorksite(generics.ListCreateAPIView):
	permission_classes = [permissions.AllowAny]
	queryset = Worksite.objects.all()
	serializer_class = WorksiteSerializer

	def get(self, request, *args, **kwargs):
		worksites = self.get_queryset()
		worksites_dict = {worksite.id: str(worksite) for worksite in worksites}
		return Response(worksites_dict)


class RetrieveUpdateDestroyWorksite(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = [permissions.IsAdminUser]
	queryset = Worksite.objects.all()
	serializer_class = WorksiteSerializer


class ListUser(generics.ListAPIView):
	permission_classes = [permissions.IsAdminUser]
	queryset = User.objects.all()
	serializer_class = UserSerializer


class RetrieveUpdateDestroyUser(generics.RetrieveUpdateDestroyAPIView):
	permission_classes = [permissions.IsAdminUser]
	queryset = User.objects.all()
	serializer_class = UserSerializer
	lookup_field = 'email'

class SignupUser(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		email = request.data.get('email', '').lower()
		if User.objects.filter(email=email).exists():
			return Response({'email': 'email already exist.'}, status=status.HTTP_409_CONFLICT)
		serializer = UserSerializer(data=request.data)
		if serializer.is_valid():
			serializer.save()
			return Response({'message': 'Signup successful'}, status=status.HTTP_201_CREATED)
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUser(APIView):
	permission_classes = [permissions.AllowAny]

	def post(self, request):
		print(request.data)
		email = request.data.get('email')
		password = request.data.get('password')
		if not email or not password:
			return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)
		try:
			user = User.objects.get(email=email)
			if not user.check_password(password):
				raise User.DoesNotExist
			token, created = Token.objects.get_or_create(user=user)
			response = Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
			response.set_cookie(
				key='auth_token', 
				value=token.key, 
				httponly=True,
				secure=True,
				samesite='Strict'
			)
			return response
		except User.DoesNotExist:
			return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class LogoutUser(APIView):
	def get(self, request, *args, **kwargs):
		token_key = request.COOKIES.get('auth_token')
		if not token_key:
			return Response({'isAuthenticated': False})
		token = Token.objects.get(key=token_key)
		token.delete()
		response = Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
		response.delete_cookie('auth_token')
		return response


class GetData(APIView):
	permission_classes = [permissions.AllowAny]

	def get(self, request, *args, **kwargs):
		token_key = request.COOKIES.get('auth_token')
		if not token_key:
			return Response({'isAuthenticated': False})
		try:
			token = Token.objects.get(key=token_key)
			user = token.user
		except Token.DoesNotExist:
			return Response({'isAuthenticated': False})

		serializer = UserSerializer(user)
		return Response({'isAuthenticated': True, **serializer.data})

from oauth2_provider.views.generic import ProtectedResourceView
from django.http import HttpResponse
class GetProtectedData(ProtectedResourceView):
	def get(self, request, *args, **kwargs):
		return HttpResponse('Hello, OAuth2!')