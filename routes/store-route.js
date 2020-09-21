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
router.get('/getUnHousedProducts',async function(req, res, next) {
    await(storeController.getUnHousedProducts(req, res));
});
router.get('/getHousedProducts',async function(req, res, next) {
    await(storeController.getHousedProducts(req, res));
});
router.get('/getAllActive',async function(req, res, next) {
    await(storeController.getAllActive(req, res));
});
router.post('/getOneById',async function(req, res, next) {
    await(storeController.getOneById(req, res));
});
router.post('/housingProduct',async function(req, res, next) {
    await(storeController.housingProduct(req, res));
});
router.post('/getOneProductFromStore',async function(req, res, next) {
    await(storeController.getOneProductFromStore(req, res));
});

router.post('/getAvilabelQuantity',async function(req, res, next) {
    await(storeController.getAvilabelQuantity(req, res));
});
router.post('/searchProductInStore',async function(req, res, next) {
    await(storeController.searchProductInStore(req, res));
});
router.get('/getStorProductMatrix',async function(req, res, next) {
    await(storeController.getStorProductMatrix(req, res));
});
module.exports = router;
