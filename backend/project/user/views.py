from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from .models import User, Worksite

from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError


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

def get_worksites(request):
	worksites = Worksite.objects.all()
	worksites_dict = {worksite.id: str(worksite) for worksite in worksites}
	return JsonResponse(worksites_dict)

@csrf_exempt
def signup(request):
	if request.method != 'POST':
		return JsonResponse({'error': 'Invalid request method'}, status=405)
	email = request.POST.get('email')
	password = request.POST.get('password')
	try:
		validate_password(password)
	except ValidationError as e:
		return JsonResponse({'error': e.messages}, status=400)
	
	if User.objects.filter(email=email).exists():
		return JsonResponse({'error': 'Email already in use'}, status=400)
	user = User.objects.create_user(email=email, password=password)
	return JsonResponse({'message': 'User registered successfully'}, status=201)