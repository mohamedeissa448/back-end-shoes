var Unit=require("../models/lut-product-unit-model");

module.exports={
    addProductUnit:(req,res)=>{
        const newUnit=new Unit();
        newUnit.ProductUnit_Name=req.body.ProductUnit_Name;
        newUnit.ProductUnit_Description=req.body.ProductUnit_Description;
        newUnit.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editProductUnitById:(req,res)=>{
        var updatedUnit={}
        updatedUnit.ProductUnit_Name=req.body.ProductUnit_Name;
        updatedUnit.ProductUnit_Description=req.body.ProductUnit_Description;
        updatedUnit.ProductUnit_IsActive=req.body.ProductUnit_IsActive;

            Unit.findByIdAndUpdate(req.body['_id'],updatedUnit,{new: true},
            (err,unit)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(unit) {
                    return res.send({
                        message:true,
                        data:{ newUnit:unit }
                    })
                }else{
                    return res.send({
                        message:"updated unit is null"
                    })
                }
            })
    },

    getAll:(req,res)=>{
        Unit.find({}).exec((err,units)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(units) {
                return res.send(units)
            }else{
                return res.send({
                    message:"units are null"
                })
            }

        })
    },

    getAllActive:(req,res)=>{
        Unit.find({ProductUnit_IsActive:true}).exec((err,activeUnits)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeUnits) {
                return res.send(activeUnits)
            }else{
                return res.send({
                    message:"units are null"
                })
            }

        })
    },

    getOneById:(req,res)=>{
        Unit.findById(req.body['_id']).exec((err,unit)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(unit) {
                return res.send(unit)
            }else{
                return res.send({
                    message:"unit is null"
                })
            }

        })
    }
}