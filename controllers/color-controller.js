var Color=require("../models/lut-color-variant-model");
var multer = require("multer");

var storage = multer.diskStorage({
  //multers disk storage settings
  destination: function(req, file, cb) {
    cb(null, "./public/images");
  },
  filename: function(req, file, cb) {
    var datetimestamp = Date.now();
    cb(null, file.fieldname + "-" + datetimestamp + "." + file.originalname);
    console.log("fieldname", file.fieldname);
  }
});
var upload = multer({
  //multer settings
  storage: storage,
  fileFilter: function(req, file, callback) {
    //file filter
    /* if (
      ["jpg", "jpeg", "png", "PNG", "GIF", "JPEG"].indexOf(
        file.originalname.split(".")[file.originalname.split(".").length - 1]
      ) === -1
    ) {
      return callback(new Error("Wrong extension type"));
    }*/
    callback(null, true);
  }
}).single("image");
module.exports={
    addColor:(req,res)=>{

        upload(req, res, function(err) {
            console.log("boooooodyxx", req.body);
            if (err) {
              res.status(422).json({ error_code: 1, err_desc: err });
              return;
            }
            /** Multer gives us file info in req.file object */
            if (!req.file) {
              res.json({ error_code: 1, err_desc: "No file passed" });
              return;
            }
            var query = {},
              options = { upsert: true, new: true, setDefaultsOnInsert: true };
            let imageUrl = req.file.filename;
            // Find the document
            console.log("imageUrl", imageUrl);
            const newColor=new Color();
            newColor.Color_Name=req.body.Color_Name;
            newColor.Color_Icon_Image_Url=imageUrl 
            newColor.Color_Description=req.body.Color_Description;
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
          });

    },

    editColorById:(req,res)=>{
        upload(req, res, function(err) {
            if (err) {
              res.status(422).json({ error_code: 1, err_desc: err });
              return;
            }
            /** Multer gives us file info in req.file object */
            if (!req.file) {
              res.json({ error_code: 1, err_desc: "No file passed" });
              return;
            }
            let imageUrl = req.file.filename;
            // Find the document
            console.log("imageUrl", imageUrl);
            var updatedColor={}
            updatedColor.Color_Name=req.body.Color_Name;
            updatedColor.Color_Icon_Image_Url=imageUrl;
            updatedColor.Color_Description=req.body.Color_Description;
            updatedColor.Color_IsActive=req.body.Color_IsActive
            console.log("_id",req.body['_id'])
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
           
          });
    },

    getAll:(req,res)=>{
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

    getAllActive:(req,res)=>{
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

    getOneById: (req,res)=>{
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
    }
}