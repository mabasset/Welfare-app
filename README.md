Project for the 2024 Leonardo S.p.A. challenge as a 42RomaLuiss student.
The purpose of the challenge was to create a Single Page Application from scratch for their corporate welfare.

The application is fully configured within multiple Docker containers. With the docker compose up --build command, the database, the backend and the frontend services are created and they start communicating across network connections.
The database container runs on the official postgres:15 postreSQL image.
The backend through Dockerfile creates a container with debian:bullseye-slim image and in there it install everything for sustaining a Django project.
Inside the frontend container, the code is pure typescript and it is served through Nginx, which is behaving as a proxy server for Django. That means that every request from the browser is intercepted first by Nginx which will understand
where to further direct the request based on the location; for /django/ it redirects it to the backend, for /static/ it serves everything static - including Django's from python3 manage.py collectstatic command -
and for every other request location it will serve index.html.

Inside index.html we link the "bundle.js" file, created by Webpack by compiling the typescript code. So in here we can find all the frontend logic, starting with the index.ts.
In here we listen for the DOMContentLoated event and it builds a Router for many locations and then it starts it. The Router then calls a function associated to the given location.pathname, that generates a specific markup to inject inside the index.html.
