var mongoose = require('mongoose');

var ProductTransactionsSchema =new mongoose.Schema({
    
    ProductTransaction_SysDate                   : { // automatic record the insert date
        type:Date,
        default:    new Date(),
    },
    ProductTransaction_Date                      : Date, // As Defined in the action
    ProductTransaction_Product                   : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_product'
    },
    ProductTransaction_Size_Variant              : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_size_variants'
    },
    ProductTransaction_Color_Variant             : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_color_variants'
    },
    ProductTransaction_MathSign                  : Number, // -1 for decrease and 1 for increse
    ProductTransaction_Type                      : String, // Increase Inventory, Decrease Inventory, Bill, Sales Order
    ProductTransaction_IncreaseInventory         : { // filled if Increase Inventory
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_increase_inventory'
    },
    ProductTransaction_DecreaseInventory         : { // filled if Decrease Inventory
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_decrease_inventory'
    },
    ProductTransaction_Order                     : { // filled if Order
        type:mongoose.Schema.Types.ObjectId,
        ref:'ogt_order'
    },
    // Missing Fields for Bill and Return Orders
    ProductTransaction_QuantityBeforAction       : Number, // by small unit
    ProductTransaction_CostBeforAction           : Number, // by small unit

    ProductTransaction_QuantityAfterAction       : Number, // by small unit
    ProductTransaction_CostAfterAction           : Number,
    ProductTransaction_SellPriceOnAction         : Number, // from the product model

});

module.exports = mongoose.model('ogt_product_transactions', ProductTransactionsSchema);