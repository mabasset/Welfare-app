from django.http import JsonResponse
from .models import User, Worksite


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