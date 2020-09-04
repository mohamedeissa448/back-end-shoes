var BillReturn = require("../models/bill-return-model")
var Supplier = require("../models/supplier-model")
module.exports={
    addSupplierReturnBill:(req,res)=>{
        BillReturn.getLastCode(function(err, returnedBill) {
            if (returnedBill) InsertIntoReturnedBill(returnedBill.BillReturn_Code + 1);
            else InsertIntoReturnedBill(1);
        });
        function InsertIntoReturnedBill(NextCode) {
            let newReturnedBill=new BillReturn();
            newReturnedBill.BillReturn_Code =NextCode;
            newReturnedBill.BillReturn_Date = req.body.BillReturn_Date;
            newReturnedBill.BillReturn_Note=req.body.BillReturn_Note
            newReturnedBill.BillReturn_DoneBy_User=req.body.BillReturn_DoneBy_User;
            newReturnedBill.Bill_Supplier=req.body.Bill_Supplier
            newReturnedBill.BillReturn_Products=req.body.BillReturn_Products
            newReturnedBill.save((err,returnedBillDocument)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else {
                     //we need to update Supplier_FinancialTransaction in supplier model
                    let updated = {
                        $push : {
                            Supplier_FinancialTransaction : {
                                SupplierFinancialTransaction_Date : returnedBillDocument.BillReturn_Date ,
                                SupplierFinancialTransaction_MathSign : -1 ,
                                SupplierFinancialTransaction_Amount  : req.body.Bill_TotalAmount,
                                SupplierFinancialTransaction_BillReturn : returnedBillDocument._id,
                                SupplierFinancialTransaction_Type : "Return Bill"
                            }
                        }
                    };
                    Supplier.findByIdAndUpdate(returnedBillDocument.Bill_Supplier,updated,{upsert:true,new:true},(err,updatedSupplierDocumnet)=>{
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

editSupplierReturnBillById:(req,res)=>{
    var updatedSupplierReturnedBill={}
    updatedSupplierReturnedBill.BillReturn_Date = req.body.updatedSupplierReturnedBill.BillReturn_Date;
    updatedSupplierReturnedBill.BillReturn_Note=req.body.updatedSupplierReturnedBill.BillReturn_Note
    updatedSupplierReturnedBill.BillReturn_DoneBy_User=req.body.updatedSupplierReturnedBill.BillReturn_DoneBy_User;
    updatedSupplierReturnedBill.Bill_Supplier=req.body.updatedSupplierReturnedBill.Bill_Supplier
    updatedSupplierReturnedBill.BillReturn_Products=req.body.updatedSupplierReturnedBill.BillReturn_Products
    BillReturn.findByIdAndUpdate(req.body['_id'],updatedSupplierReturnedBill,{new: true},
        (err,updatedReturnedBillDocument)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedReturnedBillDocument) {
                Supplier.findById(updatedReturnedBillDocument.Bill_Supplier)
                .exec(function(err,supplierDocument){
                    if(err) return res.send(err);
                    else if(supplierDocument){
                        supplierDocument.Supplier_FinancialTransaction.forEach(transaction =>{
                            if(transaction.SupplierFinancialTransaction_BillReturn == updatedReturnedBillDocument._id ){
                                transaction.SupplierFinancialTransaction_Date = updatedReturnedBillDocument.BillReturn_Date ;
                                transaction.SupplierFinancialTransaction_Amount = req.body.updatedSupplierReturnedBill.Bill_TotalAmount ;
                            }
                        });
                        supplierDocument.save(function(err,updatedSupplierDocument){
                            if(err) return res.send(err);
                            else return res.json({message : true});
                        })
                    }
                    else
                        return res.json({ message : "couldnot find supplier"})
                })
            }else{
                return res.send({
                    message:"updated BillDocument is null"
                })
            }
        })
},

getAll:(req,res)=>{
    BillReturn.find({})
    .populate({path :"Bill_Supplier"})
    .populate({path :"BillReturn_DoneBy_User"})
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
    BillReturn.findById(req.body['_id'])
    .populate({path :"Bill_Supplier"})
    .populate({path :"BillReturn_DoneBy_User"})
    .populate({path:"BillReturn_Products.Product", select:"Product_Name"})
    .populate({path:"BillReturn_Products.Size_Variant", select:"Size_Name"})
    .populate({path:"BillReturn_Products.Color_Variant", select:"Color_Name"})

    .exec((err,returnedBill)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(returnedBill) {
            return res.send(returnedBill)
        }else{
            return res.send({
                message:"returnedBill is null"
            })
        }

    })
},
}