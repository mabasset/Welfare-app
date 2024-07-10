from django.http import JsonResponse


def get_data(request):
	if (not request.user.is_anonymous) and (request.session.exists(request.session.session_key)):
		user = request.user
		print(user)
		user_data = {
			"email": user.email,
			"first_name": user.first_name,
			"last_name": user.last_name,
		}
		return JsonResponse({'user_data': user_data, 'is_anonymous': True})
	else:
		return JsonResponse({'is_anonymous': False})