var Media=require("../models/media-model");

module.exports={
    addMedia:(req,res)=>{
        const newMedia=new Media();
        newMedia.Media_Type=req.body.Media_Type;
        newMedia.Media_Title=req.body.Media_Title;
        newMedia.Media_MetaTags=req.body.Media_MetaTags;
        newMedia.Media_AlternativeText=req.body.Media_AlternativeText;
        newMedia.Media_Describtion=req.body.Media_Describtion;
        newMedia.Media_xLargImageUrl=req.body.Media_xLargImageUrl;
        newMedia.Media_LargImageUrl=req.body.Media_LargImageUrl;
        newMedia.Media_MediumImageUrl=req.body.Media_MediumImageUrl;
        newMedia.Media_SamllImageUrl=req.body.Media_SamllImageUrl;
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
    },

    editMedia:(req,res)=>{
        var updatedMedia={}
        updatedMedia.Media_Type=req.body.Media_Type;
        updatedMedia.Media_Title=req.body.Media_Title;
        updatedMedia.Media_MetaTags=req.body.Media_MetaTags;
        newMedia.Media_AlternativeText=req.body.Media_AlternativeText;
        newMedia.Media_Describtion=req.body.Media_Describtion;
        newMedia.Media_xLargImageUrl=req.body.Media_xLargImageUrl;
        newMedia.Media_LargImageUrl=req.body.Media_LargImageUrl;
        newMedia.Media_MediumImageUrl=req.body.Media_MediumImageUrl;
        newMedia.Media_SamllImageUrl=req.body.Media_SamllImageUrl;
        Media.findByIdAndUpdate(req.body['_id'],updatedMedia,{new: true},
            (err,media)=>{
                if(err){
                    return res.send({
                        message:err
                    })
                }else if(media) {
                    return res.send({
                        message:true,
                        data:{ newMedia:media }
                    })
                }else{
                    return res.send({
                        message:"updated media is null"
                    })
                }
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