var mongoose = require("mongoose");
// var bcrypt   = require('bcrypt-nodejs');


var ShippingContractSchema= mongoose.Schema({
  ContractCreatedSysDate      : { // automatic record the insert date
      type:Date,
      default:    new Date(),
  },
  ContractDate                : Date,
  ContractPriceAndCost        : [{
    Province: { 
      type:mongoose.Schema.Types.ObjectId,
      ref:'lut_province'
    },
    ShippingPrice   : Number,
    ShippingCost    : Number

  }],
})
var ShippingCompanySchema = mongoose.Schema(
  {
    ShippingCompany_Code                  : Number,
    ShippingCompany_Name                  : String,
    ShippingCompany_Email                 : String,
    ShippingCompany_Phone                 : String,
    ShippingCompany_WebsiteURL            : String,
    ShippingCompany_TrakingURL            : String,
    ShippingCompany_FaceBookPageURL       : String,
    ShippingCompany_Country               : {
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_country'
    } ,
    ShippingCompany_City: String,
    ShippingCompany_Address               : String,
    ShippingCompany_Contract              : ShippingContractSchema,
    ShippingCompany_ContractHistory       : [ShippingContractSchema],
    ShippingCompany_Class_Code            : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'lut_class'
    },
    ShippingCompany_Rate                  : Number,
    ShippingCompany_Contacts              : [{
      ShippingCompany_ContactTitle: String,
      ShippingCompany_ContactName: String,
      ShippingCompany_ContactTelephone: String,
      ShippingCompany_ContactEmail: String
    }],
    ShippingCompany_IsActive: {
      type: Boolean,
      default: true
    }
  }
);


var ShippingCompany = (module.exports = mongoose.model("ogt_shipping_company",ShippingCompanySchema));

module.exports.getLastCode = function(callback) {
  ShippingCompany.findOne({}, callback).sort({ ShippingCompany_Code: -1 });
};
