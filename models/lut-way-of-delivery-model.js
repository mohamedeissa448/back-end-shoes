var mongoose = require('mongoose');

var WayOfDeliverySchema = mongoose.Schema({
    
    WayOfDeliverySchema_Name     	        : String,
    WayOfDeliverySchema_Description       : String,
    WayOfDeliverySchema_IsActive          : {
        type:Boolean,
        default:true,
    }
    
});


const size = mongoose.model('lut_way_of_delivery', WayOfDeliverySchema);
module.exports = size;
