var express = require('express');
var router = express.Router();
var increaseInventoryController=require('../controllers/increase-inventory-controller');

router.post('/addIncreaseInventory',async function(req, res, next) {
    await(increaseInventoryController.addIncreaseInventory(req, res));
});

router.post('/editIncreaseInventoryById',async function(req, res, next) {
    await(increaseInventoryController.editIncreaseInventoryById(req, res)); 
});

router.get('/getAll',async function(req, res, next) {
    await(increaseInventoryController.getAll(req, res));
});
router.get('/getAllActive',async function(req, res, next) {
    await(increaseInventoryController.getAllActive(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(increaseInventoryController.getOneById(req, res));
});

module.exports = router;
