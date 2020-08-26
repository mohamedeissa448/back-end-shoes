var express = require('express');
var router = express.Router();
var supplierBillController=require('../controllers/supplier-bills-controller');

router.post('/addSupplierBill',async function(req, res, next) {
    await(supplierBillController.addSupplierBill(req, res));
});

router.post('/editSupplierBillById',async function(req, res, next) {
    await(supplierBillController.editSupplierBillById(req, res)); 
});

router.get('/getAll',async function(req, res, next) {
    await(supplierBillController.getAll(req, res));
});
router.get('/getAllActive',async function(req, res, next) {
    await(supplierBillController.getAllActive(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(supplierBillController.getOneById(req, res));
});

module.exports = router;
