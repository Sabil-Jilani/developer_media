const express=require("express");
const userModel = require("../database/model/user");
const passport = require("passport");
const router=express.Router();
const{check,validationResult}=require("express-validator")
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.route("/").post([
    check("name","name is required & must be avobe 4 letters").notEmpty().isLength({min:4}),
    check("username","email is required").notEmpty().isEmail(),
    check("password","password is required & must be more than 5 letters").notEmpty().isLength({min:5}),
],(req,res)=>{
    const validationError=validationResult(req);
    if(!validationError.isEmpty()){
        res.status(400).json({error:validationError.array()})
    }else{

    const {name,username ,password}=req.body;  
       userModel.register({username,name},password,(err,user)=>{
           if(err){
   console.log(err)
   res.status(400).json({error:err})
           }else{ 
               passport.authenticate("local")(req,res,function(){
                   res.status(200).json({user:user})   
                 })}
       })
                        }
   })
   module.exports=router;