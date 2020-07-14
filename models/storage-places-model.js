var mongoose = require('mongoose');
var storagePlacesSchema =new mongoose.Schema({
    

   
});
const storage_places=mongoose.model('ogt_storage_places',storagePlacesSchema);
module.exports=storage_places;