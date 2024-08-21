from django.urls import reverse
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient, APITestCase
from user.models import User, Worksite


class GetWorksiteTestCase(TestCase):
	def setUp(self):
		self.worksiteA = Worksite.objects.create(department="department A", address="address A")
		self.worksiteB = Worksite.objects.create(department="department B", address="address B")
		self.client = APIClient()

	def test_get_worksites(self):
		response = self.client.get(reverse('get_worksites'))
		self.assertEqual(response.status_code, status.HTTP_200_OK)
		expected_data = {
			self.worksiteA.id: str(self.worksiteA),
			self.worksiteB.id: str(self.worksiteB)
		}
		self.assertEqual(response.data, expected_data)