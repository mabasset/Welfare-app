from django.core.exceptions import ValidationError


class MaxLengthValidator:
	def __init__(self, max_length=None):
		if max_length is None:
			raise ValueError("max_length must be set")
		self.max_length = max_length

	def validate(self, password, user=None):
		if len(password) > self.max_length:
			raise ValidationError(
				("This password is too long. It must contain no more than %(max_length)d characters."),
				code='password_too_long',
				params={'max_length': self.max_length},
			)

	def get_help_text(self):
		return (
			"Your password must contain no more than %(max_length)d characters."
		) % {'max_length': self.max_length}