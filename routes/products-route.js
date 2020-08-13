var express = require('express');
var router = express.Router();
var productController=require('../controllers/product-controller');

router.post('/addProduct',async function(req, res, next) {
    await(productController.addProduct(req, res));
});

router.post('/editProduct',async function(req, res, next) {
    await(productController.editProduct(req, res));
});

router.get('/getAll',async function(req, res, next) {
    await(productController.getAll(req, res));
});

router.get('/getAllActive',async function(req, res, next) {
    await(productController.getAllActive(req, res));
});

router.post('/getOneById',async function(req, res, next) {
    await(productController.getOneById(req, res));
});

router.post('/getProductSellingPriceById',async function(req, res, next) {
    await(productController.getProductSellingPriceById(req, res));
});
module.exports = router;
