var mongoose = require('mongoose');

var AddressSchema = mongoose.Schema({
  
  AddressName                 : String, // for display only
  ContactName                 : String, // Name of the Person who Is responsable for the Address   
  Mobile                      : String,
  Building                    : String,
  Floor                       : String,
  Apartment                   : String,
  StreetAddress               : String,
  City                        : String,
  Province                    : { 
    type:mongoose.Schema.Types.ObjectId,
    ref:'lut_province'
  }

});

  module.exports = AddressSchema;