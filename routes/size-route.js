var express = require('express');
var router = express.Router();
var sizeController=require('../controllers/size-controller');

router.post('/addSize',async function(req, res, next) {
    await(sizeController.addSize(req, res));
});

router.post('/editSize',async function(req, res, next) {
    await(sizeController.editSize(req, res));
});

router.get('/getAll',async function(req, res, next) {
    await(sizeController.getAll(req, res));
});

router.get('/getAllActive',async function(req, res, next) {
    await(sizeController.getAllActive(req, res));
});

router.post('/getOneById',async function(req, res, next) {
    await(sizeController.getOneById(req, res));
});

module.exports = router;
