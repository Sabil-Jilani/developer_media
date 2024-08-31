const express=require("express");
const router=express.Router();
const ProfileModel=require("../database/model/porfile")
router.use(express.json());
router.use(express.urlencoded({extended:true}))

router.route("/:id").get(async(req,res)=>{ 
      const id=req.params.id;
 
    if (req.isAuthenticated()) {
    try {    
const result=await ProfileModel.findByIdAndRemove(id);
console.log(result)
if (result) {
    return res.status(200).json("account deleted")
}
res.status(400).json({errors:{messege:"something went wrong try again"}})

    }catch(err){
res.status(400).json({errors:{messege:"server error"}})
    }
}else{
    res.status(400).json({errors:{messege:"you're not authenticated"}})

}
})
module.exports=router;