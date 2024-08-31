const express=require("express");
const router=express.Router();
const ProfileModel=require("../database/model/porfile")

router.route("/:id").get(async(req,res)=>{
try {const username=req.params.id;
   const response=await ProfileModel.findOne({username:username});
if(!response){
    res.status(200).json({profile:null})    
}else{
res.status(200).json({profile:response})    
}
} catch (err) {
    res.status(400).json({error:err})
}

})
module.exports=router