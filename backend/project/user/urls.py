from django.urls import path
from .views import *

urlpatterns = [
    path('get_data/', get_data, name='get_data'),
    path('get_worksites/', get_worksites, name='get_worksites'),
    # path('signup/', signup, name='signup'),
#     path('login/', login, name='login'),
]