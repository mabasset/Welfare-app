from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# by adding permissionMixin we hook the user to the django's permission framework 


class Worksite(models.Model):
	address = models.TextField(blank=True)
	department = models.CharField(max_length=70, null=True, blank=True)

	def __str__(self):
		return self.address

class Interest(models.Model):
	category = models.CharField(max_length=20)

	def __str__(self):
		return self.category

class UserManager(BaseUserManager):
	
	def create_user(self, email, password, **other_fields):
		if not email:
			raise ValueError('The Email field must be set')
		email = self.normalize_email(email)
		user = self.model(email=email, **other_fields)
		user.set_password(password)
		user.save()
		return user

	def create_superuser(self, email, password, **other_fields):
		other_fields.setdefault('is_active', True)
		other_fields.setdefault('is_staff', True)
		other_fields.setdefault('is_superuser', True)

		if other_fields.get('is_staff') is not True:
			raise ValueError('Superuser must have is_staff=True.')
		if other_fields.get('is_superuser') is not True:
			raise ValueError('Superuser must have is_superuser=True.')
		
		return self.create_user(email, password, **other_fields)

class User(AbstractBaseUser, PermissionsMixin):

	is_married_CHOICES = [
        ('celibate', 'Celibate'),
        ('nubile', 'Nubile'),
    ]
	email = models.EmailField(unique=True)
	name = models.CharField(max_length=30)
	surname = models.CharField(max_length=30)
	birthday = models.DateField(null=True, blank=True)
	is_married = models.CharField(max_length=10, choices=is_married_CHOICES, null=True)
	childs = models.BooleanField(default=False)
	elderly_parents = models.BooleanField(default=False)
	residence = models.TextField(blank=True)
	domicile = models.TextField(blank=True)
	worksite = models.ForeignKey(Worksite, on_delete=models.CASCADE, null=True, blank=True)
	interests = models.ManyToManyField(Interest, blank=True)
	date_joined = models.DateTimeField(auto_now_add=True)
	is_active = models.BooleanField(default=False)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)

	objects = UserManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = []
	
	# objects’ representations
	def __str__(self):
		return self.email