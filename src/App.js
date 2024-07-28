// src/App.js
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Home_page } from './MyComponents/Home_page';
import Profile from './MyComponents/Profile';
import { Cart } from './MyComponents/Cart';
import { Product_List } from './MyComponents/Product_List';
import Signin from './MyComponents/Signin';  // Correct the import statement

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home_page />} />
          <Route path="/Product_List/" element={<Product_List />} /> 
          <Route path="/profile/" element={<Profile />} />
          <Route path="/Cart/" element={<Cart />} />
          <Route path="/signin/" element={<Signin />} />  // Correct the import statement
        </Routes>
      </Router>
    </>
  );
}

export default App;
