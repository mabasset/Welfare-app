from django.urls import path
from .views import check_session

urlpatterns = [
    path('is_authenticated/', check_session, name='check_session'),
]