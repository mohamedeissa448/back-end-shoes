var Color=require("../models/lut-color-variant-model");

module.exports={
    addColor:(req,res)=>{
        const newColor=new Color();
        newColor.Color_Name=req.body.Color_Name;
        newColor.Color_Icon_Image_Url=req.body.Color_Icon_Image_Url;//might needs modification in future 
        newColor.Color_Description=req.body.Color_Description;
        newColor.Color_IsActive=req.body.Color_IsActive;
        newColor.save((err,document)=>{
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

    editColor:(req,res)=>{
        var updatedColor={}
        updatedColor.Color_Name=req.body.Color_Name;
        updatedColor.Color_Icon_Image_Url=req.body.Color_Icon_Image_Url;
        updatedColor.Color_Description=req.body.Color_Description;
        updatedColor.Color_IsActive=req.body.Color_IsActive
        
            Color.findByIdAndUpdate(req.body['_id'],updatedColor,{new: true},
            (err,color)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(color) {
                    return res.send({
                        message:true,
                        data:{ newColor:color }
                    })
                }else{
                    return res.send({
                        message:"updated color is null"
                    })
                }
            })
    },

    getAll:(req,res)=>{
        Color.find({}).exec((err,colors)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(colors) {
                return res.send(colors)
            }else{
                return res.send({
                    message:"colors are null"
                })
            }

        })
    },

    getAllActive:(req,res)=>{
        Color.find({Color_IsActive:true}).exec((err,activeColors)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeColors) {
                return res.send(activeColors)
            }else{
                return res.send({
                    message:"colors are null"
                })
            }

        })
    },

    getOneById: (req,res)=>{
        console.log("ccccccccccccccccccccc")
        Color.findById(req.body['_id']).exec((err,color)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(color) {
                return res.send(color)
            }else{
                return res.send({
                    message:"color is null"
                })
            }

        })
    }
}