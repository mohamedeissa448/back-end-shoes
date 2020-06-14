var Size=require("../models/lut-size-variant-model");

module.exports={
    addSize:(req,res)=>{
        const newSize=new Size();
        newSize.Size_Name=req.body.Size_Name;
        newSize.Size_Description=req.body.Size_Description;
        newSize.Size_IsActive=req.body.Size_IsActive;
        newSize.save((err,document)=>{
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

    editSize:(req,res)=>{
        var updatedSize={}
        updatedSize.Size_Name=req.body.Size_Name;
        updatedSize.Size_Description=req.body.Size_Description;
        updatedSize.Size_IsActive=req.body.Size_IsActive;

            Size.findByIdAndUpdate(req.body['_id'],updatedSize,{new: true},
            (err,size)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(size) {
                    return res.send({
                        message:true,
                        data:{ newSize:size }
                    })
                }else{
                    return res.send({
                        message:"updated size is null"
                    })
                }
            })
    },

    getAll:(req,res)=>{
        Size.find({}).exec((err,sizes)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(sizes) {
                return res.send(sizes)
            }else{
                return res.send({
                    message:"sizes are null"
                })
            }

        })
    },

    getAllActive:(req,res)=>{
        Size.find({Size_IsActive:true}).exec((err,activeSizes)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeSizes) {
                return res.send(activeSizes)
            }else{
                return res.send({
                    message:"activeSizes are null"
                })
            }

        })
    },

    getOneById:(req,res)=>{
        Size.findById(req.body['_id']).exec((err,size)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(size) {
                return res.send(size)
            }else{
                return res.send({
                    message:"unit is null"
                })
            }

        })
    }
}