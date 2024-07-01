from django.http import JsonResponse

def check_session(request):
    if request.user.is_authenticated:
        return JsonResponse({'is_active': True})
    else:
        return JsonResponse({'is_active': False})