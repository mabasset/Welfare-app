#!/bin/bash

mkdir -p /mnt/django/static/
if [ -d "/mnt/django/static/" ] && [ "$(ls -A /mnt/django/static/)" ]; then
    cp -r /mnt/django/static/* /home/app/static/
fi

# Run npm watch and nginx
sh -c "
	npm run build &
	nginx -g 'daemon off;'
"

exec "$@"