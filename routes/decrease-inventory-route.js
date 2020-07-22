var express = require('express');
var router = express.Router();
var decreaseInventoryController=require('../controllers/decrease-inventory-controller');

router.post('/addDecreaseInventory',async function(req, res, next) {
    await(decreaseInventoryController.addDecreaseInventory(req, res));
});

router.post('/editDecreaseInventoryById',async function(req, res, next) {
    await(decreaseInventoryController.editDecreaseInventoryById(req, res)); 
});

router.get('/getAll',async function(req, res, next) {
    await(decreaseInventoryController.getAll(req, res));
});
router.get('/getAllActive',async function(req, res, next) {
    await(decreaseInventoryController.getAllActive(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(decreaseInventoryController.getOneById(req, res));
});

module.exports = router;
