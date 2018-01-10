#!/usr/bin/env bash
echo script: $1
psql -U evphile -f dev/$1.sql -d evphile -h localhost
