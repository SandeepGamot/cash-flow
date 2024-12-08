#!/bin/bash

CLIENT_NETWORK_NAME="cashflow-client"
CLIENT_SUBNET="10.7.0.0/28" # max 2^4 hosts less default gateway, update CIDR as per your needs

docker network inspect $CLIENT_NETWORK_NAME > /dev/null 2>&1 || docker network create --subnet=$CLIENT_SUBNET $CLIENT_NETWORK_NAME

SERVER_NETWORK_NAME="cashflow-server"

docker network inspect $SERVER_NETWORK_NAME > /dev/null 2>&1 || docker network create $SERVER_NETWORK_NAME

docker compose up