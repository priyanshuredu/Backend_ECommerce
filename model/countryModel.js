const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    country_name:{
        type: String,
        unique: true,
        required: true
    },
    status:{
        type: String,
        enum:["active","inactive"],
        default:'active'
    }
})

const countryModel = mongoose.model('country',countrySchema);
module.exports = countryModel;