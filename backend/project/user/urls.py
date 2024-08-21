import os
from django.urls import path
from .views import *

urlpatterns = [
    path(os.getenv('ENDPOINT_USER_GET_DATA')+'/', get_data, name='get_data'),
    path(os.getenv('ENDPOINT_USER_GET_WORKSITES')+'/', get_worksites, name='get_worksites'),
    path(os.getenv('ENDPOINT_USER_SIGNUP')+'/', signup, name='signup'),
    # path(os.getenv('ENDPOINT_USER_LOGIN'), login, name='login'),
    path(os.getenv('ENDPOINT_USER_FORGOT_PASSWORD')+'/', forgot_password, name='forgot_password'),
]
