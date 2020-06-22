var mongoose = require('mongoose');
var productTransactionSchema =new mongoose.Schema({
    

   
});
const productTransaction=mongoose.model('product_transaction', productTransactionSchema);
module.exports=productTransaction;