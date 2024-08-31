const express=require("express");
const router=express.Router();
const ProfileModel=require("../database/model/porfile")
router.use(express.json());
router.use(express.urlencoded({extended:true}))

router.route("/:id").get(async(req,res)=>{ 
      const id=req.params.id;
    if (req.isAuthenticated()) {
    try { 
const result=await ProfileModel.findOne({username:req.user.username});
if(result){
    result.experience=result.experience.filter(data=>data.id!==id);
    result.save();
     return res.status(200).json("experience deleted successfully")
}
return res.status(400).json({errors:{messege:"something went wrong.please try again"}})
    }catch(error){
        console.log(error)
    return res.status(500).json({errors:{messege:error.data}}) 
}
}else{
    return res.status(400).json({errors:{messege:"you're not Authenticated"}}) 
    }
});
module.exports=router;