const express=require("express");
const router=express.Router();
const { validationResult, check } = require("express-validator");
const ProfileModel=require("../database/model/porfile");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/").post([
    check("status","status required").exists({checkFalsy:true}),
    check("skills","skills required").exists({checkFalsy:true}),
],async(req,res)=>{

    if (req.isAuthenticated()) {
        try {
           
            const errors = validationResult(req);
            if (!errors.isEmpty()) { 
               
              return res.status(400).json({ errors: errors.array() });
                    }
            
            const{
               company,website,location,status, skills,
            bio,githubusername,youtube,facebook,twitter,linkedIn,instagram,
            }=req.body;

        const profile=new ProfileModel({
            username:req.user.username,
            status:status,
            skills:skills.split(","),
        
        })
        if(company)profile.company=company;
        if(website)profile.website=website;
        if(location)profile.location=location;
        if(youtube)profile.social.youtube=youtube;
        if(bio)profile.bio=bio;
        if(facebook)profile.social.facebook=facebook;
        if(twitter)profile.social.twitter=twitter;
        if(linkedIn)profile.social.linkedIn=linkedIn;
        if(instagram)profile.social.instagram=instagram;
        if(githubusername)profile.githubusername=githubusername;
        
        const result = await profile.save();
        res.status(200).json({profile:result})
        } catch (error) {
            res.status(500).json({error:error})
            console.log(error)
        }
    } else {
        res.status(500).json({error:{message:"you're not authenticated"}})
    }
   
  
})
module.exports=router