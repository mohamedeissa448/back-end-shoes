var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var passwordHash = require("password-hash");


var AffiliateSellerPaymentSchema= mongoose.Schema({
  Payment_SysDate              : { // automatic record the insert date
    type:Date,
    default:    new Date(),
  }, 
  Payment_Date                 : Date,
  Payment_PaidAmount           : Number,
  Payment_PaidMethod           : {
    type: mongoose.Schema.Types.ObjectId,
    ref:'lut_payment_method'
  },
  Payment_PaymentRefranceNumber     : String, // ex: Bank transfer Number, payment recipt number
  Payment_PaymentExtraDetails       : String, // ex: Bank account number, Bank Name, IBAN Number
  Payment_PaidByUser          : {
    type: mongoose.Schema.Types.ObjectId,
    ref:'ogt_users'
  },
})
var AffiliateSellerOrdersSchema= mongoose.Schema({
  Order_SysDate                              : { // automatic record the insert date
    type:Date,
    default:    new Date(),
  }, 
  Order_TotalAmount                          : Number,
  Order_AffiliateSellerRevenuePercentage     : Number,
  Order_AffiliateSellerRevenueAmount         : Number,
  Order_RefrencedOrder                       : {
    type: mongoose.Schema.Types.ObjectId,
    ref:'ogt_order'
  },
})
var AffiliateSellerFinancialTransactionSchema =new mongoose.Schema({
  
  AffiliateSellerFinancialTransaction_SysDate                   : { // automatic record the insert date
      type:Date,
      default:    new Date(),
  },
  AffiliateSellerFinancialTransaction_Date                      : Date, // As Defined in the action
  AffiliateSellerFinancialTransaction_MathSign                  : Number, // (-1 ?? for Payments or returns) and (1 for Purchasing)
  AffiliateSellerFinancialTransaction_Amount                    : Number ,
  AffiliateSellerFinancialTransaction_Order                     : { // for which order this transaction is related to
    type: mongoose.Schema.Types.ObjectId,
    ref:'ogt_order'
  },
  AffiliateSellerFinancialTransaction_Type                      : String, // order, return, Payment
});
var AffiliateSellerSchema = mongoose.Schema(
  {
    AffiliateSeller_Code                        : Number,
    AffiliateSeller_Type                        : String, // Personal or Company
    AffiliateSeller_Name                        : String,
    AffiliateSeller_DisplayName                 : String,
    AffiliateSeller_NationalID                  : String, // If Personal
    AffiliateSeller_CommercialRegisterID        : String, // If Company
    AffiliateSeller_TaxID                       : String, // If Company
    AffiliateSeller_Email                       : String,
    AffiliateSeller_Password                    : String,
    AffiliateSeller_Permissions: {type:[String], default : []},
    AffiliateSeller_Phone                       : String,
    AffiliateSeller_Address                     : String,
    AffiliateSeller_City                        : String,
    AffiliateSeller_Country: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'lut_country'
    } ,
    AffiliateSeller_WebsiteURL                  : String,
    AffiliateSeller_FaceBookPageURL             : String,
    AffiliateSeller_Rate                        : Number, // represent how the quality of the Affiliateseller is Good
    AffiliateSeller_Class_Code: {                         // represent how the Affiliateseller doing (amount of orders)
        type: mongoose.Schema.Types.ObjectId,
        ref:'lut_class'
    },
    AffiliateSeller_RevenuePercentage           : Number, // Percentage of each successed order
    AffiliateSeller_RevenuePercentageChangesLog : [{ // log the changes of the percentage of the revenue
      dateOfChanges         : Date,
      Percentage            : Number,
      ChangedByUser         : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'ogt_users'
      }
    }],
    AffiliateSeller_Bank_Name                   : String,
    AffiliateSeller_BankAccountNumber           : String,
    AffiliateSeller_BankAccountHolderName       : String,
    AffiliateSeller_BankIBANNumber              : String,
    AffiliateSeller_Contacts: [
      {
        AffiliateSeller_ContactTitle      : String,
        AffiliateSeller_ContactName       : String,
        AffiliateSeller_ContactTelephone  : String,
        AffiliateSeller_ContactEmail      : String
      }
    ],
    AffiliateSeller_PaymentLog                  : [AffiliateSellerPaymentSchema],// updated by Accountant each time we sent the seller any money 
    AffiliateSeller_CreatedOrders               : [AffiliateSellerOrdersSchema], // update whenerver the seller create an order 
    AffiliateSeller_DeliveredOrders             : [AffiliateSellerOrdersSchema], // update whenerver an order is Collected to us
    AffiliateSeller_ReturnedOrders              : [AffiliateSellerOrdersSchema], // update whenerver an order is returned
    AffiliateSeller_CanceledOrders              : [AffiliateSellerOrdersSchema], // update whenerver an order is canceled
    AffiliateSeller_FinancialTransactions       : [AffiliateSellerFinancialTransactionSchema],// Update whenever an order is shiped, returned, and on payments 
    AffiliateSeller_CreationSysDate             : { // automatic record the Creation date
      type:Date,
      default:    new Date(),
    }, 
    AffiliateSeller_CreatedByUser               : {
      type: mongoose.Schema.Types.ObjectId,
      ref:'ogt_users'
    },
    AffiliateSeller_IsActive: {
      type: Boolean,
      default: true
    },
    
  },{
    toJSON: { virtuals: true }
  }
);

AffiliateSellerSchema.methods.verifyPassword = function(password) {
  if (passwordHash.verify(password, this.AffiliateSeller_Password) == 1) 
      return 1;
  else return 0;
};

AffiliateSellerSchema.methods.updatePassword = function(password) {
  this.AffiliateSeller_Password = passwordHash.generate(password);
  this.save();
};



var AffiliateSeller = (module.exports = mongoose.model("ogt_affiliate_seller",AffiliateSellerSchema));

module.exports.getLastCode = function(callback) {
  AffiliateSeller.findOne({}, callback).sort({ AffiliateSeller_Code: -1 });
};
