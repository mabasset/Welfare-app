import os
from django.urls import path
from user import views

urlpatterns = [
	path('worksites/', views.ListCreateWorksite.as_view()),
	path('worksites/<int:pk>/', views.RetrieveUpdateDestroyWorksite.as_view()),
	path('users/', views.ListUser.as_view()),
	path('users/<email>/', views.RetrieveUpdateDestroyUser.as_view()),
	path('signup/', views.CreateUser.as_view()),
	path('login/', views.LoginUser.as_view()),
	path('get_data/', views.get_data),
]
