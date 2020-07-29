var express = require('express');
var router = express.Router();
var shippingCompanyController=require('../controllers/shipping-company-controller');

router.post('/addShippingCompany',async function(req, res, next) {
    await(shippingCompanyController.addShippingCompany(req, res));
});

router.post('/editShippingCompany',async function(req, res, next) {
    await(shippingCompanyController.editShippingCompany(req, res));
});

router.get('/getAll',async function(req, res, next) {
    await(shippingCompanyController.getAll(req, res));
});

router.get('/getAllActive',async function(req, res, next) {
    await(shippingCompanyController.getAllActive(req, res));
});

router.post('/getOneById',async function(req, res, next) {
    await(shippingCompanyController.getOneById(req, res));
});
/************************supplier contacts */
router.post('/getShippingCompanyContactsByID',async function(req, res, next) {
    await(shippingCompanyController.getShippingCompanyContactsByID(req, res));
});
router.post('/addContactsToShippingCompanyByShippingCompanyId',async function(req, res, next) {
    await(shippingCompanyController.addContactsToShippingCompanyByShippingCompanyId(req, res));
});
/************************supplier contracts */
router.post('/getShippingCompanyContractsByID',async function(req, res, next) {
    await(shippingCompanyController.getShippingCompanyContractsByID(req, res));
});
router.post('/addContractsToShippingCompanyByShippingCompanyId',async function(req, res, next) {
    await(shippingCompanyController.addContractsToShippingCompanyByShippingCompanyId(req, res));
});
module.exports = router;
