var mongoose = require('mongoose');

var CategorySchema = mongoose.Schema({
    
    Category_Name     	        : String,
    Category_Description        : String,
    Category_IsActive           : {
        type:Boolean,
        default:true,
    }
    
});


const size = mongoose.model('category', CategorySchema);
module.exports = size;
