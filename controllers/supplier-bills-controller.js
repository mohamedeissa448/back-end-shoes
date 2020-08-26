var Bill = require("../models/bill-model")
var Supplier = require("../models/supplier-model")
module.exports={
    addSupplierBill:(req,res)=>{
        Bill.getLastCode(function(err, bill) {
            if (bill) InsertIntoBill(product.Bill_Code + 1);
            else InsertIntoBill(1);
        });
        function InsertIntoBill(NextCode) {
            let newBill=new Bill();
            newBill.Bill_Code =NextCode;
            newBill.Bill_Date = req.body.Bill_Date;
            newBill.Bill_Note=req.body.Bill_Note
            newBill.Bill_DoneBy_User=req.body.Bill_DoneBy_User;
            newBill.Bill_Supplier=req.body.Bill_Supplier
            newBill.Bill_TaxAmount=req.body.Bill_TaxAmount
            newBill.Bill_TotalAmount=req.body.Bill_TotalAmount
            newBill.Bill_FinalAmount=req.body.Bill_FinalAmount
            newBill.Bill_PaymentMethod=req.body.Bill_PaymentMethod
            newBill.Bill_Products=req.body.Bill_Products
            newBill.save((err,billDocument)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else {
                     //we need to update Supplier_FinancialTransaction in supplier model
                    let updated = {
                        $push : {
                            Supplier_FinancialTransaction : {
                                SupplierFinancialTransaction_Date : billDocument.Bill_Date ,
                                SupplierFinancialTransaction_MathSign : 1 ,
                                SupplierFinancialTransaction_Amount  : billDocument.Bill_FinalAmount,
                                SupplierFinancialTransaction_Bill : billDocument._id,
                                SupplierFinancialTransaction_Type : "Bill"
                            }
                        }
                    };
                    Supplier.findByIdAndUpdate(billDocument.Bill_Supplier,updated,{upsert:true,new:true},(err,updatedSupplierDocumnet)=>{
                        if(err)
                            return res.json({ message : err});
                        else if(updatedSupplierDocumnet)   
                            return res.json({ message:true }) ;
                        else
                            return res.json({ message: "updatedSupplierDocumnet is null" });
                    });
                
                }
            })
        }

           
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