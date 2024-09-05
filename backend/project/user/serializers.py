from rest_framework import serializers
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password
from user.models import Worksite, User


class WorksiteSerializer(serializers.ModelSerializer):
	class Meta:
		model = Worksite
		fields = ['department', 'address']


class UserSerializer(serializers.ModelSerializer):
	worksite = serializers.PrimaryKeyRelatedField(queryset=Worksite.objects.all())
	password = serializers.CharField(write_only=True, required=True)

	class Meta:
		model = User
		fields = [
			'email', 'password' , 'name', 'surname', 'birthday',
			'interest', 'marital_status', 'childrens', 'elderly_parents',
			'worksite', 'street', 'postal_code', 'city', 'country',
			'physical', 'economic', 'psychological', 'family',
			'date_joined', 'is_active', 'is_staff', 'is_superuser'
		]
		read_only_fields = ['date_joined', 'is_active', 'is_staff', 'is_superuser']

	def validate(self, data):
		try:
			validate_password(data.get('password'))
		except ValidationError as e:
			raise serializers.ValidationError({'password': e.messages})
		return data

	def create(self, validated_data):
		email = validated_data.pop('email', None)
		password = validated_data.pop('password', None)
	
		user = User.objects.create_user(email, password, **validated_data)
		return user