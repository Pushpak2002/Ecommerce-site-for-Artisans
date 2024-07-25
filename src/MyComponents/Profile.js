import React, { useEffect, useState } from 'react';
import styles from './CSS/profile.module.css';

import axios from 'axios';


const Profile = () => {

    const [user, setUser] = useState([]);
    const [product, setProduct] = useState([]);
    const UserName = 'Admin';
  
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/auth/getspecificuser`,{
            params: { UserName } 
          });
          console.log(response);
          setUser(response.data);
        } catch (err) {
          console.log(err);
        }
      };
  
      fetchUserData();
    }, [UserName]);

  
    useEffect(() => {
        const fetchProdData = async () => {
          try {
            const responses = await axios.get(`http://localhost:5000/api/product/tempproductlist`, {
              params: { UserName } 
            });
            console.log(responses);
            setProduct(responses.data); // Corrected variable name to `setProduct`
          } catch (err) {
            console.log(err);
          }
        };
    
        fetchProdData();
      }, [UserName]);
  


      return (
        <div className={styles.profileContainer}>
          <div className={styles.profileHeader}>
            <img
              src={'https://via.placeholder.com/150'}
              alt={`${user.Name}'s avatar`}
              className={styles.avatar}
            />
            <h1 className={styles.userName}>{user.Name}</h1>
            <p className={styles.userEmail}>{user.Mail}</p>
          </div>
          <div className={styles.profileBody}>
            <h2 className={styles.sectionTitle}>About</h2>
            <p className={styles.userBio}>{'No bio available'}</p>
          </div>
          {/* ..................product start..................... */}
          <div className={styles.productList}>
            <h2 className={styles.sectionTitle}>Uploaded Products</h2>
            {product && product.length > 0 ? ( // Changed `products` to `product`
              <ul className={styles.productListItems}>
                {product.map((prod) => ( // Changed `products` to `product` and `product` to `prod`
                  <li key={prod._id} className={styles.productItem}>
                    <img
                      src={prod.image || 'https://via.placeholder.com/100'}
                      alt={product.Name}
                      className={styles.productImage}
                    />
                    <div className={styles.productDetails}>
                      <h3 className={styles.productName}>{prod.ProdName}</h3>
                      <p className={styles.productPrice}>${prod.Price}</p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className={styles.noProducts}>No products uploaded</p>
            )}
          </div>
        </div>
      );
    };
    
    export default Profile;