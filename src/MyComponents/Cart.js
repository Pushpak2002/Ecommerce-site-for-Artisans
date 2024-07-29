import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./CSS/cart.module.css";
import {jwtDecode} from 'jwt-decode'; // Correct import statement for jwt-decode
import { useNavigate } from 'react-router-dom';
import {NavBar} from './NavBar'

export const Cart = () => {
  const navigate = useNavigate();

  const [cart, setCart] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const UserName = "Admin";

  useEffect(() => {
    
    const fetchCartData = async () => {
      console.log("i am here")
      const token = localStorage.getItem("authToken");
      if(token)
        {
      const decoded = jwtDecode(token); //decoded.user.id
      const id = decoded.user.id;
      console.log("id = ",id)
    

      try {
        const cartResponse = await axios.get(
          "http://localhost:5000/api/cart/tempCartList",
          {
            params: {UserId:id},
          }
        );
        setCart(cartResponse.data);

        const productIds = cartResponse.data.map((cartItem) => cartItem.ProdId);
        console.log("from productId");
        console.log(productIds);

        if (productIds.length > 0) {
          // Fetch product details for each product ID
          const productDetailsPromises = productIds.map((ProdId) =>
            axios.get("http://localhost:5000/api/product/tempproductlistbyId", {
              params: { ProdId },
            })
          );

          // Wait for all product details to be fetched
          const productDetailsResponses = await Promise.all(
            productDetailsPromises
          );
          // Extract data from responses and set state
          const fetchedProductDetails = productDetailsResponses.map(
            (response) => response.data
          );
          setProductDetails(fetchedProductDetails);
          console.log("from fetchedProductDetails");
          console.log(fetchedProductDetails);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    }
    else{
      navigate('/signin');
    }
  };

    fetchCartData();
  }, [UserName]);

  const handleQuantityChange = async (productId, increment) => {
    // Find the cart item to update
    const updatedCart = cart.map((item) => {
      if (item.ProdId === productId) {
        const newQuantity = Math.max(item.quantity + increment, 1);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    setCart(updatedCart);

    try {
      await axios.post("http://localhost:5000/api/cart/updateQuantity", {
        productId,
        quantity: increment,
        UserName,
      });
    } catch (err) {
      console.error("Error updating quantity:", err);
    }
  };

  const calculateTotalPrice = () => {
    console.log("cart = ",cart)
    return productDetails
      .reduce((total, product) => {
        // const product = productDetails.find((p) => p._id === cartItem.ProdId);
      // const price = 
      const quantity = 1; // Default to 0 if quantity is not present
      const price = parseFloat(product.Price) || 1; // Convert price to a number
      return total + (price * quantity);

      }, 0)
      .toFixed(2);
  };

  return (
    <>
    <NavBar title="HandCraft" />
      <div className={styles.productList}>
        <header className={styles.cartHeader}>
          <h3 className={styles.cartTitle}>Your Shopping Cart</h3>
          <p className={styles.cartDescription}>
            Welcome to your shopping cart!
          </p>
          <div className={styles.cartSummary}>
            <span className={styles.cartIcon}>🛒</span>
            <p className={styles.cartCount}>
              You have <strong>{cart.length}</strong> item(s) in your cart.
            </p>
            <p className={styles.cartTotal}>Total: ${calculateTotalPrice()}</p>
          </div>
        </header>
      </div>

      <div className={styles.cart}>
        <h2 className={styles.sectionTitle}>Cart Items</h2>
        <div className={styles.productDetailsSection}>
          <h2 className={styles.sectionTitle}>Product Details</h2>
          {productDetails.length > 0 ? (
            <div className={styles.productDetailsList}>
              {productDetails.map((product) => (
                <div key={product._id} className={styles.productDetailItem}>
                  <img
                    src={product.image || "https://via.placeholder.com/100"}
                    alt={product.name}
                    className={styles.productDetailImage}
                  />
                  <div className={styles.productDetailInfo}>
                    <h3 className={styles.productDetailName}>{product.ProdName}</h3>
                    <p className={styles.productDetailPrice}>
                      ${product.Price}
                    </p>
                    <p className={styles.productDetailDescription}>
                      {product.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.noProducts}>Your cart is empty</p>
          )}
        </div>
      </div>
    </>
  );
};
