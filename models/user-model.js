const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var passwordHash = require("password-hash");

const userSchema = new mongoose.Schema({
  User_Code: Number,
  User_Name: String,
  User_Password: String,
  User_DisplayName: String,
  User_Permissions: [String],
  User_IsActive: {type: Boolean,
    default: true
  },
 
});

userSchema.methods.verifyPassword = function(password) {
  if (passwordHash.verify(password, this.User_Password) == 1) return 1;
  else return 0;
};

userSchema.methods.updatePassword = function(password) {
  this.User_Password = passwordHash.generate(password);
  this.save();
};

//userSchema.plugin(passportLocalMongoose);// what is this?? //adds username and hashed passport and other methodes on model

User = module.exports = mongoose.model("ogt_users", userSchema);

module.exports.getLastCode = function(callback) {
  User.findOne({}, callback).sort({ User_Code: -1 });
};