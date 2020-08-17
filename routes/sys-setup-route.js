var express = require('express');
var router = express.Router();
var sysSetupController=require('../controllers/sys-setup-controller');

/**************   Size variants routes        ********** */
router.post('/sizes/addSize',async function(req, res, next) {
    await(sysSetupController.addSize(req, res));
});

router.post('/sizes/editSizeById',async function(req, res, next) {
    await(sysSetupController.editSizeById(req, res));
});

router.get('/sizes/getAllSizes',async function(req, res, next) {
    await(sysSetupController.getAllSizes(req, res));
});

router.get('/sizes/getAllSizesActive',async function(req, res, next) {
    await(sysSetupController.getAllSizesActive(req, res));
});

router.post('/sizes/getOneSizeById',async function(req, res, next) {
    await(sysSetupController.getOneSizeById(req, res));
});

/**************   product units variants routes           ********** */

router.post('/productUnits/addProductUnit',async function(req, res, next) {
    await(sysSetupController.addProductUnit(req, res));
});

router.post('/productUnits/editProductUnitById',async function(req, res, next) {
    await(sysSetupController.editProductUnitById(req, res));
});

router.get('/productUnits/getAllProductUnits',async function(req, res, next) {
    await(sysSetupController.getAllProductUnits(req, res));
});

router.get('/productUnits/getAllProductUnitsActive',async function(req, res, next) {
    await(sysSetupController.getAllProductUnitsActive(req, res));
});

router.post('/productUnits/getOneProductUnitById',async function(req, res, next) {
    await(sysSetupController.getOneProductUnitById(req, res));
});

/**************   color variants routes           ********** */
router.post('/colors/addColor',async function(req, res, next) {
    await(sysSetupController.addColor(req, res));
 ;
});

router.post('/colors/editColorById',async function(req, res, next) {
    await(sysSetupController.editColorById(req, res));
});

router.get('/colors/getAllProductColors',async function(req, res, next) {
    await(sysSetupController.getAllProductColors(req, res));
 
});

router.get('/colors/getAllProductColorsActive',async function(req, res, next) {
    await(sysSetupController.getAllProductColorsActive(req, res));
  
});

router.post('/colors/getOneProductColorById', async function(req, res, next) {
  await(sysSetupController.getOneProductColorById(req, res));
});

/**************   product materials routes           ********** */

router.post('/productMaterials/addProductMaterial',async function(req, res, next) {
    await(sysSetupController.addProductMaterial(req, res));
});

router.post('/productMaterials/editProductMaterialById',async function(req, res, next) {
    await(sysSetupController.editProductMaterialById(req, res));
});

router.get('/productMaterials/getAllProductMaterials',async function(req, res, next) {
    await(sysSetupController.getAllProductMaterials(req, res));
});

router.get('/productMaterials/getAllProductMaterialsActive',async function(req, res, next) {
    await(sysSetupController.getAllProductMaterialsActive(req, res));
});

router.post('/productMaterials/getOneProductMaterialById',async function(req, res, next) {
    await(sysSetupController.getOneProductMaterialById(req, res));
});

/**************   class routes           ********** */

router.post('/classes/addClass',async function(req, res, next) {
    await(sysSetupController.addClass(req, res));
});

router.post('/classes/editClassById',async function(req, res, next) {
    await(sysSetupController.editClassById(req, res));
});

router.get('/classes/getAllClasses',async function(req, res, next) {
    await(sysSetupController.getAllClasses(req, res));
});

router.get('/classes/getAllClassesActive',async function(req, res, next) {
    await(sysSetupController.getAllClassesActive(req, res));
});

router.post('/classes/getOneClassById',async function(req, res, next) {
    await(sysSetupController.getOneClassById(req, res));
});

/**************   Country routes           ********** */

router.post('/countries/addCountry',async function(req, res, next) {
    await(sysSetupController.addCountry(req, res));
});

router.post('/countries/editCountryById',async function(req, res, next) {
    await(sysSetupController.editCountryById(req, res));
});

router.get('/countries/getAllCountries',async function(req, res, next) {
    await(sysSetupController.getAllCountries(req, res));
});

