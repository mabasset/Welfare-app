from django.http import JsonResponse


def get_data(request):
	if request.user.is_authenticated:
		user = request.user
		user_data = {
			"email": user.email,
			"first_name": user.first_name,
			"last_name": user.last_name,
		}
		return JsonResponse({'user_data': user_data, 'is_authenticated': True})
	else:
		return JsonResponse({'is_authenticated': False})