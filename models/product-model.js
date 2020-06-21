var mongoose = require('mongoose');

var Ogt_ProductColor_VariantsSchema = mongoose.Schema({
    Color_Variants                 : {
        type:[mongoose.Schema.Types.ObjectId],
        ref:'ogt_lut_color_variants'
    },
    Color_Variants_Images_Media    : [{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'ogt_media'
    }]
})

var Ogt_ProductSchema =new mongoose.Schema({
    Product_Code     		                        : Number,
    Product_Name     		                        : String,
    Product_Material                                :{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'lut_product_material'
    } ,
    Product_Size_Variants     : [{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'lut_size_variants'
    }],
    Product_Color_Variants                           : [Ogt_ProductColor_VariantsSchema],
    Product_DefaultImages_Media     	             : [{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'ogt_media'
    }],

    Product_MainUnit                                 :{ // وحده الصنف الكبري
        type:[mongoose.Schema.Types.ObjectId],
        ref:'lut_product_unit'
    },

    Product_MiddleUnit                               :{ // وحده الصنف الوسطي
        type:[mongoose.Schema.Types.ObjectId],
        ref:'lut_product_unit'
    },
    Product_MiddleUnitCountInMainUnit                : Number, //عدد الوحدات الوسطى المتواجدة في الوحدة الكبرى
    
    Product_SmallUnit                                :{ //وحده الصنف الصغري
        type:[mongoose.Schema.Types.ObjectId],
        ref:'lut_product_unit'
    },
    Product_SmallUnitCountInMiddleUnit               : Number, //عدد الوحدات الصعرى المتواجدة في الوحدة المتوسطة
    
    Product_SellingPrice                             : Number,
    Product_MinStocklimit                            : Number, // حد الطلب
    Product_IsActive                                 : Boolean
   
});
const product=mongoose.model('ogt_product',Ogt_ProductSchema);
module.exports=product;