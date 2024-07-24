const express = require('express');
const { body,validationResult } = require('express-validator');

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
      let users_name = await User.findOne({UserName: req.body.UserName})
    if(users_name)
    {
      return res.status(400).json({error:"Username Already Exist"});
    }

    let users_mail = await User.findOne({Mail: req.body.Mail})
    if(users_mail)
    {
      return res.status(400).json({error:"Mail Already Exist"});
    }

    User.create({
        Name: req.body.Name,
        UserName: req.body.UserName,
        Mail: req.body.Mail,
        Password: req.body.Password
    }).then(user=>res.json(user)).catch(err=>console.error(err));
    }catch{
      console.error(error.message)
    }
    
})

module.exports = router