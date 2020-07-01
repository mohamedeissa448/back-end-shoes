var mongoose = require('mongoose');

var CountrySchema = mongoose.Schema({
    
    Country_Name     	        : String,
    Country_ShortCode           : String,
    Country_IsActive            : {
        type:Boolean,
        default:true,
    }
    
});


const size = mongoose.model('lut_country', CountrySchema);
module.exports = size;
