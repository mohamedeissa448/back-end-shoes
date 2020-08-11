var express = require('express');
var router = express.Router();
var orderController=require('../controllers/order-controller');

router.post('/addAffiliateSellerOrder',async function(req, res, next) {
    await(orderController.addAffiliateSellerOrder(req, res));
});

router.post('/editAffiliateSellerOrder',async function(req, res, next) {
    await(orderController.editAffiliateSellerOrder(req, res));
});

router.get('/getAll',async function(req, res, next) {
    await(orderController.getAll(req, res));
});
// get orders that affiliate seller only created
router.post('/getOrdersByAffiliateSellerId',async function(req, res, next) {
    await(orderController.getOrdersByAffiliateSellerId(req, res));
});
// get orders of normal user that senior had assigned it to him 
router.post('/getOrdersByUserId',async function(req, res, next) {
    await(orderController.getOrdersByUserId(req, res));
});

router.post('/getOneById',async function(req, res, next) {
    await(orderController.getOneById(req, res));
})


module.exports = router;
