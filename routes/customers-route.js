var express = require('express');
var router = express.Router();
var customerController=require('../controllers/customer-controller');

router.post('/addCustomer',async function(req, res, next) {
    await(customerController.addCustomer(req, res));
});

router.post('/editCustomer',async function(req, res, next) {
    await(customerController.editCustomer(req, res));
});

router.get('/getAll',async function(req, res, next) {
    await(customerController.getAll(req, res));
});

router.get('/getAllActive',async function(req, res, next) {
    await(customerController.getAllActive(req, res));
});

router.post('/getOneById',async function(req, res, next) {
    await(customerController.getOneById(req, res));
});
/************************customer billing address */
router.post('/getCustomerBillingAddressByID',async function(req, res, next) {
    await(customerController.getCustomerBillingAddressByID(req, res));
});
router.post('/addBillingAddressToCustomerByCustomerId',async function(req, res, next) {
    await(customerController.addBillingAddressToCustomerByCustomerId(req, res));
});

/************************customer shipping address */
router.post('/getCustomerShippingAddressByID',async function(req, res, next) {
    await(customerController.getCustomerShippingAddressByID(req, res));
});
router.post('/addShippingAddressToCustomerByCustomerId',async function(req, res, next) {
    await(customerController.addShippingAddressToCustomerByCustomerId(req, res));
});


module.exports = router;
