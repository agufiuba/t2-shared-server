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
  getUserById: id => {
    return pool.query("SELECT * FROM usuarios WHERE id=$1;", [id]);
  },
  getUserByMail: mail => {
    return pool.query("SELECT * FROM usuarios WHERE mail=$1;", [mail]);
  },
  updateUser: user => {
    return pool.query(
      "UPDATE usuarios SET name=$1, last_name=$2, mail=$3, type=$4 WHERE id=$5;",
      [user.name, user.last_name, user.mail, user.type, user.id]
    );
  },
  removeUser: id => {
    return pool.query("DELETE FROM usuarios WHERE id=$1;", [id]);
  }
};
