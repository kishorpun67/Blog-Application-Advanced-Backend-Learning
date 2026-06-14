import { deleteFile, uploadToCloudinary } from "../../common/helpers/cloudinary.helper.js";
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
    async getAllPosts() {
        return await this.repo.getAllPosts()
    }
    async getUserPosts(userId:string, cursor?:string, limit?:number) {
        return this.repo.getPostsByUserId(userId, cursor, limit)
    }

    async getPost(postId:string ,userId:string ) {
        return this.repo.getPostByPostIdAndUserId(postId, userId)
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
        return this.repo.updatePostByIdUserId({postId, userId, title, description, imageUrl})
    }

    async deletPost(postId:string, userId:string) {
        const post = await this.repo.getPostByPostIdAndUserId(postId, userId)
        if(!post) {
            throw new ApiError(401,'Post not found')
        }
        if(post.imageUrl) {
            await deleteFile(post.imageUrl)
        }
        return await this.repo.deletPostByPostIdAndUserId(postId, userId)
        
    }
}