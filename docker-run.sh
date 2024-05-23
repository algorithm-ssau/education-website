#!/bin/bash
if [ "$1" == "dev" ]
then
    docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build --watch
elif [ "$1" == "prod" ]
then
    docker-compose -f docker-compose.yml -f docker-compose.prod.yml up --build
else
    echo "Invalid argument. Please enter 'dev' or 'prod'."
fi