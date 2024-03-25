# Используем официальный образ PostgreSQL как базовый
FROM postgres:latest

# Устанавливаем рабочую директорию в контейнере
WORKDIR /docker-entrypoint-initdb.d

# Копируем скрипт инициализации в контейнер
COPY db_init.sql /docker-entrypoint-initdb.d/