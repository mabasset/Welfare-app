import os
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken


def create_jwt_tokens(user, response):

	refresh = RefreshToken.for_user(user)
	access_token = str(refresh.access_token)
	refresh_token = str(refresh)

	response.set_cookie('access_token', access_token, httponly=True, secure=True, max_age=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'].total_seconds())
	response.set_cookie('refresh_token', refresh_token, httponly=True, secure=True, max_age=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'].total_seconds())

	return response
