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
router.post('/getAffiliateSellerPaymentsFromDateTo',async function(req, res, next) {
    await(affiliateSellerController.getAffiliateSellerPaymentsFromDateTo(req, res));
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
  router.post("/changeDisplayName",async function(req, res) {
    await(affiliateSellerController.changeDisplayName(req, res));
 });

 router.post("/changeEmail",async function(req, res) {
    await(affiliateSellerController.changeEmail(req, res));
  
});
/////////affiliate seller orders ///////

router.post("/getAffiliateSellerCanceledOrders",async function(req, res) {
    await(affiliateSellerController.getAffiliateSellerCanceledOrders(req, res));
});
router.post("/getAffiliateSellerCanceledOrdersByDateFromTO",async function(req, res) {
    await(affiliateSellerController.getAffiliateSellerCanceledOrdersByDateFromTO(req, res));
});
router.post("/getFilteredCanceledOrdersByCustomerMobile",async function(req, res) {
    await(affiliateSellerController.getFilteredCanceledOrdersByCustomerMobile(req, res));
});
router.post("/getAffiliateSellerReturnedOrders",async function(req, res) {
    await(affiliateSellerController.getAffiliateSellerReturnedOrders(req, res));
});
router.post("/getAffiliateSellerReturnedOrdersByDateFromTO",async function(req, res) {
    await(affiliateSellerController.getAffiliateSellerReturnedOrdersByDateFromTO(req, res));
});
router.post("/getFilteredReturnedOrdersByCustomerMobile",async function(req, res) {
    await(affiliateSellerController.getFilteredReturnedOrdersByCustomerMobile(req, res));
});

/********** for  Statistics    */
router.post('/getCountOfCanceledOrdersByAffiliateSellerId',async function(req, res, next) {
    await(affiliateSellerController.getCountOfCanceledOrdersByAffiliateSellerId(req, res));
});

router.post('/getCountOfReturnedOrdersByAffiliateSellerId',async function(req, res, next) {
    await(affiliateSellerController.getCountOfReturnedOrdersByAffiliateSellerId(req, res));
});

router.post('/getCountOfCollectedOrdersByAffiliateSellerId',async function(req, res, next) {
    await(affiliateSellerController.getCountOfCollectedOrdersByAffiliateSellerId(req, res));
});

router.post('/getCountOfShippedOrdersByAffiliateSellerId',async function(req, res, next) {
    await(affiliateSellerController.getCountOfShippedOrdersByAffiliateSellerId(req, res));
});

router.post('/getCountOfAllOrdersByAffiliateSellerId',async function(req, res, next) {
    await(affiliateSellerController.getCountOfAllOrdersByAffiliateSellerId(req, res));
});
router.post('/getAffiliateSellerBalance',async function(req, res, next) {
    await(affiliateSellerController.getAffiliateSellerBalance(req, res));
});
module.exports = router;
