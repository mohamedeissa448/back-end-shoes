var Bill = require("../models/bill-model");
var Supplier = require("../models/supplier-model");
var Store = require("../models/store-model");
var ProductTransaction = require("../models/product-transaction-model");
var Ogt_Product = require("../models/product-model");

module.exports={
    addSupplierBill:(req,res)=>{
        const UpdateTransactionAndStore = async function() {
            var NextCode = await GetNexCode();
            var BillDocument = await  InsertIntoBills(NextCode);
            var isInserted = await saveAll(BillDocument);
            var modifySupplier = await updateSupplierFinantial(BillDocument);
            returnMessage();
            function GetNexCode(){
                return new Promise((resolve, reject) => {
                    Bill.getLastCode(function(err, BillItem) {
                        if (BillItem){
                            resolve(BillItem.Bill_Code + 1);
                        }
                        else {resolve(1)};
                    });
                })
            }

            function InsertIntoBills(NextCode) {
                return new Promise((resolve, reject) => {
                    const newBill = new Bill();
                    newBill.Bill_Code = NextCode;
                    newBill.Bill_Date = req.body.Bill_Date;
                    newBill.Bill_Note = req.body.Bill_Note
                    newBill.Bill_DoneBy_User = req.body.Bill_DoneBy_User;
                    newBill.Bill_Supplier = req.body.Bill_Supplier
                    newBill.Bill_TaxAmount = req.body.Bill_TaxAmount
                    newBill.Bill_TotalAmount = req.body.Bill_TotalAmount
                    newBill.Bill_FinalAmount = req.body.Bill_FinalAmount
                    newBill.Bill_PaymentMethod = req.body.Bill_PaymentMethod
                    newBill.Bill_Products = req.body.Bill_Products
                    newBill.save((err,billDocument)=>{
                        if(err){
                            return res.send({
                                message:err
                            })
                        }else { 
                            resolve(billDocument)
                        }
                    })
                })
            }
            
            function saveAll(document){
                return new Promise((resolve, reject) => {
                    document.Bill_Products.forEach(function(billProduct, index){
                        console.log(billProduct)
                        Ogt_Product.find({_id: billProduct.Product}).select("Product_SellingPrice")
                        .exec(function(err,ogt_product){
                            console.log(ogt_product)
                            Store.find({Store_Product : billProduct.Product, Size_Variant: billProduct.Size_Variant, Color_Variant:billProduct.Color_Variant })
                            .exec(function(err,storeProduct){
                                //we need to add documents to product transaction model
                                var CostToAdd = billProduct.Cost; 
                                const newProductTransaction=new ProductTransaction();
                                newProductTransaction.ProductTransaction_Date = document.IncreaseInventory_Date;
                                newProductTransaction.ProductTransaction_Product = billProduct.Product;
                                newProductTransaction.ProductTransaction_Size_Variant = billProduct.Size_Variant;
                                newProductTransaction.ProductTransaction_Color_Variant =billProduct.Color_Variant;
                                newProductTransaction.ProductTransaction_MathSign = 1;
                                newProductTransaction.ProductTransaction_Type = "Bill";
                                newProductTransaction.ProductTransaction_IncreaseInventory = document._id;
                                if(storeProduct && storeProduct.length >0){
                                    var TotalStoredQuantity = 0;
                                    storeProduct.forEach(function(storeProductItem, index){
                                        TotalStoredQuantity = TotalStoredQuantity + storeProductItem.Store_Quantity;
                                    })
                                    newProductTransaction.ProductTransaction_QuantityBeforAction = storeProduct[0].Store_Quantity;
                                    newProductTransaction.ProductTransaction_CostBeforAction = storeProduct[0].Store_Cost;
                                    newProductTransaction.ProductTransaction_SellPriceOnAction = ogt_product.Product_SellingPrice;
                                    newProductTransaction.ProductTransaction_QuantityAfterAction = TotalStoredQuantity + billProduct.Quantity;
                                    CostToAdd = ((storeProduct[0].Store_Cost * TotalStoredQuantity) + (billProduct.Cost * billProduct.Quantity))/ (TotalStoredQuantity + billProduct.Quantity)//11111;//needs modification
                                    newProductTransaction.ProductTransaction_CostAfterAction = CostToAdd;
                                    newProductTransaction.save(function(err,xx){});

                                    //update new cost to current Items on the store
                                    
                                    storeProduct.forEach(function(storeProductItem, index){
                                        storeProductItem.Store_Cost=CostToAdd;
                                        storeProductItem.save(function(err){});
                                    })

                                    //insert new store for the new incoming items
                                    let newStoreProduct = new Store();
                                    newStoreProduct.Store_Product=billProduct.Product
                                    newStoreProduct.Size_Variant=billProduct.Size_Variant
                                    newStoreProduct.Color_Variant=billProduct.Color_Variant
                                    newStoreProduct.Store_Quantity=billProduct.Quantity
                                    newStoreProduct.Store_Cost = CostToAdd;
                                    newStoreProduct.Store_StoragePlace = null;
                                    newStoreProduct.save(function(err){});
                                    if(index == document.Bill_Products.length -1){
                                        resolve(true);
                                    }
                                }else{
                                    newProductTransaction.ProductTransaction_QuantityBeforAction = 0;
                                    newProductTransaction.ProductTransaction_CostBeforAction = 0;
                                    newProductTransaction.ProductTransaction_SellPriceOnAction = ogt_product.Product_SellingPrice;
                                    newProductTransaction.ProductTransaction_QuantityAfterAction =  billProduct.Quantity;
                                    newProductTransaction.ProductTransaction_CostAfterAction = billProduct.Cost;//needs modification
                                    newProductTransaction.save(function(){})

                                    let newStoreProduct = new Store();
                                    newStoreProduct.Store_Product=billProduct.Product
                                    newStoreProduct.Size_Variant=billProduct.Size_Variant
                                    newStoreProduct.Color_Variant=billProduct.Color_Variant
                                    newStoreProduct.Store_Quantity=billProduct.Quantity
                                    newStoreProduct.Store_Cost=billProduct.Cost
                                    newStoreProduct.Store_StoragePlace = null;
                                    newStoreProduct.save(function(err){});
                                    if(index == document.Bill_Products.length -1){
                                        resolve(true);
                                    }
                                }
                            })
                        })
                    })
                    
                })
            }
            function updateSupplierFinantial(BillDocumant) {
                return new Promise((resolve, reject) => {
                    let updated = {
                        $push : {
                            Supplier_FinancialTransaction : {
                                SupplierFinancialTransaction_Date : BillDocumant.Bill_Date ,
                                SupplierFinancialTransaction_MathSign : 1 ,
                                SupplierFinancialTransaction_Amount  : BillDocumant.Bill_FinalAmount,
                                SupplierFinancialTransaction_Bill : BillDocumant._id,
                                SupplierFinancialTransaction_Type : "Bill"
                            }
                        }
                    };
                    Supplier.findByIdAndUpdate(BillDocumant.Bill_Supplier,updated,{upsert:true,new:true},(err,updatedSupplierDocumnet)=>{
                        if(err)
                            return res.json({ message : err});
                        else if(updatedSupplierDocumnet)   
                            resolve(true)
                        else
                            resolve(true);
                    });
                    
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

editSupplierBillById:(req,res)=>{
    var updatedSupplierBill={}
    updatedSupplierBill.Bill_Date = req.body.updatedSupplierBill.Bill_Date;
    updatedSupplierBill.Bill_Note=req.body.updatedSupplierBill.Bill_Note
    updatedSupplierBill.Bill_DoneBy_User=req.body.updatedSupplierBill.Bill_DoneBy_User;
    updatedSupplierBill.Bill_Supplier=req.body.updatedSupplierBill.Bill_Supplier
    updatedSupplierBill.Bill_TaxAmount=req.body.updatedSupplierBill.Bill_TaxAmount
    updatedSupplierBill.Bill_TotalAmount=req.body.updatedSupplierBill.Bill_TotalAmount
    updatedSupplierBill.Bill_FinalAmount=req.body.updatedSupplierBill.Bill_FinalAmount
    updatedSupplierBill.Bill_PaymentMethod=req.body.updatedSupplierBill.Bill_PaymentMethod
    updatedSupplierBill.Bill_Products=req.body.updatedSupplierBill.Bill_Products
    Bill.findByIdAndUpdate(req.body['_id'],updatedSupplierBill,{new: true},
        (err,updatedBillDocument)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedBillDocument) {
                return res.send({
                    message:true
                })
            }else{
                return res.send({
                    message:"updated BillDocument is null"
                })
            }
        })
},

getAll:(req,res)=>{
    Bill.find({})
    .populate({path :"Bill_Supplier"})
    .populate({path :"Bill_DoneBy_User"})
    .exec((err,increaseInventories)=>{
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
    Bill.findById(req.body['_id'])
    .populate({path :"Bill_Supplier"})
    .populate({path :"Bill_DoneBy_User"})
    .populate({path:"Bill_Products.Product", select:"Product_Name"})
    .populate({path:"Bill_Products.Size_Variant", select:"Size_Name"})
    .populate({path:"Bill_Products.Color_Variant", select:"Color_Name"})

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