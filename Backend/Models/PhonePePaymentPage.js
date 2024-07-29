// PhonePePaymentPage.js
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const PhonePePaymentPage = () => {
  const location = useLocation();
  const { state } = location;
  const { product } = state || {};

  useEffect(() => {
    if (product) {
      axios.post("http://localhost:5000/api/payment/create-phonepe-order", { product })
        .then(response => {
          const { data } = response;

          if (data.success) {
            // Redirect to PhonePe payment page
            const phonePePaymentUrl = data.instrumentResponse.redirectUrl;
            window.location.href = phonePePaymentUrl;
          } else {
            console.error('Error creating PhonePe order:', data);
          }
        })
        .catch(error => {
          console.error('Error creating PhonePe order:', error);
        });
    }
  }, [product]);

  return (
    <div>
      <h2>Payment Page</h2>
      <p>Processing payment for {product?.ProdName}</p>
    </div>
  );
};

export default PhonePePaymentPage;
