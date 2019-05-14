const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
const Video = require("../models/video");



const db = "mongodb+srv://bhudiya:Nsn12345@cluster0-5ffxw.mongodb.net/test_video?retryWrites=true";
mongoose.Promise = global.Promise;

mongoose.connect(db,function(err){
    if(err){
        console.error("Error!"+err)
    }
});

router.get('/videos',function(req,res){
    console.log("All videos");
    Video.find({})
    .exec(function(err,video){
        if(err){
            console.log("error");
        }else{
            res.json(video);
        }
    })
});

router.get('/videos/:id',function(req,res){
    console.log("Single video");
    Video.findById(req.params.id)
    .exec(function(err,video){
        if(err){
            console.log("error");
        }else{
            res.json(video);
        }
    })
});


router.post('/video',function(req,res){
    console.log("Insert video");
    var newVedio = new Video();
    newVedio.title = req.body.title;
    newVedio.url = req.body.url;
    newVedio.desc = req.body.desc;

    newVedio.save(function(err,iv){
        if(err){
            console.log("Error");
        }else{
            res.json(iv);
        }
    });
});

router.put('/video/:id',function(req,res){
    console.log(req.params.id);
    Video.findOneAndUpdate(req.params.id,
        {
            $set: {title:req.body.title,url:req.body.url,desc:req.body.desc}
        },
        {
            new :true
        },
        function(err,uv){
            if(err){
                console.log("Error");
            }else{
                res.json(uv);
            }
        }
        );

});

router.delete('/video/:id',function(req,res){
    console.log("delete video");
    Video.findOneAndDelete(req.params.id,
        function(err,dv){
            
            if(err){
                console.log("Error");
            }else{
                res.json(dv);
               console.log( res.json(dv));
            }
        }
        );

});

module.exports = router;