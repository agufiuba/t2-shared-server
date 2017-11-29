var axios = require("axios");
var request = require('request');


var token;

var headers = {
  "Content-Type": "application/json"
}


var options = {
    url: 'http://shielded-escarpment-27661.herokuapp.com/api/v1/user/oauth/authorize',
    method: 'POST',
    headers: headers,
    body: JSON.stringify({client_id:'ce69d9a7-226a-4b43-ae8b-50f6609c6738', client_secret: '59a8011a-47a6-404e-8633-097256c981ca'})
}

request(options, function (error, response, body) {
    if (!error && response.statusCode == 201) {
        // Print out the response body
        console.log(body)
        token = body['access_token']
        console.log('Se obtuvo el token');
    }
    console.log('statusCode:'+response.statusCode);
    console.log('body:'+body);
})



var api = axios.create({
    baseURL: "http://shielded-escarpment-27661.herokuapp.com/api/v1/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
    }
})



module.exports = {
    getPaymethods: async () => {
        const res = await api.get("paymethods")
        return res;
    },
    getPayments: async () => {
        const res = await api.get("payments")
        return res;
    },
    postPayment: async (p) => {
        const res = await api.post("payments", p);
        return res.data;
    }
}
