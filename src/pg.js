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
      "INSERT INTO usuarios(nombre, apellido, correo) VALUES($1, $2, $3);",
      [usuario.nombre, usuario.apellido, usuario.correo]
    );
  },
  getUsers: () => {
    return pool.query("SELECT * FROM usuarios;");
  },
  getUser: id => {
    return pool.query("SELECT * FROM usuarios WHERE id=$1;", [id]);
  },
  updateUser: usuario => {
    return pool.query(
      "UPDATE usuarios SET nombre=$1, apellido=$2, correo=$3 WHERE id=$4;",
      [usuario.nombre, usuario.apellido, usuario.correo, usuario.id]
    );
  },
  removeUser: id => {
    return pool.query("DELETE FROM usuarios WHERE id=$1;", [id]);
  }
};
