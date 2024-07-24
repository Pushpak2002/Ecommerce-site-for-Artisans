const express = require('express');
const { body,validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'EccomerceSiteForArtisans';

// const mongoose = require('mongoose');
const router = express.Router();
const User = require('../Models/User');
const { default: mongoose } = require('mongoose');

//Create a new user
router.post('/', [
    body('Name','Min name length is 3').isLength({min: 3}),
    body('UserName','Min Username length is 3').isLength({min: 3}),
    body('Mail','Enter a valid Email').isEmail(),
    body('Password','Min password length is 5').isLength({min: 5}),
  ],async (req,res) => {
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
    console.log(authToken);
    res.json(authToken);
    }
    catch(error){
      console.error(error.message)
    }
    
})

module.exports = router