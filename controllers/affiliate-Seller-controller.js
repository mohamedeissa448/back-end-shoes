var AffiliateSeller=require("../models/affiliate-seller-model");
var passwordHash = require("password-hash");
const jwt = require("jsonwebtoken");
const passport = require("passport");
var passwordHash = require("password-hash");

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
            //for user
            newSeller.User_Code = NextCode;
             newSeller.User_Name = req.body.AffiliateSeller_Name;
            newSeller.User_Password = passwordHash.generate(req.body.AffiliateSeller_Password);
            newSeller.User_DisplayName = req.body.AffiliateSeller_Name;
            newSeller.User_Permissions = [];
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
        updatedSeller.AffiliateSeller_IsActive=req.body.AffiliateSeller_IsActive;
        updatedSeller.User_Name = req.body.AffiliateSeller_Name;

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
                    seller.updatePassword(seller.AffiliateSeller_Password)
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
    },
    /********        Log In              *********** */
    login: function(req, res, next) {
        passport.authenticate("affiliateSellerLogin", function(err, user, info) {
          if (err) {
            return next(err);
          }
          if (!user) {
            return res.send(info);
          }
          req.logIn(user, function(err) {
            if (err) {
              return next(info);
            }
            else{
              user.User_Password = '';
              return res.send(user);
            }
            
          });
        })(req, res, next);
      },
      getAllUsers: function(request, res) {
        affiliateUser.find({}).exec(function(err, user) {
          if (err) {
            return res.send({
              message: err
            });
          } else if (user) {
            res.send(user);
          } else {
            res.send("not Users");
          }
        });
      },
      getAllUsersNumber:function(req,res){
        affiliateUser.find({}).count(function(err, count){
          console.log("Number of docs: ", count );
          if(err){
            return res.send({err:err})
          }else {
            return res.send({count:count})
          }
        });
      },
    
      getActiveUsers: function(request, response) {
        affiliateUser.find({ User_IsActive: 1 }).exec(function(err, user) {
          if (err) {
            return res.send({
              message: err
            });
          } else if (user) {
            response.send(user);
          } else {
            response.send("no Users");
          }
        });
      },
      addUser: function(request, res) {
        affiliateUser.getLastCode(function(err, user) {
          console.log("user",user)
          if (user) InsertIntoUser(user.User_Code + 1);
          else InsertIntoUser(1);
        });
    
        function InsertIntoUser(NextCode) {
          console.log("NextCode",NextCode)
          var newUser = new affiliateUser();
          newUser.User_Code = NextCode;
          newUser.User_Name = request.body.User_Name;
          newUser.User_Password = passwordHash.generate(request.body.User_Password);
          newUser.User_DisplayName = request.body.User_DisplayName;
          newUser.User_Permissions = [];
          newUser.User_IsActive = 1;
          console.log("new user",newUser)
          newUser.save(function(error, doneadd) {
            if (error) {
              return res.send({
                message: error
              });
            } else {
              return res.send({
                message: true
              });
            }
          });
        }
      },
    
      editUserPermissions: function(request, res) {
        var newvalues = {
          $set: {
            User_Permissions: request.body.User_Permissions
          }
        };
        var myquery = { User_Code: request.body.User_Code };
        affiliateUser.findOneAndUpdate(myquery, newvalues, function(err, field) {
          if (err) {
            return res.send({
              message: "Error"
            });
          }
          if (!field) {
            return res.send({
              message: "User not exists"
            });
          } else {
            return res.send({
              message: true
            });
          }
        });
      },
      changeMyPassword: function(request, res) {
        affiliateUser.findOne({ User_Code: request.body.User_Code }, function(err, user) {
          if (err) {
            res.send({ message: err });
          } else if (user) {
            if (!user.verifyPassword(request.body.old_password)) {
              res.send({ message: false });
            } else {
              user.updatePassword(request.body.new_password);
              res.send({ message: true });
            }
          } else {
            res.send({ message: "Error" });
          }
        });
      },
      changePassword: function(request, res) {
        affiliateUser.findOne({ User_Code: request.body.id }, function(err, user) {
          if (err) {
            res.send({ message: err });
          } else if (user) {
            user.updatePassword(request.body.password);
            res.send({ message: true });
          } else {
            res.send({ message: "unknown Error" });
          }
        });
      },
      /*
      login: (req, res) => {
        const token = authenticate.getToken({
          _id: req.user._id,
          isAdmin: req.user.isAdmin,
          username: req.user.username
        });
        res.statusCode = 200;
        res.setHeader("Content-Type", "application/json");
        res.json({ succcess: true, token: token, status: "loging Successful" });
      },
      signUp: (req, res, user) => {
          console.log("req.body",req.body)
        if (user) {
          username = user.username;
        } else {
          username = req.body.username;
        }
        User.register(
          new User({ username: username }),
          req.body.password,
          (err, user) => {
            if (err) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.json({ err: err });
            } else {
              passport.authenticate("local")(req, res, () => {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json({ succcess: true, status: "Registration Successful" });
              });
            }
          }
        );
      }*/
}