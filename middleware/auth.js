const jwt = require('jsonwebtoken');
const userModel = require('../model/userModel');

export default (req, res, next) => {
    const authHeader = req.header.authorization;
    const cookieToken = req.cookie.Token;

    if(!authHeader && !cookieToken) return res.status(404).json({
        message:'Authorization header or token cookie not found.'
    })

    const token = authHeader?.split(' ')[1] || cookieToken;
    if(!token) return res.status(400).json({
        message:'No token found.'
    })

    try{
        const verify = jwt.verify(token ,process.env.SecretKey);
        if(verify){
            const id = verify._id;
            const user = await userModel.findById(id);

            if(!user) return res.status(404).json({
                message:'No user found in DB.'
            })

            res.user = user;
            next();
        }
    } catch(error){
        res.status(500).json({
            message: error.message
        })
    }
}