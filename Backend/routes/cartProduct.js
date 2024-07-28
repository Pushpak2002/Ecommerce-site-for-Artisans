const express = require('express');
const { body,validationResult } = require('express-validator');
const router = express.Router();
const { default: mongoose } = require('mongoose');
// const fetchProduct = require('../Middelware/fetchproduct');
const Cart = require('../Models/Cart');
// ROUTE:- 1 Add to Cart

router.get('/tempaddproduct',async (req,res) => {
    
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({errors: errors.array()});
      }
      const { UserId,ProdId } = req.query;
      try{
        const newCart = await Cart.create({
            
            UserId,
            ProdId
           
        });
        res.json(newCart)
      }
      catch(error){
        console.error(error.message);
        res.status(500).send("additing to cart error");
      }
  })


  //ROUTE: 3 get product using username users (login not requires)  temp
  router.get('/tempCartList',async (req,res) => 
    { 
     const { UserId } = req.query; // Access query parameter
     if (!UserId) {
       return res.status(400).json({ msg: 'UserId is required' });
     }
   
     try {
       const user = await Cart.find({ UserId: UserId});
   
       if (!user) {
         return res.status(404).json({ msg: 'User not found' });
       }
   
       res.json(user);
     } catch (error) {
       console.error(error.message);
       res.status(500).send('Server Error');
     }
   })


   module.exports = router;