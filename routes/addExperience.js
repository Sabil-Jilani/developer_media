const express=require("express");
const { check,validationResult } = require("express-validator");
const router=express.Router();
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
const ProfileModel=require("../database/model/porfile")


router.route("/").post([
    check("title","title is required").trim().notEmpty().exists({checkFalsy:true}),
    check("company","company is required").trim().notEmpty().exists({checkFalsy:true})
],async(req,res)=>{
    if (req.isAuthenticated()) {
        try {
            const err=validationResult(req);
            if (!err.isEmpty()) {
                return res.status(500).json({error:err.array()})
            }
        const{ title,
           company,
          location,
          from,
         current,
          to,
          description} =req.body;
          const experience={  title:title,
            company:company};
    
          if (location)experience.location=(location);
          if (current)experience.current=(current);
          if (from)experience.from=(from);
          if (to)experience.to=(to);
          if (description)experience.description=(description);
    
    
        const response=await ProfileModel.findOne({username:req.user.username})
        response.experience=[...response.experience,experience];
        const data=response.save()
       if (data) {
        res.status(200).json(response)
       } else {
        console.log("profile err")
        res.status(400).json({errors:{message:"couldn't update try again please"}})
       }
        } catch (error) {
            console.log(error)
            res.status(500).json({errors:{message:"server error"}})   
        }
    } else {
        res.status(500).json({errors:{message:"you aren't Authenticated"}}) 
    }

}) 

module.exports=router