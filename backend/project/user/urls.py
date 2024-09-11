import os
from django.urls import path
from user import views

urlpatterns = [
	path(os.getenv('ENDPOINT_USER_WORKSITES')+'/', views.ListCreateWorksite.as_view()),
	path(os.getenv('ENDPOINT_USER_WORKSITES')+'/<int:pk>/', views.RetrieveUpdateDestroyWorksite.as_view()),
	path('users/', views.ListUser.as_view()),
	path('users/<email>/', views.RetrieveUpdateDestroyUser.as_view()),
	path(os.getenv('ENDPOINT_USER_SIGNUP')+'/', views.SignupUser.as_view()),
	path(os.getenv('ENDPOINT_USER_LOGIN')+'/', views.LoginUser.as_view()),
	path(os.getenv('ENDPOINT_USER_LOGOUT')+'/', views.LogoutUser.as_view()),
	# path(os.getenv('ENDPOINT_USER_FORGOT_PASSWORD')+'/', views.ForgotPassword.as_view()),
	path(os.getenv('ENDPOINT_USER_GET_DATA')+'/', views.GetData.as_view()),
	path(os.getenv('ENDPOINT_USER_GET_PROTECTED_DATA')+'/', views.GetProtectedData.as_view()),
]
