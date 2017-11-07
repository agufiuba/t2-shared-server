var date = new Date();

var pg = require("pg");

var pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

if (process.env.PROD == "true") {
  pg.defaults.ssl = true;
}

module.exports = {
  createUser: user => {
    return pool.query(
      "INSERT INTO usuarios(name, last_name, mail, type) VALUES($1, $2, $3, $4);",
      [user.name, user.last_name, user.mail, user.type]
    );
  },
  getUsers: () => {
    return pool.query("SELECT * FROM usuarios;");
  },
  getUser: id => {
    var correo = id.toString();
    if (isNaN(id)) id = 0;
    return pool.query("SELECT * FROM usuarios WHERE id=$1 OR mail=$2;", [
      id,
      correo
    ]);
  },
  updateUser: user => {
    return pool.query(
      "UPDATE usuarios SET name=$1, last_name=$2, mail=$3, type=$4 WHERE id=$5;",
      [
        usuario.name,
        usuario.last_name,
        usuario.mail,
        usuario.type,
        usuario.id
      ]
    );
  },
  removeUser: id => {
    return pool.query("DELETE FROM usuarios WHERE id=$1;", [id]);
  },
  getConductor: id => {
    var correo = id.toString();
    if (isNaN(id)) id = 0;
    return pool.query(
      "SELECT * FROM usuarios WHERE (id=$1 OR mail=$2) AND type=2;",
      [id, mail]
    );
  },
  getSaldo: id => {
    var correo = id.toString();
    if (isNaN(id)) id = 0;
    return pool.query("SELECT saldo FROM usuarios WHERE id=$1 OR mail=$2;", [
      id,
      mail
    ]);
  },
  updateSaldo: (id, saldo) => {
    var correo = id.toString();
    if (isNaN(id)) id = 0;
    return pool.query(
      "UPDATE usuarios SET saldo=$1 WHERE id=$2 OR mail=$3;",
      [saldo, id, mail]
    );
  },
  createTrip: () => {},
  getCantViajesP: id => {
    return pool.query("SELECT COUNT(1) FROM viajes WHERE pasajero=$1", [id]);
  },
  getCantViajesDiaP: id => {
    var m = date.getUTCMonth() + 1;
    var d = date.getUTCDate();
    var y = date.getUTCFullYear();
    var dia = d + "/" + m + "/" + y;
    return pool.query(
      "SELECT COUNT(1) FROM viajes WHERE pasajero=$1 AND dia=$2",
      [id, dia]
    );
  },
  getCantViajesHHP: id => {
    var hh = date.getTime() - 1800000;
    return pool.query(
      "SELECT COUNT(1) FROM viajes WHERE pasajero=$1 AND hora>=$2",
      [id, hh]
    );
  },
  getCantViajesDiaC: id => {
    var m = date.getUTCMonth() + 1;
    var d = date.getUTCDate();
    var y = date.getUTCFullYear();
    var dia = d + "/" + m + "/" + y;
    return pool.query(
      "SELECT COUNT(1) FROM viajes WHERE conductor=$1 AND dia=$2",
      [id, dia]
    );
  },
  getMailFromId: id => {
    return pool.query("SELECT mail FROM usuarios WHERE id=$1", [id]);
  }
};
