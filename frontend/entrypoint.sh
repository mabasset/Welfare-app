#!/bin/bash

mkdir -p /mnt/django/staticfiles/
cp -r /mnt/django/staticfiles/* /home/app/staticfiles/

exec "$@"