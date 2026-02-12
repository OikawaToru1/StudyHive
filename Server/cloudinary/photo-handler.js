import { v2 as cloudinary } from "cloudinary";


cloudinary.config({
    cloud_name : '',
    api_key : '' ,
    api_secret : '' ,
})


const uploadImage = async (imagePath)=>{
    

    try {
        const result = await cloudinary.uploader.upload(imagePath);
        console.log(result);
        const url = cloudinary.url(result.public_id,{
            transformation : [
                {
                    quality : 'auto',
                    fetch_format : 'auto',

                },
                {
                    width : 1200,
                    height : 1200,
                    crop : 'fill',
                    gravity : 'auto'
                }
            ]
        });
        console.log(url)
        
    } catch (error) {
        console.log("Error in uploading ", error)
    }

}

uploadImage('../assets/monke.jpg');