// src/MyComponents/Signin.js
import React, { useState } from 'react';
import styles from './CSS/Signin.module.css';
import { useNavigate } from 'react-router-dom';
import { NavBar } from './NavBar';

const Signin = () => {
  const navigate = useNavigate();

    const [isSignUp, setIsSignUp] = useState(false);
    const [formData, setFormData] = useState({  
    });
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value
      });
    };
    // console.log("data is here")
    // console.log(formData)
  
    const handleSignUp = async (e) => {
      e.preventDefault();
      // You can add form validation here before making the API call
      console.log("formData",formData)
      try {
        const response = await fetch('http://localhost:5000/api/auth/Signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({Name:formData.name, UserName: formData.UserName, Mail: formData.email, Password: formData.password })
        }); 
        console.log(formData.name)
        if (response.ok) {
          const data = await response.json();
          // Handle successful signup (e.g., redirect, show message)
          console.log('Sign up successful:', data);
          navigate('/Profile');
        } else {
          // Handle errors
          console.error('Sign up failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error during sign up:', error);
      }
    };
  
    const handleSignIn = async (event) => {
        event.preventDefault();
      
        try {
          const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ UserName: formData.UserName, Password: formData.Password }), // Ensure correct field names
          });
          // console.log("response")
          // console.log(response)
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
          }
      
          const result = await response.json();
          console.log('Login successful', result);
          const user = formData.UserName;
          if(result.authToken)
          {
            localStorage.setItem('authToken', result.authToken);
            navigate('/Profile',{ state: { user } });
          }else{
            // console.error('Error:', error.message);
            console.log("Login Failed")
          }
          
        } catch (error) {
          console.error('Error:', error.message);
          
        }
      };
      

  const toggleSignUp = () => {
    setIsSignUp(true);
  };

  const toggleSignIn = () => {
    setIsSignUp(false);
  };

  return (
    <>
    <NavBar title="HandCraft" />
    <div className={styles.container}>
      {!isSignUp ? (
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSignIn}>
            <h1>Sign In</h1>
            {/* <div >
              <a href="#" className={styles.icon}><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className={styles.icon}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fab fa-github"></i></a>
              <a href="#" className={styles.icon}><i className="fab fa-linkedin-in"></i></a>
            </div> */}
            
            <input
              type="text"
              name="UserName"
              placeholder="UserName"
              value={formData.UserName}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="Password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <a href="#">Forget Your Password?</a>
            <button>Sign In</button>
            <div className={styles.signUpPrompt}>
              <span>Don't have an account?</span>
              <button onClick={toggleSignUp}>Sign Up</button>
            </div>
          </form>
        </div>
      ) : (
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSignUp}>
            <h1>Create Account</h1>
            <div >
              <a href="#" className={styles.icon}><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className={styles.icon}><i className="fab fa-facebook-f"></i></a>
              <a href="#" className={styles.icon}><i className="fab fa-github"></i></a>
              <a href="#" className={styles.icon}><i className="fab fa-linkedin-in"></i></a>
            </div>
            
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="UserName"
              placeholder="UserName"
              value={formData.UserName}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <button>Sign Up</button>
            <div className={styles.signInPrompt}>
              <span>Already have an account?</span>
              <button onClick={toggleSignIn}>Sign In</button>
            </div>
          </form>
        </div>
      )}
    </div>
    </>
  );
};

export default Signin;
