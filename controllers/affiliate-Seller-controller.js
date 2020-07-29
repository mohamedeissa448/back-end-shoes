var AffiliateSeller=require("../models/affiliate-seller-model");

module.exports={
    addAffiliateSeller:(req,res)=>{
        AffiliateSeller.getLastCode(function(err, seller) {
            if (seller) InsertIntoSeller(seller.AffiliateSeller_Code + 1);
            else InsertIntoSeller(1);
          });
          function InsertIntoSeller(NextCode) {
            let newSeller=new AffiliateSeller();
            newSeller.AffiliateSeller_Code=NextCode
            newSeller.AffiliateSeller_Type=req.body.AffiliateSeller_Type
            newSeller.AffiliateSeller_Name=req.body.AffiliateSeller_Name
            newSeller.AffiliateSeller_NationalID=req.body.AffiliateSeller_NationalID
            newSeller.AffiliateSeller_CommercialRegisterID=req.body.AffiliateSeller_CommercialRegisterID
            newSeller.AffiliateSeller_TaxID=req.body.AffiliateSeller_TaxID
            newSeller.AffiliateSeller_Email=req.body.AffiliateSeller_Email
            newSeller.AffiliateSeller_Password=req.body.AffiliateSeller_Password
            newSeller.AffiliateSeller_Phone=req.body.AffiliateSeller_Phone
            newSeller.AffiliateSeller_Address=req.body.AffiliateSeller_Address
            newSeller.AffiliateSeller_City=req.body.AffiliateSeller_City
            newSeller.AffiliateSeller_Country=req.body.AffiliateSeller_Country
            newSeller.AffiliateSeller_WebsiteURL=req.body.AffiliateSeller_WebsiteURL
            newSeller.AffiliateSeller_FaceBookPageURL=req.body.AffiliateSeller_FaceBookPageURL
            newSeller.AffiliateSeller_Class_Code=req.body.AffiliateSeller_Class_Code
            newSeller.AffiliateSeller_Rate=req.body.AffiliateSeller_Rate
            newSeller.AffiliateSeller_RevenuePercentage=req.body.AffiliateSeller_RevenuePercentage
            newSeller.AffiliateSeller_Bank_Name=req.body.AffiliateSeller_Bank_Name
            newSeller.AffiliateSeller_BankAccountNumber=req.body.AffiliateSeller_BankAccountNumber
            newSeller.AffiliateSeller_BankAccountHolderName=req.body.AffiliateSeller_BankAccountHolderName
            newSeller.AffiliateSeller_BankIBANNumber=req.body.AffiliateSeller_BankIBANNumber
            newSeller.AffiliateSeller_CreatedByUser=req.body.AffiliateSeller_CreatedByUser

            newSeller.save((err,document)=>{
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

  editAffiliateSeller:(req,res)=>{
       let updatedSeller={};
        updatedSeller.AffiliateSeller_Type=req.body.AffiliateSeller_Type
        updatedSeller.AffiliateSeller_Name=req.body.AffiliateSeller_Name
        updatedSeller.AffiliateSeller_NationalID=req.body.AffiliateSeller_NationalID
        updatedSeller.AffiliateSeller_CommercialRegisterID=req.body.AffiliateSeller_CommercialRegisterID
        updatedSeller.AffiliateSeller_TaxID=req.body.AffiliateSeller_TaxID
        updatedSeller.AffiliateSeller_Email=req.body.AffiliateSeller_Email
        updatedSeller.AffiliateSeller_Password=req.body.AffiliateSeller_Password
        updatedSeller.AffiliateSeller_Phone=req.body.AffiliateSeller_Phone
        updatedSeller.AffiliateSeller_Address=req.body.AffiliateSeller_Address
        updatedSeller.AffiliateSeller_City=req.body.AffiliateSeller_City
        updatedSeller.AffiliateSeller_Country=req.body.AffiliateSeller_Country
        updatedSeller.AffiliateSeller_WebsiteURL=req.body.AffiliateSeller_WebsiteURL
        updatedSeller.AffiliateSeller_FaceBookPageURL=req.body.AffiliateSeller_FaceBookPageURL
        updatedSeller.AffiliateSeller_Class_Code=req.body.AffiliateSeller_Class_Code
        updatedSeller.AffiliateSeller_Rate=req.body.AffiliateSeller_Rate
        updatedSeller.AffiliateSeller_RevenuePercentage=req.body.AffiliateSeller_RevenuePercentage
        updatedSeller.AffiliateSeller_Bank_Name=req.body.AffiliateSeller_Bank_Name
        updatedSeller.AffiliateSeller_BankAccountNumber=req.body.AffiliateSeller_BankAccountNumber
        updatedSeller.AffiliateSeller_BankAccountHolderName=req.body.AffiliateSeller_BankAccountHolderName
        updatedSeller.AffiliateSeller_BankIBANNumber=req.body.AffiliateSeller_BankIBANNumber
        updatedSeller.AffiliateSeller_CreatedByUser=req.body.AffiliateSeller_CreatedByUser
        updatedSeller.AffiliateSeller_IsActive=req.body.AffiliateSeller_IsActive
        var newvalues={
            $set:updatedSeller
        }
            AffiliateSeller.findByIdAndUpdate(req.body['_id'],newvalues,{new: true},
            (err,seller)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(seller) {
                    return res.send({
                        message:true,
                        data:{ newSeller:seller }
                    })
                }else{
                    return res.send({
                        message:"updated seller is null"
                    })
                }
            })
    },

    getAll:(req,res)=>{
        AffiliateSeller.find({})
        .exec((err,sellers)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(sellers) {
                return res.send(sellers)
            }else{
                return res.send({
                    message:"sellers are null"
                })
            }

        })
    },

    getAllActive:(req,res)=>{
        AffiliateSeller.find({AffiliateSeller_IsActive:true})
        .exec((err,activeSellers)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeSellers) {
                return res.send(activeSellers)
            }else{
                return res.send({
                    message:"activeSellers are null"
                })
            }

        })
    },

    getOneById:(req,res)=>{
        AffiliateSeller.findById(req.body['_id'])
        .exec((err,seller)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(seller) {
                return res.send(seller)
            }else{
                return res.send({
                    message:"seller is null"
                })
            }

        })
    },
    /***********************affiliate seller Contacts */
    getAffiliateSellerContactsByID:(req,res)=>{
        AffiliateSeller.findById( req.body._id)
      .select("AffiliateSeller_Contacts")
      .exec(function(err, seller) {
        if (err) {
          return res.send({
            message: err
          });
        } else if (seller) {
          res.json({
            message:true,
            data:{ seller:seller }
        });
        } else {
          res.send("not seller");
        }
      });
    },

    addContactsToAffiliateSellerByAffiliateSellerId:(req,res)=>{
        let newValues={
            $set:{
            AffiliateSeller_Contacts:req.body.AffiliateSeller_Contacts
            }
        }
        AffiliateSeller.findByIdAndUpdate(req.body._id,newValues,{upsert:true},function(err,seller){
            if (err) {
                return res.send({
                  message: err
                });
              } else if (seller) {
                res.json({
                  message:true,
                  data:{ seller:seller }
              });
              } else {
                res.send("not seller");
              }
        })
    },

    /***********************affiliate seller Payments */
    getAffiliateSellerPaymentsByID:(req,res)=>{
        AffiliateSeller.findById( req.body._id)
      .select("AffiliateSeller_PaymentLog")
      .populate({path:"AffiliateSeller_PaymentLog.Payment_PaidMethod",select:"PaymentMethod_Name"})
      .populate({path:"AffiliateSeller_PaymentLog.Payment_PaidByUser",select:"User_DisplayName"})
      .exec(function(err, seller) {
        if (err) {
          return res.send({
            message: err
          });
        } else if (seller) {
          res.json({
            message:true,
            data:{ seller:seller }
        });
        } else {
          res.send("not seller");
        }
      });
    },

    addPaymentsToAffiliateSellerByAffiliateSellerId:(req,res)=>{
        let newValues={
            $set:{
            AffiliateSeller_PaymentLog:req.body.AffiliateSeller_PaymentLog
            }
        }
        AffiliateSeller.findByIdAndUpdate(req.body._id,newValues,{upsert:true},function(err,seller){
            if (err) {
                return res.send({
                  message: err
                });
              } else if (seller) {
                res.json({
                  message:true,
                  data:{ seller:seller }
              });
              } else {
                res.send("not seller");
              }
        })
    }
}