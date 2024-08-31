const mongoose=require("mongoose");

const postSchema= new mongoose.Schema({

        profileId:{
            type:mongoose.Schema.Types.String,
            ref:"ProfileModel"
        },
    
        post:{
            type:String,
            required:true
        },
        like:[String], 
             unlike:[String],
        Comments:[{
           userName:{ type:String,
                required:true  
            },
           comment:{
                type:String,
                required:true
            },
            date:{
                type:Date,
                default:Date.now()
            }
        }],
        date:{
            type:Date,
            default:Date.now()
        }
    
})
module.exports= mongoose.model("PostModel",postSchema)