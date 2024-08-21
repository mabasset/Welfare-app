from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from user.models import User, Worksite


class SignupTestCase(TestCase):
	def setUp(self):
		self.worksite = Worksite.objects.create(department='Test department', address='Test address')
		self.setup_data = {
			'name': 'Test',
			'surname': 'User',
			'birthday': '1990-01-01',
			'worksite': self.worksite.id,
			'street': '123 Test St',
			'postal_code': '12345',
			'city': 'Test City',
			'country': 'Test Country'
		}
		self.client = APIClient()
		self.signup_url = reverse('signup')

	def test_signup_success(self):
		credentials_data = {
			'email': 'testuser@email.com',
			'password': 'Testpassword1!',
			**self.setup_data
		}
		response = self.client.post(self.signup_url, credentials_data, format='json')
		
		self.assertEqual(response.status_code, status.HTTP_201_CREATED)
		self.assertEqual(response.data, {'message': 'User registered successfully'})

		# Check that the cookies are set correctly
		access_token_cookie = response.cookies.get('access_token')
		refresh_token_cookie = response.cookies.get('refresh_token')

		self.assertIsNotNone(access_token_cookie)
		self.assertIsNotNone(refresh_token_cookie)
		self.assertGreater(int(access_token_cookie['max-age']), 0)
		self.assertGreater(int(refresh_token_cookie['max-age']), 0)
		self.assertTrue(User.objects.filter(email='testuser@email.com').exists())

	def test_signup_email_already_in_use(self):
		User.objects.create_user(
			email='existinguser@email.com',
			password='Existingpassword1!',
			name=self.setup_data['name'],
			surname=self.setup_data['surname'],
			birthday=self.setup_data['birthday'],
			worksite=self.worksite,
			street=self.setup_data['street'],
			postal_code=self.setup_data['postal_code'],
			city=self.setup_data['city'],
			country=self.setup_data['country']
		)
		duplicate_email_data = {
			'email': 'existinguser@email.com',
			'password': 'Anotherpassword1!',
			**self.setup_data
		}
		response = self.client.post(self.signup_url, duplicate_email_data, format='json')
		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

	def test_signup_invalid_password(self):
		invalid_password_data = {
			'email': 'newuser@email.com',
			'password': 'short',  # Intentionally invalid password
			**self.setup_data
		}
		response = self.client.post(self.signup_url, invalid_password_data, format='json')
		
		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
		# self.assertIn('error', response.data)