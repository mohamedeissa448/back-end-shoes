var express = require('express');
var router = express.Router();
var supplierController=require('../controllers/supplier-controller');

router.post('/addSupplier',async function(req, res, next) {
    await(supplierController.addSupplier(req, res));
});

router.post('/editSupplier',async function(req, res, next) {
    await(supplierController.editSupplier(req, res));
});

router.get('/getAll',async function(req, res, next) {
    await(supplierController.getAll(req, res));
});
//for search like autoComplete.we donot need all supplier properties
router.get('/getAllMinified',async function(req, res, next) {
    await(supplierController.getAllMinified(req, res));
});

router.get('/getAllActive',async function(req, res, next) {
    await(supplierController.getAllActive(req, res));
});

router.post('/getOneById',async function(req, res, next) {
    await(supplierController.getOneById(req, res));
});
/************************supplier contacts */
router.post('/getSupplierContactsByID',async function(req, res, next) {
    await(supplierController.getSupplierContactsByID(req, res));
});
router.post('/addContactsToSupplierBySupplierId',async function(req, res, next) {
    await(supplierController.addContactsToSupplierBySupplierId(req, res));
});
/***************  Transactions**********  */
router.post('/getAllSupplierTransactions',async function(req, res, next) {
    await(supplierController.getAllSupplierTransactions(req, res));
});
router.post('/deleteTransactionFromFinancialTransactions',async function(req, res, next) {
    await(supplierController.deleteTransactionFromFinancialTransactions(req, res));
});
/**************fourth report */

router.post('/getAllSupplierBillsAndBillReturnedFromDateToDate',async function(req, res, next) {
    await(supplierController.getAllSupplierBillsAndBillReturnedFromDateToDate(req, res));
});
/**************fifth report */

router.post('/getAllSupplierBillsAndBillReturned',async function(req, res, next) {
    await(supplierController.getAllSupplierBillsAndBillReturned(req, res));
});
module.exports = router;
