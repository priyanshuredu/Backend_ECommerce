const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    cat_name:{
        type: String,
        unique: true,
        required: true
    },
    status:{
        type: String,
        enum:['actve','inactive'],
        default: 'active'
    }
})

const categoryModel = mongoose.model('category',categorySchema);
module.exports = categoryModel;