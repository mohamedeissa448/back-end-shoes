var Product=require("../models/product-model");

module.exports={
    addProduct:(req,res)=>{
        const newProduct=new Product();
        newProduct.Product_Code=req.body.Product_Code
        newProduct.Product_Name=req.body.Product_Name
        newProduct.Product_Size_Variants=req.body.Product_Size_Variants
        newProduct.Product_Color_Variants=req.body.Product_Color_Variants
        newProduct.Product_DefaultImages_Media=req.body.Product_DefaultImages_Media
        newProduct.Product_MainUnit=req.body.Product_MainUnit
        newProduct.Product_MiddleUnit=req.body.Product_MiddleUnit
        newProduct.Product_MiddleUnitCountInMainUnit=req.body.Product_MiddleUnitCountInMainUnit
        newProduct.Product_SmallUnit=req.body.Product_SmallUnit
        newProduct.Product_SmallUnitCountInMiddleUnit=req.body.Product_SmallUnitCountInMiddleUnit
        newProduct.Product_SellingPrice=req.body.Product_SellingPrice
        newProduct.Product_MinStocklimit=req.body.Product_MinStocklimit
        newProduct.Product_IsActive=req.body.Product_IsActive;
        newProduct.save((err,document)=>{
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

    editProduct:(req,res)=>{
        var updatedProduct={}
        updatedProduct.Product_Code=req.body.Product_Code
        updatedProduct.Product_Name=req.body.Product_Name
        updatedProduct.Product_Size_Variants=req.body.Product_Size_Variants
        updatedProduct.Product_Color_Variants=req.body.Product_Color_Variants
        updatedProduct.Product_DefaultImages_Media=req.body.Product_DefaultImages_Media
        updatedProduct.Product_MainUnit=req.body.Product_MainUnit
        updatedProduct.Product_MiddleUnit=req.body.Product_MiddleUnit
        updatedProduct.Product_MiddleUnitCountInMainUnit=req.body.Product_MiddleUnitCountInMainUnit
        updatedProduct.Product_SmallUnit=req.body.Product_SmallUnit
        updatedProduct.Product_SmallUnitCountInMiddleUnit=req.body.Product_SmallUnitCountInMiddleUnit
        updatedProduct.Product_SellingPrice=req.body.Product_SellingPrice
        updatedProduct.Product_MinStocklimit=req.body.Product_MinStocklimit
        updatedProduct.Product_IsActive=req.body.Product_IsActive;
        
            Product.findByIdAndUpdate(req.body['_id'],updatedProduct,{new: true},
            (err,product)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(product) {
                    return res.send({
                        message:true,
                        data:{ newProduct:product }
                    })
                }else{
                    return res.send({
                        message:"updated product is null"
                    })
                }
            })
    },

    getAll:(req,res)=>{
        Product.find({}).exec((err,products)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(products) {
                return res.send(products)
            }else{
                return res.send({
                    message:"products are null"
                })
            }

        })
    },

    getAllActive:(req,res)=>{
        Product.find({Product_IsActive:true}).exec((err,activeProducts)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeProducts) {
                return res.send(activeProducts)
            }else{
                return res.send({
                    message:"products are null"
                })
            }

        })
    },

    getOneById:(req,res)=>{
        Product.findById(req.body['_id']).exec((err,product)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(product) {
                return res.send(product)
            }else{
                return res.send({
                    message:"product is null"
                })
            }

        })
    }
}