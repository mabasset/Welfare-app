from django.http import JsonResponse


def get_data(request):
	if request.user.is_authenticated:
		user = request.user
		user_data = {
			"email": user.email,
			"name": user.name,
			"surname": user.surname,
		}
		return JsonResponse({'user_data': user_data, 'is_authenticated': True})
	else:
		return JsonResponse({'is_authenticated': False})

# def signup(request):
# def login(request):