const mongoose = require('mongoose');
const { Schema } = mongoose;

const ProductSchema = new Schema({
    ProdName:{
        type : String,
        required : true
    },
    ProdCat :{
    type: String,
    required: true,
    },
    UserName:{
        type : String,
        required : true,
    },
    Price:{
        type : String,
        required : true
    },
    Description:{
        type : String,
        required : true
    }
});

const Product = mongoose.model('product', ProductSchema);

module.exports = Product;