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
    const { rowsSaldo } = await pg.getSaldo(id);
    const { rowsCorreo } = await pg.getMailFromId(id);
    if (!rowsCorreo[0].endsWith("@llevame.com")) {
      if (rowsSaldo[0] >= 0) {
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
        const { rowsCantViajes } = await pg.getCantViajesP(id);
        if (rowsCantViajes[0] == 0) {
          precio -= 100;
        }
        // Mas de 10 viajes en 30 min
        const { rowsCantViajesHH } = await pg.getCantViajesHHP(id);
        if (rowsCantViajesHH[0] > 10) {
          recargo += 0.15;
        }
        // 5to viaje del dia
        const { rowsCantViajesDia } = await pg.getCantViajesDiaP(id);
        if (rowsCantViajesDia[0] >= 5) {
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
    const { rowsCantViajesDia } = await pg.getCantViajesDiaC(id);
    if (rowsCantViajesDia[0] >= 10) {
      recargo += 0.02;
    }
    return precio + precio * recargo;
  }
};
