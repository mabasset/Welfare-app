from django.http import JsonResponse


def get_data(request):
	if request.user.is_authentificated and request.session.exists(request.session.session_key):
		user = request.user
		user_data = {
			"email": user.email,
			"first_name": user.first_name,
			"last_name": user.last_name,
		}
		return JsonResponse({'user_data': user_data, 'is_authentificated': True})
	else:
		return JsonResponse({'is_authentificated': False})