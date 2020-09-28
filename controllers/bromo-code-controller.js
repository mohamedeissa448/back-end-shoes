var bromoCode = require("../models/bromo-code-model")

module.exports={
    addBromoCode:(req,res)=>{
    const newBromoCode = new bromoCode();
    newBromoCode.BromoCode_Start_Date=req.body.BromoCode_Start_Date;
    newBromoCode.BromoCode_End_Date=req.body.BromoCode_End_Date;
    newBromoCode.BromoCode_Usage_Times=req.body.BromoCode_Usage_Times;
    newBromoCode.BromoCode_Discount=req.body.BromoCode_Discount;
    newBromoCode.BromoCode_Description=req.body.BromoCode_Description;

    newBromoCode.save((err,document)=>{
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

editBromoCodeById:(req,res)=>{
    var updatedBromoCode={}
    updatedBromoCode.BromoCode_Start_Date=req.body.BromoCode_Start_Date;
    updatedBromoCode.BromoCode_End_Date=req.body.BromoCode_End_Date;
    updatedBromoCode.BromoCode_Usage_Times=req.body.BromoCode_Usage_Times;
    updatedBromoCode.BromoCode_Discount=req.body.BromoCode_Discount;
    updatedBromoCode.BromoCode_Description=req.body.BromoCode_Description;

    bromoCode.findByIdAndUpdate(req.body['_id'],updatedBromoCode,{new: true},
    (err,BromoCode)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(BromoCode) {
            return res.send({
                message:true,
                data:{ newBromoCode:BromoCode }
            })
        }else{
            return res.send({
                message:"updated BromoCode is null"
            })
        }
    })
},

getAll:(req,res)=>{
    bromoCode.find({}).exec((err,categories)=>{
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

getOneById:(req,res)=>{
    bromoCode.findById(req.body['_id']).exec((err,BromoCode)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(BromoCode) {
            return res.send(BromoCode)
        }else{
            return res.send({
                message:"BromoCode is null"
            })
        }

    })
},
}