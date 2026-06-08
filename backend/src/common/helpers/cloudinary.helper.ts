import { file } from "zod"
import cloudinary from "../../lib/cloudinary.js"
import fs from "fs"
export const uploadToCloudinary = async(localFilePath:string) =>{
    try{
		if (!localFilePath) return null;
		const response = await cloudinary.uploader.upload(localFilePath, {
			resource_type: "image",
		});
		return response;
    } catch(error) {
        console.log("Error while uploading while image to cloudinary: " ,error)
        fs.unlinkSync(localFilePath)
    }
    
}