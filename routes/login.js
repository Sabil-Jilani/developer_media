const express=require("express");
const UserModel = require("../database/model/user");
const passport = require("passport");
const { validationResult, check } = require("express-validator");
const router=express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/").post(
    check("username","email required").isEmail(),
  check('password',"pass required").isLength({min:5})
  ,(req,res)=>{
  
   const {
       username,
       password
     } = req.body;
  
   const errors = validationResult(req);
 
   if (!errors.isEmpty()) { 
     return res.status(400).json({ errors: errors.array() });
           }
    const user=new UserModel({
        username:username,
        password:password
    });
 
    req.login(user,(err)=>{
        if(err){
            res.status(500).json({error:err})
        }else{ 
            passport.authenticate("local")(req,res,()=>{
                res.status(200).json({user:user})
            })
        }
    })
})
module.exports=router;