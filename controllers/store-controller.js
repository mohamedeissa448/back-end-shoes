var Store = require("../models/store-model");

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
    .populate({path:"Store_Product", select:"Product_Name"})
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
}