var Category = require("../models/category")

module.exports={
    addCategory:(req,res)=>{
    const newCategory=new Category();
    newCategory.Category_Name=req.body.Category_Name;
    newCategory.Category_Description=req.body.Category_Description;
    newCategory.save((err,document)=>{
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

editCategoryById:(req,res)=>{
    var updatedCategory={}
    updatedCategory.Category_Name=req.body.Category_Name;
    updatedCategory.Category_Description=req.body.Category_Description;
    updatedCategory.Category_IsActive=req.body.Category_IsActive;

        Category.findByIdAndUpdate(req.body['_id'],updatedCategory,{new: true},
        (err,Category)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(Category) {
                return res.send({
                    message:true,
                    data:{ newCategory:Category }
                })
            }else{
                return res.send({
                    message:"updated Category is null"
                })
            }
        })
},

getAll:(req,res)=>{
    Category.find({}).exec((err,categories)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(categories) {
            return res.send(categories)
        }else{
            return res.send({
                message:"categories are null"
            })
        }

    })
},

getAllActive:(req,res)=>{
    Category.find({Category_IsActive:true}).exec((err,activeCategories)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(activeCategories) {
            return res.send(activeCategories)
        }else{
            return res.send({
                message:"activeCategories are null"
            })
        }

    })
},

getOneById:(req,res)=>{
    Category.findById(req.body['_id']).exec((err,Category)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(Category) {
            return res.send(Category)
        }else{
            return res.send({
                message:"Category is null"
            })
        }

    })
},
}