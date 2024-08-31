const express=require("express");
const router=express.Router();
const ProfileModel=require("../database/model/porfile");

router.route("/:username").get(async(req,res)=>{
    try {
        const username=req.params.username;
      
const user=await ProfileModel.findOne({username});

res.status(200).json(user)
    } catch (err) {
        res.status(500).json({error:err})
    }


})
module.exports=router;