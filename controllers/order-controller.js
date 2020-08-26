var Order=require("../models/order-model");
var AffiliateSeller=require("../models/affiliate-seller-model");
var Store = require("../models/store-model")
module.exports={
    addAffiliateSellerOrder:(req,res)=>{
        AffiliateSeller.findById(req.body.Order_AffiliateSeller)
        .exec(function(err,seller){
            if(err){
                return res.send({
                    message1:err
                })
            }else if(seller){
                console.log("1")
                Order.getLastCode(function(err, order) {
                    if (order) InsertIntoOrder(order.Order_Code + 1);
                    else InsertIntoOrder(1);
                  });
                  function InsertIntoOrder(NextCode) {
                    console.log("2")
                    let newOrder=new Order();
                    newOrder.Order_Code=NextCode ;
                    newOrder.Order_Date=req.body.Order_Date ;
                    newOrder.Order_Note=req.body.Order_Note ;
                    newOrder.Order_TotalProductSellingAmount= req.body.Order_TotalProductSellingAmount ;
                    newOrder.Order_TotalProductCostAmount = req.body.Order_TotalProductCostAmount ;
                    newOrder.Order_CreatedType = "AffiliateSeller" ;
                    newOrder.Order_Customer = req.body.Order_Customer;
                    newOrder.Order_AffiliateSeller = req.body.Order_AffiliateSeller ;
                    newOrder.Order_AffiliateSellerRevenuePercentage = seller.AffiliateSeller_RevenuePercentage ;
                    newOrder.Order_AffiliateSellerRevenueAmount = seller.AffiliateSeller_RevenuePercentage * 0.01 * req.body.Order_TotalProductSellingAmount ;
                    newOrder.Order_Products = req.body.Order_Products ;
                    newOrder.Customer_ShippingAddress = req.body.Customer_ShippingAddress;
                    newOrder.Order_Status = "Created";
                    newOrder.save((err,document)=>{
                        if(err){
                            return res.send({
                                message2:err
                            })
                        }else {
                            console.log("3")
                            //we need to add this order to  AffiliateSeller_CreatedOrders propery in affiliate seller model
                            seller.AffiliateSeller_CreatedOrders.push({
                                Order_TotalAmount: document.Order_TotalProductSellingAmount ,
                                Order_AffiliateSellerRevenuePercentage: document.Order_AffiliateSellerRevenuePercentage,
                                Order_AffiliateSellerRevenueAmount: document.Order_AffiliateSellerRevenueAmount,
                                Order_RefrencedOrder: document._id
                            });
                            seller.save(function(err,affiliateSellerUpdatedDocument){
                                if(err){
                                    return res.send({
                                        message55:err
                                    })
                                }else {
                                    var count = 0;
                            //we need to update store Store_PendingQuantity property in store model for each ordered product
                            req.body.Order_Products.forEach((orderProduct)=>{
                                console.log("orderProduct.length",req.body.Order_Products.length)
                                Store.findOne({Store_Product : orderProduct.Product,Size_Variant:orderProduct.Size_Variant,Color_Variant:orderProduct.Color_Variant})
                                .exec(function(err,storeDocument){
                                    if(err){
                                        return res.send({
                                            message3:err
                                        })
                                    }else if(storeDocument){
                                        
                                        console.log("4")
                                        storeDocument.Store_PendingQuantity += orderProduct.Quantity ;
                                        storeDocument.save(function(err,updatedStoreDocument){
                                            if(err){
                                                return res.send({
                                                    message4:err
                                                })
                                            }else {
                                                console.log("count",count)

                                                count ++ ;
                                                console.log("5")
                                                if(count == req.body.Order_Products.length){
                                                    console.log("6")                                                    
                                                    return res.send({message : true})
                                                }
                                            }
                                        })
                                    }
                                    else{
                                        return res.send({message : "couldnot found order product in store"})
                                    }
                                })
                            });
                                }

                            });
                            
                        }
                    })   
                }  
            }else{
                return res.send({
                    message:"no affiliate seller with Order_AffiliateSeller provided in req.body"
                })
            }
        })
        
  },

  editAffiliateSellerOrderByOrderId:(req,res)=>{
    AffiliateSeller.findById(req.body.Order_AffiliateSeller)
    .exec(function(err,seller){
        if(err){
            return res.send({
                message:err
            })
        }else if(seller){
       let updatedAffiliateSellerOrder={};
       updatedAffiliateSellerOrder.Order_Date=req.body.Order_Date ;
       updatedAffiliateSellerOrder.Order_Note=req.body.Order_Note ;
       updatedAffiliateSellerOrder.Order_TotalProductSellingAmount= req.body.Order_TotalProductSellingAmount ;
       updatedAffiliateSellerOrder.Order_TotalProductCostAmount = req.body.Order_TotalProductCostAmount ;
       updatedAffiliateSellerOrder.Order_CreatedType = "AffiliateSeller" ;
       updatedAffiliateSellerOrder.Order_Customer = req.body.Order_Customer;
       updatedAffiliateSellerOrder.Order_AffiliateSeller = req.body.Order_AffiliateSeller ;
       updatedAffiliateSellerOrder.Order_AffiliateSellerRevenuePercentage = seller.AffiliateSeller_RevenuePercentage ;
       updatedAffiliateSellerOrder.Order_AffiliateSellerRevenueAmount = seller.AffiliateSeller_RevenuePercentage * 0.01 * req.body.Order_TotalProductSellingAmount ;
       updatedAffiliateSellerOrder.Order_Products = req.body.Order_Products ;
       updatedAffiliateSellerOrder.Customer_ShippingAddress = req.body.Customer_ShippingAddress; 
       updatedAffiliateSellerOrder.Order_Status = "Created";       
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
                    var count = 0;
                    //we need to update store Store_PendingQuantity property in store model for each ordered product
                    req.body.Order_Products.forEach((orderProduct)=>{
                        Store.findOne({Store_Product : orderProduct.Product,Size_Variant:orderProduct.Size_Variant,Color_Variant:orderProduct.Color_Variant})
                        .exec(function(err,storeDocument){
                            console.log('storeDocument',storeDocument)
                            if(err){
                                return res.send({
                                    message3:err
                                })
                            }else if(storeDocument){
                                //we need to check if already we increased Store_PendingQuantity in store for that product
                                //we know if we increased Store_PendingQuantity property if the order product contains leftProductQuantity and it is defined and sets tio a value
                                if(orderProduct.leftProductQuantity == null){
                                    storeDocument.Store_PendingQuantity += orderProduct.Quantity ;
                                }    
                                storeDocument.save(function(err,updatedStoreDocument){
                                    if(err){
                                        return res.send({
                                            message4:err
                                        })
                                    }else {
                                        count ++ ;
                                        if(count == req.body.Order_Products.length){
                                            return res.send({message : true})
                                        }
                                    }
                                })
                                
                           
                        }
                        else{
                            return res.send({message : "couldnot found order product in store"})
                        }
                        })
                    });
                }else{
                    return res.send({
                        message:"updated order is null"
                    })
                }
            })
        }else{
            return res.send({
                message:"no affiliate seller with Order_AffiliateSeller provided in req.body"
            })
        }
    })
},  

    assignOrderTo : (req,res)=>{
        var updatedValue = {
            $set: {
                Order_InvntoryHandlingAssignedTo : req.body.Order_InvntoryHandlingAssignedTo
            }
        }
        Order.findByIdAndUpdate(req.body._id,updatedValue,{new:true},function(err,updatedDocment){
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedDocment) {
                return res.send({message : true});
            }else{
                return res.send({
                    message:"updatedDocment is null"
                });
            }
        })
        
    },

    shipOrder : (req,res)=>{
        var updatedValue = {
            $set: {
                Order_ShippingCompany : req.body.Order_ShippingCompany,
                Order_ShippingWaybill : req.body.Order_ShippingWaybill,
                Order_ShippingPrice : req.body.Order_ShippingPrice,
                Order_ShippingCost : req.body.Order_ShippingCost,
                Order_Status: "Shipped"
            }

        }
        Order.findByIdAndUpdate(req.body._id,updatedValue,{new:true,upsert:true},function(err,updatedDocment){
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedDocment) {
                var count = 0 ;
                //incase of req.body.Order_ShippedAlready==true then we don't need to update store Store_PendingQuantity,Store_Quantity because they are already updated
                if(req.body.Order_ShippedAlready == true){
                    return res.send({message : true})
                }else{
                       //we need to update store Store_PendingQuantity,Store_Quantity  property in store model for each ordered product
                 updatedDocment.Order_Products.forEach((orderProduct)=>{
                    Store.findOne({Store_Product : orderProduct.Product,Size_Variant:orderProduct.Size_Variant,Color_Variant:orderProduct.Color_Variant})
                    .exec(function(err,storeDocument){
                        console.log('storeDocument1',storeDocument)
                        if(err){
                            return res.send({
                                message3:err
                            })
                        }else if(storeDocument){
                            
                            storeDocument.Store_PendingQuantity -= orderProduct.Quantity ;
                            storeDocument.Store_Quantity -= orderProduct.Quantity ;
                            console.log('storeDocument2',storeDocument)
                             storeDocument.save(function(err,updatedStoreDocument){
                                if(err){
                                    return res.send({
                                        message4:err
                                    })
                                }else {
                                    count ++ ;
                                    if(count == updatedDocment.Order_Products.length){
                                        return res.send({message : true})
                                    }
                                }
                            })
                            
                       
                    }
                    else{
                        return res.send({message : "couldnot found order product in store"})
                    }
                    })
                });
                }
              
            }else{
                return res.send({
                    message:"updatedDocment is null"
                });
            }
        })
        
    },

    cancelOrder: (req,res)=>{
        var updatedValue = {
            $set: {
                Order_Status : req.body.Order_Status,
                Order_CancelationDetails : req.body.Order_CancelationDetails
            }
        };

        Order.findByIdAndUpdate(req.body._id,updatedValue,{new:true,upsert:true},function(err,updatedOrderDocment){
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedOrderDocment) {
                var count = 0 ;
                 //we need to update store Store_PendingQuantity,Store_Quantity  property in store model for each ordered product
                 updatedOrderDocment.Order_Products.forEach((orderProduct)=>{
                    Store.findOne({Store_Product : orderProduct.Product,Size_Variant:orderProduct.Size_Variant,Color_Variant:orderProduct.Color_Variant})
                    .exec(function(err,storeDocument){
                        console.log('storeDocument1',storeDocument)
                        if(err){
                            return res.send({
                                message3:err
                            })
                        }else if(storeDocument){
                            storeDocument.Store_PendingQuantity -= orderProduct.Quantity ;
                            console.log('storeDocument2',storeDocument)
                             storeDocument.save(function(err,updatedStoreDocument){
                                if(err){
                                    return res.send({
                                        message4:err
                                    })
                                }else {
                                    count ++ ;
                                    if(count == updatedOrderDocment.Order_Products.length){
                                             //we need to add this order to AffiliateSeller_CanceledOrders property of affiliate seller model
                                             let updated ={
                                                $push :{
                                                    AffiliateSeller_CanceledOrders : {
                                                    Order_TotalAmount: updatedOrderDocment.Order_TotalProductSellingAmount ,
                                                    Order_AffiliateSellerRevenuePercentage: updatedOrderDocment.Order_AffiliateSellerRevenuePercentage,
                                                    Order_AffiliateSellerRevenueAmount: updatedOrderDocment.Order_AffiliateSellerRevenueAmount,
                                                    Order_RefrencedOrder: updatedOrderDocment._id
                                                   }
                                                }
                                            };
                                            AffiliateSeller.findByIdAndUpdate(updatedOrderDocment.Order_AffiliateSeller,updated,{new:true,upsert:true})
                                            .exec(function(err,updatedSellerDocument){
                                            if(err){
                                                return res.send({
                                                    message:err
                                                });
                                            }else if(updatedSellerDocument) {
                                                return res.send({ message : true });
                                            }
                                            else{
                                                return res.send({  message:"updated seller is null" });
                                            }
                                            })
                                    }
                                }
                            })
                            
                       
                    }
                    else{
                        return res.send({message : "couldnot found order product in store"})
                    }
                    })
                });
            }else{
                return res.send({
                    message:"updatedDocment is null"
                });
            }
        })
        
    },
    collectOrder: (req,res)=>{
        var updatedValue = {
            $set: {
                Order_Status : req.body.Order_Status,
                Order_CustomerPaymentStatus : req.body.Order_CustomerPaymentStatus
            }
        };

        Order.findByIdAndUpdate(req.body._id,updatedValue,{new:true,upsert:true},function(err,updatedOrderDocment){
            if(err){
                return res.send({
                    message:err
                });
            }else if(updatedOrderDocment) {
                //we need to add this order to AffiliateSeller_DeliveredOrders property of affiliate seller model
                 let updated ={
                     $push :{
                        AffiliateSeller_DeliveredOrders : {
                            Order_TotalAmount: updatedOrderDocment.Order_TotalProductSellingAmount ,
                            Order_AffiliateSellerRevenuePercentage: updatedOrderDocment.Order_AffiliateSellerRevenuePercentage,
                            Order_AffiliateSellerRevenueAmount: updatedOrderDocment.Order_AffiliateSellerRevenueAmount,
                            Order_RefrencedOrder: updatedOrderDocment._id
                        }
                     }
                 };
                 AffiliateSeller.findByIdAndUpdate(updatedOrderDocment.Order_AffiliateSeller,updated,{new:true,upsert:true})
                 .exec(function(err,updatedSellerDocument){
                    if(err){
                        return res.send({
                            message:err
                        });
                    }else if(updatedSellerDocument) {
                        return res.send({ message : true });
                    }
                    else{
                        return res.send({  message:"updated seller is null" });
                    }
                 })
                 
            }else{
                return res.send({ message:"updatedDocment is null" });
            }
        })
        
    },

    returnOrderProducts: (req,res)=>{
        var updatedValue = {
            $set: {
                Order_Status : req.body.Order_Status,
                Order_Return_Details :req.body.Order_Return_Details
            }
        };

        Order.findByIdAndUpdate(req.body._id,updatedValue,{new:true,upsert:true},function(err,updatedOrderDocment){
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedOrderDocment) {
                var count = 0 ;
                 //we need to update store Store_Quantity  property in store model for each ordered product
                 req.body.Order_Return_Details.Return_Products.forEach((returnProduct)=>{
                    Store.findOne({Store_Product : returnProduct.Product,Size_Variant:returnProduct.Size_Variant,Color_Variant:returnProduct.Color_Variant})
                    .exec(function(err,storeDocument){
                        console.log('storeDocument1',storeDocument)
                        if(err){
                            return res.send({
                                message3:err
                            })
                        }else if(storeDocument){
                            storeDocument.Store_Quantity += returnProduct.Quantity ;
                            console.log('storeDocument2',storeDocument)
                             storeDocument.save(function(err,updatedStoreDocument){
                                if(err){
                                    return res.send({
                                        message4:err
                                    })
                                }else {
                                    count ++ ;
                                    if(count == req.body.Order_Return_Details.Return_Products.length){
                                        //we need to add this order to AffiliateSeller_ReturnedOrders property of affiliate seller model
                                        let updated ={
                                            $push :{
                                            AffiliateSeller_ReturnedOrders : {
                                                Order_TotalAmount: updatedOrderDocment.Order_TotalProductSellingAmount ,
                                                Order_AffiliateSellerRevenuePercentage: updatedOrderDocment.Order_AffiliateSellerRevenuePercentage,
                                                Order_AffiliateSellerRevenueAmount: updatedOrderDocment.Order_AffiliateSellerRevenueAmount,
                                                Order_RefrencedOrder: updatedOrderDocment._id
                                            }
                                            }
                                        };
                                        AffiliateSeller.findByIdAndUpdate(updatedOrderDocment.Order_AffiliateSeller,updated,{new:true,upsert:true})
                                        .exec(function(err,updatedSellerDocument){
                                        if(err){
                                            return res.send({
                                                message:err
                                            });
                                        }else if(updatedSellerDocument) {
                                            return res.send({ message : true });
                                        }
                                        else{
                                            return res.send({  message:"updated seller is null" });
                                        }
                                        })
                                    }
                                }
                            })
                            
                       
                    }
                    else{
                        return res.send({message : "couldnot found order product in store"})
                    }
                    })
                });
            }else{
                return res.send({
                    message:"updatedDocment is null"
                });
            }
        })
        
    },

    getAll:(req,res)=>{
        Order.find({})
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name"})
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

    getUserOrders :(req,res)=>{
        Order.find({Order_InvntoryHandlingAssignedTo : req.body.Order_InvntoryHandlingAssignedTo})
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name"})
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

    getAffiliateSellerOrderById: (req,res)=>{
        Order.findById(req.body._id)
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name Customer_ShippingAddress"})
        .populate({path:"Order_ShippingCompany"})
        .populate({path:"Order_Products.Product"})
        .populate({path:"Order_Products.Size_Variant"})
        .populate({path:"Order_Products.Color_Variant"})

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

    getOrderShippingDetailsById :(req,res)=>{
        Order.findById(req.body._id)
        .select('Order_Status Order_ShippingCompany Order_ShippingWaybill')
        .populate({path:"Order_ShippingCompany"})
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

    getOrdersByAffiliateSellerId :(req,res)=>{
        Order.find({ Order_AffiliateSeller : req.body._id})
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name"})
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

    getFilteredOrdersByDateFromTO :(req,res)=>{
        Order.find({ Order_SysDate : {
            $gte:  req.body.searchDate.Start_Date,
            $lte:  req.body.searchDate.End_Date
        }})
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name"})
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

    getFilteredOrdersByCustomerMobile :(req,res)=>{
        Order.find()
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name Address"})
        .exec((err,orders)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(orders) {
                let ordersToSend = []
                orders.forEach((orderDocument)=>{
                    if(orderDocument.Order_Customer.Address.Mobile == req.body.Customer_Mobile){
                        ordersToSend.push(orderDocument)
                    }
                })
                return res.send(ordersToSend)
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
        },
    
        /**********     for Statistics      ******** */
    getCountOfCanceledOrdersByAffiliateSellerId  : (req,res)=>{
        Order.find({ Order_AffiliateSeller : req.body.Order_AffiliateSeller,Order_Status : 'Cancelled'})
        .countDocuments(function(err, count){
            if(err){
                return res.send({
                    message:err
                })
            }else if(count) {
                return res.send({ count:count ,message : true })
            }else{
                return res.send({
                    message:"count is null"
                })
            }
        });   
    },  

    getCountOfReturnedOrdersByAffiliateSellerId  : (req,res)=>{
        Order.find({ Order_AffiliateSeller : req.body.Order_AffiliateSeller,Order_Status : 'Returned'})
        .countDocuments(function(err, count){
            if(err){
                return res.json({
                    message:err
                })
            }else if(count) {
                return res.json({ count:count ,message : true })
            }else{
                return res.json({
                    message:"count is null"
                })
            }
        });   
    },
    getCountOfCollectedOrdersByAffiliateSellerId  : (req,res)=>{
        Order.find({ Order_AffiliateSeller : req.body.Order_AffiliateSeller,Order_Status : 'Collected'})
        .countDocuments(function(err, count){
            if(err){
                return res.json({
                    message:err
                })
            }else if(count) {
                return res.json({ count:count ,message : true })
            }else{
                return res.json({
                    message:"count is null"
                })
            }
        });   
    },
}