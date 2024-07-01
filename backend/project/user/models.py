from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# by adding permissionMixin we hook the user to the django's permission framework 

class UserManager(BaseUserManager):
	
	def create_user(self, email, password, first_name, last_name, **other_fields):
		if not email:
			raise ValueError('The Email field must be set')
		email = self.normalize_email(email)
		user = self.model(
			email=email,
			first_name=first_name,
			last_name=last_name,
			**other_fields)
		user.set_password(password)
		user.save()
		return user

	def create_superuser(self, email, password, first_name, last_name, **other_fields):
		other_fields.setdefault('is_staff', True)
		other_fields.setdefault('is_superuser', True)

		if other_fields.get('is_staff') is not True:
			raise ValueError('Superuser must have is_staff=True.')
		if other_fields.get('is_superuser') is not True:
			raise ValueError('Superuser must have is_superuser=True.')
		
		return self.create_user(email, password, first_name, last_name, **other_fields)

class User(AbstractBaseUser, PermissionsMixin):
	email = models.EmailField(unique=True)
	first_name = models.CharField(max_length=40, blank=False)
	last_name = models.CharField(max_length=40, blank=False)
	age = models.PositiveIntegerField(blank=True, null=True)
	childrens = models.BooleanField(default=False)
	elderly_parents = models.BooleanField(default=False)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)
	date_joined = models.DateTimeField(auto_now_add=True)

	object = UserManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['first_name', 'last_name']
	
	def __str__(self):
		return self.email