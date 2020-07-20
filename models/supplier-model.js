var mongoose = require("mongoose");
// var bcrypt   = require('bcrypt-nodejs');
var SupplierSchema = mongoose.Schema(
  {
    Supplier_Code: Number,
    Supplier_Name: String,
    Supplier_Email: String,
    Supplier_Phone: String,
    Supplier_WebsiteURL: String,
    Supplier_FaceBookPageURL: String,
    Supplier_Country: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_country'
    } ,
    Supplier_City: String,
    Supplier_Address: String,
    Supplier_AddressGPSLocation: String,
    Supplier_StoreAddress: String,
    Supplier_StoreGPSLocation: String,
    Supplier_TimeOfDelivery: Number, //value in hours
    Supplier_Categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'ogt_category'
    }],
    Supplier_Class_Code: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'lut_class'
    },
    Supplier_Rate: Number,
    Supplier_PaymentMethods: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'lut_payment_method'
    }],
    Supplier_WayOfDeliveries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'lut_way_of_delivery'
    }],
    Supplier_Contacts: [
      {
        Supplier_ContactTitle: String,
        Supplier_ContactName: String,
        Supplier_ContactTelephone: String,
        Supplier_ContactEmail: String
      }
    ],
    Supplier_IsActive: {
      type: Boolean,
      default: true
    }

  },
  {
    toJSON: { virtuals: true }
  }
);


var Suppliers = (module.exports = mongoose.model("ogt_supplier",SupplierSchema));

module.exports.getLastCode = function(callback) {
  Suppliers.findOne({}, callback).sort({ Supplier_Code: -1 });
};
