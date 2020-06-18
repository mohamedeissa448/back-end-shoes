var express = require("express");
var router = express.Router();
var passport = require("passport");
var usersController = require("../controllers/users-controller");

/* GET users listing. */
router.post("/login", passport.authenticate("local"),async function(req, res, next) {
  console.log("req.user", req.user);
  //this function will be executed only if loging in succeded
  //it will add a property req.user
 await usersController.login(req, res);
});
router.post("/signUp",async function(req, res, next) {
  console.log("11")
 await usersController.signUp(req, res);
});

module.exports = router;