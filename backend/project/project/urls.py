from django.contrib import admin
from django.urls import path, include
# from rest_framework_simplejwt import views as jwt_views

import os
from user import urls

urlpatterns = [
	path(os.getenv('LOCATION_BACKEND')+'/'+os.getenv('LOCATION_USER_APP')+'/', include('user.urls')),
	path(os.getenv('LOCATION_BACKEND')+'/admin/', admin.site.urls),
	# path('api/token/', jwt_views.TokenObtainPairView.as_view()),
	# path('api/token/refresh/', jwt_views.TokenRefreshView.as_view()),
]
