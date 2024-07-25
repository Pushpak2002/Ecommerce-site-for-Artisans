const products = require('../Models/Product');


async function fetchProduct(req, res, next) {
    const { UserName } = req.body;
  
    try {
      const product = await products.find({ UserName: UserName});
  
      if (!product) {
        return res.status(404).json({ error: "Product not found" });
      }
  
      req.product = product;
      next();
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }

  module.exports = fetchProduct