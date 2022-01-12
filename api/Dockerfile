FROM python:3.8

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app/api
COPY requirements.txt /app/api
RUN pip install -r requirements.txt
COPY . /app/api
