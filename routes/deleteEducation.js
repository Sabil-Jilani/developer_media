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
 result.education= result.education.filter(data=>data.id!==id);
       await result.save(); 
       return res.status(200).json("education deleted");
    
    }
    res.status(400).json("something went worng .please try again")
    } catch (error) {
      console.log(error)
        res.status(500).json({errors:{message:"server error"}})
    }
    } else {
        res.status(400).json({errors:{message:"you're not authenticated"}})
        
    }
   
   
})
module.exports=router