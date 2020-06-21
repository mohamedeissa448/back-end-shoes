var mongoose = require('mongoose');

var MatrialSchema = mongoose.Schema({
    
    ProductMatrial_Name     	       : String,
    ProductMatrial_Description         : String,
    ProductMatrial_IsActive            : {
        type:Boolean,
        default:true,
    }
});


const color = mongoose.model('lut_product_material', MatrialSchema);
module.exports = productMaterial;
