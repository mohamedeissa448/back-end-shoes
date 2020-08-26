var SupplierPayment = require('../models/supplier-payments-model');
var Supplier = require("../models/supplier-model");
module.exports={
    /***********Size Variant************* */
    addSupplierPayment:(req,res)=>{
        const newPayment=new SupplierPayment();
        newPayment.SupplierPayment_Date=req.body.SupplierPayment_Date;
        newPayment.SupplierPayment_Supplier=req.body.SupplierPayment_Supplier;
        newPayment.SupplierPayment_DoneBy_User=req.body.SupplierPayment_DoneBy_User;
        newPayment.SupplierPayment_PaymentMethod=req.body.SupplierPayment_PaymentMethod;
        newPayment.SupplierPayment_Amount=req.body.SupplierPayment_Amount;
        newPayment.save((err,paymentDocument)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                //we need to update Supplier_FinancialTransaction in supplier model
                let updated = {
                    $push : {
                        Supplier_FinancialTransaction : {
                            SupplierFinancialTransaction_Date : paymentDocument.SupplierPayment_Date ,
                            SupplierFinancialTransaction_MathSign : -1 ,
                            SupplierFinancialTransaction_Amount  : paymentDocument.SupplierPayment_Amount,
                            SupplierFinancialTransaction_Payment : paymentDocument._id,
                            SupplierFinancialTransaction_Type : "Payment"
                        }
                    }
                };
                Supplier.findByIdAndUpdate(paymentDocument.SupplierPayment_Supplier,updated,{upsert:true,new:true},(err,updatedSupplierDocumnet)=>{
                    if(err)
                        return res.json({ message : err});
                    else if(updatedSupplierDocumnet)   
                        return res.json({ message:true }) ;
                    else
                        return res.json({ message: "updatedSupplierDocumnet is null" });
                });
                
            }
        })
    },

    editSupplierPayment:(req,res)=>{
        var updatedPayment={}
        updatedPayment.SupplierPayment_Date = req.body.SupplierPayment_Date;
        updatedPayment.SupplierPayment_Supplier = req.body.SupplierPayment_Supplier;
        updatedPayment.SupplierPayment_DoneBy_User = req.body.SupplierPayment_DoneBy_User;
        updatedPayment.SupplierPayment_PaymentMethod = req.body.SupplierPayment_PaymentMethod;
        updatedPayment.SupplierPayment_Amount = req.body.SupplierPayment_Amount;
        
            SupplierPayment.findByIdAndUpdate(req.body['_id'],updatedPayment,{new: true},
            (err,updatedPayment)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(updatedPayment) {
                    return res.send({
                        message:true,
                    })
                }else{
                    return res.send({
                        message:" updated Payment is null"
                    })
                }
            })
    },

    getAll:(req,res)=>{
        SupplierPayment.find({})
        .populate({path:"SupplierPayment_Supplier",select:"Supplier_Name Supplier_Code"})
        .populate({path:"SupplierPayment_DoneBy_User"})
        .populate({path:"SupplierPayment_PaymentMethod"})

        .exec((err,payments)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(payments) {
                return res.send(payments)
            }else{
                return res.send({
                    message:"payments are null"
                })
            }

        })
    },

    getOneById:(req,res)=>{
        SupplierPayment.findById(req.body['_id'])
        .populate({path:"SupplierPayment_Supplier",select:"Supplier_Name Supplier_Code"})
        .populate({path:"SupplierPayment_DoneBy_User"})
        .populate({path:"SupplierPayment_PaymentMethod"})
        .exec((err,payment)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(payment) {
                return res.json({payment:payment,message:true})
            }else{
                return res.send({
                    message:"unit is null"
                })
            }

        })
    },
}