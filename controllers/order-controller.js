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
       updatedAffiliateSellerOrder.Order_Customer = req.body.Order_Customer;
       updatedAffiliateSellerOrder.Order_AffiliateSeller = req.body.Order_AffiliateSeller ;
       updatedAffiliateSellerOrder.Order_AffiliateSellerRevenuePercentage = seller.AffiliateSeller_RevenuePercentage ;
       updatedAffiliateSellerOrder.Order_AffiliateSellerRevenueAmount = seller.AffiliateSeller_RevenuePercentage * 0.01 * req.body.Order_TotalProductSellingAmount ;
       updatedAffiliateSellerOrder.Order_Products = req.body.Order_Products ;
       updatedAffiliateSellerOrder.Customer_ShippingAddress = req.body.Customer_ShippingAddress; 
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
                                //we know if we increased Store_PendingQuantity property if the order product contains leftProductQuantity and it is defined and sets to a value
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
    addProductToOrder : (req,res)=>{
        Order.findById(req.body.orderId)
        .exec(function(err,orderDocument){
            orderDocument.Order_Products.push({
                "Product" : req.body.AddedProduct.Product, 
                "Size_Variant" : req.body.AddedProduct.Size_Variant, 
                "Color_Variant" : req.body.AddedProduct.Color_Variant, 
                "Quantity" : req.body.AddedProduct.Quantity, 
                "Cost" : req.body.AddedProduct.Cost, 
                "Price" : req.body.AddedProduct.Total_Price
            })
            var AffiliateSellerRevenueAmountToAdd = (req.body.AddedProduct.Total_Price * orderDocument.Order_AffiliateSellerRevenuePercentage)/100;
            orderDocument.Order_AffiliateSellerRevenueAmount += AffiliateSellerRevenueAmountToAdd;
            orderDocument.Order_TotalProductSellingAmount += req.body.AddedProduct.Total_Price;
            orderDocument.Order_TotalProductCostAmount += req.body.AddedProduct.Cost;
            orderDocument.save(function(err,updatedOrderDocument){
                Store.findOne({
                    Store_Product : req.body.AddedProduct.Product,
                    Size_Variant:req.body.AddedProduct.Size_Variant,
                    Color_Variant:req.body.AddedProduct.Color_Variant
                }).exec(function(err,storeDocument){
                    if(storeDocument.Store_PendingQuantity)
                        storeDocument.Store_PendingQuantity += req.body.AddedProduct.Quantity ;
                    else
                        storeDocument.Store_PendingQuantity = req.body.AddedProduct.Quantity;
                    storeDocument.save(function(err,updatedStoreDocument){
                        AffiliateSeller.findOne({
                            _id:orderDocument.Order_AffiliateSeller
                        }).exec(function(err,affilateSellerDocument){
                            for(var i = 0; i < affilateSellerDocument.AffiliateSeller_CreatedOrders.length; i++) {
                                if(String(affilateSellerDocument.AffiliateSeller_CreatedOrders[i].Order_RefrencedOrder) === String(req.body.orderId)) {
                                    affilateSellerDocument.AffiliateSeller_CreatedOrders[i].Order_TotalAmount +=  req.body.AddedProduct.Total_Price;
                                    affilateSellerDocument.AffiliateSeller_CreatedOrders[i].Order_AffiliateSellerRevenueAmount +=  AffiliateSellerRevenueAmountToAdd;
                                    affilateSellerDocument.save(function(err,updatedStoreDocument){
                                        if(err){
                                            return res.send({  message2:err })
                                        }
                                        else{
                                            return res.send({message : true})
                                        }
                                    })
                                }
                            }
                        })
                    })
                }) 
            })
        })
    },
    deleteProductInOrder : (req,res)=>{
        Order.findById(req.body.orderId)
        .exec(function(err,orderDocument){
            if(err) return res.send(err);
            else if(orderDocument){
                //first we need to delete the product in property Order_Products of the order document
                orderDocument.Order_Products = orderDocument.Order_Products.filter(x => {
                    x._id !== req.body.deletedProduct.Product
                })
                //second we need to update Order_AffiliateSellerRevenueAmount
                var amountToDeduct = (req.body.deletedProduct.Total_Price * req.body.sellerMoneyDetails.Order_AffiliateSellerRevenuePercentage)/100;
                orderDocument.Order_AffiliateSellerRevenueAmount -=  amountToDeduct;
                orderDocument.Order_TotalProductSellingAmount -= req.body.deletedProduct.Total_Price;
                orderDocument.Order_TotalProductCostAmount -=  req.body.deletedProduct.Cost;
                orderDocument.save(function(err,updatedOrderDocument){
                    if(err) return res.send(err);
                    else{
                        //we need to update Store_PendingQuantity in the store by decreasing it by the quantity of the deleted product of the order
                        Store.findOne({
                            Store_Product : req.body.deletedProduct.Product,
                            Size_Variant:req.body.deletedProduct.Size_Variant,
                            Color_Variant:req.body.deletedProduct.Color_Variant,
                            Store_PendingQuantity : { $gte: 1} //using this instead of filtering by: Store_StoragePlace
                        }).exec(function(err,storeDocument){
                            if(err){
                                return res.send({
                                    message:err
                                })
                            }else if(storeDocument){
                                storeDocument.Store_PendingQuantity -= req.body.deletedProduct.Quantity ;
                                storeDocument.save(function(err,updatedStoreDocument){
                                    if(err){
                                        return res.send({  message2:err })
                                    }
                                    else {
                                        AffiliateSeller.findOne({
                                            _id:req.body.sellerMoneyDetails.Order_AffiliateSeller
                                        }).exec(function(err,affilateSellerDocument){
                                            for(var i = 0; i < affilateSellerDocument.AffiliateSeller_CreatedOrders.length; i++) {
                                                if(String(affilateSellerDocument.AffiliateSeller_CreatedOrders[i].Order_RefrencedOrder) === String(req.body.orderId)) {
                                                    affilateSellerDocument.AffiliateSeller_CreatedOrders[i].Order_TotalAmount -=  req.body.deletedProduct.Total_Price;
                                                    affilateSellerDocument.AffiliateSeller_CreatedOrders[i].Order_AffiliateSellerRevenueAmount -=  amountToDeduct;
                                                    affilateSellerDocument.save(function(err,updatedStoreDocument){
                                                        if(err){
                                                            return res.send({  message2:err })
                                                        }
                                                        else{
                                                            return res.send({message : true})
                                                        }
                                                    })
                                                }
                                            }
                                        })
                                        
                                    }
                                        
                                })
                            }
                            else return res.send({ message : "storeDocument is null"})
                        })
                    }
                })
            }
            else return res.send({message : "orderProductDocument is null"});
        })
        
    },

    assignOrderTo : (req,res)=>{
        var updatedValue = {
            $set: {
                Order_InvntoryHandlingAssignedTo : req.body.Order_InvntoryHandlingAssignedTo,
                Order_Status : "Assigned"
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

    changeOrderFromCancelledToCreated : (req,res)=>{
        var updatedValue = {
            $set: {
                Order_InvntoryHandlingAssignedTo : null,
                Order_Status : "Created"
            }
        }
        Order.findByIdAndUpdate(req.body._id,updatedValue,{new:true},function(err,updatedOrderDocment){
            if(err){
                return res.send({
                    message1:err
                })
            }else if(updatedOrderDocment) {
                var count = 0 ;
                 //we need to update  Store_PendingQuantity  property in store model for each ordered product
                 updatedOrderDocment.Order_Products.forEach((orderProduct)=>{
                    Store.findOne({Store_Product : orderProduct.Product,Size_Variant:orderProduct.Size_Variant,Color_Variant:orderProduct.Color_Variant})
                    .exec(function(err,storeDocument){
                        console.log('storeDocument1',storeDocument)
                        if(err){
                            return res.send({
                                message2:err
                            })
                        }else if(storeDocument){
                            storeDocument.Store_PendingQuantity += orderProduct.Quantity ;
                            console.log('storeDocument2',storeDocument)
                             storeDocument.save(function(err,updatedStoreDocument){
                                if(err){
                                    return res.send({
                                        message3:err
                                    })
                                }else {
                                    count ++ ;
                                    if(count == updatedOrderDocment.Order_Products.length){
                                        //remove order from affiliate seller AffiliateSeller_CanceledOrders property
                                        AffiliateSeller.findById(updatedOrderDocment.Order_AffiliateSeller)
                                        .exec(function(err,sellerDocument){
                                            if(err) return res.json({message :err})
                                            else if(sellerDocument){
                                                sellerDocument.AffiliateSeller_CanceledOrders.forEach((element)=>{
                                                    if(element.Order_RefrencedOrder == updatedOrderDocment._id){
                                                        sellerDocument.AffiliateSeller_CanceledOrders.splice( element, 1);
                                                    }
                                                })
                                                sellerDocument.save((function(err,updatedSellerDocument){
                                                    if(err) return res.json({message :err})
                                                    else 
                                                    return res.json({message : true})
                                                }))
                                               
                                            }
                                            else return res.json({message : false})
                                        })
                                        return res.send({ message : true});
                                    }
                                }
                            })
                        }else return res.json({message : "store document not found"})
                    })
                })
            }else{
                return res.send({
                    message:"updatedDocment is null"
                });
            }
        })
        
    },
    onlyChangeOrderEmployee :(req,res)=>{
        var updatedValue = {
            $set: {
                Order_InvntoryHandlingAssignedTo : req.body.Order_InvntoryHandlingAssignedTo,
            }
        }
        Order.findByIdAndUpdate(req.body._id,updatedValue,{new:true},function(err,updatedOrderDocment){
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedOrderDocment) {
                return res.send({
                    message:true
                })
            }else{
                return res.send({
                    message:"updatedDocment is null"
                });
            }
        })
        
    },
    assignOrderToEmployee :(req,res)=>{
        var updatedValue = {
            $set: {
                Order_InvntoryHandlingAssignedTo : req.body.Order_InvntoryHandlingAssignedTo,
                Order_Status : "Assigned"
            }
        }
        Order.findByIdAndUpdate(req.body._id,updatedValue,{new:true},function(err,updatedOrderDocment){
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedOrderDocment) {
                return res.send({
                    message:true
                })
            }else{
                return res.send({
                    message:"updatedDocment is null"
                });
            }
        })
        
    },

    shipOrderWithTheAbilityToEditOrder : (req,res)=>{
        // we donot need to update all order document properties such as the Order_AffiliateSeller,Order_AffiliateSellerRevenuePercentage
        //as these properties were already set when the affiliate seller ordered the product
        //what we need to do is to update affiliate seller's amount of money as order products might change when order is shipped in the shipping form
        var updatedValue = {
            $set: {
                Order_ShippingCompany : req.body.Order_ShippingCompany,
                Order_ShippingWaybill : req.body.Order_ShippingWaybill,
                Order_ShippingPrice : req.body.Order_ShippingPrice,
                Order_ShippingCost : req.body.Order_ShippingCost,
                Order_Status: "Shipped",
               // Order_Date:req.body.Order_Date ,
                Order_Note:req.body.Order_Note ,
                // Order_TotalProductSellingAmount: req.body.Order_TotalProductSellingAmount ,
                // Order_TotalProductCostAmount : req.body.Order_TotalProductCostAmount ,
                // Order_AffiliateSellerRevenueAmount : req.body.Order_AffiliateSellerRevenuePercentage * 0.01 * req.body.Order_TotalProductSellingAmount ,
                // // Order_Customer : req.body.Order_Customer,
                // Order_Products : req.body.Order_Products ,
                Customer_ShippingAddress : req.body.Customer_ShippingAddress, 
            }

        }
        Order.findByIdAndUpdate(req.body._id,updatedValue,{new:true,upsert:true},function(err,updatedDocment){
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedDocment) {
                var count = 0 ;
                
                //we need to update store Store_PendingQuantity,Store_Quantity  property in store model for each ordered product
                 updatedDocment.Order_Products.forEach((orderProduct)=>{
                    Store.findOne({Store_Product : orderProduct.Product,Size_Variant:orderProduct.Size_Variant,Color_Variant:orderProduct.Color_Variant})
                    .exec(function(err,storeDocument){
                        if(err){
                            return res.send({
                                message3:err
                            })
                        }else if(storeDocument){
                            storeDocument.Store_PendingQuantity -= orderProduct.Quantity ;
                            storeDocument.Store_Quantity -= orderProduct.Quantity ;
                            //if Store_Quantity == 0,we need to delete the document from store
                            if(storeDocument.Store_Quantity == 0){
                                storeDocument.remove(function(err,deletedDocument){
                                    if(err) return res.send({message : err})
                                    else {
                                        count ++ ;
                                        if(count == updatedDocment.Order_Products.length){
                                            return res.send({message : true})
                                        }
                                    }
                                })
                            }else{
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
                 //we need to update store Store_PendingQuantity  property in store model for each ordered product
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
                Order_PaymentBy : req.body.Order_PaymentBy
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
                        } ,
                        AffiliateSeller_FinancialTransactions : {
                            AffiliateSellerFinancialTransaction_Date     : updatedOrderDocment.Order_Date ,
                            AffiliateSellerFinancialTransaction_MathSign : 1 ,
                            AffiliateSellerFinancialTransaction_Amount   : updatedOrderDocment.Order_AffiliateSellerRevenueAmount ,
                            AffiliateSellerFinancialTransaction_Order    :  updatedOrderDocment.Order_AffiliateSeller ,
                            AffiliateSellerFinancialTransaction_Type     :  "Payment"
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

    getAll :(req,res)=>{
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

    getAllOrdersExceptCancelledOnes :(req,res)=>{
        Order.find({ Order_Status : {$ne : "Cancelled"}})
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

    getAllCancelledOrders :(req,res)=>{
        Order.find({ Order_Status :  "Cancelled" })
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name Address"})
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
    getAllCreatedOrders :(req,res)=>{
        Order.find({ Order_Status :  "Created" })
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name Address"})
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


    getOnlyAssignedOrders:(req,res)=>{
        Order.find({ 
            Order_InvntoryHandlingAssignedTo : { $ne : null},
            Order_Status                      : 'Assigned'
        })
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name Address"})
        .populate({path: 'Order_InvntoryHandlingAssignedTo' ,select: "User_Name"})
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

    getMyShippedOrders:(req,res)=>{
        Order.find({ 
            Order_InvntoryHandlingAssignedTo : req.body.Order_InvntoryHandlingAssignedTo,
            Order_Status                      : 'Shipped'
        })
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name"})
        .populate({path: 'Order_InvntoryHandlingAssignedTo' ,select: "User_Name"})
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
    getAllShippedOrders:(req,res)=>{
        Order.find({ 
            Order_Status                      : 'Shipped'
        })
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name"})
        .populate({path: 'Order_InvntoryHandlingAssignedTo' ,select: "User_Name"})
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
        Order.find({Order_InvntoryHandlingAssignedTo : req.body.Order_InvntoryHandlingAssignedTo, Order_Status : "Assigned"})
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
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name Customer_ShippingAddress Address"})
        .populate({path:"Order_ShippingCompany"})
        .populate({path:"Order_Products.Product"})
        .populate({path:"Order_Products.Size_Variant"})
        .populate({path:"Order_Products.Color_Variant"})
        .populate({path:"Order_AffiliateSeller", select: "AffiliateSeller_Name AffiliateSeller_Phone"})
        .exec((err,order)=>{
            console.log(order)
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
        .populate({path:"Order_ShippingCompany",select:"ShippingCompany_Code ShippingCompany_Name ShippingCompany_Phone ShippingCompany_TrakingURL"})
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
        console.log(req.body._id);
        Order.find({ Order_AffiliateSeller : req.body._id})
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name"})
        .exec((err,orders)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(orders) {
                console.log(orders)
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
        
        
        
    searchOrders: (req,res)=>{
        Order.find(req.body)
        .populate({path:"Order_Customer",select:"Customer_Code Customer_Name "})
        .exec((err,orders)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(orders.length >0 ) {
                return res.json({
                    orders : orders,
                    message : true
                })
            }else{
                return res.send({
                    message: false
                })
            }

        })
    },

    returnOneProductFromOrder: (req,res)=>{
        var updatedValue = {
            $set: {
                Order_Status : "Returned",
                Order_AffiliateSellerRevenueAmount : req.body.Order_AffiliateSellerRevenuePercentage * (req.body.Original_Order_TotalProductSellingAmount - req.body.Order_Return_Details.Return_Product.Price) / 100
            },
            $inc: {
                Order_TotalProductSellingAmount   : -1 * req.body.Order_Return_Details.Return_Product.Price ,
                Order_TotalProductCostAmount      : -1 * req.body.Order_Return_Details.Return_Product.Cost ,
            },
            $push:{
                Order_Return_Details : req.body.Order_Return_Details
            }
        };

        Order.findByIdAndUpdate(req.body._id,updatedValue,{new:true,upsert:true},function(err,updatedOrderDocment){
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedOrderDocment) {
                 //we need to update store Store_Quantity  property in store model for the returned ordered product
                let returnProduct = req.body.Order_Return_Details.Return_Product ;
                Store.findOne({Store_Product : returnProduct.Product,Size_Variant:returnProduct.Size_Variant,Color_Variant:returnProduct.Color_Variant,                            Store_PendingQuantity : { $gte: 1} //using this instead of filtering by: Store_StoragePlace
                })
                .exec(function(err,storeDocument){
                    console.log('storeDocument1',storeDocument)
                    if(err){
                        return res.send({ message3:err })
                    }else if(storeDocument){
                        storeDocument.Store_Quantity += returnProduct.Quantity ;
                        console.log('storeDocument2',storeDocument)
                        storeDocument.save(function(err,updatedStoreDocument){
                            if(err){
                                return res.send({ message4:err})
                            }else {
                                //we need to add this order to AffiliateSeller_ReturnedOrders property of affiliate seller model
                                let updated ={
                                    $push :{
                                        AffiliateSeller_ReturnedOrders : {
                                            Order_TotalAmount: updatedOrderDocment.Order_TotalProductSellingAmount ,
                                            Order_AffiliateSellerRevenuePercentage: updatedOrderDocment.Order_AffiliateSellerRevenuePercentage,
                                            Order_AffiliateSellerRevenueAmount: updatedOrderDocment.Order_AffiliateSellerRevenueAmount,
                                            Order_RefrencedOrder: updatedOrderDocment._id
                                        },
                                        AffiliateSeller_FinancialTransactions : {
                                            AffiliateSellerFinancialTransaction_Date : updatedOrderDocment.Order_Date ,
                                            AffiliateSellerFinancialTransaction_MathSign : -1 ,
                                            AffiliateSellerFinancialTransaction_Amount : returnProduct.Price * updatedOrderDocment.Order_AffiliateSellerRevenuePercentage,
                                            AffiliateSellerFinancialTransaction_Order : updatedOrderDocment._id ,
                                            AffiliateSellerFinancialTransaction_Type : "return"

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
                            })
                            
                       
                    }
                    else{
                        return res.send({message : "couldnot found order product in store"})
                    }
                })
                
            }else{
                return res.send({
                    message:"updatedDocment is null"
                });
            }
        })
        
    },
        
    
       
}