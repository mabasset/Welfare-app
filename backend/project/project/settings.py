import os
from pathlib import Path
from datetime import timedelta


BASE_DIR = Path(__file__).resolve().parent.parent

SECRET_KEY = os.getenv('SECRET_KEY')
DEBUG = os.getenv('DEBUG')

host = os.getenv('HOST')
ALLOWED_HOSTS = host.split(" ")
CSRF_TRUSTED_ORIGINS = [f'https://{host}']


INSTALLED_APPS = [
	'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
	'django_password_validators',
	'rest_framework',
	'rest_framework.authtoken',
	'user',
]


MIDDLEWARE = [
	'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'project.urls'


REST_FRAMEWORK = {
	'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10,
	'DEFAULT_AUTHENTICATION_CLASSES': (
		'rest_framework.authentication.TokenAuthentication',
	),
}

TEMPLATES = [
	{
		'BACKEND': 'django.template.backends.django.DjangoTemplates',
		'DIRS': [],
		'APP_DIRS': True,
		'OPTIONS': {
			'context_processors': [
				'django.template.context_processors.debug',
				'django.template.context_processors.request',
				'django.contrib.auth.context_processors.auth',
				'django.contrib.messages.context_processors.messages',
			],
		},
	},
]


WSGI_APPLICATION = 'project.wsgi.application'


DATABASES = {
	'default': {
		'ENGINE': 'django.db.backends.postgresql',
		'HOST': os.getenv('DATABASE_HOST'),
		'PORT': os.getenv('DATABASE_PORT'),
		'NAME': os.getenv('DATABASE_NAME'),
		'USER': os.getenv('DATABASE_USER'),
		'PASSWORD': os.getenv('DATABASE_PASSWORD'),
	}
}


PASSWORD_HASHERS = [
	'django.contrib.auth.hashers.Argon2PasswordHasher',
	'django.contrib.auth.hashers.BCryptSHA256PasswordHasher',
	'django.contrib.auth.hashers.BCryptPasswordHasher',
	'django.contrib.auth.hashers.PBKDF2PasswordHasher',
	'django.contrib.auth.hashers.PBKDF2SHA1PasswordHasher',
]


AUTH_PASSWORD_VALIDATORS = [
	{
		'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
		'OPTIONS': {
			'min_length': int(os.getenv('PASSWORD_MIN_LENGTH', 8)),
		}
	},
	{
		'NAME': 'user.validators.MaxLengthValidator',
		'OPTIONS': {
			'max_length': int(os.getenv('PASSWORD_MAX_LENGTH', 128)),
		}
	},
	{
		'NAME': 'django_password_validators.password_character_requirements.password_validation.PasswordCharacterValidator',
		'OPTIONS': {
			'min_length_lower': int(os.getenv('PASSWORD_MIN_AMOUNT_LOWER', 1)),
			'min_length_upper': int(os.getenv('PASSWORD_MIN_AMOUNT_UPPER', 1)),
			'min_length_digit': int(os.getenv('PASSWORD_MIN_AMOUNT_DIGIT', 1)),
			'min_length_special': int(os.getenv('PASSWORD_MIN_AMOUNT_SPECIAL', 1)),
			'special_characters': os.getenv('PASSWORD_SPECIAL_CHARACTERS', '_*-+!?,.;:')
		 }
	},
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

# enables internationalization features. This means Django is prepared to handle applications that need to support multiple languages and locales
# USE_I18N = True
USE_I18N = False

# Django will display numbers and dates using the format of the current locale
USE_L10N = True

# Django will use timezone-aware datetimes internally
USE_TZ = True

[
    '%Y-%m-%d', '%m/%d/%Y', '%m/%d/%y', # '2006-10-25', '10/25/2006', '10/25/06'
    '%b %d %Y', '%b %d, %Y',            # 'Oct 25 2006', 'Oct 25, 2006'
    '%d %b %Y', '%d %b, %Y',            # '25 Oct 2006', '25 Oct, 2006'
    '%B %d %Y', '%B %d, %Y',            # 'October 25 2006', 'October 25, 2006'
    '%d %B %Y', '%d %B, %Y',            # '25 October 2006', '25 October, 2006'
]


STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR.parent / 'static'

AUTH_USER_MODEL = 'user.User'

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'