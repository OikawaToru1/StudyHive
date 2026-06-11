import { v2 as cloudinary } from "cloudinary";
// import 'node:fs'
import { Readable } from "node:stream";



cloudinary.config({
    cloud_name : process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY ,
    api_secret : process.env.CLOUDINARY_API_SECRET ,
})

// use this approach when handling files locally;

// export const uploadToTCloudinary = async(localFilePath)=>{
//     const options = {
//         use_filename : true,
//         unique_filename : false,
//         overwrite: true,
//     }
//     if(!localFilePath) return null;

//     const result = await cloudinary.uploader.upload(localFilePath, options);
//     const url = cloudinary.url(result.public_id,{
//          transformation : [
//             {
//                 quality : "auto",
//                 fetch_format : "auto",
//             },
//             {
//                 width : 1200,
//                 height : 1200,
//                 crop: 'fill',
//                 gravity : 'auto'
//             }
//          ]
//     });

//     return url;
// }


export const uploadToTCloudinary = async (fileBuffer , fileName)=>{
    try {
        
        console.log("Uploading files to cloudinary with data", fileName, fileBuffer);
        if(!fileBuffer || !fileName) return null;

        return await Promise((resolve,reject)=>{
            const stream = cloudinary.uploader.upload_stream({
                resource_type: "raw",
                use_filename: true,
                unique_filename: false,
                overwrite : true,
                public_id : fileName,
            },
        (error,result)=>{
            if(error)
            {
                console.log("Error in uploading to cloudinary",error);
                return reject(error);
            }
            else{
                console.log("File uploaded to Cloudinary Succesfully !!!",result)
                return resolve(result);
            }
        }
        );

        Readable.from(fileBuffer).pipe(stream);
        });

    } catch (error) {
        console.log("Error uplaoding to Cloudinary", error);
        return null;
    }
}