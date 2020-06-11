var mongoose = require('mongoose');
var productSchema =new mongoose.Schema({
    
	Product_Code     		: String,
    Size_Variants     		: {
        type:[mongoose.Schema.Types.ObjectId],
        ref:'size_variants'
    },
    Size_Colors             :{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'color_variants'
    },
    Images_Urls     	    : [String],
    Maximum_Unit            : Number,// وحده الصنف الكبري
    Medium_Unit             : Number,// وحده الصنف الوسطي
    Minimum_Unit            : Number,//وحده الصنف الصغري
    Sell_Price              : Number
   
});
const product=mongoose.model('product',productSchema);
module.exports=product;