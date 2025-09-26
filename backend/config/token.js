import jwt from "jsonwebtoken"

const genToken=async(userId)=>{
try{
const token=await jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"10y"})
return token
}catch(error){
throw new Error(`gen token error ${error}`) 
}
}


export default genToken