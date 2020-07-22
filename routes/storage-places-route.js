var express = require('express');
var router = express.Router();
var storagePlacesController=require('../controllers/storage-places-controller');

router.post('/addStoragePlace',async function(req, res, next) {
    await(storagePlacesController.addStoragePlace(req, res));
});

router.post('/editStoragePlaceById',async function(req, res, next) {
    await(storagePlacesController.editStoragePlaceById(req, res)); 
});

router.get('/getAll',async function(req, res, next) {
    await(storagePlacesController.getAll(req, res));
});
router.get('/getAllActive',async function(req, res, next) {
    await(storagePlacesController.getAllActive(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(storagePlacesController.getOneById(req, res));
});

module.exports = router;
