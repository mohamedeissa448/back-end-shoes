var mongoose = require('mongoose');

var ProvinceSchema = mongoose.Schema({
    
    Province_Name     	        : String,
    Province_ShortCode          : String,
    Province_IsActive           : {
        type:Boolean,
        default:true,
    }
    
});


const size = mongoose.model('lut_province', ProvinceSchema);
module.exports = size;
