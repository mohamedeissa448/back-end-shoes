var Supplier=require("../models/supplier-model");

module.exports={
    addSupplier:(req,res)=>{
        let newSupplier=new Supplier();
        newSupplier.Supplier_Name=req.body.Supplier_Name
        newSupplier.Supplier_Size_Variants=req.body.Supplier_Size_Variants
        newSupplier.Supplier_Color_Variants=req.body.Supplier_Color_Variants
        newSupplier.Supplier_DefaultImages_Media=req.body.Supplier_DefaultImages_Media
        newSupplier.Supplier_MainUnit=req.body.Supplier_MainUnit
        newSupplier.Supplier_MiddleUnit=req.body.Supplier_MiddleUnit
        newSupplier.Supplier_MiddleUnitCountInMainUnit=req.body.Supplier_MiddleUnitCountInMainUnit
        newSupplier.Supplier_SmallUnit=req.body.Supplier_SmallUnit
        newSupplier.Supplier_SmallUnitCountInMiddleUnit=req.body.Supplier_SmallUnitCountInMiddleUnit
        newSupplier.Supplier_SellingPrice=req.body.Supplier_SellingPrice
        newSupplier.Supplier_MinStocklimit=req.body.Supplier_MinStocklimit
        newSupplier.save((err,document)=>{
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

    editSupplier:(req,res)=>{
        var updatedSupplier={}
        updatedSupplier.Supplier_Name=req.body.Supplier_Name
        updatedSupplier.Supplier_Size_Variants=req.body.Supplier_Size_Variants
        updatedSupplier.Supplier_Color_Variants=req.body.Supplier_Color_Variants
        updatedSupplier.Supplier_DefaultImages_Media=req.body.Supplier_DefaultImages_Media
        updatedSupplier.Supplier_MainUnit=req.body.Supplier_MainUnit
        updatedSupplier.Supplier_MiddleUnit=req.body.Supplier_MiddleUnit
        updatedSupplier.Supplier_MiddleUnitCountInMainUnit=req.body.Supplier_MiddleUnitCountInMainUnit
        updatedSupplier.Supplier_SmallUnit=req.body.Supplier_SmallUnit
        updatedSupplier.Supplier_SmallUnitCountInMiddleUnit=req.body.Supplier_SmallUnitCountInMiddleUnit
        updatedSupplier.Supplier_SellingPrice=req.body.Supplier_SellingPrice
        updatedSupplier.Supplier_MinStocklimit=req.body.Supplier_MinStocklimit
        updatedSupplier.Supplier_IsActive=req.body.Supplier_IsActive;
        
            Supplier.findByIdAndUpdate(req.body['_id'],updatedSupplier,{new: true},
            (err,supplier)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(supplier) {
                    return res.send({
                        message:true,
                        data:{ newSupplier:supplier }
                    })
                }else{
                    return res.send({
                        message:"updated Supplier is null"
                    })
                }
            })
    },

    getAll:(req,res)=>{
        Supplier.find({})
        .exec((err,suppliers)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(suppliers) {
                return res.send(suppliers)
            }else{
                return res.send({
                    message:"suppliers are null"
                })
            }

        })
    },

    getAllActive:(req,res)=>{
        Supplier.find({Supplier_IsActive:true})
        .exec((err,activeSuppliers)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeSuppliers) {
                return res.send(activeSuppliers)
            }else{
                return res.send({
                    message:"Suppliers are null"
                })
            }

        })
    },

    getOneById:(req,res)=>{
        Supplier.findById(req.body['_id'])
        .exec((err,supplier)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(supplier) {
                return res.send(supplier)
            }else{
                return res.send({
                    message:"supplier is null"
                })
            }

        })
    }
}