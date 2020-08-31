var Store = require("../models/store-model");
var Product=require("../models/product-model");

module.exports={
 
    editStoreById:(req,res)=>{
    var updatedStore={}
    updatedStore.Store_Product = req.body.updatedStore.Store_Product;
    updatedStore.Size_Variant = req.body.updatedStore.Size_Variant;
    updatedStore.Color_Variant = req.body.updatedStore.Color_Variant;
    updatedStore.Store_Quantity = req.body.updatedStore.Store_Quantity;
    updatedStore.Store_Cost = req.body.updatedStore.Store_Cost;
    updatedStore.Store_StoragePlace = req.body.updatedStore.Store_StoragePlace;

    Store.findByIdAndUpdate(req.body['_id'],updatedStore,{new: true},
        (err,store)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(store) {
                return res.send({
                    message:true,
                    data:{ newStore:store }
                })
            }else{
                return res.send({
                    message:"updated store is null"
                })
            }
        })
},

getAll:(req,res)=>{
    Store.find({})
    .populate({path:"Store_Product", select:"Product_Name Product_Code"})
    .populate({path:"Size_Variant", select:"Size_Name"})
    .populate({path:"Color_Variant", select:"Color_Name"})
    .populate({path:"Store_StoragePlace", select:"StoragePlace_DisplayName"})
    .exec((err,stores)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(stores) {
            return res.send(stores)
        }else{
            return res.send({
                message:"stores are null"
            })
        }

    })
},
getUnHousedProducts:(req,res)=>{
    Store.find({Store_StoragePlace: null})
    .populate({path:"Store_Product", select:"Product_Name Product_Code Product_Identifier"})
    .populate({path:"Size_Variant", select:"Size_Name"})
    .populate({path:"Color_Variant", select:"Color_Name"})
    .populate({path:"Store_StoragePlace", select:"StoragePlace_DisplayName"})
    .exec((err,stores)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(stores) {
            return res.send(stores)
        }else{
            return res.send({
                message:"stores are null"
            })
        }

    })
},
getHousedProducts:(req,res)=>{
    Store.find({Store_StoragePlace: { $ne: null }})
    .populate({path:"Store_Product", select:"Product_Name Product_Code Product_Identifier"})
    .populate({path:"Size_Variant", select:"Size_Name Size_TwoLettersIdentifier"})
    .populate({path:"Color_Variant", select:"Color_Name Color_ThreeLettersIdentifier"})
    .populate({path:"Store_StoragePlace", select:"StoragePlace_DisplayName"})
    .exec((err,stores)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(stores) {
            return res.send(stores)
        }else{
            return res.send({
                message:"stores are null"
            })
        }

    })
},
housingProduct:(req,res)=>{
    var updatedStore={};
    updatedStore.Store_StoragePlace = req.body.Store_StoragePlace;
    Store.findByIdAndUpdate(req.body['_id'],updatedStore,{new: true},(err,store)=>{
        if(err){
            return res.send({
                message:false, 
                error:err
            })
        }else if(store) {
            return res.send({
                message:true
            })
        }else{
            return res.send({
                message:false, 
                error:"updated store is null"
            })
        }
    })
},

getOneById:(req,res)=>{
    Store.findById(req.body['_id'])
    .populate({path:"Store_Product", select:"Product_Name"})
    .populate({path:"Size_Variant", select:"Size_Name"})
    .populate({path:"Color_Variant", select:"Color_Name"})
    .populate({path:"Store_StoragePlace", select:"StoragePlace_DisplayName"})
    .exec((err,store)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(store) {
            return res.send(store)
        }else{
            return res.send({
                message:"store is null"
            })
        }

    })
},
    getOneProductFromStore :(req,res)=>{
        Store.findOne({ 
            Store_Product: req.body.Store_Product ,
            Size_Variant:  req.body.Size_Variant,
            Color_Variant: req.body.Color_Variant
        })
        .exec((err,store)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(store) {
                return res.send(store)
            }else{
                return res.send({
                    message:"store product not found"
                })
            }

        })
    },
    getAvilabelQuantity:(req,res)=>{
        Store.findOne({ 
            Store_Product: req.body.Store_Product ,
            Size_Variant:  req.body.Size_Variant,
            Color_Variant: req.body.Color_Variant
        })
        .select("Store_PendingQuantity Store_Quantity Store_Cost")
        .exec((err,store)=>{
            if(err){
                return res.send({
                    status:false,
                    message:err
                })
            }else if(store) {
                let AvilabelQuantity = store.Store_Quantity - store.Store_PendingQuantity;
                let Store_Cost = store.Store_Cost;
                Product.findById(req.body['Store_Product']) 
                .select('Product_SellingPrice')       
                .exec((err,product)=>{
                    if(err){
                        return res.send({
                            status:false,
                            message:err
                        })
                    }else if(product) {
                        let SellingPrice = product.Product_SellingPrice;
                        return res.send({
                            status:true,
                            AvilabelQuantity: AvilabelQuantity,
                            SellingPrice : SellingPrice,
                            Store_Cost : Store_Cost
                        })
                    }else{
                        return res.send({
                            status:false,
                            message:"product not found"
                        })
                    }
        
                })
                
            }else{
                return res.send({
                    status:false,
                    message:"store product not found"
                })
            }

        })
    }
}