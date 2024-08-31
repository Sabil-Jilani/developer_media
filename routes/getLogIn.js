const express=require("express");
const UserModel = require("../database/model/user");
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route('/').post(async(req,res)=>{
  if (req.isAuthenticated()) {
      const user=await UserModel.findOne({username:req.body.username});
   if (user) {
   
    res.status(200).json({user:user})
   } else {
    res.status(400).json()
   }
  } else {
   res.status(400).json()
  }

})
module.exports=router;