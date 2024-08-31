const ProfileModel = require("../database/model/porfile");
const router=require("express").Router();

 router.route("/").get( async (req, res) => {
    try {
      const users = await ProfileModel.find({ });
      res.status(200).json(users);
    } catch (err) {
        res.status(500).json({errors:err});
      console.log(err);
    }
  })
module.exports=router ;