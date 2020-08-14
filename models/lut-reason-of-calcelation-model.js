var mongoose = require('mongoose');

var reasonOfCalcelationSchema = mongoose.Schema({
    
    ReasonOfCalcelation_Name     	       : String,
    ReasonOfCalcelation_Description         : String,
    ReasonOfCalcelation_IsActive            : {
        type:Boolean,
        default:true,
    }
});


const reasonOfCalcelation = mongoose.model('lut_reason_of_calcelation', reasonOfCalcelationSchema);
module.exports = reasonOfCalcelation;
