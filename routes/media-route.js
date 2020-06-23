var express = require('express');
var router = express.Router();
var mediaController=require('../controllers/media-controller');

router.post('/addMedia',async function(req, res, next) {
    await(mediaController.addMedia(req, res));
});

router.post('/editMediaById',async function(req, res, next) {
    await(mediaController.editMediaById(req, res)); 
});

router.get('/getAll',async function(req, res, next) {
    await(mediaController.getAll(req, res));
});

router.post('/getOneById',async function(req, res, next) {
    await(mediaController.getOneById(req, res));
});

module.exports = router;
