const jwt = require("jsonwebtoken");
const passport = require("passport");
var passwordHash = require("password-hash");
const config = require("../config");
const authenticate = require("../authenticate");
const User = require("../models/user-model");
const System_Setting  = require('../models/system_setting');

module.exports = {
  login: function(req, res, next) {
    passport.authenticate("login", function(err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.send(info);
      }
      req.logIn(user, function(err) {
        if (err) {
          return next(info);
        }
        else{
          user.User_Password = '';
          return res.send(user);
        }
        
      });
    })(req, res, next);
  },
  getAllUsers: function(request, res) {
    User.find({}).exec(function(err, user) {
      if (err) {
        return res.send({
          message: err
        });
      } else if (user) {
        res.send(user);
      } else {
        res.send("not Users");
      }
    });
  },
  getAllUsersNumber:function(req,res){
    User.find({}).count(function(err, count){
      console.log("Number of docs: ", count );
      if(err){
        return res.send({err:err})
      }else {
        return res.send({count:count})
      }
    });
  },

  getActiveUsers: function(request, response) {
    User.find({ User_IsActive: 1 }).exec(function(err, user) {
      if (err) {
        return res.send({
          message: err
        });
      } else if (user) {
        response.send(user);
      } else {
        response.send("no Users");
      }
    });
  },
  addUser: function(request, res) {
    User.getLastCode(function(err, user) {
      console.log("user",user)
      if (user) InsertIntoUser(user.User_Code + 1);
      else InsertIntoUser(1);
    });

    function InsertIntoUser(NextCode) {
      console.log("NextCode",NextCode)
      var newUser = new User();
      newUser.User_Code = NextCode;
      newUser.User_Name = request.body.User_Name;
      newUser.User_Password = passwordHash.generate(request.body.User_Password);
      newUser.User_DisplayName = request.body.User_DisplayName;
      newUser.User_Permissions = [];
      newUser.User_IsActive = 1;
      console.log("new user",newUser)
      newUser.save(function(error, doneadd) {
        if (error) {
          return res.send({
            message: error
          });
        } else {
          return res.send({
            message: true
          });
        }
      });
    }
  },

  editUserPermissions: function(request, res) {
    var newvalues = {
      $set: {
        User_Permissions: request.body.User_Permissions
      }
    };
    var myquery = { User_Code: request.body.User_Code };
    User.findOneAndUpdate(myquery, newvalues, function(err, field) {
      if (err) {
        return res.send({
          message: "Error"
        });
      }
      if (!field) {
        return res.send({
          message: "User not exists"
        });
      } else {
        return res.send({
          message: true
        });
      }
    });
  },
  changeMyPassword: function(request, res) {
    User.findOne({ User_Code: request.body.User_Code }, function(err, user) {
      if (err) {
        res.send({ message: err });
      } else if (user) {
        if (!user.verifyPassword(request.body.old_password)) {
          res.send({ message: false });
        } else {
          user.updatePassword(request.body.new_password);
          res.send({ message: true });
        }
      } else {
        res.send({ message: "Error" });
      }
    });
  },
  changePassword: function(request, res) {
    User.findOne({ User_Code: request.body.id }, function(err, user) {
      if (err) {
        res.send({ message: err });
      } else if (user) {
        user.updatePassword(request.body.password);
        res.send({ message: true });
      } else {
        res.send({ message: "unknown Error" });
      }
    });
  },

  getSystemPermisions:function(request, res) {
		System_Setting.findOne({System_Setting_ConfigName:"CP_Users_Permissions"}, function(err, permision) {
		    if (err){
		    	res.send({message: 'Error'});
		    }
	        if (permision) {
            res.send(permision.System_Setting_ConfigValue);
			} 
		});
	},
  /*
  login: (req, res) => {
    const token = authenticate.getToken({
      _id: req.user._id,
      isAdmin: req.user.isAdmin,
      username: req.user.username
    });
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.json({ succcess: true, token: token, status: "loging Successful" });
  },
  signUp: (req, res, user) => {
      console.log("req.body",req.body)
    if (user) {
      username = user.username;
    } else {
      username = req.body.username;
    }
    User.register(
      new User({ username: username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.json({ err: err });
        } else {
          passport.authenticate("local")(req, res, () => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ succcess: true, status: "Registration Successful" });
          });
        }
      }
    );
  }*/
};