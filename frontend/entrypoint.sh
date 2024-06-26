#!/bin/bash

mkdir -p /mnt/django/static/
cp -r /mnt/django/static/* /home/app/static/

exec "$@"