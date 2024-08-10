import os
from django.urls import path
from .views import *

urlpatterns = [
    path(os.getenv('ENDPOINT_USER_GET_DATA')+'/', get_data),
    path(os.getenv('ENDPOINT_USER_GET_WORKSITES')+'/', get_worksites),
    path(os.getenv('ENDPOINT_USER_SIGNUP')+'/', signup),
    # path(os.getenv('ENDPOINT_USER_LOGIN'), login, name='login'),
    # path(os.getenv('ENDPOINT_USER_RETRIEVE_PASSWORD'), retrieve_password, name='retrieve_password'),
]