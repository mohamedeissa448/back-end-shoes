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
  });
  module.exports = ProductDecreaseSchema;