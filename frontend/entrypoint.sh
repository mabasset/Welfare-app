#!/bin/bash

mkdir -p /mnt/django/static/
cp -r /mnt/django/static/* /home/app/static/

# Run npm watch and nginx
sh -c "
	npm run build &
	nginx -g 'daemon off;'
"

exec "$@"