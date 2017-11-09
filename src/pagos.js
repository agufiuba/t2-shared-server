var axios = require("axios");

var token = (async function () {
    await axios.get(
        "shielded-escarpment-27661.herokuapp.com/api/v1/user/oauth/authorize", {
            params: {
                client_id: "ce69d9a7-226a-4b43-ae8b-50f6609c6738",
                client_secret: "59a8011a-47a6-404e-8633-097256c981ca"
            },
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
})().data.access_token;

var api = axios.create({
    baseURL: "shielded-escarpment-27661.herokuapp.com/api/v1/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + token
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
