import mongoose from "mongoose";

const storySchema=new mongoose.Schema({
 author:{
        type:mongoose.schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    mediaType:{
        type:String,
        enum:["image","video"],
        required:true
    },
    media:{
        type:String,
        required:true
    },
    viewers:{
         type:mongoose.schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    createdAt:{
type:Date,
default:date.now(),
expires:86400
    }
},{timestamps:true})

const Story=mongoose.model("Story",storySchema)
export default Story