var Order=require("../models/order-model");
var AffiliateSeller=require("../models/affiliate-seller-model");
var Store = require("../models/store-model");
var Customer = require("../models/customer-model");
var ProductTransaction = require("../models/product-transaction-model");
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
                            //we need to add bromCode if existed in request body
                            if(req.body.BromCode_ID){
                                let BromCodeIsFound = false
                                seller.AffiliateSeller_BromoCodes_Used.forEach((bromoCode)=>{
                                    if(req.body.BromCode_ID == bromoCode.BromCode_ID){
                                        //increment number of used times by 1
                                        bromoCode.Used_Number_Of_Times ++ ;
                                        BromCodeIsFound = true;
                                    }
                                });
                                if(!BromCodeIsFound){
                                    //we need to push object to the array
                                    seller.AffiliateSeller_BromoCodes_Used.push({
                                        BromCode_ID          : req.body.BromCode_ID ,
                                        Used_Number_Of_Times : 1
                                    })
                                }
                            }
                           
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
                                                    //we need to increment Customer_Num_Of_Orders by one in customer model
                                                    let updated = {
                                                        $inc : {
                                                            Customer_Num_Of_Orders : 1
                                                        }
                                                    }
                                                    Customer.findByIdAndUpdate(req.body.Order_Customer,updated) 
                                                    .exec(function(err,customerDoc){
                                                        if(err) return res.send({message : err})
                                                        else return res.send({message : true})
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
                console.log("---------=-=-=-=-")
                
                //first we need to delete the product in property Order_Products of the order document
                const indxToDelete = orderDocument.Order_Products.findIndex(productToDelete => String(productToDelete._id) === req.body.deletedProduct._id);
                orderDocument.Order_Products.splice(indxToDelete, 1);
                console.log(orderDocument.Order_Products);
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
                    status: false,
                    message:err
                })
            }else if(updatedOrderDocment) {
                AffiliateSeller.update({ _id: updatedOrderDocment.Order_AffiliateSeller },
                    {
                        $pull: {
                            AffiliateSeller_CanceledOrders:{  Order_RefrencedOrder: req.body._id}
                        }
                    })
                .exec(function(err,sellerDocument){
                    var count = 0 ;
                    updatedOrderDocment.Order_Products.forEach((orderProduct)=>{
                        Store.findOne({Store_Product : orderProduct.Product,Size_Variant:orderProduct.Size_Variant,Color_Variant:orderProduct.Color_Variant})
                        .exec(function(err,storeDocument){
                            if(err){
                                return res.send({
                                    status: false,
                                    message:err
                                })
                            }else if(storeDocument){
                                storeDocument.Store_PendingQuantity += orderProduct.Quantity ;
                                storeDocument.save(function(err,updatedStoreDocument){
                                    if(err){
                                        return res.send({
                                            status: false,
                                            message:err
                                        })
                                    }else {
                                        count ++ ;
                                        if(count == updatedOrderDocment.Order_Products.length){
                                            //remove order from affiliate seller AffiliateSeller_CanceledOrders property
                                            return res.send({status: true, message : true});
                                        }
                                    }
                                })
                            }else return res.json({status: false,message : "store document not found"})
                        })
                    })
                })                 
            }else{
                return res.send({
                    status: false,
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

    getShippingCallNotes : (req,res)=>{
        Order.findById(req.body.orderID)
        .select("Order_Shipping_Employee_Calls_Note Order_Shipping_Employee_Calls_Number")
        .exec(function(err,updatedDocment){
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedDocment) {
                return res.json({
                    Order_Shipping_Employee_Calls_Note : updatedDocment.Order_Shipping_Employee_Calls_Note,
                    Order_Shipping_Employee_Calls_Number : updatedDocment.Order_Shipping_Employee_Calls_Number
                })
            }
            else return res.send({message : "Order not found"})
        })
        
    },

    saveShippingCallNote :(req,res)=>{
       
        Order.findById(req.body.orderID,function(err,updatedDocment){
            if(err){
                return res.send({
                    message:err
                })
            }else if(updatedDocment) {
                console.log("updatedDocment.Order_Shipping_Employee_Calls_Note",updatedDocment.Order_Shipping_Employee_Calls_Note)
                if(updatedDocment.Order_Shipping_Employee_Calls_Note)
                    updatedDocment.Order_Shipping_Employee_Calls_Note += req.body.Call_Note;
                else
                    updatedDocment.Order_Shipping_Employee_Calls_Note = req.body.Call_Note;
                let current_calls_number = updatedDocment.Order_Shipping_Employee_Calls_Number
                console.log("current_calls_number",current_calls_number)
                updatedDocment.Order_Shipping_Employee_Calls_Number= current_calls_number+1 || 1;
                updatedDocment.save((err,saved)=>{
                    if(err)return res.send(err)
                    else
                    return res.send({message : true,saved:saved})

                })
            }
            else return res.send({message : "Order not found"})
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
                Order_Shipping_Employee_Main_Note : req.body.Order_Shipping_Employee_Main_Note,
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
                Order_Status : "Cancelled",
                Order_CancelationDetails : req.body.Order_CancelationDetails,
                Order_CanBeFollowedUp    : req.body.Order_CanBeFollowedUp
            }
        };

        Order.findByIdAndUpdate(req.body._id,updatedValue,{new:true,upsert:true},function(err,updatedOrderDocment){
            if(err){
                return res.send({
                    status: false,
                    message:err
                })
            }else if(updatedOrderDocment) {
                 //we need to update store Store_PendingQuantity  property in store model for each ordered product
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
                            status: false,
                            message:err
                        });
                    }else if(updatedSellerDocument) {
                        var Count = 0;
                        updatedOrderDocment.Order_Products.forEach((orderProduct)=>{
                            console.log(orderProduct.Product)
                            console.log(orderProduct.Size_Variant)
                            console.log(orderProduct.Color_Variant)
                            Store.findOne({
                                Store_Product : orderProduct.Product,
                                Size_Variant:orderProduct.Size_Variant,
                                Color_Variant:orderProduct.Color_Variant,
                                Store_PendingQuantity: {$gte: 1} 
                            }).exec(function(err,storeDocument){
                                if(err){
                                    return res.send({
                                        status: false,
                                        message:err
                                    })
                                }
                                else if(storeDocument){
                                    Count ++;
                                    storeDocument.Store_PendingQuantity -= orderProduct.Quantity ;
                                    storeDocument.save(function(err,updatedStoreDocument){
                                        if(err){
                                            console.log(err)
                                            return res.send({
                                                status: false,
                                                message:err
                                            })
                                        }else {
                                            if(Count == updatedOrderDocment.Order_Products.length){
                                                return res.send({ status: true, message : "true" });
                                            }
                                        }
                                    }) 
                                }
                                else{
                                    return res.send({ status: false, message : "couldnot found order product in store"})
                                }
                            })
                        });
                    }
                    else{
                        return res.send({ status: false, message:"updated seller is null" });
                    }
                })
                 
            }else{
                return res.send({
                    status: false, 
                    message:"updatedDocment is null"
                });
            }
        })
        
    },
    collectOrder: (req,res)=>{
        Order.findById(req.body._id,function(err,OrderToUpdateDocment){
            if(err){
                return res.send({
                    message:err
                });
            }else if(OrderToUpdateDocment) {
                
                
                let AffiliateRevenueAmount = req.body.CollectedAmount * OrderToUpdateDocment.Order_AffiliateSellerRevenuePercentage / 100;
                if(OrderToUpdateDocment.Order_Status =='Collected'){
                    OrderToUpdateDocment.Order_AffiliateSellerRevenueAmount += AffiliateRevenueAmount;
                }
                else{
                    OrderToUpdateDocment.Order_AffiliateSellerRevenueAmount = AffiliateRevenueAmount
                }
                
                OrderToUpdateDocment.Order_Status = req.body.Order_Status;
                OrderToUpdateDocment.Order_PaymentBy = req.body.Order_PaymentBy;
                OrderToUpdateDocment.save(function(err,updatedOrderDocment){
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
                                    Order_AffiliateSellerRevenueAmount: AffiliateRevenueAmount,
                                    Order_RefrencedOrder: updatedOrderDocment._id
                                } ,
                                AffiliateSeller_FinancialTransactions : {
                                    AffiliateSellerFinancialTransaction_Date     : updatedOrderDocment.Order_Date ,
                                    AffiliateSellerFinancialTransaction_MathSign : 1 ,
                                    AffiliateSellerFinancialTransaction_Amount   : AffiliateRevenueAmount ,
                                    AffiliateSellerFinancialTransaction_Order    : updatedOrderDocment._id ,
                                    AffiliateSellerFinancialTransaction_Type     : "Collected"
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
    searchOrdersByWaybill: (req,res)=>{
        
        Order.find({ Order_ShippingWaybill: {'$regex' : req.body.Waybill , '$options' : 'i'} })
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
        Order.findById(req.body._id).exec((err,order)=>{
            if(order) {
                var productPrice = req.body.Order_Return_Details.Return_Products[0].Price;
                var ReturnedAffiliateSellerAmount = (productPrice * order.Order_AffiliateSellerRevenuePercentage) /100
                order.Order_AffiliateSellerRevenueAmount = order.Order_AffiliateSellerRevenueAmount - ReturnedAffiliateSellerAmount;
                order.Order_TotalProductSellingAmount = order.Order_TotalProductSellingAmount - productPrice;
                order.Order_TotalProductCostAmount = order.Order_TotalProductCostAmount - req.body.Order_Return_Details.Return_Products[0].Cost;
                order.Order_Status = "Returned";
                if(order.Order_Return_Details){
                    var ReturnOrder = req.body.Order_Return_Details;
                    delete ReturnOrder.Return_Products[0].Price;
                    order.Order_Return_Details.push(ReturnOrder)
                }
                else{
                    var ReturnOrder = req.body.Order_Return_Details;
                    delete ReturnOrder.Return_Products[0].Price;
                    order.Order_Return_Details = [ReturnOrder]
                }
                order.save(function(err,updatedOrder){
                    Store.find({
                        Store_Product : req.body.Order_Return_Details.Return_Products[0].Product,
                        Size_Variant  : req.body.Order_Return_Details.Return_Products[0].Size_Variant,
                        Color_Variant : req.body.Order_Return_Details.Return_Products[0].Color_Variant
                    }).exec(function(err,storeProduct){
                        var CostToAdd = req.body.Order_Return_Details.Return_Products[0].Cost; 
                        const newProductTransaction=new ProductTransaction();
                        newProductTransaction.ProductTransaction_Date = req.body.Order_Return_Details.Return_Date;
                        newProductTransaction.ProductTransaction_Product = req.body.Order_Return_Details.Return_Products[0].Product;
                        newProductTransaction.ProductTransaction_Size_Variant = req.body.Order_Return_Details.Return_Products[0].Size_Variant;
                        newProductTransaction.ProductTransaction_Color_Variant = req.body.Order_Return_Details.Return_Products[0].Color_Variant;
                        newProductTransaction.ProductTransaction_MathSign = 1;
                        newProductTransaction.ProductTransaction_Type = "Return Order";
                        newProductTransaction.ProductTransaction_Order = req.body._id;
                        if(storeProduct.length >0){
                            var TotalStoredQuantity = 0;
                            storeProduct.forEach(function(storeProductItem, index){
                                TotalStoredQuantity = TotalStoredQuantity + storeProductItem.Store_Quantity;
                            })
                            newProductTransaction.ProductTransaction_QuantityBeforAction = TotalStoredQuantity;
                            newProductTransaction.ProductTransaction_CostBeforAction = storeProduct[0].Store_Cost;
                            newProductTransaction.ProductTransaction_SellPriceOnAction = productPrice;
                            newProductTransaction.ProductTransaction_QuantityAfterAction = TotalStoredQuantity + req.body.Order_Return_Details.Return_Products[0].Quantity;
                            CostToAdd = ((storeProduct[0].Store_Cost * TotalStoredQuantity) + (req.body.Order_Return_Details.Return_Products[0].Cost * req.body.Order_Return_Details.Return_Products[0].Quantity))/ (TotalStoredQuantity + req.body.Order_Return_Details.Return_Products[0].Quantity)//11111;//needs modification
                            newProductTransaction.ProductTransaction_CostAfterAction = CostToAdd;
                            newProductTransaction.save(function(err,xx){});

                            //update new cost to current Items on the store
                            
                            storeProduct.forEach(function(storeProductItem, index){
                                storeProductItem.Store_Cost=CostToAdd;
                                storeProductItem.save(function(err){});
                            })

                            //insert new store for the new incoming items
                            let newStoreProduct = new Store();
                            newStoreProduct.Store_Product = req.body.Order_Return_Details.Return_Products[0].Product;
                            newStoreProduct.Size_Variant = req.body.Order_Return_Details.Return_Products[0].Size_Variant
                            newStoreProduct.Color_Variant = req.body.Order_Return_Details.Return_Products[0].Color_Variant
                            newStoreProduct.Store_Quantity = req.body.Order_Return_Details.Return_Products[0].Quantity
                            newStoreProduct.Store_Cost = CostToAdd;
                            newStoreProduct.Store_StoragePlace = null;
                            newStoreProduct.save(function(err,savedStore){
                                let updated ={
                                    $push :{
                                        AffiliateSeller_ReturnedOrders : {
                                            Order_TotalAmount : productPrice,
                                            Order_AffiliateSellerRevenuePercentage: updatedOrder.Order_AffiliateSellerRevenuePercentage,
                                            Order_AffiliateSellerRevenueAmount: ReturnedAffiliateSellerAmount,
                                            Order_RefrencedOrder: updatedOrder._id
                                        },
                                        AffiliateSeller_FinancialTransactions : {
                                            AffiliateSellerFinancialTransaction_Date : req.body.Order_Return_Details.Return_Date ,
                                            AffiliateSellerFinancialTransaction_MathSign : -1 ,
                                            AffiliateSellerFinancialTransaction_Amount : ReturnedAffiliateSellerAmount,
                                            AffiliateSellerFinancialTransaction_Order : updatedOrder._id ,
                                            AffiliateSellerFinancialTransaction_Type : "return"
                                        }
                                    }
                                };
                                AffiliateSeller.findByIdAndUpdate(updatedOrder.Order_AffiliateSeller,updated,{new:true,upsert:true}).exec(function(err,updatedSellerDocument){
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
                                    
                            });
                        }else{
                            newProductTransaction.ProductTransaction_QuantityBeforAction = 0;
                            newProductTransaction.ProductTransaction_CostBeforAction = 0;
                            newProductTransaction.ProductTransaction_SellPriceOnAction = productPrice;
                            newProductTransaction.ProductTransaction_QuantityAfterAction =  req.body.Order_Return_Details.Return_Products[0].Quantity;
                            newProductTransaction.ProductTransaction_CostAfterAction = req.body.Order_Return_Details.Return_Products[0].Cost;//needs modification
                            newProductTransaction.save(function(){})
                            let newStoreProduct = new Store();
                            newStoreProduct.Store_Product = req.body.Order_Return_Details.Return_Products[0].Product;
                            newStoreProduct.Size_Variant = req.body.Order_Return_Details.Return_Products[0].Size_Variant;
                            newStoreProduct.Color_Variant = req.body.Order_Return_Details.Return_Products[0].Quantity;
                            newStoreProduct.Store_Quantity = req.body.Order_Return_Details.Return_Products[0].Quantity
                            newStoreProduct.Store_Cost = req.body.Order_Return_Details.Return_Products[0].Cost
                            newStoreProduct.Store_StoragePlace = null;
                            newStoreProduct.save(function(err,savedStore){
                                //start update seller need to be midi
                                let updated ={
                                    $push :{
                                        AffiliateSeller_ReturnedOrders : {
                                            Order_TotalAmount :productPrice,
                                            Order_AffiliateSellerRevenuePercentage: updatedOrder.Order_AffiliateSellerRevenuePercentage,
                                            Order_AffiliateSellerRevenueAmount: ReturnedAffiliateSellerAmount,
                                            Order_RefrencedOrder: updatedOrder._id
                                        },
                                        AffiliateSeller_FinancialTransactions : {
                                            AffiliateSellerFinancialTransaction_Date : req.body.Order_Return_Details.Return_Date ,
                                            AffiliateSellerFinancialTransaction_MathSign : -1 ,
                                            AffiliateSellerFinancialTransaction_Amount : ReturnedAffiliateSellerAmount,
                                            AffiliateSellerFinancialTransaction_Order : updatedOrder._id ,
                                            AffiliateSellerFinancialTransaction_Type : "return"
                                        }
                                    }
                                };
                                AffiliateSeller.findByIdAndUpdate(updatedOrder.Order_AffiliateSeller,updated,{new:true,upsert:true}).exec(function(err,updatedSellerDocument){
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
                            });
                        }
                    })
                })
            }
        })
        
        
    },
        
    
    getOrdersByDateFromTo : (req,res)=>{
        Order.find({ Order_Date : {
            $gte : req.body.searchDate.Start_Date,
            $lte : req.body.searchDate.End_Date
            } 
        })
        .select("Order_AffiliateSeller Order_Status Order_InvntoryHandlingAssignedTo")
        .populate({path:"Order_AffiliateSeller",select:"AffiliateSeller_Name  AffiliateSeller_Code"})
        .populate({path:"Order_InvntoryHandlingAssignedTo",select:"User_Name "})
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
    //affiliate seller click on  unFollowOrder button 
    unFollowOrder:(req,res)=>{
        let updated = {
            $set : {
                Order_CanBeFollowedUp : false
            }
        }
        Order.findByIdAndUpdate(req.body[_id],updated,{upsert:true},{new:true})
        .exec((err,order)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(order) {
                return res.send({message : true})
            }else{
                return res.send({
                    message:"order are null"
                })
            }

        })
    },
    //affiliate seller click on  RecreateOrder button 

    RecreateOrder:(req,res)=>{
        let updated = [
          { $set : {
                Order_Status : "Created",
                Order_InvntoryHandlingAssignedTo : null,
                Order_Note  : { $concat: [ "$Order_Note", req.body.Recreate_Order_Note]}
            }
        }
        ]
        Order.findByIdAndUpdate(req.body._id,updated,function(err,order){
            if(err){
                return res.send({
                    message:err
                })
            }else if(order) {
                return res.send({message : true})
            }else{
                return res.send({
                    message:"order are null"
                })
            }
        })
            

        
    }
       
}