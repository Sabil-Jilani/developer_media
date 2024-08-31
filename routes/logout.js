const express=require("express");
const router=express.Router();

router.route("/").get((req,res)=>{
    if (req.isAuthenticated) {
            req.logout(err=>{
                              if(err){res.json({error:err})
                                 }else{
                                  res.json({massge:"successfully logged out "})
                                              }
                            })
    } else {
        res.status.json(500)    
    }

    })
module.exports=router;