const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const createUser = async (req,res) => {
    const {name ,email ,password} = req.body;
    
    if(!name || !email || !password) return res.status(404).json({
        message:'Request body not found.'
    });

    if(name.length > 150) return res.status(404).json({
        message:'Name is too long.'
    });

    try{
        const existingUser = await userModel.findOne({email});
        if(existingUser) return res.status(404).json({
            message:'User already exists with this mail.'
        })

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password ,salt);
        const user_data = {name ,email ,password: hash};

        const user = await userModel.create(user_data);

        res.status(201).json({
            message:'New user created.'
        })
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};

const login = async (req,res) => {
    const {email ,password} = req.body;
    if(!email || !password) return res.status(404).json({
        message:'Request body not found.'
    });

    try{
        const existingUser = await userModel.fondOne({email});
        if(!existingUser) return res.status(404).json({
            message:'No user found with this mail.'
        })

        const match = await bcrypt.compareSync(password ,existingUser.password);
        if(match){
            const user = {name: existingUser.name, email: existingUser.email};
            const token = await jwt.sign(user, process.env.SecretKey);

            res.cookie('Token',token);
            res.status(200).json({
                message:'Login success.',
                user,
                token
            })
        } else return res.status(404).json({
            message: "Password doesn't match."
        })
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
};

const resetPassword = async (req,res) => {

};

const verifyEmail = async (req,res) => {

};

const forgotPassword = async (req,res) => {

};

const updateProfile = async (req,res) => {

};

const getMe = async (req,res) => {

};

module.exports = {createUser ,login ,resetPassword ,verifyEmail ,forgotPassword ,updateProfile ,getMe};