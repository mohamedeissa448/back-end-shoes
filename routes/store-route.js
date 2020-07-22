var express = require('express');
var router = express.Router();
var storeController=require('../controllers/store-controller');

/*router.post('/addStore',async function(req, res, next) {
    await(storeController.addStore(req, res));
});
*/
router.post('/editStoreById',async function(req, res, next) {
    await(storeController.editStoreById(req, res)); 
});

router.get('/getAll',async function(req, res, next) {
    await(storeController.getAll(req, res));
});
router.get('/getAllActive',async function(req, res, next) {
    await(storeController.getAllActive(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(storeController.getOneById(req, res));
});

module.exports = router;
