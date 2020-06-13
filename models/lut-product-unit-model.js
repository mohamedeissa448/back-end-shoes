var mongoose = require('mongoose');

var colorVariantsSchema = mongoose.Schema({
    
    ProductUnit_Name     	        : String,
    ProductUnit_Description         : String,
    ProductUnit_IsActive            : Boolean
});


const color = mongoose.model('lut_product_unit', colorVariantsSchema);
module.exports = color;
