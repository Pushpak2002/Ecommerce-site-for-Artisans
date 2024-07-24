const express = require('express');
// const mongoose = require('mongoose');
const router = express.Router();
const User = require('../Models/User');
const { default: mongoose } = require('mongoose');

//Create a new user
router.get('/',(req,res) => {
    console.log(req.body);
    const user = User(req.body);
    // console.log(user);
    user.save();
    res.send(req.body)
    // res.json(obj)
})

module.exports = router