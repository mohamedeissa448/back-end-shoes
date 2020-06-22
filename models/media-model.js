var mongoose = require('mongoose');

var Ogt_MediaSchema =new mongoose.Schema({
    Media_Type     		            : String, // String and on off:  Video, Image, Document 
    Media_Title                     : String,
    Media_MetaTags                  :[String],// String used for search engine optimization
    Media_AlternativeText           : String,
    Media_Describtion               : String,
    Media_xLargImageUrl             : String, // FHD Image w: 1920 x h: 1080
    Media_LargImageUrl              : String, // HD Image w: 1280 x h: 720
    Media_MediumImageUrl            : String, // Image w: 720 x h: 480
    Media_SamllImageUrl             : String, // Image w: 300 x h: 300
   
});
const product=mongoose.model('ogt_media',Ogt_MediaSchema);
module.exports=product;