import React, { useEffect, useState } from "react";
import { NavBar } from "./NavBar";
import { useLocation } from "react-router-dom";

import "./CSS/Product_List.css";
import axios from "axios";

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

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const location = useLocation();
  const { state } = location;
  const ProdCat = state?.ProdCat;
  console.log(ProdCat); // Ensure ProdCat is logged properly

  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/product/tempproductlistcat", {
        params: { ProdCat }, // Pass ProdCat as a query parameter
      })
      .then((products) => setProducts(products.data))
      .catch((err) => console.log(err));
  }, []); // Dependency array includes UserName

  const addToCart = (UserName, ProdId) => {
    axios
      .get("http://localhost:5000/api/cart/tempaddproduct", {
        params: { UserName, ProdId },
      })
      .then((response) => {
        console.log("Product added to cart:", response.data);
        // Handle successful addition, e.g., show a message or update state
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
        // Handle error, e.g., show an error message
      });
  };

  return (
    <>
      <NavBar title="HandCraft" />
      <div className="container">
        {/* <h1>{ProdCat}</h1> */}
        <div className="container1">
          {/* Header Section */}
          <div className="mid">
            <div className="left">
              <h1 style={{ color: "rgb(39, 39, 82)" }}>{ProdCat}</h1>
              <p>
                The art of handcrafting is deeply rooted in the lap of Indian
                history. Art is not a handicraft, it is the transmission of
                feeling the artist has experienced. Craft is the vehicle for
                expressing your vision. Craft is the visible edge of art. Craft
                makes our homes more human. Craft is passionately creating
                something with your hands. Handmade items are not mass produced
                meaning each item has a unique display of craftsmanship.
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

          {/* Latest Products Section */}
          <div className="latest_products">
            <h2>
              Products Category
              <span style={{ color: "rgb(245, 78, 178)" }}></span>
            </h2>
          </div>

          {/* Products Grid */}
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
                      src="/Images/Home/pot.jpg" // Use actual product image URL
                      alt={product.ProdName}
                      onClick={() => handleImageClick(product)}
                    />
                  </li>
                  <li>
                    <h4>{product.ProdName}</h4>
                    <h4>${product.Price}</h4>
                    <div className="button-container">
                      <button className="btn btn-danger btn-custom btn-danger-custom" onClick={() => alert("This Button is under working")}>
                        Buy Now
                      </button>
                      <button
                        className="btn btn-primary btn-custom btn-primary-custom"
                        onClick={() => addToCart("current_user", product._id)} // Pass UserName and ProdId correctly
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

          {/* Customers Review Section */}
          <div className="latest_products">
            <h2>
              Customers Review
              <span style={{ color: "rgb(224, 20, 142)" }}></span>
            </h2>
          </div>

          {/* Reviews */}
          <div className="customer_review">
            <ul className="review">
              <li>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
              </li>
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
                alias accusantium deserunt corporis voluptatum placeat ex
                laboriosam necessitatibus quisquam! Unde neque at itaque rerum
                natus suscipit, iusto earum quis nam!
              </li>
              <li>
                <h3>John Deo</h3>
                <p>Happy Customer</p>
              </li>
            </ul>
            <ul className="review">
              <li>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
              </li>
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
                alias accusantium deserunt corporis voluptatum placeat ex
                laboriosam necessitatibus quisquam! Unde neque at itaque rerum
                natus suscipit, iusto earum quis nam!
              </li>
              <li>
                <h3>John Deo</h3>
                <p>Happy Customer</p>
              </li>
            </ul>
            <ul className="review">
              <li>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
                <span className="fa fa-star checked"></span>
              </li>
              <li>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam
                alias accusantium deserunt corporis voluptatum placeat ex
                laboriosam necessitatibus quisquam! Unde neque at itaque rerum
                natus suscipit, iusto earum quis nam!
              </li>
              <li>
                <h3>John Deo</h3>
                <p>Happy Customer</p>
              </li>
            </ul>
          </div>

          {/* Footer */}
          <div className="item">
            <div className="logo">
              <img
                style={{
                  height: "150px",
                  paddingTop: "8px",
                  paddingBottom: "15px",
                }}
                src="/Images/Home/cmpLogo1.jpg"
                alt="logo"
                height="35px"
              />
            </div>
            <ul className="item_List" style={{ listStyleType: "none" }}>
              <li>
                <h4>Company</h4>
              </li>
              <li>Overview</li>
              <li>Pricing</li>
              <li>Customers page</li>
              <li>Status Page</li>
            </ul>
            <ul className="item_List" style={{ listStyleType: "none" }}>
              <li>
                <h4>Location</h4>
              </li>
              <li>Mumbai</li>
              <li>Pune</li>
              <li>Kolhapur</li>
              <li>Sangli</li>
            </ul>
            <ul className="item_List" style={{ listStyleType: "none" }}>
              <li>
                <h4>Contact</h4>
              </li>
              <li>+123-456-7890</li>
              <li>handcraft@gmail.com</li>
              <li>West Mumbai</li>
              <li>India</li>
              <br />
            </ul>
          </div>

          {/* Footer */}
          <footer>
            <div className="footer0">
              <ul className="List">
                <li>
                  <a href="/privacy" className="ft">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/terms" className="ft">
                    Terms and Condition
                  </a>
                </li>
                <li>
                  <a href="/security" className="ft">
                    Security Information
                  </a>
                </li>
                <li>
                  <a href="/" className="ft"></a>
                </li>
              </ul>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};
