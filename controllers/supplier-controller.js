var Supplier=require("../models/supplier-model");

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
    }
}