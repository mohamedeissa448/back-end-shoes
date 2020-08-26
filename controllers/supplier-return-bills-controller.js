var BillReturn = require("../models/bill-return-model")
var Supplier = require("../models/supplier-model")
module.exports={
    addSupplierReturnBill:(req,res)=>{
        BillReturn.getLastCode(function(err, bill) {
            if (bill) InsertIntoBill(product.BillReturn_Code + 1);
            else InsertIntoBill(1);
        });
        function InsertIntoBill(NextCode) {
            let newBill=new BillReturn();
            newBill.BillReturn_Code =NextCode;
            newBill.BillReturn_Date = req.body.BillReturn_Date;
            newBill.BillReturn_Note=req.body.BillReturn_Note
            newBill.BillReturn_DoneBy_User=req.body.BillReturn_DoneBy_User;
            newBill.Bill_Supplier=req.body.Bill_Supplier
            newBill.BillReturn_Products=req.body.BillReturn_Products
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
                                SupplierFinancialTransaction_Date : billDocument.BillReturn_Date ,
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

editSupplierReturnBillById:(req,res)=>{
    var updatedSupplierBill={}
    updatedSupplierBill.BillReturn_Date = req.body.updatedSupplierBill.BillReturn_Date;
    updatedSupplierBill.BillReturn_Note=req.body.updatedSupplierBill.BillReturn_Note
    updatedSupplierBill.BillReturn_DoneBy_User=req.body.updatedSupplierBill.BillReturn_DoneBy_User;
    updatedSupplierBill.Bill_Supplier=req.body.updatedSupplierBill.Bill_Supplier
    updatedSupplierBill.BillReturn_Products=req.body.updatedSupplierBill.BillReturn_Products
    BillReturn.findByIdAndUpdate(req.body['_id'],updatedSupplierBill,{new: true},
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