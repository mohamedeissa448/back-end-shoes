var mongoose = require('mongoose');

var sizeVariantsSchema = mongoose.Schema({
    
    Size_Name     	        : String,
    Size_Description     	: String,
    Size_IsActive           : Boolean
    
});


const size = mongoose.model('lut_size_variants', sizeVariantsSchema);
module.exports = size;
