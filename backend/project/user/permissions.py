import os
from rest_framework.permissions import BasePermission

class RequestSourcePermission(BasePermission):
	def has_permission(self, request, view):
		request_source = request.headers.get('X-Request-Source', None)
		if request_source == os.getenv('XREQUESTSOURCE_HEADER_VALUE'):
			return True
		else:
			return request.auth is not None  # Check if request has valid OAuth token