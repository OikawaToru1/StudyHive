import { v2 as cloudinary } from "cloudinary";
import 'node:fs'



cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret : process.env.CLOUDINARY_API_SECRET ,
})

export const uploadToTCloudinary = async(localFilePath)=>{
    const options = {
        use_filename : true,
        unique_filename : false,
        overwrite: true,
    }
    if(!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, options);
    const url = cloudinary.url(result.public_id,{
         transformation : [
            {
                quality : "auto",
                fetch_format : "auto",
            },
            {
                width : 1200,
                height : 1200,
                crop: 'fill',
                gravity : 'auto'
            }
         ]
    });

    return url;
}
