var express = require('express');
var router = express.Router();
var orderController=require('../controllers/order-controller');

router.post('/addAffiliateSellerOrder',async function(req, res, next) {
    await(orderController.addAffiliateSellerOrder(req, res));
});

router.post('/getAffiliateSellerOrderById',async function(req, res, next) {
    await(orderController.getAffiliateSellerOrderById(req, res));
});

router.post('/getOrderShippingDetailsById',async function(req, res, next) {
    await(orderController.getOrderShippingDetailsById(req, res));
});

router.post('/getFilteredOrdersByDateFromTO',async function(req, res, next) {
    await(orderController.getFilteredOrdersByDateFromTO(req, res));
});

router.post('/getFilteredOrdersByCustomerMobile',async function(req, res, next) {
    await(orderController.getFilteredOrdersByCustomerMobile(req, res));
});

router.post('/editAffiliateSellerOrderByOrderId',async function(req, res, next) {
    await(orderController.editAffiliateSellerOrderByOrderId(req, res));
});

router.post('/assignOrderTo',async function(req, res, next) {
    await(orderController.assignOrderTo(req, res));
});

router.post('/shipOrder',async function(req, res, next) {
    await(orderController.shipOrder(req, res));
});

router.post('/cancelOrder',async function(req, res, next) {
    await(orderController.cancelOrder(req, res));
});

router.post('/collectOrder',async function(req, res, next) {
    await(orderController.collectOrder(req, res));
});

router.post('/returnOrderProducts',async function(req, res, next) {
    await(orderController.returnOrderProducts(req, res));
});

router.get('/getAll',async function(req, res, next) {
    await(orderController.getAll(req, res));
});
//get only orders assigned to a specific user
router.post('/getUserOrders',async function(req, res, next) {
    await(orderController.getUserOrders(req, res));
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
