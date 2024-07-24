const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    Name:{
        type : String,
        required : true
    },
    UserName :{
    type: String,
    required: true,
    unique: true
    },
    Mail:{
        type : String,
        required : true,
    },
    Password:{
        type : String,
        required : true
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;