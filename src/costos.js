var date = new Date();

var pg = require("./pg");

var pMinimo = 50;
var pPPK = 15;
var cMinimo = 30;
var cPPK = 5;

// TODO: llamadas
module.exports = {
  pasajero: async (id, kms) => {
    var precio = 0;
    const saldo = await pg.getSaldo(id);
    const correo = await pg.getMailFromId(id);
    if (!correo.rows[0].mail.endsWith("@llevame.com")) {
      if (saldo.rows[0].saldo >= 0) {
        precio = pMinimo + kms * pPPK;
        var off = 0;
        var recargo = 0;
        // Miercoles
        if (date.getDay() == 3) {
          var hora = date.getHours();
          // Entre las 15 y 16
          if (hora >= 15 && hora <= 16) {
            off += 0.05;
          }
        } else {
          // Lunes a Viernes
          var day = date.getDay();
          if (day >= 1 && day <= 5) {
            var hora = date.getHours();
            // Entre las 17 y 19
            if (hora >= 17 && hora <= 19) {
              recargo += 0.1;
            }
          }
        }
        // Primer viaje
        const cantViajes = await pg.getCantViajesP(id);
        if (cantViajes.rows[0].count == 0) {
          precio -= 100;
        }
        // Mas de 10 viajes en 30 min
        const cantViajesHH = await pg.getCantViajesHHP(id);
        if (cantViajesHH.rows[0].count > 10) {
          recargo += 0.15;
        }
        // 5to viaje del dia
        const cantViajesDia = await pg.getCantViajesDiaP(id);
        if (cantViajesDia.rows[0].count >= 5) {
          off += 0.05;
        }
        precio += precio * recargo;
        precio -= precio * off;
        if (precio < 0) precio = 0;
      } else {
        return -1;
      }
    }
    return precio;
  },
  conductor: async (id, kms) => {
    var precio = cMinimo + kms * cPPK;
    var recargo = 0;
    // Lunes a Viernes
    var day = date.getDay();
    if (day >= 1 && day <= 5) {
      var hora = date.getHours();
      // Entre las 17 y 19
      if (hora >= 17 && hora <= 19) {
        recargo += 0.03;
      }
    }
    // Mas de 10 viajes en el dia
    const cantViajesDia = await pg.getCantViajesDiaC(id);
    if (cantViajesDia.rows[0].count >= 10) {
      recargo += 0.02;
    }
    return precio + precio * recargo;
  }
};
