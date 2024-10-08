
const mongoose= require("mongoose");
const passportLocalMongoose=require("passport-local-mongoose");


const userSchema=new mongoose.Schema({
    username:String,
    name:String,
    password:String,
    googleId:String,
    githubId:String
})

userSchema.plugin(passportLocalMongoose);

module.exports =mongoose.model("user",userSchema);