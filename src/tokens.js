var jwt = require('jsonwebtoken');

var secret = process.env.TOKEN_SECRET;
var tokens = {};
var counter = 1;

module.exports = {
  add: () => {
    id = counter;
    tokens[id] = jwt.sign({id: id}, secret);
    counter++;
    return {id: id, token: tokens[id]};
  },
  remove: (id) => {
    delete tokens[id];
  },
  exists: (id) => {
    return id in tokens;
  },
  getAll: () => {
    return Object.keys(tokens);
  }
}
