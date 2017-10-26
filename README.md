[![Build Status](https://travis-ci.org/agufiuba/t2-shared-server.svg?branch=master)](https://travis-ci.org/agufiuba/t2-shared-server)
[![Coverage Status](https://coveralls.io/repos/github/agufiuba/t2-shared-server/badge.svg?branch=master)](https://coveralls.io/github/agufiuba/t2-shared-server?branch=master)

# t2-shared-server

## Instalación

La aplicación requiere que exista una red de docker llamada "ubernet". Para crearla debe ejecutarse:

-   `docker network create ubernet`

Luego, para construir la aplicación:

-   `docker-compose build`

## Ejecución

Se explicita el puerto al cual se ligará el servidor al levantarlo:

-   `export PORT=<puerto>`

Por ejemplo, si se ejecuta `export PORT=3000` luego se accederá a la API a través de `localhost:3000`. Si la aplicación se usa en simultáneo con el `app-server` deben estar ligados a puertos distintos.

Finalmente, para levantar el servidor:

-   `docker-compose up`
