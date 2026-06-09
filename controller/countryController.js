const countryModel = require('../model/countryModel');

const createCountry = async (req,res) => {
    const {country_name} = req.body;
    const role = req.user.role;
    if(!country_name) return res.status(400).json({
        success: false,
        message:'Country name not found.'
    })

    if(role !== 'admin') return res.status(400).json({
        success: false,
        message:'Not authorized.'
    })

    try{
        const country = await countryModel.create({country_name});

        res.status(201).json({
            success: true,
            message:'New country added.',
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

    try{
        const country = await countryModel.findByIdAndUpdate(id ,{status: status},{new: true});

        res.status(200).json({
            success: true,
            message:'Status updated successfully.',
            country
        })
    } catch(error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const deleteCountry = async (req,res) => {
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

    try{
        const country = await countryModel.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message:'Country deleted.',
            country
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getAllCountry = async (req,res) => {
    try{
        const countries = await countryModel.find();

        res.status(200).json({
            success: true,
            message: 'All contries.',
            countries
        })
    } catch(error){
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

module.exports = {createCountry ,updateStatus ,deleteCountry ,getAllCountry};