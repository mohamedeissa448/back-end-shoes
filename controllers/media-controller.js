var Media=require("../models/media-model");
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
}).any()
module.exports={
    addMedia:(req,res)=>{
        upload(req, res,function(err) {
            console.log("boooooodyxx", req.body);
            console.log("req.files", req.files);
            if (err) {
              res.status(422).json({ error_code: 1, err_desc: err });
              return;
            }
            const newMedia=new Media();
            newMedia.Media_Type=req.body.Media_Type;
            newMedia.Media_Title=req.body.Media_Title;
            newMedia.Media_MetaTags=req.body.Media_MetaTags;
            newMedia.Media_AlternativeText=req.body.Media_AlternativeText;
            newMedia.Media_Describtion=req.body.Media_Describtion;
           
            newMedia.Media_xLargImageUrl=req.files[0].filename;
            newMedia.Media_LargImageUrl=req.files[1].filename;
            newMedia.Media_MediumImageUrl=req.files[2].filename;
            newMedia.Media_SamllImageUrl=req.files[3].filename;
            newMedia.save((err,document)=>{
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
        })
      
    },

    editMediaById:(req,res)=>{
        upload(req, res, function(err) {
            console.log("boooooodyxx", req.body);
            console.log("req.files", req.files);

            if (err) {
              res.status(422).json({ error_code: 1, err_desc: err });
              return;
            }
            /** Multer gives us file info in req.file object */
            if (err) {
                res.status(422).json({ error_code: 1, err_desc: err });
                return;
              }
            var updatedMedia={}
            updatedMedia.Media_Type=req.body.Media_Type;
            updatedMedia.Media_Title=req.body.Media_Title;
            updatedMedia.Media_MetaTags=req.body.Media_MetaTags;
            updatedMedia.Media_AlternativeText=req.body.Media_AlternativeText;
            updatedMedia.Media_Describtion=req.body.Media_Describtion;
            updatedMedia.Media_xLargImageUrl=req.files[0].filename;
            updatedMedia.Media_LargImageUrl=req.files[1].filename;
            updatedMedia.Media_MediumImageUrl=req.files[2].filename;
            updatedMedia.Media_SamllImageUrl=req.files[3].filename;
            Media.findByIdAndUpdate(req.body['_id'],updatedMedia,{new: true},
                (err,media)=>{
                    if(err){
                        return res.send({
                            message:err
                        })
                    }else if(media) {
                        return res.send({
                            message:true,
                            data:{ updatedMedia:media }
                        })
                    }else{
                        return res.send({
                            message:"updated media is null"
                        })
                    }
                })
        })
    },

    getAll:(req,res)=>{
        Media.find({}).exec((err,medias)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(medias) {
                return res.send(medias)
            }else{
                return res.send({
                    message:"medias are null"
                })
            }

        })
    },

    getOneById:(req,res)=>{
        Media.findById(req.body['_id']).exec((err,media)=>{
            if(err){
                return res.send({
                    message:err
                })
            }else if(media) {
                return res.send(media)
            }else{
                return res.send({
                    message:"media is null"
                })
            }

        })
    }
}