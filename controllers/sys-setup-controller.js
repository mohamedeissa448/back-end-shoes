var Size=require("../models/lut-size-variant-model");
var Unit=require("../models/lut-product-unit-model");
var Color=require("../models/lut-color-variant-model");
var Material=require("../models/lut-product-material-model");
var Class=require("../models/lut-class-model");
var Country=require("../models/lut-country-model");
var Payment=require("../models/lut-payment-method-model");
var Delivery=require("../models/lut-way-of-delivery-model");
var Province=require("../models/lut-province-model");
var ReturnReason=require("../models/lut-reason-of-return-model");
var CancelReason=require("../models/lut-reason-of-calcelation-model");

module.exports={
    /***********Size Variant************* */
    addSize:(req,res)=>{
        const newSize=new Size();
        newSize.Size_Name=req.body.Size_Name;
        newSize.Size_TwoLettersIdentifier=req.body.Size_TwoLettersIdentifier;
        newSize.Size_Description=req.body.Size_Description;
        newSize.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editSizeById:(req,res)=>{
        var updatedSize={}
        updatedSize.Size_Name=req.body.Size_Name;
        updatedSize.Size_TwoLettersIdentifier=req.body.Size_TwoLettersIdentifier;
        updatedSize.Size_Description=req.body.Size_Description;
        updatedSize.Size_IsActive=req.body.Size_IsActive;

            Size.findByIdAndUpdate(req.body['_id'],updatedSize,{new: true},
            (err,size)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(size) {
                    return res.send({
                        message:true,
                        data:{ newSize:size }
                    })
                }else{
                    return res.send({
                        message:"updated size is null"
                    })
                }
            })
    },

    getAllSizes:(req,res)=>{
        Size.find({}).exec((err,sizes)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(sizes) {
                return res.send(sizes)
            }else{
                return res.send({
                    message:"sizes are null"
                })
            }

        })
    },

    getAllSizesActive:(req,res)=>{
        Size.find({Size_IsActive:true}).exec((err,activeSizes)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeSizes) {
                return res.send(activeSizes)
            }else{
                return res.send({
                    message:"activeSizes are null"
                })
            }

        })
    },

    getOneSizeById:(req,res)=>{
        Size.findById(req.body['_id']).exec((err,size)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(size) {
                return res.send(size)
            }else{
                return res.send({
                    message:"unit is null"
                })
            }

        })
    },
    /***********Product Unit Variant************* */
    addProductUnit:(req,res)=>{
        const newUnit=new Unit();
        newUnit.ProductUnit_Name=req.body.ProductUnit_Name;
        newUnit.ProductUnit_Description=req.body.ProductUnit_Description;
        newUnit.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editProductUnitById:(req,res)=>{
        var updatedUnit={}
        updatedUnit.ProductUnit_Name=req.body.ProductUnit_Name;
        updatedUnit.ProductUnit_Description=req.body.ProductUnit_Description;
        updatedUnit.ProductUnit_IsActive=req.body.ProductUnit_IsActive;

            Unit.findByIdAndUpdate(req.body['_id'],updatedUnit,{new: true},
            (err,unit)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(unit) {
                    return res.send({
                        message:true,
                        data:{ newUnit:unit }
                    })
                }else{
                    return res.send({
                        message:"updated unit is null"
                    })
                }
            })
    },

    getAllProductUnits:(req,res)=>{
        Unit.find({}).exec((err,units)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(units) {
                return res.send(units)
            }else{
                return res.send({
                    message:"units are null"
                })
            }

        })
    },

    getAllProductUnitsActive:(req,res)=>{
        Unit.find({ProductUnit_IsActive:true}).exec((err,activeUnits)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeUnits) {
                return res.send(activeUnits)
            }else{
                return res.send({
                    message:"units are null"
                })
            }

        })
    },

    getOneProductUnitById:(req,res)=>{
        Unit.findById(req.body['_id']).exec((err,unit)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(unit) {
                return res.send(unit)
            }else{
                return res.send({
                    message:"unit is null"
                })
            }

        })
    },
    /***********Color Variant************* */
    addColor:(req,res)=>{
        const newColor=new Color();
        newColor.Color_Name=req.body.Color_Name;
        newColor.Color_ThreeLettersIdentifier=req.body.Color_ThreeLettersIdentifier;
        newColor.Color_HexaDecimalBasedValue=req.body.Color_HexaDecimalBasedValue;//might needs modification in future 
        newColor.Color_Description=req.body.Color_Description;
        newColor.Color_IsActive=req.body.Color_IsActive;
        newColor.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
           
        })
    },

    editColorById:(req,res)=>{
        
            var updatedColor={}
            updatedColor.Color_Name=req.body.Color_Name;
            updatedColor.Color_ThreeLettersIdentifier=req.body.Color_ThreeLettersIdentifier;
            updatedColor.Color_HexaDecimalBasedValue=req.body.Color_HexaDecimalBasedValue;
            updatedColor.Color_Description=req.body.Color_Description;
            updatedColor.Color_IsActive=req.body.Color_IsActive
            
            Color.findByIdAndUpdate(req.body['_id'],updatedColor,{new: true},
            (err,color)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(color) {
                    return res.send({
                        message:true,
                        data:{ newColor:color }
                    })
                }else{
                    return res.send({
                        message:"updated color is null"
                    })
                }
            })
    },

    getAllProductColors:(req,res)=>{
        Color.find({}).exec((err,colors)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(colors) {
                return res.send(colors)
            }else{
                return res.send({
                    message:"colors are null"
                })
            }

        })
    },

    getAllProductColorsActive:(req,res)=>{
        Color.find({Color_IsActive:true}).exec((err,activeColors)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeColors) {
                return res.send(activeColors)
            }else{
                return res.send({
                    message:"colors are null"
                })
            }

        })
    },

    getOneProductColorById: (req,res)=>{
        console.log("ccccccccccccccccccccc")
        Color.findById(req.body['_id']).exec((err,color)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(color) {
                return res.send(color)
            }else{
                return res.send({
                    message:"color is null"
                })
            }

        })
    },

    /***********Product Material ************* */
    addProductMaterial:(req,res)=>{
        const newMaterial=new Material();
        newMaterial.ProductMaterial_Name=req.body.ProductMaterial_Name;
        newMaterial.ProductMaterial_Description=req.body.ProductMaterial_Description;
        newMaterial.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editProductMaterialById:(req,res)=>{
        var updatedMaterial={}
        updatedMaterial.ProductMaterial_Name=req.body.ProductMaterial_Name;
        updatedMaterial.ProductMaterial_Description=req.body.ProductMaterial_Description;
        updatedMaterial.ProductMaterial_IsActive=req.body.ProductMaterial_IsActive;

            Material.findByIdAndUpdate(req.body['_id'],updatedMaterial,{new: true},
            (err,Material)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(Material) {
                    return res.send({
                        message:true,
                        data:{ newMaterial:Material }
                    })
                }else{
                    return res.send({
                        message:"updated Material is null"
                    })
                }
            })
    },

    getAllProductMaterials:(req,res)=>{
        Material.find({}).exec((err,materials)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(materials) {
                return res.send(materials)
            }else{
                return res.send({
                    message:"Materials are null"
                })
            }

        })
    },

    getAllProductMaterialsActive:(req,res)=>{
        Material.find({ProductMaterial_IsActive:true}).exec((err,activeMaterials)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeMaterials) {
                return res.send(activeMaterials)
            }else{
                return res.send({
                    message:"Materials are null"
                })
            }

        })
    },

    getOneProductMaterialById:(req,res)=>{
        Material.findById(req.body['_id']).exec((err,Material)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(Material) {
                return res.send(Material)
            }else{
                return res.send({
                    message:"Material is null"
                })
            }

        })
    },

     /*********** Classes ************* */
     addClass:(req,res)=>{
        const newClass=new Class();
        newClass.Class_Name=req.body.Class_Name;
        newClass.Class_Description=req.body.Class_Description;
        newClass.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editClassById:(req,res)=>{
        var updatedClass={}
        updatedClass.Class_Name=req.body.Class_Name;
        updatedClass.Class_Description=req.body.Class_Description;
        updatedClass.Class_IsActive=req.body.Class_IsActive;

            Class.findByIdAndUpdate(req.body['_id'],updatedClass,{new: true},
            (err,Class)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(Class) {
                    return res.send({
                        message:true,
                        data:{ newClass:Class }
                    })
                }else{
                    return res.send({
                        message:"updated Class is null"
                    })
                }
            })
    },

    getAllClasses:(req,res)=>{
        Class.find({}).exec((err,Classs)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(Classs) {
                return res.send(Classs)
            }else{
                return res.send({
                    message:"Classs are null"
                })
            }

        })
    },

    getAllClassesActive:(req,res)=>{
        Class.find({Class_IsActive:true}).exec((err,activeClasss)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeClasss) {
                return res.send(activeClasss)
            }else{
                return res.send({
                    message:"Classs are null"
                })
            }

        })
    },

    getOneClassById:(req,res)=>{
        Class.findById(req.body['_id']).exec((err,Class)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(Class) {
                return res.send(Class)
            }else{
                return res.send({
                    message:"Class is null"
                })
            }

        })
    },

     /*********** Countries ************* */
     addCountry:(req,res)=>{
        const newCountry=new Country();
        newCountry.Country_Name=req.body.Country_Name;
        newCountry.Country_ShortCode=req.body.Country_ShortCode;
        newCountry.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editCountryById:(req,res)=>{
        var updatedCountry={}
        updatedCountry.Country_Name=req.body.Country_Name;
        updatedCountry.Country_ShortCode=req.body.Country_ShortCode;
        updatedCountry.Country_IsActive=req.body.Country_IsActive;

            Country.findByIdAndUpdate(req.body['_id'],updatedCountry,{new: true},
            (err,country)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(country) {
                    return res.send({
                        message:true,
                        data:{ newCountry:country }
                    })
                }else{
                    return res.send({
                        message:"updated country is null"
                    })
                }
            })
    },

    getAllCountries:(req,res)=>{
        Country.find({}).exec((err,countries)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(countries) {
                return res.send(countries)
            }else{
                return res.send({
                    message:"countries are null"
                })
            }

        })
    },

    getAllCountriesActive:(req,res)=>{
        Country.find({Country_IsActive:true}).exec((err,activeCountries)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeCountries) {
                return res.send(activeCountries)
            }else{
                return res.send({
                    message:"Countries are null"
                })
            }

        })
    },

    getOneCountryById:(req,res)=>{
        Country.findById(req.body['_id']).exec((err,Country)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(Country) {
                return res.send(Country)
            }else{
                return res.send({
                    message:"Country is null"
                })
            }

        })
    },

     /*********** payment methods ************* */
     addPayment:(req,res)=>{
        const newPayment=new Payment();
        newPayment.PaymentMethod_Name=req.body.PaymentMethod_Name;
        newPayment.PaymentMethod_Description=req.body.PaymentMethod_Description;
        newPayment.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editPaymentById:(req,res)=>{
        var updatedPayment={}
        updatedPayment.PaymentMethod_Name=req.body.PaymentMethod_Name;
        updatedPayment.PaymentMethod_Description=req.body.PaymentMethod_Description;
        updatedPayment.PaymentMethod_IsActive=req.body.PaymentMethod_IsActive;

            Payment.findByIdAndUpdate(req.body['_id'],updatedPayment,{new: true},
            (err,payment)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(payment) {
                    return res.send({
                        message:true,
                        data:{ newPayment:payment }
                    })
                }else{
                    return res.send({
                        message:"updated payment is null"
                    })
                }
            })
    },

    getAllPayments:(req,res)=>{
        Payment.find({}).exec((err,payments)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(payments) {
                return res.send(payments)
            }else{
                return res.send({
                    message:"payments are null"
                })
            }

        })
    },

    getAllPaymentsActive:(req,res)=>{
        Payment.find({PaymentMethod_IsActive:true}).exec((err,activePayments)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activePayments) {
                return res.send(activePayments)
            }else{
                return res.send({
                    message:"Payments are null"
                })
            }

        })
    },

    getOnePaymentById:(req,res)=>{
        Payment.findById(req.body['_id']).exec((err,payment)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(payment) {
                return res.send(payment)
            }else{
                return res.send({
                    message:"payment is null"
                })
            }

        })
    },

    /*********** ways of deliveries ************* */
    addDelivery:(req,res)=>{
        const newDelivery=new Delivery();
        newDelivery.WayOfDeliverySchema_Name=req.body.WayOfDeliverySchema_Name;
        newDelivery.WayOfDeliverySchema_Description=req.body.WayOfDeliverySchema_Description;
        newDelivery.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editDeliveryById:(req,res)=>{
        var updatedDelivery={}
        updatedDelivery.WayOfDeliverySchema_Name=req.body.WayOfDeliverySchema_Name;
        updatedDelivery.WayOfDeliverySchema_Description=req.body.WayOfDeliverySchema_Description;
        updatedDelivery.WayOfDeliverySchema_IsActive=req.body.WayOfDeliverySchema_IsActive;

            Delivery.findByIdAndUpdate(req.body['_id'],updatedDelivery,{new: true},
            (err,delivery)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(delivery) {
                    return res.send({
                        message:true,
                        data:{ newDelivery:delivery }
                    })
                }else{
                    return res.send({
                        message:"updated Delivery is null"
                    })
                }
            })
    },

    getAllDeliveries:(req,res)=>{
        Delivery.find({}).exec((err,deliveries)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(deliveries) {
                return res.send(deliveries)
            }else{
                return res.send({
                    message:"deliveries are null"
                })
            }

        })
    },

    getAllDeliveriesActive:(req,res)=>{
        Delivery.find({WayOfDeliverySchema_IsActive:true}).exec((err,activeDeliveries)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeDeliveries) {
                return res.send(activeDeliveries)
            }else{
                return res.send({
                    message:"deliveries are null"
                })
            }

        })
    },

    getOneDeliveryById:(req,res)=>{
        Delivery.findById(req.body['_id']).exec((err,delivery)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(delivery) {
                return res.send(delivery)
            }else{
                return res.send({
                    message:"delivery is null"
                })
            }

        })
    },
    
     /*********** Provinces ************* */
     addProvince:(req,res)=>{
        const newProvince=new Province();
        newProvince.Province_Name=req.body.Province_Name;
        newProvince.Province_ShortCode=req.body.Province_ShortCode;
        newProvince.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editProvinceById:(req,res)=>{
        var updatedProvince={}
        updatedProvince.Province_Name=req.body.Province_Name;
        updatedProvince.Province_ShortCode=req.body.Province_ShortCode;
        updatedProvince.Province_IsActive=req.body.Province_IsActive;

            Province.findByIdAndUpdate(req.body['_id'],updatedProvince,{new: true},
            (err,province)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(province) {
                    return res.send({
                        message:true,
                        data:{ newProvince:province }
                    })
                }else{
                    return res.send({
                        message:"updated province is null"
                    })
                }
            })
    },

    getAllProvinces:(req,res)=>{
        Province.find({}).exec((err,provinces)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(provinces) {
                return res.send(provinces)
            }else{
                return res.send({
                    message:"provinces are null"
                })
            }

        })
    },

    getAllProvincesActive:(req,res)=>{
        Province.find({Province_IsActive:true}).exec((err,activeProvinces)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeProvinces) {
                return res.send(activeProvinces)
            }else{
                return res.send({
                    message:"activeProvinces are null"
                })
            }

        })
    },

    getOneProvinceById:(req,res)=>{
        Province.findById(req.body['_id']).exec((err,province)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(province) {
                return res.send(province)
            }else{
                return res.send({
                    message:"province is null"
                })
            }

        })
    },

    /*********** Reasons of Returns ************* */
    addReturnReason:(req,res)=>{
        const newReason=new ReturnReason();
        newReason.ReasonOfReturn_Name=req.body.ReasonOfReturn_Name;
        newReason.ReasonOfReturn_Description=req.body.ReasonOfReturn_Description;
        newReason.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editReturnReasonById:(req,res)=>{
        var updatedReason={}
        updatedReason.ReasonOfReturn_Name=req.body.ReasonOfReturn_Name;
        updatedReason.ReasonOfReturn_Description=req.body.ReasonOfReturn_Description;
        updatedReason.ReasonOfReturn_IsActive=req.body.ReasonOfReturn_IsActive;

        ReturnReason.findByIdAndUpdate(req.body['_id'],updatedReason,{new: true},
            (err,reason)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(reason) {
                    return res.send({
                        message:true,
                        data:{ newReason:reason }
                    })
                }else{
                    return res.send({
                        message:"updated reason is null"
                    })
                }
            })
    },

    getAllReturnReasons:(req,res)=>{
        ReturnReason.find({}).exec((err,reasons)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(reasons) {
                return res.send(reasons)
            }else{
                return res.send({
                    message:"reasons are null"
                })
            }

        })
    },

    getAllReturnReasonsActive:(req,res)=>{
        ReturnReason.find({ReasonOfReturn_IsActive:true}).exec((err,activeReasons)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeReasons) {
                return res.send(activeReasons)
            }else{
                return res.send({
                    message:"activeReasons are null"
                })
            }

        })
    },

    getOneReturnReasonById:(req,res)=>{
        ReturnReason.findById(req.body['_id']).exec((err,reason)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(reason) {
                return res.send(reason)
            }else{
                return res.send({
                    message:"reason is null"
                })
            }

        })
    },

    /*********** Reasons of Cancel order ************* */
    addCancelReason:(req,res)=>{
        const newReason=new CancelReason();
        newReason.ReasonOfCalcelation_Name=req.body.ReasonOfCalcelation_Name;
        newReason.ReasonOfCalcelation_Description=req.body.ReasonOfCalcelation_Description;
        newReason.save((err,document)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else {
                return res.send({
                    message:true
                })
            }
        })
    },

    editCancelReasonById:(req,res)=>{
        var updatedReason={}
        updatedReason.ReasonOfCalcelation_Name=req.body.ReasonOfCalcelation_Name;
        updatedReason.ReasonOfCalcelation_Description=req.body.ReasonOfCalcelation_Description;
        updatedReason.ReasonOfCalcelation_IsActive=req.body.ReasonOfCalcelation_IsActive;

        CancelReason.findByIdAndUpdate(req.body['_id'],updatedReason,{new: true},
            (err,reason)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(reason) {
                    return res.send({
                        message:true,
                        data:{ newReason:reason }
                    })
                }else{
                    return res.send({
                        message:"updated reason is null"
                    })
                }
            })
    },

    getAllCancelReasons:(req,res)=>{
        CancelReason.find({}).exec((err,reasons)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(reasons) {
                return res.send(reasons)
            }else{
                return res.send({
                    message:"reasons are null"
                })
            }

        })
    },

    getAllCancelReasonsActive:(req,res)=>{
        CancelReason.find({ReasonOfCalcelation_IsActive:true}).exec((err,activeReasons)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(activeReasons) {
                return res.send(activeReasons)
            }else{
                return res.send({
                    message:"activeReasons are null"
                })
            }

        })
    },

    getOneCancelReasonById:(req,res)=>{
        CancelReason.findById(req.body['_id']).exec((err,reason)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(reason) {
                return res.send(reason)
            }else{
                return res.send({
                    message:"reason is null"
                })
            }

        })
    },
}