var mongoose = require('mongoose');
var storeSchema =new mongoose.Schema({
    

   
});
const store=mongoose.model('ogt_store',storeSchema);
module.exports=store;