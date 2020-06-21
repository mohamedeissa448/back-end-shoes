var mongoose = require('mongoose');

var colorVariantsSchema = mongoose.Schema({
    
    Color_Name     	        : String,
    Color_Icon_Image_Url    : String,
    Color_Description       : String,
    Color_IsActive          : {
        type:Boolean,
        default:true,
    }
});


const color = mongoose.model('lut_color_variants', colorVariantsSchema);
module.exports = color;
