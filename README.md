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


## Servicios

### Login

`GET /login : { id: token.id }` Inicia sesion de un app-server.

`DELETE /logged/:id : { id: token.id }` Cierra sesion de un app-server.

### Usuarios

`GET /users/:id` Devuelve informacion del usuario.

`GET /cars/:usuario` Devuelve la informacion del auto perteneciente al usuario.

### Viajes

`POST /trips/:pasajero/:chofer/:distancia` Crea un viaje. Realiza el pago correspondiente.

`GET /trips/:id` Devuelve informacion del viaje.

`GET /costos/:pasajero/:distancia` Estima el costo de un viaje.

### Pagos

`GET /paymethod` Devuelve los metodos de pago disponibles.
