from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class AdminConfig(UserAdmin):
    list_display = ('id', 'email', 'name', 'surname', 'date_joined')
    list_display_links = ('email',)
    list_filter = ('is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Required personal info', {'fields': ('name', 'surname')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')}),
    )
    search_fields = ('id', 'email', 'name', 'surname')
    ordering = ('id',)
    filter_horizontal = ()
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'name', 'surname', 'password1', 'password2'),
        }),
    )

admin.site.register(User, AdminConfig)