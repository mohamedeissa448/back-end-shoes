var DecreaseInventory = require("../models/decrease-inventory-model")

module.exports={
    
    addDecreaseInventory:(req,res)=>{
        DecreaseInventory.getLastCode(function(err, decreaseInventory) {
            if (decreaseInventory) InsertIntoDecreaseInventory(decreaseInventory.DecreaseInventory_Code + 1);
            else InsertIntoDecreaseInventory(1);
          });
        function InsertIntoDecreaseInventory(NextCode) {
            const newDecreaseInventory=new DecreaseInventory();
            newDecreaseInventory.DecreaseInventory_Code = NextCode;
            newDecreaseInventory.DecreaseInventory_Date = req.body.DecreaseInventory_Date;
            newDecreaseInventory.DecreaseInventory_Note = req.body.DecreaseInventory_Note;
            newDecreaseInventory.DecreaseInventory_DoneBy_User = req.body.DecreaseInventory_DoneBy_User;
            newDecreaseInventory.DecreaseInventory_Products = req.body.DecreaseInventory_Products;

            newDecreaseInventory.save((err,document)=>{
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
        }    
},

editDecreaseInventoryById:(req,res)=>{
    var updatedDecreaseInventory={}
    updatedDecreaseInventory.DecreaseInventory_Date = req.body.updatedDecreaseInventory.DecreaseInventory_Date;
    updatedDecreaseInventory.DecreaseInventory_Note = req.body.updatedDecreaseInventory.DecreaseInventory_Note;
    updatedDecreaseInventory.DecreaseInventory_DoneBy_User = req.body.updatedDecreaseInventory.DecreaseInventory_DoneBy_User;
    updatedDecreaseInventory.DecreaseInventory_Products = req.body.updatedDecreaseInventory.DecreaseInventory_Products;

    DecreaseInventory.findByIdAndUpdate(req.body['_id'],updatedDecreaseInventory,{new: true},
        (err,decreaseInventory)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(decreaseInventory) {
                return res.send({
                    message:true,
                    data:{ newDecreaseInventory:decreaseInventory }
                })
            }else{
                return res.send({
                    message:"updated decreaseInventory is null"
                })
            }
        })
},

getAll:(req,res)=>{
    DecreaseInventory.find({}).exec((err,decreaseInventories)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(decreaseInventories) {
            return res.send(decreaseInventories)
        }else{
            return res.send({
                message:"decreaseInventories are null"
            })
        }

    })
},



getOneById:(req,res)=>{
    DecreaseInventory.findById(req.body['_id'])
    .populate({path:"DecreaseInventory_Products.Product", select:"Product_Name"})
    .populate({path:"DecreaseInventory_Products.Size_Variant", select:"Size_Name"})
    .populate({path:"DecreaseInventory_Products.Color_Variant", select:"Color_Name"})

    .exec((err,decreaseInventory)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(decreaseInventory) {
            return res.send(decreaseInventory)
        }else{
            return res.send({
                message:"decreaseInventory is null"
            })
        }

    })
},
}