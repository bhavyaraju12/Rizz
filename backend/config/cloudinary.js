import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs'
const uploadOnCloudinary = async (file) => {

    try{
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_APIKEY, 
  api_secret: process.env.CLOUDINARY_APISECRET
});
const result=await cloudinary.uploader
  .upload({
    resource_type: "auto"
  })

fs.unlinkSync(file)
  return result.secure_url

    }catch(error){
        fs.unlinkSync(file)
        console.log(error)
    }

}
export default uploadOnCloudinary