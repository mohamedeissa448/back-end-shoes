var mongoose = require('mongoose');

var Ogt_ProductColor_VariantsSchema = mongoose.Schema({
    Color_Variants                 : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_lut_color_variants'
    },
    Color_Variants_Images_Media    : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_media'
    }]
})

var Ogt_ProductSchema =new mongoose.Schema({
    Product_Code     		                        : Number,
    Product_Name     		                        : String,
    Product_Identifier                          : String,//entered by user
    Product_Categories                              :[{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'ogt_category'
    }],
    Product_Material                                :{
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_product_material'
    },
    Product_Size_Variants     : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_size_variants'
    }],
    Product_Color_Variants                           : [Ogt_ProductColor_VariantsSchema],
    Product_DefaultImages_Media     	             : [{
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_media'
    }],

    Product_MainUnit                                 :{ // وحده الصنف الكبري
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_product_unit'
    },

    Product_MiddleUnit                               :{ // وحده الصنف الوسطي
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_product_unit'
    },
    Product_MiddleUnitCountInMainUnit                : Number, //عدد الوحدات الوسطى المتواجدة في الوحدة الكبرى
    
    Product_SmallUnit                                :{ //وحده الصنف الصغري
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_product_unit'
    },
    Product_SmallUnitCountInMiddleUnit               : Number, //عدد الوحدات الصعرى المتواجدة في الوحدة المتوسطة
    
    Product_SellingPrice                             : Number,
    Product_MinStocklimit                            : Number, // حد الطلب
    Product_IsActive                                 : {
        type: Boolean,
        default: true
    }
   
},
 {
    toJSON: { virtuals: true }
  }
);

Ogt_ProductSchema.virtual("Categories",{
    ref: "ogt_category",
  localField: "Product_Categories",
  foreignField: "_id",
  justOne: false // for many-to-1 relationships
});
Ogt_ProductSchema.virtual("Material",{
    ref: "lut_product_material",
  localField: "Product_Material",
  foreignField: "_id",
  justOne: true // for 1-to-1 relationships
});
Ogt_ProductSchema.virtual("Size_Variants",{
    ref: "lut_size_variants",
  localField: "Product_Size_Variants",
  foreignField: "_id",
  justOne: false // for many-to-1 relationships
});
Ogt_ProductSchema.virtual("DefaultImages_Media",{
    ref: "ogt_media",
  localField: "Product_DefaultImages_Media",
  foreignField: "_id",
  justOne: false // for many-to-1 relationships
});
Ogt_ProductSchema.virtual("MainUnit",{
    ref: "lut_product_unit",
  localField: "Product_MainUnit",
  foreignField: "_id",
  justOne: true // for 1-to-1 relationships
});
Ogt_ProductSchema.virtual("MiddleUnit",{
    ref: "lut_product_unit",
  localField: "Product_MiddleUnit",
  foreignField: "_id",
  justOne: true // for 1-to-1 relationships
});
Ogt_ProductSchema.virtual("SmallUnit",{
    ref: "lut_product_unit",
  localField: "Product_SmallUnit",
  foreignField: "_id",
  justOne: true // for 1-to-1 relationships
});

const product=mongoose.model('ogt_product',Ogt_ProductSchema);
module.exports=product;

module.exports.getLastCode = function(callback) {
    product.findOne({}, callback).sort({ Product_Code: -1 });
  };