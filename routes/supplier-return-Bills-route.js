var express = require('express');
var router = express.Router();
var supplierReturnBillController=require('../controllers/supplier-return-bills-controller');

router.post('/addSupplierReturnBill',async function(req, res, next) {
    await(supplierReturnBillController.addSupplierReturnBill(req, res));
});

router.post('/editSupplierReturnBillById',async function(req, res, next) {
    await(supplierReturnBillController.editSupplierReturnBillById(req, res)); 
});

router.get('/getAll',async function(req, res, next) {
    await(supplierReturnBillController.getAll(req, res));
});
router.get('/getAllActive',async function(req, res, next) {
    await(supplierReturnBillController.getAllActive(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(supplierReturnBillController.getOneById(req, res));
});

module.exports = router;
