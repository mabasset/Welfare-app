from django.urls import path
from .views import check_session

urlpatterns = [
    path('is-active/', check_session, name='check_session'),
]