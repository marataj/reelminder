FROM python:3.10-alpine

WORKDIR /app

RUN pip install --upgrade pip

COPY . .

RUN pip install -r requirements.txt

ENTRYPOINT [ "sh", "./entrypoint.sh" ]
