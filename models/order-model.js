var mongoose = require('mongoose');
var ProductDecreaseSchema = require('./general-schemas/product-decrease-schema'); 
var AddressSchema = require('./general-schemas/address-schema'); 

var CancelationDetailsSchema= mongoose.Schema({
    Cancelation_Date                          : Date,
    Cancelation_ReasonOfCancelation           : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_reason_of_calcelation',
        default : null
    },
    Cancelation_Note                             : String,
    Cancelation_HandledBy                : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_users',
        default : null
    },
})
var ReturnDetailsSchema= mongoose.Schema({
    Return_Date                     : Date,
    Return_ReasonOfReturn           : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_reason_of_return',
        default : null
    },
    Return_Note                     : String,
    Return_ShippingCompanyRefNumber : String,// رقم المرتجع من شركة الشحن
    Return_Products                 : [ProductDecreaseSchema],
    Return_HandledBy                : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_users',
        default : null
    },
    
})
var OrderSchema =new mongoose.Schema({
    
    Order_Code     	                : Number, //auto increment
    Order_SysDate                   : { // automatic record the insert date
        type:Date,
        default:    new Date(),
    },
    Order_Date                                  : Date, // selected by user
    Order_Note                                  : String,
    Order_TotalProductSellingAmount             : Number, // total selling price of all product in the order (Auto Calculated form product model)
    Order_TotalProductCostAmount                : Number, // total cost of all product in the order (Auto Calculated form Store model)

    Order_CreatedType                           : String, // AffiliateSeller or DirectCustomer ... For now only AffiliateSeller is used
    
    Order_Customer                              : { // should be Inserted if customer not in the database 
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_customer'
    },

    // If type is AffiliateSeller 
    Order_AffiliateSeller                       : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_affiliate_seller'
    },
    // Add Automatically by back end (Get the AffiliateSeller data and fill this field)
    Order_AffiliateSellerRevenuePercentage      : Number,
    Order_AffiliateSellerRevenueAmount          : Number,

    //order shipping data
    Order_ShippingCompany                       : { 
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_shipping_company'
    },
    Order_ShippingPrice                         : Number,// get from the shipping Company contract
    Order_ShippingCost                          : Number,// get from the shipping Company contract
    Order_ShippingWaybill                       : [String],
    Customer_ShippingAddress                    : AddressSchema,
    Order_CustomerPaymentStatus                 : String, // COD, Paid
    Order_InvntoryHandlingAssignedTo            : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_users',
        default : null
    },
    Order_Products                             : [ProductDecreaseSchema],

    Order_Status                                : String, // Created (quantity Is Pending), Assigned,  Shipped (Quantity is released form store), Cancelled (canceled before Shipped and quantitiy is removed from pending), Returned (), Collected
    Order_CancelationDetails                    : CancelationDetailsSchema,
    Order_Return_Details                        : [ReturnDetailsSchema],
    Order_PaymentBy                             :{
        type : mongoose.Schema.Types.ObjectId,
        ref : "lut_payment_method"
    }
});

Order = module.exports = mongoose.model('ogt_order',OrderSchema);

module.exports.getLastCode = function(callback){
    Order.findOne({},callback).sort({Order_Code:-1});
}