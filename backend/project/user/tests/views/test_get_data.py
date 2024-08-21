from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from user.models import User, Worksite


class GetDataTestCase(TestCase):
	def setUp(self):
		self.worksite = Worksite.objects.create(department='Test department', address='Test address')
		self.user = User.objects.create_user(
			email='testuser@email.com',
			password='Testpassword1!',
			name='Test',
			surname='User',
			birthday='1990-01-01',
			worksite=self.worksite,
			street='123 Test St',
			postal_code='12345',
			city='Test City',
			country='Test Country'
		)
		self.client = APIClient()

	# Test case for when the user is authenticated
	def test_get_data_if_authenticated(self):
		# Authenticate the user
		self.client.force_authenticate(user=self.user)

		# Make the request to the get_data endpoint and check the response
		response = self.client.get(reverse('get_data'))
		self.assertEqual(response.status_code, status.HTTP_200_OK)

		# Check the structure of the returned data
		self.assertEqual(response.data['is_authenticated'], True)
		self.assertEqual(response.data['email'], self.user.email)
		self.assertEqual(response.data['name'], self.user.name)
		self.assertEqual(response.data['surname'], self.user.surname)
		self.assertEqual(response.data['worksite'], str(self.worksite))
		self.assertEqual(response.data['street'], self.user.street)
		self.assertEqual(response.data['postal_code'], self.user.postal_code)
		self.assertEqual(response.data['city'], self.user.city)
		self.assertEqual(response.data['country'], self.user.country)

	# Test case for when the user is unauthenticated
	def test_get_data_if_unauthenticated(self):
		response = self.client.get(reverse('get_data'))
		self.assertEqual(response.data['is_authenticated'], False)