import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { useLocation } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';
import axios from "axios";
import { PaymentButton } from "./PaymentButton"; // Import PaymentButton

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>{product.ProdName}</h2>
        <img
          src="/Images/Home/pot.jpg"
          alt={product.ProdName}
          style={{ width: "100px" }}
        />
        <p>{product.description}</p>
        <p>Price: ${product.Price}</p>
        <button className="btn btn-primary" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export const Product_List = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [products, setProducts] = useState([]);

  const location = useLocation();
  const { state } = location;
  const ProdCat = state?.ProdCat;

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/tempproductlistcat", {
        params: { ProdCat },
      })
      .then((response) => setProducts(response.data))
      .catch((err) => console.log(err));
  }, [ProdCat]);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const addToCart = (ProdId) => {
    const token = localStorage.getItem("authToken");
    const decoded = jwtDecode(token);
    const UserId = decoded.user.id;
    axios
      .get("http://localhost:5000/api/cart/tempaddproduct", {
        params: { UserId, ProdId }
      })
      .then((response) => {
        alert("Product added to cart");
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  return (
    <>
      <NavBar title="HandCraft" />
      <div className="container">
        <div className="container1">
          <div className="mid">
            <div className="left">
              <h1 style={{ color: "rgb(39, 39, 82)" }}>{ProdCat}</h1>
              <p>
                The art of handcrafting is deeply rooted in the lap of Indian
                history...
              </p>
            </div>
            <div className="right">
              <img
                className="right_img"
                style={{ borderRadius: "10px" }}
                src="/Images/Home/asset 2.jpg"
                alt="asset 2"
                height="280px"
                width="500px"
              />
            </div>
          </div>

          <div className="latest_products">
            <h2>
              Products Category
            </h2>
          </div>

          <div className="products">
            {products.map((product) => (
              <div className="product1" key={product._id}>
                <ul className="l">
                  <li>
                    <img
                      className="prd"
                      style={{
                        height: "280px",
                        width: "250px",
                        cursor: "pointer",
                      }}
                      src="/Images/Home/pot.jpg"
                      alt={product.ProdName}
                      onClick={() => handleImageClick(product)}
                    />
                  </li>
                  <li>
                    <h4>{product.ProdName}</h4>
                    <h4>${product.Price}</h4>
                    <div className="button-container">
                      <PaymentButton product={product} /> {/* Use PaymentButton */}
                      <button
                        className="btn btn-primary btn-custom btn-primary-custom"
                        onClick={() => addToCart(product._id)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            ))}

            {selectedProduct && (
              <ProductModal
                product={selectedProduct}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
};
