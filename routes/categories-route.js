var express = require('express');
var router = express.Router();
var categoryController=require('../controllers/category-controller');

router.post('/addCategory',async function(req, res, next) {
    await(categoryController.addCategory(req, res));
});

router.post('/editCategoryById',async function(req, res, next) {
    await(categoryController.editCategoryById(req, res)); 
});

router.get('/getAll',async function(req, res, next) {
    await(categoryController.getAll(req, res));
});
router.get('/getAllActive',async function(req, res, next) {
    await(categoryController.getAllActive(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(categoryController.getOneById(req, res));
});

module.exports = router;
