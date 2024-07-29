// src/MyComponents/PhonePePaymentSuccess.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PhonePePaymentSuccess = () => {
  const [paymentStatus, setPaymentStatus] = useState('');
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    // Extract query parameters from URL
    const queryParams = new URLSearchParams(window.location.search);
    const status = queryParams.get('status'); // Payment status
    const transactionId = queryParams.get('transactionId'); // Payment transaction ID

    if (status === 'success') {
      // Handle successful payment
      setPaymentStatus('Payment was successful!');
      setOrderId(transactionId);
      // Optionally, you can send this data to your server for further processing
      axios.post('http://localhost:5000/api/phonepe/callback', {
        transactionId,
        status
      })
      .then(response => {
        console.log('Callback response:', response.data);
      })
      .catch(error => {
        console.error('Error in callback:', error);
      });
    } else {
      // Handle payment failure
      setPaymentStatus('Payment failed. Please try again.');
    }
  }, []);

  return (
    <div>
      <h1>Payment Status</h1>
      <p>{paymentStatus}</p>
      {orderId && <p>Order ID: {orderId}</p>}
    </div>
  );
};

export default PhonePePaymentSuccess;
