var Customer=require("../models/customer-model");

module.exports={
    addCustomer:(req,res)=>{
        Customer.getLastCode(function(err, customer) {
            if (customer) InsertIntoCustomer(customer.Customer_Code + 1);
            else InsertIntoCustomer(1);
          });
          function InsertIntoCustomer(NextCode) {
            let newCustomer=new Customer();
            newCustomer.Customer_Code=NextCode
            newCustomer.Customer_Name=req.body.Customer_Name
            newCustomer.Address=req.body.Address
            newCustomer.Customer_Status=req.body.Customer_Status
            newCustomer.Customer_BillingAddress=req.body.Customer_BillingAddress
            newCustomer.Customer_ShippingAddress=req.body.Customer_ShippingAddress
            newCustomer.save((err,document)=>{
                if(err){
                    return res.send({
                        status:false,
                        message:err
                    })
                }else {
                    return res.send({
                        status:true,
                        CustomerID:document._id
                    })
                }
            })   
        }  
        
  },

  editCustomer:(req,res)=>{
       let updatedCustomer={};
        updatedCustomer.Customer_Name=req.body.Customer_Name;
        updatedCustomer.Address=req.body.Address;
        updatedCustomer.Customer_Status=req.body.Customer_Status
        var newvalues={
            $set:updatedCustomer
        }
            Customer.findByIdAndUpdate(req.body['_id'],newvalues,{new: true},
            (err,customer)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(customer) {
                    return res.send({
                        message:true,
                        data:{ newCustomer:customer }
                    })
                }else{
                    return res.send({
                        message:"updated Customer is null"
                    })
                }
            })
    },

    getAll:(req,res)=>{
        Customer.find({})
        .exec((err,customers)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(customers) {
                return res.send(customers)
            }else{
                return res.send({
                    message:"customers are null"
                })
            }

        })
    },

    getAllActive:(req,res)=>{
        Customer.find({Customer_Status: 1})
        .exec((err,activeCustomers)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeCustomers) {
                return res.send(activeCustomers)
            }else{
                return res.send({
                    message:"activeCustomers are null"
                })
            }

        })
    },

    getOneById:(req,res)=>{
        Customer.findById(req.body['_id'])
        .exec((err,customer)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(customer) {
                return res.send(customer)
            }else{
                return res.send({
                    message:"customer is null"
                })
            }

        })
    },
    /***********************Customer Billing Address */
    getCustomerBillingAddressByID:(req,res)=>{
    Customer.findById( req.body._id)
      .select("Customer_BillingAddress")
      .exec(function(err, customer) {
        if (err) {
          return res.send({
            message: err
          });
        } else if (customer) {
          res.json({
            message:true,
            data:{ customer:customer }
        });
        } else {
          res.send("not customer");
        }
      });
    },

    addBillingAddressToCustomerByCustomerId:(req,res)=>{
        Customer.findById(req.body._id)
        .exec(function(err,document){
            if (err) {
                return res.send({
                  message: err
                });
              } else if (document) {
                if(document.Customer_BillingAddress){
                    document.Customer_BillingAddressLog.push({
                        Address: document.Customer_BillingAddress
                    });
                }
                document.Customer_BillingAddress = req.body.Customer_BillingAddress;
                    document.save(function(err,updatedDocument){
                        if (err) {
                            return res.send({
                              message: err
                            });
                          } else if (updatedDocument) {
                            res.json({
                              message:true,
                              data:{ customer:updatedDocument }
                          });
                          } else {
                            res.send("not customer");
                          }
                    })
              }else {
                res.send("not customer");
              }
        })
    },

    /***********************Customer Shipping Address */
    getCustomerShippingAddressByID:(req,res)=>{
        Customer.findById( req.body._id)
          .select("Customer_ShippingAddress")
          .exec(function(err, customer) {
            if (err) {
              return res.send({
                message: err
              });
            } else if (customer) {
              res.json({
                message:true,
                data:{ customer:customer }
            });
            } else {
              res.send("not customer");
            }
          });
        },
    
        addShippingAddressToCustomerByCustomerId:(req,res)=>{
            Customer.findById(req.body._id)
            .exec(function(err,document){
                if (err) {
                    return res.send({
                      message: err
                    });
                  } else if (document) {
                    if(document.Customer_ShippingAddress){
                        document.Customer_ShippingAddressLog.push({
                            Address: document.Customer_ShippingAddress
                        });
                    }
                    document.Customer_ShippingAddress = req.body.Customer_ShippingAddress;
                        document.save(function(err,updatedDocument){
                            if (err) {
                                return res.send({
                                  message: err
                                });
                              } else if (updatedDocument) {
                                res.json({
                                  message:true,
                                  data:{ customer:updatedDocument }
                              });
                              } else {
                                res.send("not customer");
                              }
                        })
                  }else {
                    res.send("not customer");
                  }
            })
        }
}