router.get('/countries/getAllCountriesActive',async function(req, res, next) {
    await(sysSetupController.getAllCountriesActive(req, res));
});

router.post('/countries/getOneCountryById',async function(req, res, next) {
    await(sysSetupController.getOneCountryById(req, res));
});

/**************   payment methods routes           ********** */

router.post('/payments/addPayment',async function(req, res, next) {
    await(sysSetupController.addPayment(req, res));
});

router.post('/payments/editPaymentById',async function(req, res, next) {
    await(sysSetupController.editPaymentById(req, res));
});

router.get('/payments/getAllPayments',async function(req, res, next) {
    await(sysSetupController.getAllPayments(req, res));
});

router.get('/payments/getAllPaymentsActive',async function(req, res, next) {
    await(sysSetupController.getAllPaymentsActive(req, res));
});

router.post('/payments/getOnePaymentById',async function(req, res, next) {
    await(sysSetupController.getOnePaymentById(req, res));
});

/**************   ways of delivery routes           ********** */

router.post('/deliveries/addDelivery',async function(req, res, next) {
    await(sysSetupController.addDelivery(req, res));
});

router.post('/deliveries/editDeliveryById',async function(req, res, next) {
    await(sysSetupController.editDeliveryById(req, res));
});

router.get('/deliveries/getAllDeliveries',async function(req, res, next) {
    await(sysSetupController.getAllDeliveries(req, res));
});

router.get('/deliveries/getAllDeliveriesActive',async function(req, res, next) {
    await(sysSetupController.getAllDeliveriesActive(req, res));
});

router.post('/deliveries/getOneDeliveryById',async function(req, res, next) {
    await(sysSetupController.getOneDeliveryById(req, res));
});

/**************   province routes           ********** */

router.post('/provinces/addProvince',async function(req, res, next) {
    await(sysSetupController.addProvince(req, res));
});

router.post('/provinces/editProvinceById',async function(req, res, next) {
    await(sysSetupController.editProvinceById(req, res));
});

router.get('/provinces/getAllProvinces',async function(req, res, next) {
    await(sysSetupController.getAllProvinces(req, res));
});

router.get('/provinces/getAllProvincesActive',async function(req, res, next) {
    await(sysSetupController.getAllProvincesActive(req, res));
});

router.post('/provinces/getOneProvinceById',async function(req, res, next) {
    await(sysSetupController.getOneProvinceById(req, res));
});

/**************   reason of return orders routes           ********** */

router.post('/return-reasons/addReturnReason',async function(req, res, next) {
    await(sysSetupController.addReturnReason(req, res));
});

router.post('/return-reasons/editReturnReasonById',async function(req, res, next) {
    await(sysSetupController.editReturnReasonById(req, res));
});

router.get('/return-reasons/getAllReturnReasons',async function(req, res, next) {
    await(sysSetupController.getAllReturnReasons(req, res));
});

router.get('/return-reasons/getAllReturnReasonsActive',async function(req, res, next) {
    await(sysSetupController.getAllReturnReasonsActive(req, res));
});

router.post('/return-reasons/getOneReturnReasonById',async function(req, res, next) {
    await(sysSetupController.getOneReturnReasonById(req, res));
});

/**************   reason of cancel orders routes           ********** */

router.post('/cancel-reasons/addCancelReason',async function(req, res, next) {
    await(sysSetupController.addCancelReason(req, res));
});

router.post('/cancel-reasons/editCancelReasonById',async function(req, res, next) {
    await(sysSetupController.editCancelReasonById(req, res));
});

router.get('/cancel-reasons/getAllCancelReasons',async function(req, res, next) {
    await(sysSetupController.getAllCancelReasons(req, res));
});

router.get('/cancel-reasons/getAllCancelReasonsActive',async function(req, res, next) {
    await(sysSetupController.getAllCancelReasonsActive(req, res));
});

router.post('/cancel-reasons/getOneCancelReasonById',async function(req, res, next) {
    await(sysSetupController.getOneCancelReasonById(req, res));
});

module.exports = router;
