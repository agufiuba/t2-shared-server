var express = require("express");
var cors = require("cors");
var pg = require("./pg");
var tokens = require("./tokens");
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
    nombre: req.query.name,
    apellido: req.query.last_name,
    correo: req.query.mail,
    tipo: req.query.type
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
  if (isNaN(req.params.id)) var func = pg.getUserByMail;
  else var func = pg.getUserById;
  const { rows } = await func(req.params.id);
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
      nombre: req.query.name,
      apellido: req.query.last_name,
      correo: req.query.mail,
      tipo: req.query.type
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

app.use(cors());
app.use(router);
app.listen(process.env.PORT, function() {});
