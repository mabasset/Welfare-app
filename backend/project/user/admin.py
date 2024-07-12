from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class AdminConfig(UserAdmin):
    list_display = ('id', 'email', 'first_name', 'last_name', 'date_joined')
    list_display_links = ('email',)
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'date_of_birth', 'marital_status', 'childs', 'elderly_parents')}),
        ('Location info', {'fields': ('residence', 'domicile', 'worksite')}),
		('Interests', {'fields': ('interests',)}),
        ('Important dates', {'fields': ('last_login',)}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    search_fields = ('id', 'email', 'first_name', 'last_name')
    ordering = ('id',)
    filter_horizontal = ()
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'password1', 'password2',
                       'date_of_birth', 'marital_status', 'childs', 'elderly_parents', 'residence', 'domicile'),
        }),
    )

admin.site.register(User, AdminConfig)
# admin.site.register(Worksite)