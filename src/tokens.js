var jwt = require("jsonwebtoken");

var secret = process.env.TOKEN_SECRET;
var tokens = {};
var counter = 1;

module.exports = {
  add: () => {
    id = counter;
    tokens[id] = jwt.sign({ id: id }, secret);
    counter++;
    return { id: id, token: tokens[id] };
  },
  remove: id => {
    delete tokens[id];
  },
  exists: t => {
    for (k in tokens) {
      if (tokens[k] == t) return true;
    }
    return false;
  },
  existsId: id => {
    return Object.keys(tokens).includes(id);
  },
  getAll: () => {
    return Object.keys(tokens);
  }
};
