import { da } from "zod/locales";
import { uploadToCloudinary } from "../../common/helpers/cloudinary.helper.js";
import { ApiError } from "../../common/utils/ApiError.js";
import { IPostRepository } from "./post.interface.js";
import { createPostDTO, updatePostDTO } from "./post.schema.js";

export class PostService {
    constructor(private repo: IPostRepository) {

    }
    async createPost(body:createPostDTO, userId:string, localFilePath?:string) {
        let imageUrl : string | undefined
        if (localFilePath) {
            const uploadResult = await uploadToCloudinary(localFilePath);

            if (!uploadResult) {
                throw new ApiError(500, "Image upload failed");
            }
    
            imageUrl = uploadResult.secure_url;
        }
        return await this.repo.createPost({...body, userId, imageUrl} )
    }

    async getUserPosts(userId:string) {
        return this.repo.getPostsByUserId(userId)
    }

    async getPost(postId:string ,userId:string ) {
        return this.repo.getPostById(postId, userId)
    }
    async updatePost(data:updatePostDTO, postId:string , userId:string,  localFilePath?:string) {
        const {title, description} = data
        let imageUrl : string | undefined
        if (localFilePath) {
            const uploadResult = await uploadToCloudinary(localFilePath);
            if (!uploadResult) {
                throw new ApiError(500, "Image upload failed");
            }
    
            imageUrl = uploadResult.secure_url;
        }
        return this.repo.updatePostById({postId, userId, title, description, imageUrl})
    }
}