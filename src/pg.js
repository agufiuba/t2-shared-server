var pg = require("pg");

var pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

if (process.env.PROD == "true") {
  pg.defaults.ssl = true;
}

module.exports = {
  createUser: usuario => {
    return pool.query(
      "INSERT INTO usuarios(nombre, apellido, correo, tipo) VALUES($1, $2, $3, $4);",
      [usuario.nombre, usuario.apellido, usuario.correo, usuario.tipo]
    );
  },
  getUsers: () => {
    return pool.query("SELECT * FROM usuarios;");
  },
  getUserById: id => {
    return pool.query("SELECT * FROM usuarios WHERE id=$1;", [id]);
  },
  getUserByMail: mail => {
    return pool.query("SELECT * FROM usuarios WHERE correo=$1;", [mail]);
  },
  updateUser: usuario => {
    return pool.query(
      "UPDATE usuarios SET nombre=$1, apellido=$2, correo=$3, tipo=$4 WHERE id=$5;",
      [usuario.nombre, usuario.apellido, usuario.correo, usuario.tipo, usuario.id]
    );
  },
  removeUser: id => {
    return pool.query("DELETE FROM usuarios WHERE id=$1;", [id]);
  }
};
