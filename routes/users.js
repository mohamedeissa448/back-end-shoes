var express = require("express");
var router = express.Router();
var passport = require("passport");
var usersController = require("../controllers/users-controller");

/* GET users listing. */
router.post("/login",async function(req, res, next) {
  //console.log("req.user", req.user);
  //this function will be executed only if loging in succeded
  //it will add a property req.user
 await usersController.login(req, res,next);
});
router.post("/signUp",async function(req, res, next) {
  console.log("11")
 await usersController.signUp(req, res);
});
router.post("/AddUser",async function(req, res) {
    await usersController.addUser(req, res);
  
});

router.get("/getAllUsers",async function(req, res) {
    await(usersController.getAllUsers(req, res));
  
});
router.get("/getAllUsersNumber",async function(req, res) {
    await(usersController.getAllUsersNumber(req, res));
});

router.get("/getActiveUsers",async function(req, res) {
    await(usersController.getActiveUsers(req, res));
  
});
router.post("/editUserPermissions",async function(req, res) {
    await(usersController.editUserPermissions(req, res));

});
router.post("/changeMyPassword",async function(req, res) {
    await(usersController.changeMyPassword(req, res));

});
router.post("/changePassword",async function(req, res) {
    await(usersController.changePassword(req, res));
  
});
router.get('/getSystemPermisions', async function(req, res) {
    await (usersController.getSystemPermisions(req,res));
});

module.exports = router;