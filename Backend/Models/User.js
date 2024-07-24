const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    Name:{
        type : String,
        required : true
    },
    UserName :{
    type: String,
    required: true
    },
    Mail:{
        type : String,
        required : true
    },
    Password:{
        type : String,
        required : true
    }
});

module.exports = mongoose.model('user',UserSchema);