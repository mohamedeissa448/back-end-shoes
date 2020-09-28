var mongoose = require('mongoose');

var BromoCode =new mongoose.Schema({
    
    BromoCode_SysDate                  : { // automatic record the insert date
        type:Date,
        default:    new Date(),
    },
    BromoCode_Start_Date               : Date, // selected by user
    BromoCode_End_Date                 : Date, // selected by user
    BromoCode_Usage_Times              : Number, // number of times to use, 0 means unlimited times of use
    BromoCode_Discount                 : Number,
    BromoCode_Description              : String,
});

BromoCode = module.exports = mongoose.model('ogt_bromoCode',BromoCode);

