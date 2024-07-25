const express = require('express');
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../Middelware/fetchuser');

const JWT_SECRET = 'EccomerceSiteForArtisans';

// const mongoose = require('mongoose');
const router = express.Router();
const User = require('../Models/User');
const { default: mongoose } = require('mongoose');

//ROUTE: 1 Create a new user no login required
router.post('/Signup', [
    body('Name','Min name length is 3').isLength({min: 3}),
    body('UserName','Min Username length is 3').isLength({min: 3}),
    body('Mail','Enter a valid Email').isEmail(),
    body('Password','Min password length is 5').isLength({min: 5}),
  ],async (req,res) => {

    //If there are errors, return bad request
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({errors: errors.array()});
    }

    try{
      let user = await User.findOne({UserName: req.body.UserName})
    if(user)
    {
      return res.status(400).json({error:"Username Already Exist"});
    }

     user = await User.findOne({Mail: req.body.Mail})
    if(user)
    {
      return res.status(400).json({error:"Mail Already Exist"});
    }


    //creating password hashing
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.Password, salt);

  

    //New user add
    user = await User.create({
        Name: req.body.Name,
        UserName: req.body.UserName,
        Mail: req.body.Mail,
        Password: secPass
    })
    const data = ({
      user:{
        id: user.id
      }
    })
    const authToken = jwt.sign(data,JWT_SECRET);
    res.json(authToken);
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Some Error Occured");
    }
    
})


//ROUTE: 2 Login user ...(login not required)
router.post('/login', [
  body('UserName','Username can not be black').exists(),
  body('Password','Password can not be blank').exists(),
],async (req,res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(404).json({errors: errors.array()});
    }


    const {UserName,Password} = req.body;
    try{
      let user = await User.findOne({UserName});
      if(!user)
      {
        return res.status(400).json({error: "User does not exist"});
      }

      const passwordComp = await bcrypt.compare(Password, user.Password);
      if(!passwordComp)
      {
        console.log(passwordComp);
        return res.status(400).json({error: "Wrong Password"});
      }

      const data = ({
        user:{
          id: user.id
        }
      })
      const authToken = jwt.sign(data,JWT_SECRET);
      res.json({authToken});
    }
    catch(error){
      console.error(error.message);
      res.status(500).send("Inter Error Occured");
    }
})


//ROUTE: 3 get logged in user details (login required)
router.post('/getuser',fetchuser,async (req,res) => {
try {
   userID = req.user.id;
  const user = await User.findById(userID).select("-Password")
  res.json(user); 

} catch (error) {
  console.error(error.message);
      res.status(500).send("Interal Error Occured");
}
})


//ROUTE: 4 get all users (login not requires)
router.get('/getalluser',async (req,res) => {
  try {
    
    const user = await User.find({})
    res.json(user); 
  
  } catch (error) {
    console.error(error.message);
        res.status(500).send("Interal Error Occured");
  }
  })


module.exports = router