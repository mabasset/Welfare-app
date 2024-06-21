#!/bin/bash

cp -r /mnt/django/staticfiles/* /home/app/staticfiles/

exec "$@"