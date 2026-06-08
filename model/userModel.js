const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        maxLength: 150,
        required: [true,"Name is required."]
    },
    email:{
        type: String,
        unique: true,
        required: [true,"Email is required."]
    },
    password:{
        type: String,
        required: [true,"Password is required."]
    },
    profile:{
        type: String
    },
    role:{
        type: String,
        enum: ['admin','user','vendor'],
        default:'user',
        required: true
    },
    isActive:{
        type: Boolean,
        default: true
    }
},{
    timestamps: true
});

const userModel = mongoose.model('user',userSchema);
module.exports = userModel;