var mongoose = require('mongoose');

var SupplierPaymentSchema =new mongoose.Schema({
    
    SupplierPayment_SysDate                   : { // automatic record the insert date
        type:Date,
        default:    new Date(),
    },
    SupplierPayment_Date                      : Date, // As Defined in the action
    SupplierPayment_Supplier                   : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_supplier'
    },
    SupplierPayment_DoneBy_User               : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_users'
    },
    SupplierPayment_PaymentMethod             : {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'lut_payment_method'
    },
    SupplierPayment_Amount                    : Number,
});

module.exports = mongoose.model('ogt_supplier_payment', SupplierPaymentSchema);