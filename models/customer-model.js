var mongoose = require('mongoose');
var AddressSchema = require('./general-schemas/address-schema'); 

var CustomerSchema = mongoose.Schema({
    
    Customer_Code     	         : Number, // auto increment 
    Customer_Name                : String,
    Customer_CreatedSysDate      : { // automatic record the insert date
        type:Date,
        default:    new Date(),
    },
    Customer_BillingAddress      : AddressSchema,
    Customer_BillingAddressLog   : [{
        ChangingDate     : Date,
        Address          : AddressSchema
    }],
    Customer_ShippingAddress      :AddressSchema,
    Customer_ShippingAddressLog   : [{
        ChangingDate     : Date,
        Address          : AddressSchema
    }],
    Customer_Status               : Number // 1 = active , 0 = disactive , 2 = blocked
    
});


const size = mongoose.model('ogt_customer', CustomerSchema);
module.exports = size;
