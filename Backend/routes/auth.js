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
const validateSignup = [
  body('Name', 'Name must be at least 3 characters long').isLength({ min: 3 }),
  body('UserName', 'Username must be at least 3 characters long').isLength({ min: 3 }),
  body('Mail', 'Enter a valid email').isEmail(),
  body('Password', 'Password must be at least 5 characters long').isLength({ min: 5 })
];

router.post('/Signup', async (req,res) => {
  console.log("I am here")
  //If there are errors, return bad request
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(404).json({errors: errors.array()});
  }
  const {Name,UserName,Mail,Password } = req.body;
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
  console.log("secPass = ", secPass)
  console.log("I am here")
  //New user add
  user = await User.create({
      Name: Name,
      UserName: UserName,
      Mail: Mail,
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
  body('UserName', 'Username cannot be blank').exists(),
  body('Password', 'Password cannot be blank').exists()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Changed to 400
  }

  const { UserName, Password } = req.body;
  try {
    let user = await User.findOne({ UserName });
    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const passwordComp = await bcrypt.compare(Password, user.Password);
    if (!passwordComp) {
      return res.status(400).json({ error: "Wrong password" });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    const authToken = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }); // Added expiration
    res.json({ authToken });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error"); // Fixed typo
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



//ROUTE: 4 get user using username users (login not requires)  temp
router.get('/getspecificuser',async (req,res) => 
 { 
  const { UserName } = req.query; // Access query parameter

  if (!UserName) {
    return res.status(400).json({ msg: 'Username is required' });
  }

  try {
    const user = await User.findOne({ UserName:UserName.toLowerCase()  });

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
})

//ROUTE: 5 get all users (login not requires)
router.get('/getalluser',async (req,res) => {
  try {
    
    const user = await User.find({})
    res.json(user); 
  
  } catch (error) {
    console.error(error.message);
        res.status(500).send("product error Occured");
  }
  })


module.exports = router