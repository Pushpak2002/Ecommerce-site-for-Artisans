const express = require('express');
const crypto = require('crypto');
const axios = require('axios');
const router = express.Router();

const phonePeBaseUrl = 'https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay';
// const phonePeBaseUrl = 'https://api.phonepe.com/apis/hermes/pg/v1/pay ';

// Function to generate unique merchantTransactionId
function generateMerchantTransactionId() {
  const timestamp = Date.now(); // Current timestamp in milliseconds
  const randomNum = Math.floor(Math.random() * 1000000); // Generate a random number
  return `ORDER_${timestamp}_${randomNum}`; // Combine timestamp and random number
}

// Endpoint to create PhonePe order
router.post('/create-order', async (req, res) => {
  const { product } = req.body;

  const amount = product.Price * 100; // Amount in paise

  const data = {
    merchantId: "PGTESTPAYUAT",
    merchantTransactionId: generateMerchantTransactionId(),
    merchantUserId: 'USER_ID', // Replace with actual user id
    amount: amount,
    redirectUrl: 'http://localhost:3000/phonepe-payment-success', // Replace with your actual success URL
    redirectMode: 'POST',
    mobileNumber: '1234567890', // Replace with actual mobile number
    paymentInstrument: {
      type: 'PAY_PAGE',
    },
  };

  const payload = JSON.stringify(data);
  const payloadMain = Buffer.from(payload).toString('base64');
  const key = '099eb0cd-02cf-4e2a-8aca-3e6c6aff0399';
  const keyIndex = 1; // Adjust if necessary
  const string = payloadMain + '/pg/v1/pay' + key;
  const sha256 = crypto.createHash('sha256').update(string).digest('hex');
  const checksum = `${sha256}###${keyIndex}`;

  const options = {
    method: 'post',
    url: phonePeBaseUrl,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'X-VERIFY': checksum,
    },
    data: {
      request: payloadMain,
    },
  };

  try {
    console.log('Request Data:', options);

    const response = await axios.request(options);
    console.log('Response Data:', response.data);
    
    res.status(200).json({ url: response.data.data.instrumentresponse.redirectInfo.url });
  } catch (error) {
    console.error('Error details:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to create PhonePe order' });
  }
});

// Endpoint to handle PhonePe callback
router.post('/callback', (req, res) => {
  const { transactionId, status } = req.body;
  // Handle the callback and update order status in your database
  res.status(200).send('Callback received');
});

module.exports = router;
