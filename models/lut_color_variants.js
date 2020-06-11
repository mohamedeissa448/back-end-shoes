var mongoose = require('mongoose');

var colorVariantsSchema = mongoose.Schema({
    
    Color_Name     	  : String,
    
});


const color = mongoose.model('lut_color_variants', colorVariantsSchema);
module.exports = color;
