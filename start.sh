#!/bin/bash

NETWORK_NAME="cashflow"
SUBNET="10.7.0.0/28" # max 2^4 hosts less default gateway, update CIDR as per your needs

docker network inspect $NETWORK_NAME > /dev/null 2>&1 || docker network create --subnet=$SUBNET $NETWORK_NAME

docker compose up --build
