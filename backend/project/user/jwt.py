from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from django.utils import timezone


def set_tokens_for_user(user, response):
	refresh = RefreshToken.for_user(user)
	access_token = refresh.access_token

	response.set_cookie(
		key='refresh',
		value=str(refresh),
		httponly=True,  # Prevents JavaScript access for security
		expires= timezone.now() + refresh.lifetime,  # Expire the cookie when the token expires
		secure=True,  # Set to True if using HTTPS
		samesite='Lax'  # Adjust according to your requirements
	)
	response.set_cookie(
		key='access',
		value=str(refresh.access_token),
		httponly=True,
		expires=timezone.now() + access_token.lifetime,
		secure=True,
		samesite='Lax'
	)
	return response