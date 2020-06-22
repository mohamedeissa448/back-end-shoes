var mongoose = require('mongoose');

var MatrialSchema = mongoose.Schema({
    
    ProductMaterial_Name     	       : String,
    ProductMaterial_Description         : String,
    ProductMaterial_IsActive            : {
        type:Boolean,
        default:true,
    }
});


const productMaterial = mongoose.model('lut_product_material', MatrialSchema);
module.exports = productMaterial;
