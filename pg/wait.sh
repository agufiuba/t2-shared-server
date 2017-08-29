#!/bin/bash
# wait-pg.sh

set -e

cmd="$@"

until psql -h pg -U postgres > /dev/null 2> /dev/null; do
  echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd
