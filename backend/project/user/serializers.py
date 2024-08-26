import os
from collections import OrderedDict
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from rest_framework.exceptions import AuthenticationFailed
from django.core.exceptions import ValidationError
from rest_framework import serializers
from django.utils import timezone

from .models import User, Worksite


class WorksiteDataSerializer(serializers.ModelSerializer):
	class Meta:
		model = Worksite
		fields = ['department', 'address']

class UserSerializer(serializers.ModelSerializer):
	worksite = serializers.CharField(source='worksite.__str__', read_only=True)

	class Meta:
		model = User
		fields = [
			'email', 'name', 'surname', 'birthday',
			'interest', 'marital_status', 'childrens', 'elderly_parents',
			'worksite', 'street', 'postal_code', 'city', 'country',
			'physical', 'economic', 'psychological', 'family',
			'date_joined', 'is_active', 'is_staff', 'is_superuser'
		]
		read_only_fields = ['date_joined', 'is_active', 'is_staff', 'is_superuser']

		def to_representation(self, instance):
			representation = super().to_representation(instance)
			camel_case_representation = OrderedDict()

			for key, value in representation.items():
				camel_case_key = ''.join([
					word.capitalize() if index > 0 else word
					for index, word in enumerate(key.split('_'))
				])
				camel_case_representation[camel_case_key] = value
			return camel_case_representation

class SignupSerializer(serializers.ModelSerializer):
	email = serializers.EmailField(
		required=True,
		validators=[UniqueValidator(queryset=User.objects.all())]
	)
	password = serializers.CharField(write_only=True, required=True, validators=[validate_password])

	class Meta:
		model = User
		fields = [
			'email', 'password', 'name', 'surname', 'birthday',
			'interest', 'marital_status', 'childrens', 'elderly_parents',
			'worksite', 'street', 'postal_code', 'city', 'country',
			'physical', 'economic', 'psychological', 'family',
			'date_joined', 'is_active', 'is_staff', 'is_superuser'
		]

	def validate(self, data):
		return super().validate(data)

class LoginSerializer(serializers.Serializer):
	email = serializers.EmailField()
	password = serializers.CharField(write_only=True)

	def validate(self, data):
		email = data.get('email')
		password = data.get('password')
		try:
			user = User.objects.get(email=email)
			if not password == user.password:
				raise serializers.ValidationError("Password provided is invalid.")
			else:
				validate_password(password)
		except User.DoesNotExist:
			raise serializers.ValidationError("User with this email does not exist.")
		data['user'] = user
		return data

class ForgotPasswordSerializer(serializers.Serializer):
	email = serializers.EmailField(required=True)

	def validate_email(self, value):
		try:
			user = User.objects.get(email=value)
		except User.DoesNotExist:
			raise serializers.ValidationError("User with this email does not exist.")
		return value