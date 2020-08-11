var express = require('express');
var router = express.Router();
var affiliateSellerController=require('../controllers/affiliate-Seller-controller');

router.post('/addAffiliateSeller',async function(req, res, next) {
    await(affiliateSellerController.addAffiliateSeller(req, res));
});

router.post('/editAffiliateSeller',async function(req, res, next) {
    await(affiliateSellerController.editAffiliateSeller(req, res));
});

router.get('/getAll',async function(req, res, next) {
    await(affiliateSellerController.getAll(req, res));
});

router.get('/getAllActive',async function(req, res, next) {
    await(affiliateSellerController.getAllActive(req, res));
});

router.post('/getOneById',async function(req, res, next) {
    await(affiliateSellerController.getOneById(req, res));
});
/************************AffiliateSeller revenue percentages log */
router.post('/addAffiliateSeller_RevenuePercentageChangesLogById',async function(req, res, next) {
    await(affiliateSellerController.addAffiliateSeller_RevenuePercentageChangesLogById(req, res));
});

/************************AffiliateSeller contacts */
router.post('/getAffiliateSellerContactsByID',async function(req, res, next) {
    await(affiliateSellerController.getAffiliateSellerContactsByID(req, res));
});
router.post('/addContactsToAffiliateSellerByAffiliateSellerId',async function(req, res, next) {
    await(affiliateSellerController.addContactsToAffiliateSellerByAffiliateSellerId(req, res));
});

/************************AffiliateSeller Payments */
router.post('/getAffiliateSellerPaymentsByID',async function(req, res, next) {
    await(affiliateSellerController.getAffiliateSellerPaymentsByID(req, res));
});
router.post('/addPaymentsToAffiliateSellerByAffiliateSellerId',async function(req, res, next) {
    await(affiliateSellerController.addPaymentsToAffiliateSellerByAffiliateSellerId(req, res));
});
/********************    log In      */
router.post("/login",async function(req, res, next) {
    console.log("req.user", req.user);
    //this function will be executed only if loging in succeded
    //it will add a property req.user
   await affiliateSellerController.login(req, res,next);
  });
  router.post("/signUp",async function(req, res, next) {
    console.log("11")
   await affiliateSellerController.signUp(req, res);
  });
  router.post("/AddUser",async function(req, res) {
      await affiliateSellerController.addUser(req, res);
    
  });
  
  router.get("/getAllUsers",async function(req, res) {
      await(affiliateSellerController.getAllUsers(req, res));
    
  });
  router.get("/getAllUsersNumber",async function(req, res) {
      await(affiliateSellerController.getAllUsersNumber(req, res));
  });
  
  router.get("/getActiveUsers",async function(req, res) {
      await(affiliateSellerController.getActiveUsers(req, res));
    
  });
  router.post("/editUserPermissions",async function(req, res) {
      await(affiliateSellerController.editUserPermissions(req, res));
  
  });
  router.post("/changeMyPassword",async function(req, res) {
      await(affiliateSellerController.changeMyPassword(req, res));
  
  });
  router.post("/changePassword",async function(req, res) {
      await(affiliateSellerController.changePassword(req, res));
    
  });
  
module.exports = router;
