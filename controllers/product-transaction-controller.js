var ProductTransaction = require("../models/increase-inventory-model")
var Store = require("../models/store-model");

module.exports={
    addProductTransaction:(req,res)=>{
            const newProductTransaction=new ProductTransaction();
            newProductTransaction.ProductTransaction_Date = req.body.ProductTransaction_Date;
            newProductTransaction.ProductTransaction_Product = req.body.ProductTransaction_Product;
            newProductTransaction.ProductTransaction_Size_Variant = req.body.ProductTransaction_Size_Variant;
            newProductTransaction.ProductTransaction_Color_Variant = req.body.ProductTransaction_Color_Variant;
            newProductTransaction.ProductTransaction_MathSign = req.body.ProductTransaction_MathSign;
            newProductTransaction.ProductTransaction_Type = req.body.ProductTransaction_Type;
            newProductTransaction.ProductTransaction_IncreaseInventory = req.body.ProductTransaction_IncreaseInventory;
            newProductTransaction.ProductTransaction_DecreaseInventory = req.body.ProductTransaction_DecreaseInventory;
            newProductTransaction.ProductTransaction_QuantityBeforAction = req.body.ProductTransaction_QuantityBeforAction;
            newProductTransaction.ProductTransaction_CostBeforAction = req.body.ProductTransaction_CostBeforAction;
            newProductTransaction.ProductTransaction_QuantityAfterAction = req.body.ProductTransaction_QuantityAfterAction;
            newProductTransaction.ProductTransaction_CostAfterAction = req.body.ProductTransaction_CostAfterAction;
            newProductTransaction.ProductTransaction_SellPriceOnAction = req.body.ProductTransaction_SellPriceOnAction;
            newProductTransaction.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                });
                            
            }
        })
            
},

editProductTransactionById:(req,res)=>{
    var updatedProductTransaction={}
    updatedProductTransaction.ProductTransaction_Date = req.body.updatedIncreaseInventory.ProductTransaction_Date;
    updatedProductTransaction.ProductTransaction_Product = req.body.updatedIncreaseInventory.ProductTransaction_Product;
    updatedProductTransaction.ProductTransaction_Size_Variant = req.body.updatedIncreaseInventory.ProductTransaction_Size_Variant;
    updatedProductTransaction.ProductTransaction_Color_Variant = req.body.updatedIncreaseInventory.ProductTransaction_Color_Variant;
    updatedProductTransaction.ProductTransaction_MathSign = req.body.ProductTransaction_MathSign;
    updatedProductTransaction.ProductTransaction_Type = req.body.updatedIncreaseInventory.ProductTransaction_Type;
    updatedProductTransaction.ProductTransaction_IncreaseInventory = req.body.updatedIncreaseInventory.ProductTransaction_IncreaseInventory;
    updatedProductTransaction.ProductTransaction_DecreaseInventory = req.body.updatedIncreaseInventory.ProductTransaction_DecreaseInventory;
    updatedProductTransaction.ProductTransaction_QuantityBeforAction = req.body.updatedIncreaseInventory.ProductTransaction_QuantityBeforAction;
    updatedProductTransaction.ProductTransaction_CostBeforAction = req.body.updatedIncreaseInventory.ProductTransaction_CostBeforAction;
    updatedProductTransaction.ProductTransaction_QuantityAfterAction = req.body.updatedIncreaseInventory.ProductTransaction_QuantityAfterAction;
    updatedProductTransaction.ProductTransaction_CostAfterAction = req.body.updatedIncreaseInventory.ProductTransaction_CostAfterAction;
    updatedProductTransaction.ProductTransaction_SellPriceOnAction = req.body.updatedIncreaseInventory.ProductTransaction_SellPriceOnAction;

    ProductTransaction.findByIdAndUpdate(req.body['_id'],updatedProductTransaction,{new: true},
        (err,productTransaction)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(productTransaction) {
                return res.send({
                    message:true,
                    data:{ newProductTransaction:productTransaction }
                })
            }else{
                return res.send({
                    message:"updated ProductTransaction is null"
                })
            }
        })
},

getAll:(req,res)=>{
    ProductTransaction.find({}).exec((err,productTransactions)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(productTransactions) {
            return res.send(productTransactions)
        }else{
            return res.send({
                message:"productTransactions are null"
            })
        }

    })
},


getOneById:(req,res)=>{
    ProductTransaction.findById(req.body['_id'])
    .populate({path:"ProductTransaction_Product", select:"Product_Name"})
    .populate({path:"ProductTransaction_Size_Variant", select:"Size_Name"})
    .populate({path:"ProductTransaction_Color_Variant", select:"Color_Name"})
    .populate({path:"ProductTransaction_IncreaseInventory"})
    .populate({path:"ProductTransaction_DecreaseInventory"})

    .exec((err,productTransaction)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(productTransaction) {
            return res.send(productTransaction)
        }else{
            return res.send({
                message:"productTransaction is null"
            })
        }

    })
},
}