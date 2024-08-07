from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# by adding permissionMixin we hook the user to the django's permission framework 


class Worksite(models.Model):
	department = models.CharField(max_length=300, null=True, blank=True)
	address = models.TextField(null=True, blank=True)

	def __str__(self):
		return f"{self.department} - {self.address}" if self.department else self.address

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
	interest_CHOICES = [
        ('sport', 'Sport'),
        ('reading', 'Reading'),
        ('relax', 'Relax'),
        ('prevention', 'Prevention'),
        ('other', 'Other'),
    ]
	marital_status_CHOICES = [
        ('single', 'Single'),
        ('married', 'Married'),
    ]
	email = models.EmailField(max_length=254, unique=True)
	name = models.CharField(max_length=50)
	surname = models.CharField(max_length=50)
	birthday = models.DateField(null=True, blank=True)
	interest = models.CharField(max_length=40, choices=interest_CHOICES, null=True, blank=True)
	marital_status = models.CharField(max_length=40, choices=marital_status_CHOICES, null=True, blank=True)
	childrens = models.BooleanField(null=True, blank=True)
	elderly_parents = models.BooleanField(null=True, blank=True)
	worksite = models.ForeignKey(Worksite, on_delete=models.CASCADE, null=True, blank=True)
	residence = models.TextField(null=True, blank=True)
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