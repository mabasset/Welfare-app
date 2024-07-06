#!/bin/bash

# Run npm watch and nginx
sh -c "
	npm run build &
	nginx -g 'daemon off;'
"

exec "$@"