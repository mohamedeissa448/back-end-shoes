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


module.exports = router;
