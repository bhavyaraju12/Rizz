import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_APISECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error("Cloudinary Error: File path is missing.");
      return null;
    }

   
    const result = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto", 
    });

   
    fs.unlinkSync(localFilePath);

    return result;

  } catch (error) {

    if (fs.existsSync(localFilePath)) {
       fs.unlinkSync(localFilePath);
    }
    console.error("Error uploading to Cloudinary:", error);
    return null;
  }
};

export default uploadOnCloudinary;