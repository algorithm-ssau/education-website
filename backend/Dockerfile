FROM python:3.8-alpine
WORKDIR /app
COPY . .
RUN apk update && apk add postgresql-dev gcc python3-dev musl-dev
RUN pip install --no-cache-dir -r requirements.txt
CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]
