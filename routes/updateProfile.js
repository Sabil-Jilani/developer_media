const express=require("express");
const router=express.Router();
const ProfileModel=require("../database/model/porfile");
const { check,validationResult } = require("express-validator");

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/").post([
    check("status","status required").exists({checkFalsy:true}).custom(async value => {
     console.log(value.length)
        if (value.length <2) {
          throw new Error('status required');
        }
      }),
    check("skills","skills required").exists({checkFalsy:true}),
],async(req,res)=>{
console.log(req.body)
    if (req.isAuthenticated()) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) { 
          return res.status(400).json({ errors: errors.array() });
                }
        try {
          
            const{
               company,website,location,status, skills,
            bio,githubname,youtube,facebook,twitter,linkedIn,instagram,
            }=req.body;
            
const profileFeild={username:req.user.username}; 

if(company)profileFeild.company=company;
        if(status)profileFeild.status=status;
        if(skills)profileFeild.skills=skills.split(",");
        if(website)profileFeild.website=website;
        if(location)profileFeild.location=location;
        profileFeild.social={};
        if(youtube)profileFeild.social.youtube=youtube;
        if(bio)profileFeild.bio=bio;
        if(facebook)profileFeild.social.facebook=facebook;
        if(twitter)profileFeild.social.twitter=twitter;
        if(linkedIn)profileFeild.social.linkedIn=linkedIn;
        if(instagram)profileFeild.social.instagram=instagram;
        if(githubname)profileFeild.githubname=githubname;
    const result=await ProfileModel.findOneAndUpdate({username:req.user.username},{$set:profileFeild});
    
        

        console.log("result:"+result);
        res.status(200).json({profile:result})
        } catch (error) {
            res.status(500).json({error:error})
            console.log(error)
        }
    } else {
        res.status(500).json({error:"you're not authenticated"})
    }
   
  
})
module.exports=router