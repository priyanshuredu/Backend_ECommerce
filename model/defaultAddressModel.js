const mongoose = require('mongoose');

const defaultAddressSchema = new mongoose.Schema({
    address:{
        type: mongoose.Types.ObjectId,
        ref:'address'
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:'user'
    }
})