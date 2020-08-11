var Order=require("../models/order-model");

module.exports={
    addAffiliateSellerOrder:(req,res)=>{
        Order.getLastCode(function(err, order) {
            if (order) InsertIntoOrder(order.Order_Code + 1);
            else InsertIntoOrder(1);
          });
          function InsertIntoOrder(NextCode) {
            let newOrder=new Order();
            newOrder.Order_Code=NextCode ;
            newOrder.Order_Date=req.body.Order_Date ;
            newOrder.Order_Note=req.body.Order_Note ;
            newOrder.Order_TotalProductSellingAmount=req.body.Order_TotalProductSellingAmount ;
            newOrder.Order_TotalProductCostAmount = req.body.Order_TotalProductCostAmount ;
            newOrder.Order_CreatedType = "AffiliateSeller" ;
            newOrder.Order_Customer = req.body.Order_Customer;
            newOrder.Order_AffiliateSeller = req.body.Order_AffiliateSeller ;
            newOrder.Order_AffiliateSellerRevenuePercentage = req.body.Order_AffiliateSellerRevenuePercentage ;
            newOrder.Order_AffiliateSellerRevenueAmount = req.body.Order_AffiliateSellerRevenueAmount ;
            newOrder.Order_Products = req.body.Order_Products ;
            newOrder.save((err,document)=>{
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

  editAffiliateSellerOrder:(req,res)=>{
       let updatedAffiliateSellerOrder={};
        updatedAffiliateSellerOrder.Order_Date=req.body.Order_Date;
        updatedAffiliateSellerOrder.Order_Note=req.body.Order_Note;
        updatedAffiliateSellerOrder.Order_TotalProductSellingAmount=req.body.Order_TotalProductSellingAmount;
        updatedAffiliateSellerOrder.Order_TotalProductCostAmount = req.body.Order_TotalProductCostAmount ;
        updatedAffiliateSellerOrder.Order_CreatedType = "AffiliateSeller" ;
        updatedAffiliateSellerOrder.Order_Customer = req.body.Order_Customer;
        updatedAffiliateSellerOrder.Order_AffiliateSeller = req.body.Order_AffiliateSeller ;
        updatedAffiliateSellerOrder.Order_AffiliateSellerRevenuePercentage = req.body.Order_AffiliateSellerRevenuePercentage ;
        updatedAffiliateSellerOrder.Order_AffiliateSellerRevenueAmount = req.body.Order_AffiliateSellerRevenueAmount ;
        updatedAffiliateSellerOrder.Order_Products = req.body.Order_Products ;
        var newvalues={
            $set:updatedAffiliateSellerOrder
        }
            Order.findByIdAndUpdate(req.body['_id'],newvalues,{new: true},
            (err,order)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(order) {
                    return res.send({
                        message:true,
                        data:{ newOrder:order }
                    })
                }else{
                    return res.send({
                        message:"updated order is null"
                    })
                }
            })
    },

    getAll:(req,res)=>{
        Order.find({})
        .exec((err,orders)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(orders) {
                return res.send(orders)
            }else{
                return res.send({
                    message:"orders are null"
                })
            }

        })
    },

    getOrdersByAffiliateSellerId :(req,res)=>{
        Order.find({ Order_AffiliateSeller : req.body._id})
        .exec((err,orders)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(orders) {
                return res.send(orders)
            }else{
                return res.send({
                    message:"orders are null"
                })
            }

        })
    },

    getOrdersByUserId :(req,res)=>{
        Order.find({ Order_InvntoryHandlingAssignedTo : req.body._id})
        .exec((err,orders)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(orders) {
                return res.send(orders)
            }else{
                return res.send({
                    message:"orders are null"
                })
            }

        })
    },

    
    getOneById:(req,res)=>{
        Order.findById(req.body['_id'])
        .exec((err,order)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(order) {
                return res.send(order)
            }else{
                return res.send({
                    message:"order is null"
                })
            }

        })
    },
    /***********************Customer Billing Order_Note */
    getCustomerBillingOrder_NoteByID:(req,res)=>{
    Order.findById( req.body._id)
      .select("Customer_BillingOrder_Note")
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

    addBillingOrder_NoteToCustomerByCustomerId:(req,res)=>{
        Order.findById(req.body._id)
        .exec(function(err,document){
            if (err) {
                return res.send({
                  message: err
                });
              } else if (document) {
                if(document.Customer_BillingOrder_Note){
                    document.Customer_BillingOrder_NoteLog.push({
                        Order_Note: document.Customer_BillingOrder_Note
                    });
                }
                document.Customer_BillingOrder_Note = req.body.Customer_BillingOrder_Note;
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

    /***********************Customer Shipping Order_Note */
    getCustomerShippingOrder_NoteByID:(req,res)=>{
        Order.findById( req.body._id)
          .select("Customer_ShippingOrder_Note")
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
    
        addShippingOrder_NoteToCustomerByCustomerId:(req,res)=>{
            Order.findById(req.body._id)
            .exec(function(err,document){
                if (err) {
                    return res.send({
                      message: err
                    });
                  } else if (document) {
                    if(document.Customer_ShippingOrder_Note){
                        document.Customer_ShippingOrder_NoteLog.push({
                            Order_Note: document.Customer_ShippingOrder_Note
                        });
                    }
                    document.Customer_ShippingOrder_Note = req.body.Customer_ShippingOrder_Note;
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