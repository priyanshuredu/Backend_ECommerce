const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    house_no:{
        type: String,
        required: true
    },
    address_line1:{
        type: String,
        require: true
    },
    address_line2:{
        type: String,
        required: true
    },
    city:{
        type: String,
        maxLength: 255,
        required: true
    },
    region:{
        type: String,
        maxLength: 255,
        required: true
    },
    postal_code:{
        type: Number,
        required: true
    },
    country:{
        type: mongoose.Types.ObjectId,
        ref: 'country'
    },
    user:{
        type: mongoose.Types.ObjectId,
        ref:'user'
    }
})

const addressModel = mongoose.model('address',addressSchema);
module.exports = addressModel;