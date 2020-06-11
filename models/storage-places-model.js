var mongoose = require('mongoose');
var storagePlacesSchema =new mongoose.Schema({
    

   
});
const storage_places=mongoose.model('storage_places',storagePlacesSchema);
module.exports=storage_places;