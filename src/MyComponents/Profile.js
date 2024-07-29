import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import styles from "./CSS/profile.module.css";
import { NavBar } from "./NavBar";

const Profile = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  const [user, setUser] = useState([]);
  const [product, setProduct] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAddProductPopup, setShowAddProductPopup] = useState(false);
  const [newProduct, setNewProduct] = useState({
    ProdName: '',
    ProdCat: '',
    Price: '',  // Default value as an empty string
    Description: ''
  });

  useEffect(() => {
    if (!token) {
      console.log("Not Authenticate User");
      navigate("/signin");
      return;
    }

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
        if (!response) {
          console.log("Authentication Failed");
          setIsLoggedIn(false);
        }
        const data = await response.data;
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
    if (isLoggedIn) {
      const fetchProdData = async () => {
        try {
          const responses = await axios.get(
            `http://localhost:5000/api/product/tempproductlist`,
            {
              params: { UserName: user.UserName },
            }
          );
          if (!responses) {
            console.log("No product available");
          }
          setProduct(responses.data);
        } catch (err) {
          console.log(err);
        }
      };

      fetchProdData();
    }
  }, [isLoggedIn, user.UserName]);

  const handleAddProductClick = () => {
    setShowAddProductPopup(true);
  };

  const handleClosePopup = () => {
    setShowAddProductPopup(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const UserName = user.UserName;
      const response = await axios.post(
        `http://localhost:5000/api/product/addproduct`,
        {
          ProdName: newProduct.ProdName,
          ProdCat: newProduct.ProdCat,
          UserName: UserName,
          Price: newProduct.Price,
          Description: newProduct.Description
        },
        {
          headers: {
            "Content-Type": "application/json",
            "auth-token": token,
          }
        }
      );

      if (response.data) {
        setProduct((newProducts) => [...newProducts, response.data]);
        setShowAddProductPopup(false);
      }
    } catch (err) {
      console.error("Error adding product:", err);
    }
  };

  const handleDeleteProduct = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/product/deleteproduct`, {
        params: {
          _id: productId,
        },
        headers: {
          "Content-Type": "application/json",
          "auth-token": token,
        }
      });
  
      setProduct((products) => products.filter((prod) => prod._id !== productId));
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  
    console.log("ProductId", productId);
  };
  

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
        <button className={styles.addButton} onClick={handleAddProductClick}>
          Add Product
        </button>
        {showAddProductPopup && (
          <div className={styles.popup}>
            <div className={styles.popupContent}>
              <h2>Add Product</h2>
              <form onSubmit={handleFormSubmit}>
                <label>
                  Product Name:
                  <input
                    type="text"
                    name="ProdName"
                    value={newProduct.ProdName}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Category:
                  <select
                    name="ProdCat"
                    value={newProduct.ProdCat}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Flower_pot">Flower pot</option>
                    <option value="painting">Painting</option>
                    <option value="wood">wood art</option>
                    <option value="wool">Wool</option>
                    <option value="jewellery">Jewellery</option>
                  </select>
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    name="Description"
                    value={newProduct.Description}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <label>
                  Price:
                  <input
                    type="number"
                    name="Price"
                    value={String(newProduct.Price)}
                    onChange={handleInputChange}
                    required
                  />
                </label>
                <button type="submit">Submit</button>
                <button type="button" onClick={handleClosePopup}>
                  Cancel
                </button>
              </form>
            </div>
          </div>
        )}
        <div className={styles.productList}>
          <h2 className={styles.sectionTitle}>Uploaded Products</h2>
          {product && product.length > 0 ? (
            <ul className={styles.productListItems}>
              {product.map((prod) => (
                <li key={prod._id} className={styles.productItem}>
                  <img
                    src={prod.image || "https://via.placeholder.com/100"}
                    alt={prod.ProdName}
                    className={styles.productImage}
                  />
                  <div className={styles.productDetails}>
                    <h3 className={styles.productName}>{prod.ProdName}</h3>
                    <p className={styles.productPrice}>${prod.Price}</p>
                    <button
                      className={styles.deleteButton}
                      onClick={() => handleDeleteProduct(prod._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
              ))}
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
