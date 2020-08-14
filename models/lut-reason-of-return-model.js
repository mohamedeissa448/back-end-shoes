var mongoose = require('mongoose');

var reasonOfReturnSchema = mongoose.Schema({
    
    ReasonOfReturn_Name     	       : String,
    ReasonOfReturn_Description         : String,
    ReasonOfReturn_IsActive            : {
        type:Boolean,
        default:true,
    }
});


const reasonOfReturn = mongoose.model('lut_reason_of_return', reasonOfReturnSchema);
module.exports = reasonOfReturn;
