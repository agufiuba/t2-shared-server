var axios = require("axios");
var request = require('request-promise-native');

var r = request

var optionsToken = {
    url: 'http://shielded-escarpment-27661.herokuapp.com/api/v1/user/oauth/authorize',
    method: 'POST',
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ client_id: 'ce69d9a7-226a-4b43-ae8b-50f6609c6738', client_secret: '59a8011a-47a6-404e-8633-097256c981ca' })
}

var token = r(optionsToken).then(t => { return JSON.parse(t).access_token });

var optionsApi = (endpoint, token) => {
    return {
        url: "http://shielded-escarpment-27661.herokuapp.com/api/v1/" + endpoint,
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        }
    }
}

module.exports = {
    getPaymethods: () => {
        return token.then(async (t) => {
            return JSON.parse(await r.get(optionsApi("paymethods", t)));
        })
    },
    getPayments: () => {
        return token.then(async (t) => {
            return JSON.parse(await r.get(optionsApi("payments", t)));
        })
    },
    postPayment: (p) => {
        return token.then(async (t) => {
            return JSON.parse(await r.post(optionsApi("paymethods", t).form(p)));
        })
    },
}
