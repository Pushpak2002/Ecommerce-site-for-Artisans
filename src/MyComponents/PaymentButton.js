import React from 'react';
import axios from 'axios';

export const PaymentButton = ({ product }) => {
  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/phonepe/create-order', { product });
      window.location.href = response.data.url; // Redirect to PhonePe payment page
    } catch (error) {
      console.error('Payment error:', error);
    }
  };

  return (
    <button onClick={handlePayment} className="btn btn-primary">
      Pay with PhonePe
    </button>
  );
};
