var express = require('express');
var router = express.Router();
var productTransactionController=require('../controllers/product-transaction-controller');

router.post('/addProductTransaction',async function(req, res, next) {
    await(productTransactionController.addProductTransaction(req, res));
});

router.post('/editProductTransactionById',async function(req, res, next) {
    await(productTransactionController.editProductTransactionById(req, res)); 
});

router.get('/getAll',async function(req, res, next) {
    await(productTransactionController.getAll(req, res));
});
router.get('/getAllActive',async function(req, res, next) {
    await(productTransactionController.getAllActive(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(productTransactionController.getOneById(req, res));
});

module.exports = router;
