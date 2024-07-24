import React from 'react'

export const Product = () => {
  return (
    <div>
    <div className="container">
    <div className="container1">
      {/* ---------------------------------------------------------------------- */}
      <div className="mid">
        <div className="left">
          <h1 style={{ color: 'rgb(39, 39, 82)' }}>Product Page</h1>
          <p>
            The art of handcrafting is deeply rooted in the lap of Indian history. Art is not a handicraft, it is the transmission of feeling the artist has experienced.
            Craft is the vehicle for expressing your vision. Craft is the visible edge of art. 
            Craft makes our homes more human.
            Craft is passionately creating something with your hands.
            Handmade items are not mass produced meaning each item has a unique display of craftsmanship.
          </p>
        </div>
        <div className="right">
          <img className="right_img" style={{ borderRadius: '10px' }} src="/Images/Home/asset 2.jpg" alt="asset 2" height="280px" width="500px" />
        </div>
      </div>
      {/* ---------------------------------------------------------------------- */}
      <div className="latest_products">
        <h2>Latest Products<span style={{ color: 'rgb(245, 78, 178)' }}></span></h2>
      </div>
      {/* ---------------------------------------------------------------------- */}
      <div className="products">
        <div className="product1">
          <ul className="l">
            <li><a href=""><img className="prd" style={{ height: '280px', width: '250px' }} src="/Images/Home/pot.jpg" alt=""/></a></li>
            <li><a className="text" href=""><h4>Flower Pot</h4></a></li>
          </ul>
          <ul className="l">
            <li><a href=""><img className="prd" style={{ height: '280px', width: '250px' }} src="/Images/Home/jewellery.jpg" alt=""/></a></li>
            <li><a className="text" href=""><h4>Jewellery</h4></a></li>
          </ul>
        </div>
        <div className="product2">
          <ul className="l">
            <li><a href=""><img className="prd" style={{ height: '280px', width: '250px' }} src="/Images/Home/painting.jpg" alt=""/></a></li>
            <li><a className="text" href=""><h4>Painting</h4></a></li>
          </ul>
          <ul className="l">
            <li><a href=""><img className="prd" style={{ height: '280px', width: '250px' }} src="/Images/Home/wool.jpg" alt=""/></a></li>
            <li><a className="text" href=""><h4>Wool Craft</h4></a></li>
          </ul>
        </div>
        <div className="product3">
          <ul className="l">
            <li><a href=""><img className="prd" style={{ height: '280px', width: '250px' }} src="/Images/Home/wood craft.jpg" alt=""/></a></li>
            <li><a className="text" href=""><h4>Wood Craft</h4></a></li>
          </ul>
          <ul className="l">
            <li><a href=""><img className="prd" style={{ height: '280px', width: '250px' }} src="/Images/Home/pot.jpg" alt=""/></a></li>
            <li><a className="text" href=""><h4>Flower Pot</h4></a></li>
          </ul>
        </div>
      </div>
      {/* ---------------------------------------------------------------------- */}
      <div className="latest_products">
        <h2>Customers Review<span style={{ color: 'rgb(224, 20, 142)' }}></span></h2>
      </div>
      {/* ---------------------------------------------------------------------- */}
      <div className="customer_review">
        <ul className="review">
          <li>
            <a href="">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
            </a>
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
            <a href="">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
            </a>
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
            <a href="">
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
              <span className="fa fa-star checked"></span>
            </a>
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
      <br />
      {/* ---------------------------------------------------------------------- */}
    </div>
    <div className="item">
      <div className="logo">
        <img style={{ height: '150px', paddingTop: '8px', paddingBottom: '15px' }} src="/Images/Home/cmpLogo1.jpg" alt="logo" height="35px" />
      </div>
      <ul className="item_list" style={{ listStyleType: 'none' }}>
        <li><h4>Company</h4></li>
        <li>Overview</li>
        <li>Pricing</li>
        <li>Customers page</li>
        <li>Status Page</li>
      </ul>
      <ul className="item_list" style={{ listStyleType: 'none' }}>
        <li><h4>Location</h4></li>
        <li>Mumbai</li>
        <li>Pune</li>
        <li>Kolhapur</li>
        <li>Sangli</li>
      </ul>
      <ul className="item_list" style={{ listStyleType: 'none' }}>
        <li><h4>Contact</h4></li>
        <li>+123-456-7890</li>
        <li>handcraft@gmail.com</li>
        <li>West Mumbai</li>
        <li>India</li>
        <br />
      </ul>
    </div>
    {/* ---------------------------------------------------------------------- */}
    {/* #FOOTER */}
    <footer>
      <div className="footer0">
        <ul className="list">
          <li><a className="ft" href="">Privacy Policy</a></li>
          <li><a className="ft" href="">Terms and Condition</a></li>
          <li><a className="ft" href="">Security Information</a></li>
          <li><a className="ft"></a></li>
          <li><a></a></li>
        </ul>
      </div>
    </footer>
  </div>
  </div>
  )
}
