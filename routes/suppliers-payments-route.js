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


module.exports = router;
