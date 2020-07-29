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
module.exports = router;
