import os
from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
from django.core.validators import MinLengthValidator, RegexValidator

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
		(0, 'Sport'),
		(1, 'Reading'),
		(2, 'Relax'),
		(3, 'Prevention'),
		(4, 'Other'),
	]
	marital_status_CHOICES = [
		(0, 'Single'),
		(1, 'Married'),
	]
	email = models.EmailField(max_length=int(os.getenv('EMAIL_MAX_LENGTH')), unique=True)
	name = models.CharField(
		max_length=int(os.getenv('NAME_MAX_LENGTH')),
		validators=[
			MinLengthValidator(int(os.getenv('NAME_MIN_LENGTH'))),
			RegexValidator(
				regex=os.getenv('NAME_PATTERN'),
				message="Enter a valid name. Only letters and spaces are allowed."
			)
		],
		null=False, blank=False
	)
	surname = models.CharField(
		max_length=int(os.getenv('SURNAME_MAX_LENGTH')),
		validators=[
			MinLengthValidator(int(os.getenv('SURNAME_MIN_LENGTH'))),
			RegexValidator(
				regex=os.getenv('SURNAME_PATTERN'),
				message="Enter a valid surname. Only letters and spaces are allowed."
			)
		],
		null=False, blank=False
	)
	birthday = models.DateField(
		null=False, blank=False
	)
	interest = models.IntegerField(choices=interest_CHOICES, null=True, blank=True)
	marital_status = models.IntegerField(choices=marital_status_CHOICES, null=True, blank=True)
	childrens = models.BooleanField(null=True, blank=True)
	elderly_parents = models.BooleanField(null=True, blank=True)
	worksite = models.ForeignKey(Worksite, on_delete=models.CASCADE, null=False, blank=False)
	street = models.CharField(
		max_length=int(os.getenv('STREET_MAX_LENGTH')),
		validators=[
			RegexValidator(
				regex=os.getenv('STREET_PATTERN'),
				message="Enter a valid street address. Only letters, numbers and spaces are allowed."
			)
		],
		null=False, blank=False
	)
	postal_code = models.CharField(
		max_length=int(os.getenv('POSTAL_CODE_MAX_LENGTH')),
		null=False, blank=False
	)
	city = models.CharField(
		max_length=int(os.getenv('CITY_MAX_LENGTH')),
		validators=[
			RegexValidator(
				regex=os.getenv('CITY_PATTERN'),
				message="Enter a valid City. Only letters and spaces are allowed."
			)
		],
		null=False, blank=False
	)
	country = models.CharField(
		max_length=int(os.getenv('COUNTRY_MAX_LENGTH')),
		validators=[
			RegexValidator(
				regex=os.getenv('COUNTRY_PATTERN'),
				message="Enter a valid Country. Only letters and spaces are allowed."
			)
		],
		null=False, blank=False
	)
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

	def clean(self):
		super().clean()
		if self.birthday:
			now = timezone.now().date()
			age = now.year - self.birthday.year - ((now.month, now.day) < (self.birthday.month, self.birthday.day))
			if age < int(os.getenv('BIRTHDAY_MAX_OFFSET')) or age > int(os.getenv('BIRTHDAY_MIN_OFFSET')):
				raise ValidationError(f"Birthday must be between {os.getenv('BIRTHDAY_MAX_OFFSET')} and {os.getenv('BIRTHDAY_MIN_OFFSET')} years old.")

	def save(self, *args, **kwargs):
		self.full_clean()
		super().save(*args, **kwargs)

	# objects’ representations
	def __str__(self):
		return self.email