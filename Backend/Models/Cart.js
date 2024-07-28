const mongoose = require('mongoose');
const { Schema } = mongoose;

const CartSchema = new Schema({
    ProdId:{
        type : String,
        required : true
    },
    
    UserName:{
        type : String,
        required : true,
    }
    
});

const Cart = mongoose.model('cart', CartSchema);

module.exports = Cart;