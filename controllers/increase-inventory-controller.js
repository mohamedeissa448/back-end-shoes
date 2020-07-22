var IncreaseInventory = require("../models/increase-inventory-model")
var Store = require("../models/store-model");

module.exports={
    addIncreaseInventory:(req,res)=>{
        IncreaseInventory.getLastCode(function(err, increaseInventory) {
            if (increaseInventory) InsertIntoIncreaseInventory(increaseInventory.IncreaseInventory_Code + 1);
            else InsertIntoIncreaseInventory(1);
          });
        function InsertIntoIncreaseInventory(NextCode) {
            const newIncreaseInventory=new IncreaseInventory();
            newIncreaseInventory.IncreaseInventory_Code = NextCode;
            newIncreaseInventory.IncreaseInventory_Date = req.body.IncreaseInventory_Date;
            newIncreaseInventory.IncreaseInventory_Note = req.body.IncreaseInventory_Note;
            newIncreaseInventory.IncreaseInventory_DoneBy_User = req.body.IncreaseInventory_DoneBy_User;
            newIncreaseInventory.IncreaseInventory_Products = req.body.IncreaseInventory_Products;

            newIncreaseInventory.save((err,document)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else {
                    //we need to add documents to store model
                    console.log("document",document);
                    saveAll();
                    function saveAll(  ){
                        var count = 0;
                        document.IncreaseInventory_Products.forEach(function(product){
                            let newProduct=new Store();
                            newProduct.Store_Product=product.Product
                            newProduct.Size_Variant=product.Size_Variant
                            newProduct.Color_Variant=product.Color_Variant
                            newProduct.Store_Quantity=product.Quantity
                            newProduct.Store_Cost=product.Cost
                            newProduct.Store_StoragePlace = null;
                            newProduct.save(function(err){
                                count++;
                                if( count == document.IncreaseInventory_Products.length ){
                                    return res.send({
                                        message:true
                                    });
                                }
                            });
                        });
                      }
                    
                }
            })
        }    
},

editIncreaseInventoryById:(req,res)=>{
    var updatedIncreaseInventory={}
    updatedIncreaseInventory.IncreaseInventory_Date = req.body.updatedIncreaseInventory.IncreaseInventory_Date;
    updatedIncreaseInventory.IncreaseInventory_Note = req.body.updatedIncreaseInventory.IncreaseInventory_Note;
    updatedIncreaseInventory.IncreaseInventory_DoneBy_User = req.body.updatedIncreaseInventory.IncreaseInventory_DoneBy_User;
    updatedIncreaseInventory.IncreaseInventory_Products = req.body.updatedIncreaseInventory.IncreaseInventory_Products;

    IncreaseInventory.findByIdAndUpdate(req.body['_id'],updatedIncreaseInventory,{new: true},
        (err,increaseInventory)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(increaseInventory) {
                return res.send({
                    message:true,
                    data:{ newIncreaseInventory:increaseInventory }
                })
            }else{
                return res.send({
                    message:"updated increaseInventory is null"
                })
            }
        })
},

getAll:(req,res)=>{
    IncreaseInventory.find({}).exec((err,increaseInventories)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(increaseInventories) {
            return res.send(increaseInventories)
        }else{
            return res.send({
                message:"increaseInventories are null"
            })
        }

    })
},


getOneById:(req,res)=>{
    IncreaseInventory.findById(req.body['_id'])
    .populate({path:"IncreaseInventory_Products.Product", select:"Product_Name"})
    .populate({path:"IncreaseInventory_Products.Size_Variant", select:"Size_Name"})
    .populate({path:"IncreaseInventory_Products.Color_Variant", select:"Color_Name"})

    .exec((err,increaseInventory)=>{
        if(err){
            return res.send({
                message:err
            })
        }else if(increaseInventory) {
            return res.send(increaseInventory)
        }else{
            return res.send({
                message:"increaseInventory is null"
            })
        }

    })
},
}