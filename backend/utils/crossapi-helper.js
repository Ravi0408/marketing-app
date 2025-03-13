const axios = require('axios');
require('dotenv').config();
let userurl=process.env.AUTH_SERVICE_URL
let patienturl=process.env.PATIENT_SERVICE_URL
let paymenturl=process.env.PAYMENT_SERVICE_URL

if(process.env.NODE_ENV=='local'){
    userurl="http://localhost:4001"
    patienturl="http://localhost:4002"
    paymenturl="http://localhost:4004"
}

async function checkSubscription(doctorId) {
  const response = await axios.get(`${paymenturl}/api/payments/checksubscription/${doctorId}`);
  return response.data;
}
module.exports = {checkSubscription};