var mongoose = require('mongoose');

var SystemSettingsSchema = mongoose.Schema({
    
	System_Setting_ID     			: Number,
    System_Setting_ConfigName     	: String,
    System_Setting_ConfigValue      : [JSON]
});




module.exports = mongoose.model('ogt_system_setting', SystemSettingsSchema);
