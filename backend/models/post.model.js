import mongoose from "mongoose"
const postSchema=new mongoose.Schema({
    author:{
        type:mongoose.schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    mediatype:{
        type:String,
        enum:["image","video"],
        required:true
    },
    media:{
        type:String,
        required:true
    },
    caption:{
        type:String,
    },
    likes:[
        {
           type:mongoose.schema.Types.ObjectId,
        ref:"User", 
        }
    ],
     comments:[
        {
           type:mongoose.schema.Types.ObjectId,
        ref:"User", 
        }
    ]
},{timestamps:true})

const Post=mongoose.model("Post",postSchema)
export default Post