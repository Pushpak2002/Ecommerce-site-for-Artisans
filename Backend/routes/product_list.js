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



//ROUTE: 2 all product list ...(login not required)
router.post('/productlist', [
    body('UserName', 'Product Category is required').notEmpty()
  ],fetchProduct, async (req,res) => {
  
      const errors = validationResult(req); 
      if (!errors.isEmpty()) {
        return res.status(404).json({errors: errors.array()});
      }

      return res.json(req.product);
  })



  //ROUTE: 3 get product using username users (login not requires)  temp
router.get('/tempproductlist',async (req,res) =>
  { 
   const { UserName } = req.query; // Access query parameter
 
   if (!UserName) {
     return res.status(400).json({ msg: 'Username is required' });
   }
 
   try {
     const user = await Product.find({ UserName: UserName.toLowerCase()  });
 
     if (!user) {
       return res.status(404).json({ msg: 'User not found' });
     }
 
     res.json(user);
   } catch (error) {
     console.error(error.message);
     res.status(500).send('Server Error');
   }
 })


  //ROUTE: 4 get product using productId users (login not requires)  temp
router.get('/tempproductlistbyId',async (req,res) => 
  { 
   const { ProdId } = req.query; // Access query parameter
 
   if (!ProdId) {
     return res.status(400).json({ msg: 'ProdId is required' });
   }
 
  // Convert string to ObjectId
  const productId = new mongoose.Types.ObjectId(ProdId);
   try {
     const prod = await Product.findById(productId).exec();
 
     if (!prod) {
       return res.status(404).json({ msg: 'Product not found' });
     }
 
     res.json(prod);
   } catch (error) {
     console.error(error.message);
     res.status(500).send('Server Error');
   }
 })


   //ROUTE: 5 get product using prodcat users (login not requires)  temp
router.get('/tempproductlistcat',async (req,res) =>
  { 
   const { ProdCat } = req.query; // Access query parameter
 
   if (!ProdCat) {
     return res.status(400).json({ msg: 'ProdCat is required' });
   }
 
   try {
     const prod = await Product.find({ ProdCat: ProdCat.toLowerCase()  });
    //  const prod = await Product.find({});

     if (!prod) {
       return res.status(404).json({ msg: 'Product not found' });
     }
 
     res.json(prod);
   } catch (error) {
     console.error(error.message);
     res.status(500).send('Server Error');
   }
 })





  module.exports = router;