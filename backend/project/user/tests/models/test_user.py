import os
from django.test import TestCase
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from django.utils import timezone
from unittest import mock

from ...models import User, Worksite

class UserModelTest(TestCase):
	# unittest.mock module is used to temporarily modify the os.environ dictionary during the execution of a test
	@mock.patch.dict(os.environ, {
		'EMAIL_MAX_LENGTH': '255',
		'NAME_MAX_LENGTH': '50',
		'NAME_MIN_LENGTH': '2',
		'NAME_PATTERN': '^(?!\s*$)[A-Za-zÀ-ÖØ-öø-ÿ\'\s]+$',
		'SURNAME_MAX_LENGTH': '50',
		'SURNAME_MIN_LENGTH': '2',
		'SURNAME_PATTERN': '^(?!\s*$)[A-Za-zÀ-ÖØ-öø-ÿ\'\s]+$',
		'STREET_MAX_LENGTH': '100',
		'STREET_PATTERN': '^(?!\s*$)[0-9A-Za-zÀ-ÖØ-öø-ÿ\'\s]+$',
		'CITY_MAX_LENGTH': '50',
		'CITY_PATTERN': '^(?!\s*$)[A-Za-zÀ-ÖØ-öø-ÿ\'\s]+$',
		'COUNTRY_MAX_LENGTH': '50',
		'COUNTRY_PATTERN': '^(?!\s*$)[A-Za-zÀ-ÖØ-öø-ÿ\'\s]+$',
		'POSTAL_CODE_MAX_LENGTH': '10',
		'BIRTHDAY_MAX_OFFSET': '0',
		'BIRTHDAY_MIN_OFFSET': '150'
	})

	def setUp(self):
		self.worksite = Worksite.objects.create(department='Mock Worksite')

		self.valid_user_data = {
			'email': 'test@example.com',
			'name': 'Dave',
			'surname': 'Mckean',
			'birthday': timezone.now().date() - timezone.timedelta(days=365*25),
			'interest': 'sport',
			'marital_status': 'single',
			'childrens': True,
			'elderly_parents': False,
			'worksite': self.worksite,
			'street': '123 Main St',
			'postal_code': '12345',
			'city': 'Sample City',
			'country': 'Sample Country',
			'physical': True,
			'economic': False,
			'psychological': True,
			'family': False,
			'is_active': True,
			'is_staff': False,
			'is_superuser': False,
			'password': 'Password123!'
		}

	def test_user_creation_with_valid_data(self):
		user = User(**self.valid_user_data)
		validate_password(self.valid_user_data['password'])
		user.set_password(self.valid_user_data['password'])
		user.full_clean()
		user.save()
		self.assertEqual(User.objects.count(), 1)
		self.assertEqual(str(user), user.email)
		self.assertTrue(user.check_password(self.valid_user_data['password']))

	def test_user_creation_with_invalid_name(self):
		invalid_user_data = self.valid_user_data.copy()
		invalid_user_data['name'] = '33' # Invalid characters

		user = User(**invalid_user_data)
		with self.assertRaises(ValidationError):
			user.full_clean()  # Should raise a ValidationError

	def test_user_creation_with_invalid_surname(self):
		invalid_user_data = self.valid_user_data.copy()
		invalid_user_data['surname'] = 'D'  # Too short

		user = User(**invalid_user_data)
		with self.assertRaises(ValidationError):
			user.full_clean()  # Should raise a ValidationError

	def test_user_creation_with_invalid_birthday(self):
		invalid_user_data = self.valid_user_data.copy()
		invalid_user_data['birthday'] = timezone.now().date()  # Newborn, should fail

		user = User(**invalid_user_data)
		with self.assertRaises(ValidationError):
			user.full_clean()  # Should raise a ValidationError

	def test_user_creation_with_invalid_email(self):
		invalid_user_data = self.valid_user_data.copy()
		invalid_user_data['email'] = 'invalid-email'  # Invalid email format

		user = User(**invalid_user_data)
		with self.assertRaises(ValidationError):
			user.full_clean()  # Should raise a ValidationError

	def test_user_creation_with_invalid_street(self):
		invalid_user_data = self.valid_user_data.copy()
		invalid_user_data['street'] = '!!! Invalid Street'  # Invalid characters

		user = User(**invalid_user_data)
		with self.assertRaises(ValidationError):
			user.full_clean()  # Should raise a ValidationError

	def test_user_creation_with_valid_birthday(self):
		valid_user_data = self.valid_user_data.copy()
		valid_user_data['birthday'] = timezone.now().date() - timezone.timedelta(days=365*25)  # 25 years old

		user = User(**valid_user_data)
		user.full_clean()  # Should not raise any validation errors

	def test_user_creation_with_invalid_city(self):
		invalid_user_data = self.valid_user_data.copy()
		invalid_user_data['city'] = 'C1ty#123'  # Invalid characters

		user = User(**invalid_user_data)
		with self.assertRaises(ValidationError):
			user.full_clean()  # Should raise a ValidationError

	def test_user_creation_with_invalid_country(self):
		invalid_user_data = self.valid_user_data.copy()
		invalid_user_data['country'] = 'Country123#'  # Invalid characters

		user = User(**invalid_user_data)
		with self.assertRaises(ValidationError):
			user.full_clean()