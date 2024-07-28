import React from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct import statement for jwt-decode

export const NavBar = (props) => {
  const navigate = useNavigate();

  const handleProfile = () => {
    const token = localStorage.getItem("authToken");
    console.log("token", token);

    if (!token) {
      navigate(`/signin/`);
      return;
    }

    try {
      // console.log("into try");
      const decoded = jwtDecode(token);
      if (decoded && decoded.user && decoded.user.id) {
        navigate('/Profile');
      } else {
        navigate('/signin');
      }
    } catch (error) {
      navigate('/signin');
    }
  };

  const handleCart = () => {
    navigate('/Cart?UserName=Admin');
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to log out?')) {
      localStorage.removeItem('authToken');
      navigate('/');
    }
  };

  const token = localStorage.getItem("authToken");

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">{props.title}</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" 
          aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="/">Home</a>
            </li>
          </ul>
        </div>
        <div className="ml-5">
          <span className="material-symbols-outlined" style={{ marginRight: '10px' }} onClick={() => alert("This page is under working")}>favorite</span>
          <span className="material-symbols-outlined" style={{ marginRight: '10px' }} onClick={handleCart}>Shopping_Cart</span>
          <span className="material-symbols-outlined" style={{ marginRight: '10px' }} onClick={handleProfile}>Person</span>
        </div>
        {token && (
          <button onClick={handleLogout}>Logout</button>
        )}
      </div>
    </nav>
  );
};
