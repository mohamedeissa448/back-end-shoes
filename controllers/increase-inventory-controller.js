var IncreaseInventory = require("../models/increase-inventory-model")
var Store = require("../models/store-model");
var ProductTransaction = require("../models/product-transaction-model");
var Ogt_Product = require("../models/product-model")
module.exports={
    addIncreaseInventory:(req,res)=>{
        const UpdateTransactionAndStore = async function() {
            var NextCode = await GetNexCode();
            var IncreaseInventoryProducts = await  InsertIntoIncreaseInventory(NextCode);
            var isInserted = await saveAll(IncreaseInventoryProducts);
            returnMessage();
            function GetNexCode(){
                return new Promise((resolve, reject) => {
                    IncreaseInventory.getLastCode(function(err, IncreaseInventoryItem) {
                        if (IncreaseInventoryItem){ 
                            resolve(IncreaseInventoryItem.IncreaseInventory_Code + 1 );
                        }
                        else {resolve(1)};
                    });
                })
            }

            function InsertIntoIncreaseInventory(NextCode) {
                return new Promise((resolve, reject) => {
                    const newIncreaseInventory= new IncreaseInventory();
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
                            resolve(document)
                        }
                    })
                })
            }
            
            function saveAll(document){
                return new Promise((resolve, reject) => {
                    document.IncreaseInventory_Products.forEach(function(increaseInventoryProduct, index){
                        Ogt_Product.find({_id: increaseInventoryProduct.Product}).select("Product_SellingPrice")
                        .exec(function(err,ogt_product){
                            Store.find({Store_Product : increaseInventoryProduct.Product, Size_Variant: increaseInventoryProduct.Size_Variant, Color_Variant:increaseInventoryProduct.Color_Variant })
                            .exec(function(err,storeProduct){
                                //we need to add documents to product transaction model
                                var CostToAdd = increaseInventoryProduct.Cost; 
                                const newProductTransaction=new ProductTransaction();
                                newProductTransaction.ProductTransaction_Date = document.IncreaseInventory_Date;
                                newProductTransaction.ProductTransaction_Product = increaseInventoryProduct.Product;
                                newProductTransaction.ProductTransaction_Size_Variant = increaseInventoryProduct.Size_Variant;
                                newProductTransaction.ProductTransaction_Color_Variant =increaseInventoryProduct.Color_Variant;
                                newProductTransaction.ProductTransaction_MathSign = 1;
                                newProductTransaction.ProductTransaction_Type = "Increase Inventory";
                                newProductTransaction.ProductTransaction_IncreaseInventory = document._id;
                                if(storeProduct.length >0){
                                    var TotalStoredQuantity = 0;
                                    storeProduct.forEach(function(storeProductItem, index){
                                        TotalStoredQuantity = TotalStoredQuantity + storeProductItem.Store_Quantity;
                                    })
                                    newProductTransaction.ProductTransaction_QuantityBeforAction = storeProduct[0].Store_Quantity;
                                    newProductTransaction.ProductTransaction_CostBeforAction = storeProduct[0].Store_Cost;
                                    newProductTransaction.ProductTransaction_SellPriceOnAction = ogt_product.Product_SellingPrice;
                                    newProductTransaction.ProductTransaction_QuantityAfterAction = TotalStoredQuantity + increaseInventoryProduct.Quantity;
                                    CostToAdd = ((storeProduct[0].Store_Cost * TotalStoredQuantity) + (increaseInventoryProduct.Cost * increaseInventoryProduct.Quantity))/ (TotalStoredQuantity + increaseInventoryProduct.Quantity)//11111;//needs modification
                                    newProductTransaction.ProductTransaction_CostAfterAction = CostToAdd;
                                    newProductTransaction.save(function(err,xx){});

                                    //update new cost to current Items on the store
                                    
                                    storeProduct.forEach(function(storeProductItem, index){
                                        storeProductItem.Store_Cost=CostToAdd;
                                        storeProductItem.save(function(err){});
                                    })

                                    //insert new store for the new incoming items
                                    let newStoreProduct = new Store();
                                    newStoreProduct.Store_Product=increaseInventoryProduct.Product
                                    newStoreProduct.Size_Variant=increaseInventoryProduct.Size_Variant
                                    newStoreProduct.Color_Variant=increaseInventoryProduct.Color_Variant
                                    newStoreProduct.Store_Quantity=increaseInventoryProduct.Quantity
                                    newStoreProduct.Store_Cost = CostToAdd;
                                    newStoreProduct.Store_StoragePlace = null;
                                    newStoreProduct.save(function(err){});
                                    if(index == document.IncreaseInventory_Products.length -1){
                                        resolve(true);
                                    }
                                }else{
                                    newProductTransaction.ProductTransaction_QuantityBeforAction = 0;
                                    newProductTransaction.ProductTransaction_CostBeforAction = 0;
                                    newProductTransaction.ProductTransaction_SellPriceOnAction = ogt_product.Product_SellingPrice;
                                    newProductTransaction.ProductTransaction_QuantityAfterAction =  increaseInventoryProduct.Quantity;
                                    newProductTransaction.ProductTransaction_CostAfterAction = increaseInventoryProduct.Cost;//needs modification
                                    newProductTransaction.save(function(){})

                                    let newStoreProduct = new Store();
                                    newStoreProduct.Store_Product=increaseInventoryProduct.Product
                                    newStoreProduct.Size_Variant=increaseInventoryProduct.Size_Variant
                                    newStoreProduct.Color_Variant=increaseInventoryProduct.Color_Variant
                                    newStoreProduct.Store_Quantity=increaseInventoryProduct.Quantity
                                    newStoreProduct.Store_Cost=increaseInventoryProduct.Cost
                                    newStoreProduct.Store_StoragePlace = null;
                                    newStoreProduct.save(function(err){});
                                    if(index == document.IncreaseInventory_Products.length -1){
                                        resolve(true);
                                    }
                                }
                            })
                        })
                    })
                    
                })
            }
            function returnMessage(){
                res.send({
                    message:true
                });
            }
        }
        UpdateTransactionAndStore();
           
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