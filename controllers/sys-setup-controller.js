var Size=require("../models/lut-size-variant-model");
var Unit=require("../models/lut-product-unit-model");
var Color=require("../models/lut-color-variant-model");
var Material=require("../models/lut-product-material-model")
module.exports={
    /***********Size Variant************* */
    addSize:(req,res)=>{
        const newSize=new Size();
        newSize.Size_Name=req.body.Size_Name;
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
}