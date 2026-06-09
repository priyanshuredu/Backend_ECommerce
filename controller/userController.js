const userModel = require('../model/userModel');
const jwt = require('jsonwebtoken');
const { createHashPassword, verifyHashPassword } = require('../services/encryption');

const createUser = async (req,res) => {
    const {name ,email ,password} = req.body;
    
    if(!name || !email || !password) return res.status(404).json({
        success: false,
        message:'Request body not found.'
    });

    if(name.length > 150) return res.status(404).json({
        success: false,
        message:'Name is too long.'
    });

    try{
        const existingUser = await userModel.findOne({email});
        if(existingUser) return res.status(404).json({
            success: false,
            message:'User already exists with this mail.'
        })

        const hash = createHashPassword(password);
        const user_data = {name ,email ,password: hash};

        const user = await userModel.create(user_data);

        res.status(201).json({
            success: true,
            message:'New user created.'
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const login = async (req,res) => {
    const {email ,password} = req.body;
    if(!email || !password) return res.status(404).json({
        success: false,
        message:'Request body not found.'
    });

    try{
        const existingUser = await userModel.findOne({email});
        if(!existingUser) return res.status(404).json({
            success: false,
            message:'No user found with this mail.'
        })

        const match = verifyHashPassword(password ,existingUser.password);
        if(match){
            const user = {_id: existingUser._id};
            const token = await jwt.sign(user, process.env.SecretKey);

            res.cookie('Token',token);
            res.status(200).json({
                success: true,
                message:'Login success.',
                user,
                token
            })
        } else return res.status(404).json({
            success: false,
            message: "Password doesn't match."
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const resetPassword = async (req,res) => {
    const {oldpassword ,password} = req.body;
    const id = req.user._id;

    if(!oldpassword || !password) return res.status(404).json({
        success: false,
        message:'Request body not found.'
    })

    if(oldpassword === password) return res.status(400).json({
        success: false,
        message:'Old and new password are same.'
    })

    try{
        const user = await userModel.findById(id);
        const match = verifyHashPassword(oldpassword ,user.password);
        if(match){
            const hash = createHashPassword(password);
            user.password = hash;
            user.save();

            return res.status(200).json({
                success: true,
                message:'Password updated successfully.'
            })
        } else return res.status(404).json({
            success: false,
            message: "Password doesn't match."
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const verifyEmail = async (req,res) => {

};

const forgotPassword = async (req,res) => {

};

const updateProfile = async (req,res) => {

};

const getMe = async (req,res) => {
    const id = req.user._id;
    try{
        const user = await userModel.findById(id);

        const {password ,...user_data} = user.toObject();
        res.status(200).json({
            success: true,
            message:'User fetch successfully.',
            user_data
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

module.exports = {createUser ,login ,resetPassword ,verifyEmail ,forgotPassword ,updateProfile ,getMe};