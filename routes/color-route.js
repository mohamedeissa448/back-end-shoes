var express = require('express');
var router = express.Router();
var colorController=require('../controllers/color-controller');

router.post('/addColor',async function(req, res, next) {
    await(colorController.addColor(req, res));
 ;
});

router.post('/editColorById',async function(req, res, next) {
    await(colorController.editColorById(req, res));
});

router.get('/getAll',async function(req, res, next) {
    await(colorController.getAll(req, res));
 
});

router.get('/getAllActive',async function(req, res, next) {
    await(colorController.getAllActive(req, res));
  
});

router.post('/getOneById', async function(req, res, next) {
  await(colorController.getOneById(req, res));
});

module.exports = router;
