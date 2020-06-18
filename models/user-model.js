const mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
  isAdmin: {
    type: Boolean,
    default: false
  }
});
userSchema.plugin(passportLocalMongoose); //adds username and hashed passport and other methodes on model
module.exports = mongoose.model("User", userSchema);