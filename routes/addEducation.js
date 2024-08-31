const express=require("express");
const router=express.Router();
const ProfileModel=require("../database/model/porfile")
router.use(express.json());
router.use(express.urlencoded({extended:true}))

router.route("/").post(async(req,res)=>{
    if (req.isAuthenticated()) {
        try {
            const profile=await ProfileModel.findOne({username:req.user.username})
    const result= await ProfileModel.findOneAndUpdate({username:req.user.username},{$set:{education:[...profile.education,req.body]}});

    if(!result)return res.status(400).json({errors:{message:"no profile"}})
    res.status(200).json();

        } catch (error) {
            console.log(error.response)
res.status(400).json({errors:{message:error.response.data}}) 
        }
    } else {
res.status(400).json({errors:{message:"you are not Authenticated"}}) 
    }

})
module.exports=router;