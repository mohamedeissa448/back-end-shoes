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
    .populate({path:"Store_Product", select:"Product_Name Product_Code Product_DefaultImages_Media Product_SellingPrice"})
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
        .populate({path:"Store_StoragePlace"})
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
        Store.find({ 
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
            }else if(store && store.length >0) {
                var TotalStoredQuantity = 0;
                var TotalPendingQuantity = 0;
                store.forEach(function(storeProductItem, index){
                    TotalStoredQuantity = TotalStoredQuantity + storeProductItem.Store_Quantity;
                    TotalPendingQuantity = TotalPendingQuantity + storeProductItem.Store_PendingQuantity;
                })
                let AvilabelQuantity = TotalStoredQuantity - TotalPendingQuantity;
                let Store_Cost = store[0].Store_Cost;
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
    },

    searchProductInStore : (req,res)=>{
        Store.find(req.body)
        .populate({path:"Store_Product", select:"Product_Name Product_Code Product_DefaultImages_Media Product_SellingPrice"})
        .populate({path:"Size_Variant", select:"Size_Name"})
        .populate({path:"Color_Variant", select:"Color_Name"})
            .exec(function(err,products){
            if(err)
                return res.send(err);
            else if(products.length > 0)
                return res.json({products : products ,message : true})
            else
                return res.json({message : "No product is found"})        
        })
    },
    //reporting functions
    getStorProductMatrix : (req,res)=>{
        Store.aggregate( [
            {
                $lookup:
                 {
                   from: 'ogt_products',
                   localField: 'Store_Product',
                   foreignField: '_id',
                   as: "Product"
                 }
            },
            { $unwind : "$Product" },
            {
                $lookup:
                 {
                   from: 'lut_size_variants',
                   localField: 'Size_Variant',
                   foreignField: '_id',
                   as: "Size"
                 }
            },
            { $unwind : "$Size" },
            {
                $lookup:
                 {
                   from: 'lut_color_variants',
                   localField: 'Color_Variant',
                   foreignField: '_id',
                   as: "Color"
                 }
            },
            { $unwind : "$Color" },
            {
                $group: {
                    _id: { 
                    Product: "$Product.Product_Name",
                    ProductID: "$Product.Product_Identifier",
                    Color: "$Color",
                        
                    },
                    Quantity: { $addToSet: {Quantity:"$Store_Quantity",Size: "$Size.Size_Name"} }
                },
            },
            {
                $group: {
                    _id: {ProductName:"$_id.Product",
                    ProductCode: "$_id.ProductID"},
                    Colors: { $addToSet: { Color: "$_id.Color.Color_Name",ColorHexa: "$_id.Color.Color_HexaDecimalBasedValue",  Sizes:"$Quantity" } } 
                    
                },
            },
        ]).exec(function(err,data){
            if(err)
                return res.send(err);
            else if(data.length > 0){
                return res.json({products : data ,message : true});
            } 
            else
                return res.json({message : "No product is found"})        
        })
    }
}