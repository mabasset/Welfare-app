import os
from user import urls
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
	path(os.getenv('LOCATION_BACKEND')+'/'+os.getenv('LOCATION_USER_APP')+'/', include('user.urls')),
	path(os.getenv('LOCATION_BACKEND')+'/admin/', admin.site.urls),
]
