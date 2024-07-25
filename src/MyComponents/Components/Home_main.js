import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../CSS/Homee.css'; // Adjust path as needed


export const Home_main = () => {
  const navigate = useNavigate();

  const handleImageClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div className="container">
      <div className="container1">
        {/* Header Section */}
        <div className="mid">
          <div className="left">
            <h1 style={{ color: 'rgb(39, 39, 82)' }}>Craft Theoraphy</h1>
            <p>
              The art of handcrafting is deeply rooted in the lap of Indian history. Art is not a handicraft, it is the transmission of feeling the artist has experienced. Craft is the vehicle for expressing your vision. Craft is the visible edge of art. Craft makes our homes more human. Craft is passionately creating something with your hands. Handmade items are not mass produced meaning each item has a unique display of craftsmanship.
            </p>
          </div>
          <div className="right">
            <img
              className="right_img"
              style={{ borderRadius: '10px' }}
              src="/Images/Home/asset 2.jpg"
              alt="asset 2"
              height="280px"
              width="500px"
            />
          </div>
        </div>

        {/* Latest Products Section */}
        <div className="latest_products">
          <h2>Products Category<span style={{ color: 'rgb(245, 78, 178)' }}></span></h2>
        </div>

        {/* Products Grid */}
        <div className="products">
          <div className="product1">
            <ul className="l">
              <li>
                <img
                  className="prd"
                  style={{ height: '280px', width: '250px' }}
                  src="/Images/Home/pot.jpg"
                  alt="Flower Pot"
                  onClick={() => handleImageClick('pot')}
                />
              </li>
              <li><h4>Flower Pot</h4></li>
            </ul>
            <ul className="l">
              <li>
                <img
                  className="prd"
                  style={{ height: '280px', width: '250px' }}
                  src="/Images/Home/jewellery.jpg"
                  alt="Jewellery"
                  onClick={() => handleImageClick('jewellery')}
                />
              </li>
              <li><h4>Jewellery</h4></li>
            </ul>
          </div>
          <div className="product2">
            <ul className="l">
              <li>
                <img
                  className="prd"
                  style={{ height: '280px', width: '250px' }}
                  src="/Images/Home/painting.jpg"
                  alt="Painting"
                  onClick={() => handleImageClick('painting')}
                />
              </li>
              <li><h4>Painting</h4></li>
            </ul>
            <ul className="l">
              <li>
                <img
                  className="prd"
                  style={{ height: '280px', width: '250px' }}
                  src="/Images/Home/wool.jpg"
                  alt="Wool Craft"
                  onClick={() => handleImageClick('wool')}
                />
              </li>
              <li><h4>Wool Craft</h4></li>
            </ul>
          </div>
          <div className="product3">
            <ul className="l">
              <li>
                <img
                  className="prd"
                  style={{ height: '280px', width: '250px' }}
                  src="/Images/Home/wood craft.jpg"
                  alt="Wood Craft"
                  onClick={() => handleImageClick('wood')}
                />
              </li>
              <li><h4>Wood Craft</h4></li>
            </ul>
            <ul className="l">
              <li>
                <img
                  className="prd"
                  style={{ height: '280px', width: '250px' }}
                  src="/Images/Home/pot.jpg"
                  alt="Flower Pot"
                  onClick={() => handleImageClick('Flower_pot')}
                />
              </li>
              <li><h4>Flower Pot</h4></li>
            </ul>
          </div>
        </div>

        {/* Customers Review Section */}
        <div className="latest_products">
          <h2>Customers Review<span style={{ color: 'rgb(224, 20, 142)' }}></span></h2>
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam alias accusantium deserunt corporis voluptatum placeat ex laboriosam necessitatibus quisquam! Unde neque at itaque rerum natus suscipit, iusto earum quis nam!
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam alias accusantium deserunt corporis voluptatum placeat ex laboriosam necessitatibus quisquam! Unde neque at itaque rerum natus suscipit, iusto earum quis nam!
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
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam alias accusantium deserunt corporis voluptatum placeat ex laboriosam necessitatibus quisquam! Unde neque at itaque rerum natus suscipit, iusto earum quis nam!
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
              style={{ height: '150px', paddingTop: '8px', paddingBottom: '15px' }}
              src="/Images/Home/cmpLogo1.jpg"
              alt="logo"
              height="35px"
            />
          </div>
          <ul className="item_List" style={{ listStyleType: 'none' }}>
            <li><h4>Company</h4></li>
            <li>Overview</li>
            <li>Pricing</li>
            <li>Customers page</li>
            <li>Status Page</li>
          </ul>
          <ul className="item_List" style={{ listStyleType: 'none' }}>
            <li><h4>Location</h4></li>
            <li>Mumbai</li>
            <li>Pune</li>
            <li>Kolhapur</li>
            <li>Sangli</li>
          </ul>
          <ul className="item_List" style={{ listStyleType: 'none' }}>
            <li><h4>Contact</h4></li>
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
              <li><a href="/privacy" className="ft">Privacy Policy</a></li>
              <li><a href="/terms" className="ft">Terms and Condition</a></li>
              <li><a href="/security" className="ft">Security Information</a></li>
              <li><a href="/" className="ft"></a></li>
            </ul>
          </div>
        </footer>
      </div>
    </div>
  );
};
