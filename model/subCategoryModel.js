const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
    subCat_name:{
        type: String,
        unique: true,
        required: true
    },
    category:{
        type: mongoose.Types.ObjectId,
        ref:'category',
        require: true
    },
    status:{
        type: String,
        enum:['active','inactive'],
        default:'active'
    }
})

const subCategoryModel = mongoose.model('subCategory',subCategorySchema);
module.exports = subCategoryModel;