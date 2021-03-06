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
    console.log("pg create user");
    return pool.query(
      "INSERT INTO usuarios(name, last_name, mail, type) VALUES($1, $2, $3, $4);",
      [user.name, user.last_name, user.mail, user.type]
    );
  },
  getUsers: () => {
    console.log("pg getUsers");
    return pool.query("SELECT * FROM usuarios;");
  },
  getUser: id => {
    console.log("pg getUser");
    var mail = id.toString();
    console.log("pg getUser id:" + id + " email: " + mail);
    if (isNaN(id)) id = 0;
    return pool.query("SELECT * FROM usuarios WHERE id=$1 OR mail=$2;", [
      id,
      mail
    ]);
  },
  updateUser: user => {
    return pool.query(
      "UPDATE usuarios SET name=$1, last_name=$2, mail=$3, type=$4 WHERE id=$5;",
      [usuario.name, usuario.last_name, usuario.mail, usuario.type, usuario.id]
    );
  },
  removeUser: id => {
    return pool.query("DELETE FROM usuarios WHERE id=$1;", [id]);
  },
  getConductor: id => {
    var mail = id.toString();
    if (isNaN(id)) id = 0;
    return pool.query(
      "SELECT * FROM usuarios WHERE (id=$1 OR mail=$2) AND type=2;",
      [id, mail]
    );
  },
  getSaldo: id => {
    var mail = id.toString();
    if (isNaN(id)) id = 0;
    return pool.query("SELECT saldo FROM usuarios WHERE id=$1 OR mail=$2;", [
      id,
      mail
    ]);
  },
  updateSaldo: (id, saldo) => {
    saldo = parseFloat(saldo);
    var mail = id.toString();
    if (isNaN(id)) id = 0;
    return pool.query("UPDATE usuarios SET saldo=$1 WHERE id=$2 OR mail=$3;", [
      saldo,
      id,
      mail
    ]);
  },
  getTrips: (id, type) => {
    if (type == 1) {
      return pool.query("SELECT * FROM viajes WHERE pasajero=$1", [id]);
    } else {
      return pool.query("SELECT * FROM viajes WHERE conductor=$1", [id]);
    }
  },
  createTrip: trip => {
    return pool.query(
      "INSERT INTO viajes(pasajero, conductor, distancia, costo, ganancia, dia, hora) VALUES($1, $2, $3, $4, $5, $6, $7);",
      [trip.p, trip.c, trip.d, trip.costo, trip.ganancia, trip.dia, trip.hora]
    );
  },
  getCantViajesP: id => {
    console.log("getCantViajesP id:" + id);
    return pool.query("SELECT COUNT(1) FROM viajes WHERE id=$1", [id]);
  },
  getCantViajesDiaP: id => {
    console.log("on getCantViajesDiaP");
    var d = date.getUTCDate();
    var m = date.getUTCMonth() + 1;
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
  },
  getIdFromEmail: email => {
    return pool.query("SELECT id FROM usuarios WHERE mail=$1", [email]);
  },
  canCreate: uid => {
    return pool.query("SELECT permiso FROM permisos WHERE uid=$1", [uid]);
  },
  getCarFromUserEmail: email => {
    console.log('getCarFromUserEmail the email is:' + email);
    return pool.query("SELECT * FROM autos WHERE user_email=$1", [email]);
  },
  getCars: () => {
    console.log('Get cars');
    return pool.query("SELECT * FROM autos")
  },
  insertCar: (email, car) => {
    console.log('Insert car for user email: ' + email);
    return pool.query(
      "INSERT INTO autos(user_email,model, color, patent,year,state,air_conditioner,music) VALUES($1, $2, $3, $4,$5,$6,$7,$8);",
      [email, car.model, car.color, car.patent, car.year, car.state, car.air_conditioner, car.music]
    );
  },
  getCostos: () => {
    return pool.query("SELECT * FROM costos;");
  },
  getCosto: (descripcion) => {
    return pool.query("SELECT * FROM costos WHERE descripcion=$1;", [descripcion]);
  },
  updateRule: (rule) => {
    return pool.query("UPDATE costos SET valor=$2 WHERE descripcion=$1;", [rule.descripcion, rule.valor]);
  },
  getTarjetas: (mail) => {
    return pool.query("SELECT * FROM tarjetas t JOIN usuarios_tarjetas ut ON t.id=ut.tarjeta WHERE ut.usuario=$1", [mail]);
  },
  getRules: () => {
    return pool.query("SELECT * FROM costos");
  }
};
