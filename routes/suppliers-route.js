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

module.exports = router;
