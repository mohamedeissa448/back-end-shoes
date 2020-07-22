var mongoose = require('mongoose');

var ProductDecreaseSchema = mongoose.Schema({
    Product                         : {
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
    Quantity                        : Number,
    Cost                            : Number,
    StoreLocation                   : Number, // should be ref with store location model
    Price                           : Number,
  },{
    toJSON: { virtuals: true }
  });

 /* ProductDecreaseSchema.virtual("product",{
    ref: "ogt_product",
    localField: "Product",
    foreignField: "_id",
    justOne: true // for 1-to-1 relationships
  });
  ProductDecreaseSchema.virtual("sizeVariant",{
    ref: "lut_size_variants",
    localField: "Size_Variant",
    foreignField: "_id",
    justOne: true // for 1-to-1 relationships
  });
  ProductDecreaseSchema.virtual("colorVariant",{
    ref: "lut_color_variants",
    localField: "Color_Variant",
    foreignField: "_id",
    justOne: true // for 1-to-1 relationships
  });
*/
  module.exports = ProductDecreaseSchema;