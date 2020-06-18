var express = require('express');
var router = express.Router();
var productUnitController=require('../controllers/productUnit-controller');

router.post('/addProductUnit',async function(req, res, next) {
    await(productUnitController.addProductUnit(req, res));
});

router.post('/editProductUnitById',async function(req, res, next) {
    await(productUnitController.editProductUnitById(req, res));
});

router.get('/getAll',async function(req, res, next) {
    await(productUnitController.getAll(req, res));
});

router.get('/getAllActive',async function(req, res, next) {
    await(productUnitController.getAllActive(req, res));
});

router.post('/getOneById',async function(req, res, next) {
    await(productUnitController.getOneById(req, res));
});

module.exports = router;
