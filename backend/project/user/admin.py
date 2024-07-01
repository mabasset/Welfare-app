from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class AdminConfig(UserAdmin):
	list_display = ('email', 'first_name', 'last_name', 'age', 'childrens', 'elderly_parents', 'is_staff')
	list_filter = ('is_staff', 'is_superuser', 'is_active')
	fieldsets = (
		(None, {'fields': ('email', 'password')}),
		('Personal info', {'fields': ('first_name', 'last_name', 'age', 'childrens', 'elderly_parents')}),
		('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
		('Important dates', {'fields': ('last_login',)}),
	)
	search_fields = ('email', 'first_name', 'last_name')
	ordering = ('email',)
	filter_horizontal = ()
	add_fieldsets = (
		(None, {
			'classes': ('wide',),
			'fields': ('email', 'first_name', 'last_name', 'password1', 'password2',
						'age', 'childrens', 'elderly_parents'),
		}),
	)

admin.site.register(User, AdminConfig)
