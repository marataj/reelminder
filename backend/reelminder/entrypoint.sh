#!/bin/sh

python manage.py makemigrations course
python manage.py migrate


# gunicorn reelminder.wsgi:application --bind 0.0.0.0:8000 
python manage.py runserver 0.0.0.0:8000 