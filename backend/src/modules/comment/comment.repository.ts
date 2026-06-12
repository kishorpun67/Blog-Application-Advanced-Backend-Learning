
import { Comment } from "@prisma/client";
import { prisma } from "../../lib/prisma.js";
import { ICommentRepository } from "./comment.interface.js";


export class CommentRepository implements ICommentRepository {
    async createComment(data: { userId: string; postId: string; comment: string; }): Promise<Comment> {
        return await prisma.comment.create({
            data:{
                userId:data.userId,
                postId:data.postId,
                comment:data.comment
            }
        })
    }
    async updateComment(data: { userId: string; commentId: string; comment: string; }): Promise<Comment> {
        return await prisma.comment.update({
            where:{
                id:data.commentId,
            },
            data:{
                comment:data.comment           
            }
        })
    }
    async getComment(commentId: string): Promise<Comment| null> {
        return await prisma.comment.findFirst({
            where:{
                id:commentId
            }
        })
    }

    async getComments(postId:string): Promise<Comment[]> {
        return prisma.comment.findMany({
            where:{
                postId:postId
            }
        })
    }
    async deleteComment(commentId: string): Promise<Comment | null> {
        return prisma.comment.delete({
            where:{
                id:commentId
            }
        })
    }
}