var mongoose = require('mongoose');

var sizeVariantsSchema = mongoose.Schema({
    
    Size_Name     	            : String,
    Size_TwoLettersIdentifier   : String,
    Size_Description     	    : String,
    Size_IsActive               : {
        type:Boolean,
        default:true,
    }
    
});


const size = mongoose.model('lut_size_variants', sizeVariantsSchema);
module.exports = size;
