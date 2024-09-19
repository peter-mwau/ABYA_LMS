# Dockerfile for Django Backend
FROM python:3.12

WORKDIR /app

COPY django_backend/requirements.txt .
RUN pip install -r requirements.txt

COPY django_backend/ .

EXPOSE 8000

# Create a shell script to run migrations and start the server
RUN echo '#!/bin/sh' > /app/start.sh && \
    echo 'python manage.py makemigrations' >> /app/start.sh && \
    echo 'python manage.py migrate' >> /app/start.sh && \
    echo 'python manage.py runserver 0.0.0.0:8000' >> /app/start.sh && \
    chmod +x /app/start.sh

    CMD ["/app/start.sh"]
