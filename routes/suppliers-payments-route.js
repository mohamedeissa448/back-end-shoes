var express = require('express');
var router = express.Router();
var supplierPaymentsController=require('../controllers/supplier-payments-controller');

router.post('/addSupplierPayment',async function(req, res, next) {
    await(supplierPaymentsController.addSupplierPayment(req, res));
});

router.post('/editSupplierPayment',async function(req, res, next) {
    await(supplierPaymentsController.editSupplierPayment(req, res));
});

router.get('/getAll',async function(req, res, next) {
    await(supplierPaymentsController.getAll(req, res));
});

router.post('/getOneById',async function(req, res, next) {
    await(supplierPaymentsController.getOneById(req, res));
});
//get all payments for a specific supplier
router.post('/getAllSupplierPayments',async function(req, res, next) {
    await(supplierPaymentsController.getAllSupplierPayments(req, res));
});
//get all payments for a specific supplier from a date to a date
router.post('/getAllSupplierPaymentsFromDateToDate',async function(req, res, next) {
    await(supplierPaymentsController.getAllSupplierPaymentsFromDateToDate(req, res));
});

module.exports = router;
