chdir backend
call venv\Scripts\activate.bat
chdir reelminder
call code .
call python manage.py runserver