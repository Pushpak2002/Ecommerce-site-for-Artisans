const express = require('express');
const { body,validationResult } = require('express-validator');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const fetchProduct = require('../Middelware/fetchproduct');
const Product = require('../Models/Product');




const Products = require('../Models/Product');


//ROUTE:1 Add Product

router.post('/addproduct', [
    body('ProdName','Username can not be black').exists(),
    body('Price','Password can not be blank').exists(),
  ],async (req,res) => {
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({errors: errors.array()});
      }
  
      try{
        Product.create({
            ProdName: req.body.ProdName,
            ProdCat: req.body.ProdCat,
            UserName: req.body.UserName,
            Price: req.body.Price,
            Description: req.body.Description
        }).then(Product=>res.json(Product)).catch(err=>console.error(err));
      }
      catch(error){
        console.error(error.message);
        res.status(500).send("Product error");
      }
  })



//ROUTE: 2 Login user ...(login not required)
router.post('/productlist', [
    body('ProductCat', 'Product Category is required').notEmpty()
  ],fetchProduct, async (req,res) => {
  
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(404).json({errors: errors.array()});
      }
  })






  module.exports = router;