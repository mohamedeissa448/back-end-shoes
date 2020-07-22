var mongoose = require('mongoose');
var storeSchema =new mongoose.Schema({
    
    Store_Product        : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_product'
    },
    Size_Variant                    : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_size_variants'
    },
    Color_Variant                   : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_color_variants'
    },
    Store_Quantity       : Number, // Using Small Unit only
    Store_Cost           : Number,
    Store_StoragePlace   : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_storage_places'
    },

   
});
const store=mongoose.model('ogt_store',storeSchema);
module.exports=store;