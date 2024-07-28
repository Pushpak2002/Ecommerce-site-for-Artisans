import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

import styles from "./CSS/profile.module.css";
import { NavBar } from "./NavBar";

import axios from "axios";

const Profile = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const token = localStorage.getItem("authToken");
  // const id = location.state?.id;
  // const UserName = "user";

  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (!token) {
      console.log("Not Authenticate User");
      navigate("/signin");
      return;
    }
    // console.log("Token = ",token)
    const fetchUserData = async () => {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/auth/getuser`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              "auth-token": token,
            },
          }
        );
        // console.log("responese = ",response.data)
        if (!response) {
          console.log("Authentication Failed");
          setIsLoggedIn(false);
        }
        const data = await response.data;
        console.log("data = ",data);
        setUser(data);
        setIsLoggedIn(true);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        alert("Authentication failed. Redirecting to sign-in page.");
        navigate("/signin");
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, [token]);

  useEffect(() => {
    if(isLoggedIn){
    const fetchProdData = async () => {
      try {
        const responses = await axios.get(
          `http://localhost:5000/api/product/tempproductlist`,
          {
            params: { UserName:user.UserName } 
          }
        );
        if(!responses)
        {
          console.log("No product available")
        }
        // console.log("responses = ",responses);
        setProduct(responses.data); // Corrected variable name to `setProduct`
      } catch (err) {
        console.log(err);
      }
    };

    fetchProdData();}
  }, [isLoggedIn,user.UserName]);

  return (
    <>
      <NavBar title="HandCraft" />
      <div className={styles.profileContainer}>
        <div className={styles.profileHeader}>
          <img
            src={"https://via.placeholder.com/150"}
            alt={`${user.Name}'s avatar`}
            className={styles.avatar}
          />
          <h1 className={styles.userName}>{user.UserName}</h1>
          <p className={styles.userEmail}>{user.Mail}</p>
        </div>
        <div className={styles.profileBody}>
          <h2 className={styles.sectionTitle}>About</h2>
          <p className={styles.userBio}>{"No bio available"}</p>
        </div>
        {/* ..................product start..................... */}
        <div className={styles.productList}>
          <h2 className={styles.sectionTitle}>Uploaded Products</h2>
          {product && product.length > 0 ? ( // Changed `products` to `product`
            <ul className={styles.productListItems}>
              {product.map(
                (
                  prod // Changed `products` to `product` and `product` to `prod`
                ) => (
                  <li key={prod._id} className={styles.productItem}>
                    <img
                      src={prod.image || "https://via.placeholder.com/100"}
                      alt={product.Name}
                      className={styles.productImage}
                    />
                    <div className={styles.productDetails}>
                      <h3 className={styles.productName}>{prod.ProdName}</h3>
                      <p className={styles.productPrice}>${prod.Price}</p>
                    </div>
                  </li>
                )
              )}
            </ul>
          ) : (
            <p className={styles.noProducts}>No products uploaded</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
