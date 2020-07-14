var mongoose = require("mongoose");
// var bcrypt   = require('bcrypt-nodejs');
var Hcm_SupplierSchema = mongoose.Schema(
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

Hcm_SupplierSchema.methods.verifyPassword = function(password) {
  if (password.localeCompare(this.Supplier_Password) == 0) return 1;
  else return 0;
};
Hcm_SupplierSchema.virtual("Category", {
  ref: "hcm_categories",
  localField: "Supplier_Category_IDs",
  foreignField: "Category_ID",
  justOne: false // for many-to-1 relationships
});
Hcm_SupplierSchema.virtual("SupplierType", {
  ref: "hcm_lut_supplier_types",
  localField: "Supplier_SupplierType_Codes",
  foreignField: "SupplierType_Code",
  justOne: false // for many-to-1 relationships
});
Hcm_SupplierSchema.virtual("supplierclass", {
  ref: "hcm_lut_classes",
  localField: "Supplier_Class_Code",
  foreignField: "Class_Code",
  justOne: true // for many-to-1 relationships
});
Hcm_SupplierSchema.virtual("country", {
  ref: "hcm_countries",
  localField: "Supplier_Country_Code",
  foreignField: "Country_Code",
  justOne: true // for many-to-1 relationships
});

Hcm_SupplierSchema.virtual("PaymentMethod", {
  ref: "hcm_lut_payment_method",
  localField: "Supplier_PaymentMethod_Codes",
  foreignField: "PaymentMethod_Code",
  justOne: false // for many-to-1 relationships
});

Hcm_SupplierSchema.virtual("WayOfDelivery", {
  ref: "hcm_lut_ways_of_deliver",
  localField: "Supplier_WayOfDelivery_Codes",
  foreignField: "WayOfDelivary_Code",
  justOne: false // for many-to-1 relationships
});
Hcm_SupplierSchema.virtual("SupplierClass", {
  ref: "hcm_lut_classes",
  localField: "Supplier_Class_Code",
  foreignField: "Class_Code",
  justOne: false // for many-to-1 relationships
});

// Hcm_SupplierSchema.methods.generateHash = function(password) {
//     return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
// };

var Suppliers = (module.exports = mongoose.model(
  "hcm_supplier",
  Hcm_SupplierSchema
));

module.exports.getLastCode = function(callback) {
  Suppliers.findOne({}, callback).sort({ Supplier_Code: -1 });
};
