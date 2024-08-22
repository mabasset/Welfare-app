Project for the 2024 Leonardo S.p.A. challenge as a 42RomaLuiss student.
The purpose of the challenge was to create a Single Page Application from scratch for their corporate welfare.

The application is fully configured within multiple Docker containers. With the docker compose up --build command, the database, the backend and the frontend services are created and they start communicating across network connections.
The database container runs on the official postgres:15 postreSQL image.
The backend through Dockerfile creates a container with debian:bullseye-slim image and in there it install everything for sustaining a Django project.
Inside the frontend container, the code is pure typescript and it is served through Nginx, which is behaving as a proxy server for Django. That means that every request from the browser is intercepted first by Nginx which will understand
where to further direct the request based on the location; for /django/ it redirects it to the backend, for /static/ it serves everything static - including Django's from python3 manage.py collectstatic command -
and for every other request location it will serve index.html.

Inside index.html we link the "bundle.js" file, created through Webpack by transpiling the typescript code. So in here we can find all the frontend logic, starting with the index.ts:
By listening for the DOMContentLoated and the popstate events,a Router object is created with many locations. When starting the Router, a function associated to the location.pathname is called for generating a specific markup to inject inside the index.html.
with this mechanism we achive the Spa behaviour.

