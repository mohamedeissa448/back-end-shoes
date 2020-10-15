var Supplier=require("../models/supplier-model");
var mongoose=require('mongoose');

module.exports={
    addSupplier:(req,res)=>{
        Supplier.getLastCode(function(err, supplier) {
            if (supplier) InsertIntoSupplier(supplier.Supplier_Code + 1);
            else InsertIntoSupplier(1);
          });
          function InsertIntoSupplier(NextCode) {
            let newSupplier=new Supplier();
            newSupplier.Supplier_Code=NextCode
            newSupplier.Supplier_Name=req.body.Supplier_Name
            newSupplier.Supplier_Email=req.body.Supplier_Email
            newSupplier.Supplier_Phone=req.body.Supplier_Phone
            newSupplier.Supplier_WebsiteURL=req.body.Supplier_WebsiteURL
            newSupplier.Supplier_FaceBookPageURL=req.body.Supplier_FaceBookPageURL
            newSupplier.Supplier_Country=req.body.Supplier_Country
            newSupplier.Supplier_City=req.body.Supplier_City
            newSupplier.Supplier_Address=req.body.Supplier_Address
            newSupplier.Supplier_AddressGPSLocation=req.body.Supplier_AddressGPSLocation
            newSupplier.Supplier_StoreAddress=req.body.Supplier_StoreAddress
            newSupplier.Supplier_StoreGPSLocation=req.body.Supplier_StoreGPSLocation
            newSupplier.Supplier_TimeOfDelivery=req.body.Supplier_TimeOfDelivery
            newSupplier.Supplier_Categories=req.body.Supplier_Categories
            newSupplier.Supplier_Class_Code=req.body.Supplier_Class_Code
            newSupplier.Supplier_Rate=req.body.Supplier_Rate
            newSupplier.Supplier_PaymentMethods=req.body.Supplier_PaymentMethods
            newSupplier.Supplier_WayOfDeliveries=req.body.Supplier_WayOfDeliveries
            newSupplier.Supplier_Contacts=req.body.Supplier_Contacts

            newSupplier.save((err,document)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else {
                    return res.send({
                        message:true
                    })
                }
            })   
        }  
        
  },

    editSupplier:(req,res)=>{
       let updatedSupplier={};
        updatedSupplier.Supplier_Name=req.body.Supplier_Name
        updatedSupplier.Supplier_Email=req.body.Supplier_Email
        updatedSupplier.Supplier_Phone=req.body.Supplier_Phone
        updatedSupplier.Supplier_WebsiteURL=req.body.Supplier_WebsiteURL
        updatedSupplier.Supplier_FaceBookPageURL=req.body.Supplier_FaceBookPageURL
        updatedSupplier.Supplier_Country=req.body.Supplier_Country
        updatedSupplier.Supplier_City=req.body.Supplier_City
        updatedSupplier.Supplier_Address=req.body.Supplier_Address
        updatedSupplier.Supplier_AddressGPSLocation=req.body.Supplier_AddressGPSLocation
        updatedSupplier.Supplier_StoreAddress=req.body.Supplier_StoreAddress
        updatedSupplier.Supplier_StoreGPSLocation=req.body.Supplier_StoreGPSLocation
        updatedSupplier.Supplier_TimeOfDelivery=req.body.Supplier_TimeOfDelivery
        updatedSupplier.Supplier_Categories=req.body.Supplier_Categories
        updatedSupplier.Supplier_Class_Code=req.body.Supplier_Class_Code
        updatedSupplier.Supplier_Rate=req.body.Supplier_Rate
        updatedSupplier.Supplier_PaymentMethods=req.body.Supplier_PaymentMethods
        updatedSupplier.Supplier_WayOfDeliveries=req.body.Supplier_WayOfDeliveries
       // updatedSupplier.Supplier_Contacts=req.body.Supplier_Contacts
        updatedSupplier.Supplier_IsActive=req.body.Supplier_IsActive
        var newvalues={
            $set:updatedSupplier
        }
            Supplier.findByIdAndUpdate(req.body['_id'],newvalues,{new: true},
            (err,supplier)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(supplier) {
                    return res.send({
                        message:true,
                        data:{ newSupplier:supplier }
                    })
                }else{
                    return res.send({
                        message:"updated Supplier is null"
                    })
                }
            })
    },

    getAll:(req,res)=>{
        Supplier.find({})
        .populate({path:"Supplier_Categories",select:"Category_Name"})
        .exec((err,suppliers)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(suppliers) {
                return res.send(suppliers)
            }else{
                return res.send({
                    message:"suppliers are null"
                })
            }

        })
    },

    getAllMinified :(req,res)=>{
      Supplier.find({})
      .select("Supplier_Code Supplier_Name")
      .exec((err,suppliers)=>{
          if(err){
              return res.send({
                  message:err
              })
          }else if(suppliers) {
              return res.send(suppliers)
          }else{
              return res.send({
                  message:"suppliers are null"
              })
          }

      })
  },

    getAllActive:(req,res)=>{
        Supplier.find({Supplier_IsActive:true})
        .exec((err,activeSuppliers)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeSuppliers) {
                return res.send(activeSuppliers)
            }else{
                return res.send({
                    message:"Suppliers are null"
                })
            }

        })
    },

    getOneById:(req,res)=>{
        Supplier.findById(req.body['_id'])
        .exec((err,supplier)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(supplier) {
                return res.send(supplier)
            }else{
                return res.send({
                    message:"supplier is null"
                })
            }

        })
    },
    /***********************Supplier Contacts */
    getSupplierContactsByID:(req,res)=>{
        Supplier.findById( req.body._id)
      .select("Supplier_Contacts")
      .exec(function(err, supplier) {
        if (err) {
          return res.send({
            message: err
          });
        } else if (supplier) {
          res.json({
            message:true,
            data:{ supplier:supplier }
        });
        } else {
          res.send("not Supplier");
        }
      });
    },

    addContactsToSupplierBySupplierId:(req,res)=>{
        let newValues={
            $set:{
            Supplier_Contacts:req.body.Supplier_Contacts
            }
        }
        Supplier.findByIdAndUpdate(req.body._id,newValues,{upsert:true},function(err,supplier){
            if (err) {
                return res.send({
                  message: err
                });
              } else if (supplier) {
                res.json({
                  message:true,
                  data:{ supplier:supplier }
              });
              } else {
                res.send("not Supplier");
              }
        })
    },
    /************** Supplier Transactions */
    getAllSupplierTransactions : (req,res) => {
        Supplier.findById( req.body._id)
      .select("Supplier_FinancialTransaction")
      .populate({path : "Supplier_FinancialTransaction.SupplierFinancialTransaction_Bill",select :"Bill_Code"})
      .populate({path : "Supplier_FinancialTransaction.SupplierFinancialTransaction_BillReturn",select :"BillReturn_Code"})
      .populate({path : "Supplier_FinancialTransaction.SupplierFinancialTransaction_Payment",select :"SupplierPayment_Date"})
      .exec(function(err, supplier) {
        if (err) {
          return res.send({
            message: err
          });
        } else if (supplier) {
          res.send(supplier);
        } else {
          res.send("not Supplier");
        }
      });

    },

    //delete single object from the array Supplier_FinancialTransaction
    deleteTransactionFromFinancialTransactions : (req,res)=>{
        Supplier.findById( req.body.SupplierId)
        .select("Supplier_FinancialTransaction")
        .exec(function(err, supplier) {
          if (err) {
            return res.send({
              message: err
            });
          } else if (supplier) {
            let isFound = false;
            let foundedObject ={}
            supplier.Supplier_FinancialTransaction.forEach((transaction,index)=>{
              if (  req.body.transactionID == transaction._id.toString() ){
                isFound = true
                foundedObject = transaction
              }
            });
            if(isFound)
              supplier.Supplier_FinancialTransaction.splice(supplier.Supplier_FinancialTransaction.indexOf(foundedObject),1)
              
            console.log("supplier.Supplier_FinancialTransaction",supplier.Supplier_FinancialTransaction)
            let updated = {$set :{ Supplier_FinancialTransaction : supplier.Supplier_FinancialTransaction }}
            Supplier.findByIdAndUpdate( req.body.SupplierId,updated  
            ,function(err,updatedDocument){
              if(err) return res.send({message : err});
              else
              return res.json({message : true});
            })
          } else {
            res.send("not supplier");
          }
        });
      },
  

      //fourth report
      getAllSupplierBillsAndBillReturnedFromDateToDate :(req,res) => {

        Supplier.aggregate( [
          { $match: { _id: mongoose.Types.ObjectId(req.body._id) } },
          { $unwind: "$Supplier_FinancialTransaction" },
          { $match: {
              "Supplier_FinancialTransaction.SupplierFinancialTransaction_Date": 
              {
                  $gte:new Date(req.body.searchDate.Start_Date),
                  $lt: new Date(req.body.searchDate.End_Date)
              },
              $or:[{
                "Supplier_FinancialTransaction.SupplierFinancialTransaction_Type" : "Bill",
                "Supplier_FinancialTransaction.SupplierFinancialTransaction_Type" : "Return Bill",
              }]
              
            }
          },
          {$sort: {"Supplier_FinancialTransaction.SupplierFinancialTransaction_Bill": 1}},
          {
            $lookup:
             {
               from: 'ogt_bill',
               localField: 'Supplier_FinancialTransaction.SupplierFinancialTransaction_Bill',
               foreignField: '_id',
               as: "Bill"
             },
             $lookup:
             {
               from: 'ogt_bill_return',
               localField: 'Supplier_FinancialTransaction.SupplierFinancialTransaction_BillReturn',
               foreignField: '_id',
               as: "BillReturn"
             }

          },
          { $unwind: "$Bill" },
          { $unwind: "$BillReturn" },
          { $project: {
                  '_id' :'$_id',
                  'trans' : "$Supplier_FinancialTransaction",
                  'Bill' : {Code:"$Bill.Bill_Code",BillDate:"$Bill.Bill_Date"},
                  'BillReturn' : {Code:"$BillReturn.BillReturn_Code",BillDate:"$BillReturn.BillReturn_Date"}
              }
          },
          { 
              $group: {
                  _id: '$_id',
                  sum: {$sum: { $multiply: ['$trans.SupplierFinancialTransaction_Amount','$trans.SupplierFinancialTransaction_MathSign']}},
                  count: { $sum: 1 },
                  transactions: {$push: {Trans:"$trans",Bill:"$Bill",BillReturn :"$BillReturn"}}
              }
          } 
        ]).exec(function(err,data){
            if(err)
                return res.send({error:err,message : false});
            else if(data){
                if(data.length >0)
                  return res.json({SupplierTransactions : data ,message : true});
                else
                return res.json({error : "No Data Found in This Period" ,message : false});
            } 
            else
                return res.json({error : "No Supplier Found" ,message : false})        
        })
      },

       //fifth report
       getAllSupplierBillsAndBillReturned :(req,res) => {

        Supplier.aggregate( [
          { $match: { _id: mongoose.Types.ObjectId(req.body._id) } },
          { $unwind: "$Supplier_FinancialTransaction" },
          { $match: {
              
              $or:[{
                "Supplier_FinancialTransaction.SupplierFinancialTransaction_Type" : "Bill",
                "Supplier_FinancialTransaction.SupplierFinancialTransaction_Type" : "Return Bill",
              }]
              
            }
          },
          {$sort: {"Supplier_FinancialTransaction.SupplierFinancialTransaction_Bill": 1}},
          {
            $lookup:
             {
               from: 'ogt_bill',
               localField: 'Supplier_FinancialTransaction.SupplierFinancialTransaction_Bill',
               foreignField: '_id',
               as: "Bill"
             },
             $lookup:
             {
               from: 'ogt_bill_return',
               localField: 'Supplier_FinancialTransaction.SupplierFinancialTransaction_BillReturn',
               foreignField: '_id',
               as: "BillReturn"
             }

          },
          { $unwind: "$Bill" },
          { $unwind: "$BillReturn" },
          { $project: {
                  '_id' :'$_id',
                  'trans' : "$Supplier_FinancialTransaction",
                  'Bill' : {Code:"$Bill.Bill_Code",BillDate:"$Bill.Bill_Date"},
                  'BillReturn' : {Code:"$BillReturn.BillReturn_Code",BillDate:"$BillReturn.BillReturn_Date"}
              }
          },
          { 
              $group: {
                  _id: '$_id',
                  sum: {$sum: { $multiply: ['$trans.SupplierFinancialTransaction_Amount','$trans.SupplierFinancialTransaction_MathSign']}},
                  count: { $sum: 1 },
                  transactions: {$push: {Trans:"$trans",Bill:"$Bill",BillReturn :"$BillReturn"}}
              }
          } 
        ]).exec(function(err,data){
            if(err)
                return res.send({error:err,message : false});
            else if(data){
                if(data.length >0)
                  return res.json({SupplierTransactions : data ,message : true});
                else
                return res.json({error : "No Data Found" ,message : false});
            } 
            else
                return res.json({error : "No Supplier Found" ,message : false})        
        })
      }
}