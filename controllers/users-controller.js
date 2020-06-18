const jwt = require("jsonwebtoken");
const passport = require("passport");
const config = require("../config");
const authenticate = require("../authenticate");
const User = require("../models/user-model");
module.exports = {
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
  }
};