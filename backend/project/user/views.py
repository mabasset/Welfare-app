from user.models import Worksite, User
from user.serializers import WorksiteSerializer, UserSerializer
from rest_framework import generics, permissions
from rest_framework.views import APIView
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import JsonResponse


class ListCreateWorksite(generics.ListCreateAPIView):
	# permission_classes = [permissions.IsAdminUser]
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
	# permission_classes = [permissions.IsAdminUser]
	queryset = User.objects.all()
	serializer_class = UserSerializer

class CreateUser(generics.CreateAPIView):
	permission_classes = [permissions.AllowAny]
	serializer_class = UserSerializer

	def create(self, request, *args, **kwargs):
		response = super().create(request, *args, **kwargs)
		user = User.objects.get(email=request.data.get('email'))
		token, created = Token.objects.get_or_create(user=user)
		response = JsonResponse({'message': 'Login successful'})
		response.set_cookie(
			key='auth_token', 
			value=token.key, 
			httponly=True,  # Prevents JavaScript access to the cookie
			secure=True,	# Ensures the cookie is sent over HTTPS only
			samesite='Strict'  # Controls cross-site request forgery protections
		)
		return response

class RetrieveUpdateDestroyUser(generics.RetrieveUpdateDestroyAPIView):
	queryset = User.objects.all()
	serializer_class = UserSerializer
	# permission_classes = [permissions.IsAuthenticatedOrReadOnly]
	lookup_field = 'email'

class LoginUser(APIView):
	def post(self, request):
		email = request.data.get('email')
		password = request.data.get('password')
		if not email or not password:
			return Response({'error': 'Email and password are required'}, status=400)

		try:
			user = User.objects.get(email=email)
			token, created = Token.objects.get_or_create(user=user)
			response = JsonResponse({'message': 'Login successful'})
			response.set_cookie(
				key='auth_token', 
				value=token.key, 
				httponly=True,
				secure=True,
				samesite='Strict'
			)
			return response
		except User.DoesNotExist:
			return Response({'error': 'Invalid credentials'}, status=401)

@api_view(['GET'])
def get_data(request):
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
