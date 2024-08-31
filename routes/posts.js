const express=require("express");
const router=express.Router();
const PostModel=require("../database/model/post");
const ProfileModel=require("../database/model/porfile");
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/").post(async(req,res)=>{

    const {text}=req.body;

    if (req.isAuthenticated()) {
        try {
        const profile=await ProfileModel.findOne({username:req.user.username});
     const Post=new PostModel({
        profileId:profile.id,
        post:text
    });
    const result=await Post.save();
    res.status(200).json(result)

} catch (error) {
    console.log(error);
    res.status(400).json({errors:{messege:"server error"}})

}
    } else {
    res.status(400).json({errors:{messege:"you're not authenticated"}})

    }

   

});
router.route("/all").get(async(req,res)=>{
    const response=await PostModel.find();
    res.status(200).json(response.reverse())
})
router.route("/:id").get(async(req,res)=>{
    if(req.isAuthenticated()){
        try {
        const id =req.params.id;
    const post=await PostModel.findByIdAndDelete(id);
 

    res.status(200).json("post delelted") 
    } catch (error) {
        console.log(error)
    res.status(400).json({errors:{messege:"server error"}}) 
        
    } 
    }else{
        res.status(400).json({errors:{messege:"you're not authenticated"}}) 

    }
   
   
})

module.exports=router;