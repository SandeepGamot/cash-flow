#!/bin/bash

if [[ "$1" == "--prod" ]]; then
  source api/.env
else
  source api/.env.local
fi
docker compose up --watch --build
