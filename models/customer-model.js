var mongoose = require('mongoose');
var AddressSchema = require('./general-schemas/address-schema'); 

var CustomerSchema = mongoose.Schema({
    
    Customer_Code     	         : Number, // auto increment 
    Customer_Name                : String,
    Customer_CreatedSysDate      : { // automatic record the insert date
        type:Date,
        default:    new Date(),
    },
    Address          : AddressSchema,
    Customer_BillingAddress      : AddressSchema,
    Customer_BillingAddressLog   : [{
        ChangingDate     : {
           type: Date,
           default : new Date(),
        },
        Address          : AddressSchema
    }],
    Customer_ShippingAddress      :AddressSchema,
    Customer_ShippingAddressLog   : [{
        ChangingDate     : {
            type: Date,
            default : new Date(),
         },
         Address          : AddressSchema
    }],
    Customer_Status               : Number // 1 = active , 0 = disactive , 2 = blocked
    
});


const customer = mongoose.model('ogt_customer', CustomerSchema);
module.exports = customer;
module.exports.getLastCode = function(callback) {
    customer.findOne({}, callback).sort({ Customer_Code: -1 });
  };
  