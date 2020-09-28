var express = require('express');
var router = express.Router();
var bromoCodeController=require('../controllers/bromo-code-controller');

router.post('/addBromoCode',async function(req, res, next) {
    await(bromoCodeController.addBromoCode(req, res));
});

router.post('/editBromoCodeById',async function(req, res, next) {
    await(bromoCodeController.editBromoCodeById(req, res)); 
});

router.get('/getAll',async function(req, res, next) {
    await(bromoCodeController.getAll(req, res));
});

router.post('/getOneById',async function(req, res, next) {
    await(bromoCodeController.getOneById(req, res));
});

module.exports = router;
