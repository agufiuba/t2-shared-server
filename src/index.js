var express = require("express");
var cors = require("cors");
var pg = require("./pg");
var tokens = require("./tokens");
var costos = require("./costos");
var pagos = require("./pagos");
var router = require("express-promise-router")();
var app = express();

router.get("/hw", function(req, res) {
  res.send("Hello World!");
});

router.get("/login", function(req, res) {
  token = tokens.add();
  res.set("Authorization", token.token);
  res.send({ id: token.id });
});

router.get("/logged", function(req, res) {
  tokens.getAll();
  res.send();
});

router.delete("/logged/:id", function(req, res) {
  if (tokens.exists(req.params["id"])) tokens.remove(req.params["id"]);
  else res.status(404);
  res.send();
});

router.get("/logged/:id", function(req, res) {
  if (!tokens.exists(req.params["id"])) res.status(401);
  res.send();
});

router.post("/users", async function(req, res) {
  var usuario = {
    name: req.query.name,
    last_name: req.query.last_name,
    mail: req.query.mail,
    type: req.query.type
  };

  await pg.createUser(usuario);
  res.status(201);
  res.send();
});

router.get("/users", async function(req, res) {
  const { rows } = await pg.getUsers();
  res.send(rows);
});

router.get("/users/:id", async function(req, res) {
  const { rows } = await pg.getUser(req.params.id);
  if (rows.length == 0) {
    res.status(404);
    res.send();
  } else {
    res.send(rows[0]);
  }
});

router.put("/users/:id", async function(req, res) {
  const { rows } = await pg.getUser(req.params.id);
  if (rows.length == 0) {
    res.status(404);
    res.send();
  } else {
    var usuario = {
      id: req.params.id,
      name: req.query.name,
      last_name: req.query.last_name,
      mail: req.query.mail,
      type: req.query.type
    };
    await pg.updateUser(usuario);
    res.send();
  }
});

router.delete("/users/:id", async function(req, res) {
  const { rows } = await pg.getUser(req.params.id);
  if (rows.length == 0) {
    res.status(404);
    res.send();
  } else {
    await pg.removeUser(req.params.id);
    res.send();
  }
});

router.post("/trips/:p/:c/:d", async function(req, res) {
  var found = true;
  var err = {};
  const pasajero = await pg.getUser(req.params.p);
  if (pasajero.rows.length == 0) {
    found = false;
    err.pasajero = 404;
    res.status(404);
  }
  const conductor = await pg.getConductor(req.params.c);
  if (conductor.rows.length == 0) {
    found = false;
    err.conductor = 404;
    res.status(404);
  }
  if (!found) {
    res.send(err);
  } else {
    // await pg.createTrip(req.params.p, req.params.c, req.params.d);
    const saldoP = await pg.getSaldo(req.params.p);
    const costoP = await costos.pasajero(req.params.p, req.params.d);
    if (saldoP.rows[0].saldo < 0 || costoP > saldoP.rows[0].saldo) {
      res.status(409);
      res.send();
    } else {
      const saldoC = await pg.getSaldo(req.params.c);
      const costoC = await costos.conductor(req.params.c, req.params.d);
      await pg.updateSaldo(
        req.params.p,
        parseFloat(saldoP.rows[0].saldo) - parseFloat(costoP)
      );
      await pg.updateSaldo(
        req.params.c,
        parseFloat(saldoC.rows[0].saldo) + parseFloat(costoC)
      );
      var date = new Date();
      var trip = {
        p: req.params.p,
        c: req.params.c,
        d: req.params.d,
        costo: costoP,
        ganancia: costoC,
        dia: date.getUTCDate() + "/" + (date.getUTCMonth() + 1) + "/" + date.getUTCFullYear(),
        hora: date.getTime()
      };
      await pg.createTrip(trip);
      res.status(201);
      res.send();
    }
  }
});

router.get("/trips/:id", async function(req, res) {
  const user = await pg.getUser(req.params.id);
  if (user.rows.length == 0) {
    res.status(404);
    res.send();
  } else {
    const trips = await pg.getTrips(req.params.id, user.rows[0].type);
    res.send(trips.rows);
  }
});

router.get("/costos/:p/:d", async function(req, res) {
  const pasajero = await pg.getUser(req.params.p);
  if (pasajero.rows.length == 0) {
    res.status(404);
    res.send();
  } else {
    const costoP = await costos.pasajero(req.params.p, req.params.d);
    res.send({costo: costoP});
  }
});

router.get("/paymethod", async function(req, res) {
  const metodos = await pageXOffset.getPaymethods();
  res.send(metodos);
});

app.use(cors());
app.use(router);
app.listen(process.env.PORT, function() {});
