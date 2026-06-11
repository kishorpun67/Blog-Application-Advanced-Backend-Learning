import { ApiError } from "../../common/utils/ApiError.js";
import { IPostRepository } from "../post/post.interface.js";
import { ICommentRepository } from "./comment.interface.js";
import { createCommentDTO, updateCommentDTO } from "./comment.schema.js";



export  class CommentService {
    constructor(
        private commentRepo:ICommentRepository,
        private postRepo:IPostRepository) 
        { }
    async createComment(
        data:createCommentDTO, postId:string, userId:string
    ) {
        const post = await this.postRepo.getPostByPostId(postId)
        if(!post) {
            throw new ApiError(404, "Post not found")
        }
        postId = post.id
        return await this.commentRepo.createComment({userId, postId ,...data})
    }

    async updateComment(data:updateCommentDTO, userId:string, commentId:string) {
        const comment = await this.commentRepo.getComment(commentId)
        if(!comment) {
            throw new ApiError(404, 'Comment not found')
        }
        return await this.commentRepo.updateComment({userId, commentId, ...data})
    }
    async getComments(postId:string) {
        return await this.commentRepo.getComments(postId)
    }

    async getComment(commentId:string) {
        return await this.commentRepo.getComment(commentId) 
    }

    async deleteComment(commentId:string) {
        const comment = await this.commentRepo.getComment(commentId)
        if(!comment) {
            throw new ApiError(401, 'Comment not found')
        }
        return await this.commentRepo.deleteComment(commentId)
    }

}