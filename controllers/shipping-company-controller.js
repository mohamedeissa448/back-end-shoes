var Shipping=require("../models/shipping-company-model");

module.exports={
    addShippingCompany:(req,res)=>{
        Shipping.getLastCode(function(err, shippingCompany) {
            if (shippingCompany) InsertIntoShippingCompany(shippingCompany.ShippingCompany_Code + 1);
            else InsertIntoShippingCompany(1);
          });
          function InsertIntoShippingCompany(NextCode) {
            let newShippingCompany=new Shipping();
            newShippingCompany.ShippingCompany_Code=NextCode
            newShippingCompany.ShippingCompany_Name=req.body.ShippingCompany_Name
            newShippingCompany.ShippingCompany_Email=req.body.ShippingCompany_Email
            newShippingCompany.ShippingCompany_Phone=req.body.ShippingCompany_Phone
            newShippingCompany.ShippingCompany_WebsiteURL=req.body.ShippingCompany_WebsiteURL
            newShippingCompany.ShippingCompany_FaceBookPageURL=req.body.ShippingCompany_FaceBookPageURL
            newShippingCompany.ShippingCompany_Country=req.body.ShippingCompany_Country
            newShippingCompany.ShippingCompany_City=req.body.ShippingCompany_City
            newShippingCompany.ShippingCompany_Address=req.body.ShippingCompany_Address
            newShippingCompany.ShippingCompany_Class_Code=req.body.ShippingCompany_Class_Code
            newShippingCompany.ShippingCompany_Rate=req.body.ShippingCompany_Rate

            newShippingCompany.save((err,document)=>{
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

  editShippingCompany:(req,res)=>{
       let updatedShippingCompany={};
        updatedShippingCompany.ShippingCompany_Name=req.body.ShippingCompany_Name
        updatedShippingCompany.ShippingCompany_Email=req.body.ShippingCompany_Email
        updatedShippingCompany.ShippingCompany_Phone=req.body.ShippingCompany_Phone
        updatedShippingCompany.ShippingCompany_WebsiteURL=req.body.ShippingCompany_WebsiteURL
        updatedShippingCompany.ShippingCompany_FaceBookPageURL=req.body.ShippingCompany_FaceBookPageURL
        updatedShippingCompany.ShippingCompany_Country=req.body.ShippingCompany_Country
        updatedShippingCompany.ShippingCompany_City=req.body.ShippingCompany_City
        updatedShippingCompany.ShippingCompany_Address=req.body.ShippingCompany_Address
        updatedShippingCompany.ShippingCompany_Class_Code=req.body.ShippingCompany_Class_Code
        updatedShippingCompany.ShippingCompany_Rate=req.body.ShippingCompany_Rate
        updatedShippingCompany.ShippingCompany_IsActive=req.body.ShippingCompany_IsActive
        var newvalues={
            $set:updatedShippingCompany
        }
            Shipping.findByIdAndUpdate(req.body['_id'],newvalues,{new: true},
            (err,shippingCompany)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(shippingCompany) {
                    return res.send({
                        message:true,
                        data:{ newShippingCompany:shippingCompany }
                    })
                }else{
                    return res.send({
                        message:"updated shippingCompany is null"
                    })
                }
            })
    },

    getAll:(req,res)=>{
        Shipping.find({})
        .exec((err,shippingCompanies)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(shippingCompanies) {
                return res.send(shippingCompanies)
            }else{
                return res.send({
                    message:"shippingCompanies are null"
                })
            }

        })
    },

    getAllActive:(req,res)=>{
        Shipping.find({ShippingCompany_IsActive:true})
        .exec((err,activeShippingCompanies)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeShippingCompanies) {
                return res.send(activeShippingCompanies)
            }else{
                return res.send({
                    message:"activeShippingCompanies are null"
                })
            }

        })
    },

    getOneById:(req,res)=>{
        Shipping.findById(req.body['_id'])
        .exec((err,shippingCompany)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(shippingCompany) {
                return res.send(shippingCompany)
            }else{
                return res.send({
                    message:"shippingCompany is null"
                })
            }

        })
    },
    /***********************Shipping Company Contacts */
    getShippingCompanyContactsByID:(req,res)=>{
        Shipping.findById( req.body._id)
      .select("ShippingCompany_Contacts")
      .exec(function(err, shippingCompany) {
        if (err) {
          return res.send({
            message: err
          });
        } else if (shippingCompany) {
          res.json({
            message:true,
            data:{ shippingCompany:shippingCompany }
        });
        } else {
          res.send("not shippingCompany");
        }
      });
    },

    addContactsToShippingCompanyByShippingCompanyId:(req,res)=>{
        let newValues={
            $set:{
                ShippingCompany_Contacts: req.body.ShippingCompany_Contacts
            }
        }
        Shipping.findByIdAndUpdate(req.body._id,newValues,{upsert:true},function(err,shippingCompany){
            if (err) {
                return res.send({
                  message: err
                });
              } else if (shippingCompany) {
                res.json({
                  message:true,
                  data:{ shippingCompany:shippingCompany }
              });
              } else {
                res.send("not shippingCompany");
              }
        })
    },
     /***********************Shipping Company Contactrs */
     getShippingCompanyContractsByID:(req,res)=>{
        Shipping.findById( req.body._id)
      .select("ShippingCompany_Contract")
      .exec(function(err, shippingCompany) {
        if (err) {
          return res.send({
            message: err
          });
        } else if (shippingCompany) {
          res.json({
            message:true,
            data:{ shippingCompany:shippingCompany }
        });
        } else {
          res.send("not shippingCompany");
        }
      });
    },

    addContractsToShippingCompanyByShippingCompanyId:(req,res)=>{
        Shipping.findById(req.body._id)
        .exec(function(err,document){
            if (err) {
                return res.send({
                  message: err
                });
              } else if (document) {
                if(document.ShippingCompany_Contract){
                    document.ShippingCompany_ContractHistory.push(document.ShippingCompany_Contract);
                }
                document.ShippingCompany_Contract = req.body.ShippingCompany_Contract;
                    document.save(function(err,updatedDocument){
                        if (err) {
                            return res.send({
                              message: err
                            });
                          } else if (updatedDocument) {
                            res.json({
                              message:true,
                              data:{ shippingCompany:updatedDocument }
                          });
                          } else {
                            res.send("not shippingCompany");
                          }
                    })
              }else {
                res.send("not shippingCompany");
              }
        })
      /*  let newValues={
            $set:{
                ShippingCompany_Contract: req.body.ShippingCompany_Contract
            }
        }
        Shipping.findByIdAndUpdate(req.body._id,newValues,{upsert:true},function(err,shippingCompany){
            if (err) {
                return res.send({
                  message: err
                });
              } else if (shippingCompany) {
                res.json({
                  message:true,
                  data:{ shippingCompany:shippingCompany }
              });
              } else {
                res.send("not shippingCompany");
              }
        })*/
    }
}