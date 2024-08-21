from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class AdminConfig(UserAdmin):
	list_display = ('id', 'email', 'name', 'surname', 'date_joined')
	list_display_links = ('email',)
	list_filter = ('is_staff', 'is_superuser', 'is_active')
	fieldsets = (
		(None, {'fields': ('email', 'password')}),
		('Required Personal info', {'fields': ('name', 'surname', 'birthday')}),
		# ('Other Personal info', {'fields': ('interest', 'childrens', 'elderly_parents')}),
		('Residence', {'fields': ('street', 'postal_code', 'city', 'country')}),
		('Work Location', {'fields': ('worksite',)}),
		('Areas of interest', {'fields': ('physical','economic','psychological','family')}),
		('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
		('Important dates', {'fields': ('last_login',)}),
	)
	search_fields = ('id', 'email', 'name', 'surname')
	ordering = ('id',)
	filter_horizontal = ()
	add_fieldsets = (
		(None, {
			'classes': ('wide',),
			'fields': ('email', 'password1', 'password2'),
		}),
		('Personal Information', {
			'classes': ('wide',),
			'fields': ('name', 'surname', 'birthday', 'interest', 'childrens', 'elderly_parents',
					   'street', 'postal_code', 'city', 'country', 'worksite',
					   'physical', 'economic', 'psychological', 'family')
		}),
		('Permissions', {
			'classes': ('wide',),
			'fields': ('is_active', 'is_staff', 'is_superuser')
		}),
	)

admin.site.register(User, AdminConfig)