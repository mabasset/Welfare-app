import os
from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from rest_framework.validators import UniqueValidator
from django.core.exceptions import ValidationError
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

class LoginSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ("email", "password")

	def validate(self, data):
		email = data.get('email')
		password = data.get('password')
		user = authenticate(email=email, password=password)
		if user is None:
			raise serializers.ValidationError("Invalid email or password")
		data['user'] = user
		return data

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
		read_only_fields = ['date_joined', 'is_active', 'is_staff', 'is_superuser']

	def validate(self, attrs):
		# Birthday validation
		birthday = attrs.get('birthday')
		now = timezone.now().date()
		age = now.year - birthday.year - ((now.month, now.day) < (birthday.month, birthday.day))
		if age < int(os.getenv('BIRTHDAY_MAX_OFFSET')) or age > int(os.getenv('BIRTHDAY_MIN_OFFSET')):
			raise serializers.ValidationError({'error': [f"Birthday must be between {os.getenv('BIRTHDAY_MAX_OFFSET')} and {os.getenv('BIRTHDAY_MIN_OFFSET')} years old."]})
		# Password validation
		password = attrs.get('password')
		try:
			validate_password(password)
		except ValidationError as e:
			raise serializers.ValidationError({'error': e.messages})
		return attrs

	def create(self, validated_data):
		password = validated_data.pop('password', None)
		user = User(**validated_data)
		if password:
			user.set_password(password)
		user.save()
		return user

	def update(self, instance, validated_data):
		password = validated_data.pop('password', None)
		for attr, value in validated_data.items():
			setattr(instance, attr, value)
		if password:
			instance.set_password(password)
		instance.save()
		return instance

class ForgotPasswordSerializer(serializers.Serializer):
	email = serializers.EmailField(required=True)

	def validate_email(self, value):
		try:
			user = User.objects.get(email=value)
		except User.DoesNotExist:
			raise serializers.ValidationError("User with this email does not exist.")
		return value