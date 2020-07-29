var IncreaseInventory = require("../models/increase-inventory-model")
var Store = require("../models/store-model");
var ProductTransaction = require("../models/product-transaction-model");
var Ogt_Product = require("../models/product-transaction-model")
module.exports={
    addIncreaseInventory:(req,res)=>{
        IncreaseInventory.getLastCode(function(err, increaseInventory) {
            if (increaseInventory) InsertIntoIncreaseInventory(increaseInventory.IncreaseInventory_Code + 1);
            else InsertIntoIncreaseInventory(1);
          });
        function InsertIntoIncreaseInventory(NextCode) {
            const newIncreaseInventory=new IncreaseInventory();
            newIncreaseInventory.IncreaseInventory_Code = NextCode;
            newIncreaseInventory.IncreaseInventory_Date = req.body.IncreaseInventory_Date;
            newIncreaseInventory.IncreaseInventory_Note = req.body.IncreaseInventory_Note;
            newIncreaseInventory.IncreaseInventory_DoneBy_User = req.body.IncreaseInventory_DoneBy_User;
            newIncreaseInventory.IncreaseInventory_Products = req.body.IncreaseInventory_Products;

            newIncreaseInventory.save((err,document)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else {
                    console.log("document",document);  
                      
                    saveAll();
                    function saveAll(  ){
                        var count = 0;
                        document.IncreaseInventory_Products.forEach(function(increaseInventoryProduct){
                            Ogt_Product.find({Product_Code: increaseInventoryProduct.Product})
                            .exec(function(err,ogt_product){
                                Store.findOne({Store_Product : increaseInventoryProduct.Product})
                            .exec(function(err,storeProduct){
                                //we need to add documents to product transaction model 
                                 const newProductTransaction=new ProductTransaction();
                                 newProductTransaction.ProductTransaction_Date = document.IncreaseInventory_Date;
                                 newProductTransaction.ProductTransaction_Product = increaseInventoryProduct.Product;
                                 newProductTransaction.ProductTransaction_Size_Variant = increaseInventoryProduct.Size_Variant;
                                 newProductTransaction.ProductTransaction_Color_Variant =increaseInventoryProduct.Color_Variant;
                                 newProductTransaction.ProductTransaction_MathSign = 1;
                                 newProductTransaction.ProductTransaction_Type = "Increase Inventory";
                                 newProductTransaction.ProductTransaction_IncreaseInventory = document._id;
                                 if(storeProduct){
                                    newProductTransaction.ProductTransaction_QuantityBeforAction = storeProduct.Store_Quantity;
                                    newProductTransaction.ProductTransaction_CostBeforAction = storeProduct.Store_Cost;
                                    newProductTransaction.ProductTransaction_SellPriceOnAction = ogt_product.Product_SellingPrice;
                                    newProductTransaction.ProductTransaction_QuantityAfterAction = storeProduct.Store_Quantity + increaseInventoryProduct.Quantity;
                                    newProductTransaction.ProductTransaction_CostAfterAction = 11111;//needs modification

                                 }else{
                                    newProductTransaction.ProductTransaction_QuantityBeforAction = 0;
                                    newProductTransaction.ProductTransaction_CostBeforAction = 0;
                                    newProductTransaction.ProductTransaction_SellPriceOnAction = ogt_product.Product_SellingPrice;
                                    newProductTransaction.ProductTransaction_QuantityAfterAction =  increaseInventoryProduct.Quantity;
                                    newProductTransaction.ProductTransaction_CostAfterAction = 11111;//needs modification

                                 }
                                 newProductTransaction.save(function(err,xx){
                                     console.log("xx",xx)
                                    count++;
                                    if( count == document.IncreaseInventory_Products.length ){
                                        document.IncreaseInventory_Products.forEach(function(prod){
                                            if(!storeProduct){
                                                  //we need to add documents to store model
                                            let newProduct=new Store();
                                            newProduct.Store_Product=prod.Product
                                            newProduct.Size_Variant=prod.Size_Variant
                                            newProduct.Color_Variant=prod.Color_Variant
                                            newProduct.Store_Quantity=prod.Quantity
                                            newProduct.Store_Cost=prod.Cost
                                            newProduct.Store_StoragePlace = null;
                                            newProduct.save(function(err){
                                                count++;
                                                if( count == document.IncreaseInventory_Products.length ){
                                                    return res.send({
                                                        message:true
                                                    });
                                                }
                                            });
                                            }else{
                                                storeProduct.Store_Quantity=newProductTransaction.ProductTransaction_QuantityAfterAction
                                                storeProduct.Store_Cost=newProductTransaction.ProductTransaction_CostAfterAction;
                                                storeProduct.save(function(err){
                                                    count++;
                                                    if( count == document.IncreaseInventory_Products.length ){
                                                        return res.send({
                                                            message:true
                                                        });
                                                    }
                                                })
                                            }
                                          
                                        })
                                    }
                             })
                                })
                            })
                            
                            
                            
                        });
                      }
                    
                }
            })
        }    
},

editIncreaseInventoryById:(req,res)=>{
    var updatedIncreaseInventory={}
    updatedIncreaseInventory.IncreaseInventory_Date = req.body.updatedIncreaseInventory.IncreaseInventory_Date;
    updatedIncreaseInventory.IncreaseInventory_Note = req.body.updatedIncreaseInventory.IncreaseInventory_Note;
    updatedIncreaseInventory.IncreaseInventory_DoneBy_User = req.body.updatedIncreaseInventory.IncreaseInventory_DoneBy_User;
    updatedIncreaseInventory.IncreaseInventory_Products = req.body.updatedIncreaseInventory.IncreaseInventory_Products;

    IncreaseInventory.findByIdAndUpdate(req.body['_id'],updatedIncreaseInventory,{new: true},
        (err,increaseInventory)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(increaseInventory) {
                return res.send({
                    message:true,
                    data:{ newIncreaseInventory:increaseInventory }
                })
            }else{
                return res.send({
                    message:"updated increaseInventory is null"
                })
            }
        })
},

getAll:(req,res)=>{
    IncreaseInventory.find({}).exec((err,increaseInventories)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(increaseInventories) {
            return res.send(increaseInventories)
        }else{
            return res.send({
                message:"increaseInventories are null"
            })
        }

    })
},


getOneById:(req,res)=>{
    IncreaseInventory.findById(req.body['_id'])
    .populate({path:"IncreaseInventory_Products.Product", select:"Product_Name"})
    .populate({path:"IncreaseInventory_Products.Size_Variant", select:"Size_Name"})
    .populate({path:"IncreaseInventory_Products.Color_Variant", select:"Color_Name"})

    .exec((err,increaseInventory)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(increaseInventory) {
            return res.send(increaseInventory)
        }else{
            return res.send({
                message:"increaseInventory is null"
            })
        }

    })
},
}