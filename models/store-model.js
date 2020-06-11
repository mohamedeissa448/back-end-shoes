var mongoose = require('mongoose');
var storeSchema =new mongoose.Schema({
    

   
});
const store=mongoose.model('store',storeSchema);
module.exports=store;