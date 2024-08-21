from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.core.mail import send_mail

from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status

from .serializers import UserSerializer, LoginSerializer, SignupSerializer, ForgotPasswordSerializer
from .models import User, Worksite
from .jwt import create_jwt_tokens


@api_view(['GET'])
def get_data(request):
	if not request.user.is_authenticated:
		return Response({'is_authenticated': False})
	serializer = UserSerializer(request.user)
	return Response({'is_authenticated': True, **serializer.data})


@api_view(['GET'])
def get_worksites(request):
	worksites = Worksite.objects.all()
	worksites_dict = {worksite.id: str(worksite) for worksite in worksites}
	return Response(worksites_dict)


@api_view(['POST'])
def signup(request):
	serializer = SignupSerializer(data=request.data)
	if serializer.is_valid(raise_exception=True):
		user = serializer.save()
		response = Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)
		create_jwt_tokens(user, response)
		return response

	return Response({'error': 'Something went wrong'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
	serializer = LoginSerializer(data=request.data)
	if serializer.is_valid(raise_exception=True):
		user = serializer.validated_data['user']
		response = Response({'message': 'Login successful'}, status=status.HTTP_200_OK)
		create_jwt_tokens(user, response)
		return response



@api_view(['POST'])
def forgot_password(request):
	serializer = ForgotPasswordSerializer(data=request.data)
	if serializer.is_valid(raise_exception=True):
		email = serializer.validated_data['email']
		user = User.objects.get(email=email)
		
		# Generate password reset token
		token = default_token_generator.make_token(user)
		uid = urlsafe_base64_encode(force_bytes(user.pk))
		reset_url = f"https://{os.getenv('HOST')}/{os.getenv('ROUTE_RESET_PASSWORD')}?uidb64={uid}&token={token}"

		subject = "Password Reset Requested"
		message = f"Hi {user.name},\n\nTo reset your password, click the link below:\n{reset_url}\n\nIf you did not request a password reset, please ignore this email."
		send_mail(subject, message, settings.EMAIL_HOST_USER, [user.email])
		
		return Response({'message': 'Password reset email sent successfully.'}, status=status.HTTP_200_OK)