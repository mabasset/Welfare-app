#!/bin/sh

python3 manage.py makemigrations --no-input
python3 manage.py migrate --no-input
python3 manage.py loaddata user/fixtures/worksites.json

python3 manage.py collectstatic --no-input

if [ "$DJANGO_SUPERUSER_EMAIL" ]
then
	python3 manage.py initsuperuser
fi

gunicorn project.wsgi:application --bind 0.0.0.0:8000 --reload --log-file - --access-logfile -