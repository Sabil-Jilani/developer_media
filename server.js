
const express=require("express");
const app=express();
const passport  = require("passport");
const session=require("express-session");
const cors=require("cors");
const path=require("path");
const port =process.env.PORT||8000;
require("dotenv").config();

const userModel =require("./database/model/user");
const passportSetup=require("./database/passport");
const mongoConnect=require("./database/mongodb");



const registerRoute=require("./routes/register")
const loginRoute=require("./routes/login");
const getLogInRoute=require("./routes/getLogIn");
const logoutRoute=require("./routes/logout");
const get_all_profiles=require("./routes/get_all_profiles");
const get_user_profile=require("./routes/get_user_profile");
const get_A_profile=require("./routes/get_A_profile");
const createProfile=require("./routes/profile");
const addExperience=require("./routes/addExperience");
const addEducation=require("./routes/addEducation");
const deleteEducation=require("./routes/deleteEducation");
const deleteExperience=require("./routes/deleteExperience");
const deleteAccount=require("./routes/deleteAccount");
const updateProfile=require("./routes/updateProfile");
const posts=require("./routes/posts");



const corsOptions ={
    origin:process.env.FRONT_URL, 
    credentials:true,  
    "access-control-allow-credentials":true,          //access-control-allow-credentials:true
    optionSuccessStatus:200
                   }
app.use(cors(corsOptions));


app.use(session({
    secret:process.env.SESSION_SECRET,
    resave:false,
    saveUninitialized:false,
 
}));

app.use(passport.initialize());
app.use(passport.session());


////////////////////////////////////////////////////////////////////////----->>register route
app.use("/register",registerRoute);
app.use("/login",loginRoute);
app.use("/logout",logoutRoute);
app.use("/getUser",getLogInRoute);
app.use("/profiles",get_all_profiles)
app.use("/user",get_user_profile)
app.use("/profile",get_A_profile)
app.use("/createProfile",createProfile)
app.use("/updateProfile",updateProfile)
app.use("/addExperience",addExperience)
app.use("/addEducation",addEducation)
app.use("/deleteEducation",deleteEducation)
app.use("/deleteExperience",deleteExperience)
app.use("/deleteAccount",deleteAccount)
app.use("/posts",posts)
app.get("/test",(req,res)=>{
    if(req.isAuthenticated()){
         console.log(req.user);
         res.status(200).json({mssge:"logged in"});
    }else{
        console.log(req.isAuthenticated())
    }
   
})

if(process.env.NODE_ENV==="production"){
    console.log(path.resolve());
    app.use(express.static(path.join(path.resolve(),"/frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(path.resolve(),"frontend","build","index.html"));
})
}else{
    app.get("/",(req,res)=>{
        res.send("welcome to node backend")
    })
}
// testing purpose----------------------------------------------------->>>
// new userModel({
//     username:"email@gmail.com",
//     name:"jilani",
//     password:"01941255921"
// }).save()

app.listen(port,()=>{
    console.log("backend server is on")
})