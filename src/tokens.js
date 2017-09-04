var jwt = require('jsonwebtoken');

var secret = process.env.TOKEN_SECRET;
var tokens = {};

module.exports = {
  add: (id) => {
    tokens[id] = jwt.sign({id: id}, 'secret');
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
