var express = require('express');
//require('./pg');
var tokens = require('./tokens');

var app = express();

app.get('/hw', function (req, res) {
  res.send('Hello World!');
});

app.get('/login', function(req, res) {
  token = tokens.add();
  res.set('Authorization', token.token);
  res.send({id: token.id});
});

app.get('/logged', function(req, res) {
  tokens.getAll();
  res.send();
});

app.delete('/logged/:id', function(req, res) {
  if (tokens.exists(req.params['id']))
    tokens.remove(req.params['id']);
  else
    res.status(404);
  res.send();
});

app.get('/logged/:id', function(req, res) {
  if (!tokens.exists(req.params['id']))
    res.status(401)
  res.send();
});

app.listen(process.env.PORT, function () {
});
