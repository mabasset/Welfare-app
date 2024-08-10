#!/bin/bash

envsubst '${FRONTEND_PORT} ${BACKEND_PORT} ${LOCATION_BACKEND}' < /etc/nginx/nginx.conf.template > /etc/nginx/nginx.conf

nginx &
npm run build