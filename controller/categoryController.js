const categoryModel = require('../model/categoryModel');
const subCategoryModel = require('../model/subCategoryModel');
const mongoose = require('mongoose');

const createCategory = async (req,res) => {
    const {cat_name} = req.body;
    const role = req.user.role;
    if(!cat_name) return res.status(400).json({
        success: false,
        message:'Category name not found.'
    })

    if(role !== 'admin') return res.status(400).json({
        success: false,
        message:'Not authorized.'
    })

    try{
        const existingCategory = await categoryModel.findOne({cat_name: cat_name});
        if(existingCategory) return res.status(400).json({
            success: false,
            message:'Category with this name already exists.'
        })

        const category = await categoryModel.create({cat_name});

        res.status(201).json({
            success: true,
            message:'New category added.',
            country
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const updateStatus = async (req,res) => {
    const {id ,status} = req.body;
    const role = req.user.role;

    if(!id || !status) return res.status(400).json({
        success: false,
        message:'Req. body not found.'
    })

    if(role !== 'admin') return res.status(400).json({
        success: false,
        message: 'Not authorised.'
    })

    const statusValidations = ['active','inactive'];
    if( statusValidations.includes(status)) return res.status(400).json({
        success: false,
        message:'Invalid status.'
    })

    const session = await mongoose.startSession();
    try{
        session.startTransaction();

        const subCategory = await subCategoryModel.updateMany({category: {$eq: id}}, {$set: {status: status}}, {session});

        const category = await categoryModel.findByIdAndUpdate(id ,{status: status},{new: true},{session});

        session.commitTransaction();
        res.status(200).json({
            success: true,
            message:'Status updated successfully.',
            category,
            subCategory
        })
    } catch(error) {
        session.abortTransaction();
        res.status(500).json({
            success: false,
            message: error.message
        })
    } finally{
        session.endSession();
    }
};

const deleteCategory = async (req,res) => {
    const {id} = req.params;
    const role = req.user.role;

    if(!id) return res.status(400).json({
        success: false,
        message:'Id is missing.'
    })

    if(role !== 'admin') return res.staus(400).json({
        success: false,
        message:'Not authorised.'
    });

    const session = await mongoose.startSession();
    try{
        await session.startTransaction();

        const subCategory = await subCategoryModel.deleteMany({category: {$eq: id}},{session});
        const category = await categoryModel.findByIdAndDelete(id,{session});

        await session.commitTransaction();

        res.status(200).json({
            success: true,
            message:'category and associated subcategories deleted.',
            category,
            subCategory
        })
    } catch(error){
        await session.abortTransaction();
        res.status(500).json({
            success: false,
            message: error.message
        })
    } finally {
        await session.endSession();
    }
};

const getAllCategory = async (req,res) => {
    const role = req.user.role;

    if(role !== 'admin') return res.staus(400).json({
        success: false,
        message:'Not authorised.'
    });

    try{
        const categories = await categoryModel.find();

        res.status(200).json({
            success: true,
            message: 'All categories.',
            categories
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getActiveCategory = async (req,res) => {
    try{
        const categories = await categoryModel.find({status: {$eq:'actve'}});

        res.status(200).json({
            success: true,
            message:'All active categories.',
            categories
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getinActiveCategory = async (req,res) => {
    const role = req.user.role;

    if(role !== 'admin') return res.staus(400).json({
        success: false,
        message:'Not authorised.'
    });
    try{
        const categories = await categoryModel.find({status: {$eq:'inactive'}});

        res.status(200).json({
            success: true,
            message:'All active categories.',
            categories
        });
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

module.exports = {createCategory ,updateStatus ,deleteCategory ,getAllCategory ,getActiveCategory ,getinActiveCategory};