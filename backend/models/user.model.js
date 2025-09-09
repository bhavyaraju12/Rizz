import mongoose from "mongoose";


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    userName:{
        type:String,
        requires:true,
        unique:true
    },
     email:{
        type:String,
        requires:true,
        unique:true
    },
    password:{
        type:String,
        requires:true,
    },
    profileImage:{
        type:String
    },
    followers:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
     following:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    posts:[
           {type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
    saved:[
           {type:mongoose.Schema.Types.ObjectId,
            ref:"Post"
        }
    ],
    loop:[
          {type:mongoose.Schema.Types.ObjectId,
            ref:"Loop"
          }
    ],
    story:
         {type:mongoose.Schema.Types.ObjectId,
            ref:"Story"
          }
    
},{timestamps:true})


const User=mongoose.model("User",userSchema)
export default User