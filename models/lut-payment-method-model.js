var mongoose = require('mongoose');

var PaymentMethodSchema = mongoose.Schema({
    
    PaymentMethod_Name     	        : String,
    PaymentMethod_Description       : String,
    PaymentMethod_IsActive          : {
        type:Boolean,
        default:true,
    }
    
});


const size = mongoose.model('lut_payment_method', PaymentMethodSchema);
module.exports = size;
