from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# by adding permissionMixin we hook the user to the django's permission framework 


class Worksite(models.Model):
	department = models.CharField(max_length=300, null=True, blank=True)
	address = models.TextField(null=True, blank=True)

	def __str__(self):
		return f"{self.department} - {self.address}" if self.department else self.address

class UserManager(BaseUserManager):
	def create_user(self, email, password=None, **other_fields):
		if not email:
			raise ValueError('The Email field must be set')
		if not password:
			raise ValueError('A Password must be set')

		worksite = other_fields.pop('worksite', None)
		if worksite is not None:
			if isinstance(worksite, str) and worksite.isdigit():
				worksite = int(worksite)
			if isinstance(worksite, int):
				try:
					worksite = Worksite.objects.get(id=worksite)
				except Worksite.DoesNotExist:
					raise ValueError(f"Worksite with id {worksite} does not exist.")
			elif not isinstance(worksite, Worksite):
				raise ValueError("Worksite must be a Worksite instance or a valid integer ID.")

		email = self.normalize_email(email)
		user = self.model(email=email, worksite=worksite, **other_fields)
		user.set_password(password)
		user.save(using=self._db)
		return user

	def create_superuser(self, email, password=None, **other_fields):
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
	name = models.CharField(max_length=50, null=False, blank=False)
	surname = models.CharField(max_length=50, null=False, blank=False)
	birthday = models.DateField(null=False, blank=False)
	interest = models.CharField(max_length=40, choices=interest_CHOICES, null=True, blank=True)
	marital_status = models.CharField(max_length=40, choices=marital_status_CHOICES, null=True, blank=True)
	childrens = models.BooleanField(null=True, blank=True)
	elderly_parents = models.BooleanField(null=True, blank=True)
	worksite = models.ForeignKey(Worksite, on_delete=models.CASCADE, null=False, blank=False)
	street = models.CharField(max_length=200, null=False, blank=False)
	postal_code = models.CharField(max_length=10, null=False, blank=False)
	city = models.CharField(max_length=100, null=False, blank=False)
	country = models.CharField(max_length=100, null=False, blank=False)
	physical = models.BooleanField(default=False)
	economic = models.BooleanField(default=False)
	psychological = models.BooleanField(default=False)
	family = models.BooleanField(default=False)
	date_joined = models.DateTimeField(auto_now_add=True)
	is_active = models.BooleanField(default=False)
	is_staff = models.BooleanField(default=False)
	is_superuser = models.BooleanField(default=False)

	objects = UserManager()

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = [
		'name',
		'surname',
		'birthday',
		'worksite',
		'street',
		'postal_code',
		'city',
		'country'
	]
	
	# objects’ representations
	def __str__(self):
		return self.email