var mongoose = require('mongoose');

var ProductIncreaseSchema = mongoose.Schema({
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
    Cost                            : Number      
  },{
    toJSON: { virtuals: true }
  });



  module.exports = ProductIncreaseSchema;