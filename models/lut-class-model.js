var mongoose = require('mongoose');

var ClassSchema = mongoose.Schema({
    
    Class_Name     	        : String,
    Class_Description       : String,
    Class_IsActive          : {
        type:Boolean,
        default:true,
    }
    
});


const size = mongoose.model('lut_class', ClassSchema);
module.exports = size;
