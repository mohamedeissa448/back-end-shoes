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

/************************change only customer Status */
router.post('/changeCustomerStatus',async function(req, res, next) {
    await(customerController.changeCustomerStatus(req, res));
});
/************************get all orders for a specific customer */
router.post('/getAllOrdersForAspecificCustomer',async function(req, res, next) {
    await(customerController.getAllOrdersForAspecificCustomer(req, res));
});

/************************   Reports      */
router.get('/getNumOfAllCustomers',async function(req, res, next) {
    await(customerController.getNumOfAllCustomers(req, res));
});
router.get('/getNumOfAllActiveCustomers',async function(req, res, next) {
    await(customerController.getNumOfAllActiveCustomers(req, res));
});
router.get('/getNumOfAllRiskyCustomers',async function(req, res, next) {
    await(customerController.getNumOfAllRiskyCustomers(req, res));
});
router.get('/getNumOfAllBlockedCustomers',async function(req, res, next) {
    await(customerController.getNumOfAllBlockedCustomers(req, res));
});
/******* second report */
router.get('/getNumOfAllCustomersWithOnlyOneOrder',async function(req, res, next) {
    await(customerController.getNumOfAllCustomersWithOnlyOneOrder(req, res));
});
router.get('/getNumOfAllCustomersWithOnlyTwoOrders',async function(req, res, next) {
    await(customerController.getNumOfAllCustomersWithOnlyTwoOrders(req, res));
});
router.get('/getNumOfAllCustomersWithThreeOrdersOrMore',async function(req, res, next) {
    await(customerController.getNumOfAllCustomersWithThreeOrdersOrMore(req, res));
});
/******* third report  */
router.post('/getCustomerNamesWithAspecificNumOfOrders',async function(req, res, next) {
    await(customerController.getCustomerNamesWithAspecificNumOfOrders(req, res));
});
module.exports = router;
